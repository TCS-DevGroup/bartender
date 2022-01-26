/**
 * $Rev:  $
 * $LastChangedDate:  $
 * $Author:  $
 * 
 * 
 */

import { Request, Response } from 'express';
import { verificationEquipmentRepository, calibrationLogRepository, standRepository, calibrationLimitsRepository, machineTestRepository, orderOptionRepository, machineRepository } from "../../server/src/repositories";
import { VerificationEquipment } from "../../server/src/entity/verificationequipment";
import { CalibrationLog } from "../../server/src/entity/calibrationlog";
import { Station } from "../../server/src/entity/station";
import { CalibrationLimits } from "../../server/src/entity/calibrationlimits";
import { mastercoordinator } from './app';
import { ChemistryData, FlowChemistryStatistics, FlowWaterStatistics, StandStatus } from './mastercoordinator';
import { MachineTest } from '../../server/src/entity/machinetest';
import { OrderOption } from '../../server/src/entity/orderoption';
import { Machine } from '../../server/src/entity/machine';


let g_httpServer : any;
let g_io : any;

export function HttpInitialize ( portno:number )
{
    let express = require("express");
    let app = express();
    let bodyParser = require("body-parser");
    app.use ( bodyParser.json() );

    g_httpServer = require("http").Server(app);
    
    
    app.set("view engine", "ejs");
    //app.set("views", "../client/dist" );
    app.set("views", "dist" );
    app.set("view options", { layout: false} );

// Pages    
    
    app.get('/', async function ( req: Request, res: Response ) {
        res.render ( 'homepage' );
    });

    app.get('/dashboard', async function ( req: Request, res: Response ) {
        res.render ( 'dashboard' );
    });
    
    app.get('/calibration', async function ( req: Request, res: Response ) {
        res.render ( 'calibration' );
    });
    
    app.get('/developer', async function ( req: Request, res: Response ) {
        res.render ( 'developer' );
    });
    
    app.use ( express.static("dist"));


    // Verification Equipment
    app.get ( '/api/v1/calibrationEquipment/pull',   pullVerificationEquipment );    // Pull all veryfication equipment data from DB
    app.get ( '/api/v1/calibrationlog/pull',         pullCalibrationLog );    // Pull all the calibration log from DB
    app.get ( '/api/v1/verificationlog/pull',        pullVerificationLog );    // Pull verification log entry from DB 
    app.get ( '/api/v1/stands/status/:stand',        ShareStandStatus)
    app.post( '/api/v1/updatesoftware',              Updatesoftware);
    app.get ( '/api/v1/port',                        GetStandPorts);
    app.get ( '/api/v1/ip',                          GetStandIP);
    app.get ( '/api/v1/getcalibrationslimits',       GetCalibrationLimits);
    app.post( '/api/v1/calculatecalibrationslimits', CalculateCalibrationLimits);
    
    /*
    // Stand Port from DB
    app.get     ( '/api/v1/ports',                              ShareStandPorts );
    // Serverhost IP
    app.get     ( '/api/v1/ip',                                 ShareServeIP );
    */


    g_httpServer.listen ( portno, (err:any) => {
        if(err)
        {
            console.error(err);
        }
        
        g_io = require('socket.io').listen(g_httpServer, {
            log: false,
            agent: false,
            origins: '*:*',
            transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
        });
    
        g_io.on("connection", function(socket: any) {
            console.log("a user connected");

            socket.on("disconnect", function(message: any) {
                console.log("a user disconnected");
            });
        });
    
        console.info("Listening on *." + portno);
    });
}

export function BroadcastUpdate ()
{
    g_io.emit ( "update" );
}

export const pullVerificationEquipment = async ( req: Request, res: Response) =>
{
    let equipments : VerificationEquipment [] = await verificationEquipmentRepository().find ( );
    if ( equipments != undefined )
    {
        return res.status(200).json ( equipments );
    }
    else
        return res.status(404).send ( 'Calibration equipment not found' );
}

export const pullCalibrationLog = async ( req: Request, res: Response) =>
{
    let calibrationLog : CalibrationLog [] = await calibrationLogRepository().find ( 
        { where : [ { logtype : 1 } ] } ) ;
    if ( calibrationLog != undefined  )
        return res.json ( calibrationLog );
    else    
        return res.status(404).send( 'CalibrationLog not found')
}

export const pullVerificationLog = async ( req: Request, res: Response) =>
{
    let verificationlog : CalibrationLog [] = await calibrationLogRepository().find (
        { where : [ { logtype : 2 } ] } ) ;
    
    if ( verificationlog != undefined )
        return res.json ( verificationlog );
    else 
        return res. status(404).send( 'Verification log not found');
    
}

export const ShareStandStatus = ( req: Request, res: Response) =>
{    
    const stand:number = parseInt ( req.params.stand );
    console.log ( 'incoming request for stand:',stand);
    
    //mastercoordinator.SendStandStatusRequestToServers ( stand );
    const standStatus:StandStatus = mastercoordinator.getStatusLst ( stand );
    //console.log ( standStatus );
    res.status(200).json ( standStatus )    
}

function CheckForResponse ( req:Request, res: Response, stand:number )
{
    let status:any = mastercoordinator.getStandStatus( stand );
    if ( status )
    {
        console.log ( 'Answer from stand:', stand )
        res.status(200).json ( status );
    }
    else
    {
        setTimeout ( CheckForResponse, 500, req, res, stand );
    }
}

export const Updatesoftware = async ( req: Request, res: Response ) => 
{
    console.log ( req.body.user )
    console.log ( req.body.stationsChecked )
    const StationsCheckedForUpdate:boolean[] = req.body.stationsChecked;
    console.log ( 'Update software request:',StationsCheckedForUpdate);
    let st:Station[]|undefined = await standRepository().find (  )
    if ( st )
    {
        for ( let i:number=0; i<st.length; i++ )
        {
                if ( StationsCheckedForUpdate[i] == true)    
                {
                    st[i].newsoftwareversion = true;
                }
        }
        await standRepository().save ( st );
    }
    res.status(200).send('OK');
}

export const GetStandPorts = ( req: Request, res: Response ) =>
{
    res.status( 200 ).json( mastercoordinator.getAllPorts() );
}

export const GetStandIP = ( req: Request, res: Response ) =>
{
    res.status( 200 ).json( mastercoordinator.getIP() );
}

export const GetCalibrationLimits = async ( req: Request, res: Response ) =>
{
    console.log ( 'Getting calibration limits' );
    const calibrationsLimits : CalibrationLimits[]= await calibrationLimitsRepository().find ();
    console.log ( calibrationsLimits );
}

export const CalculateCalibrationLimits = async ( req: Request, res: Response ) =>
{
    const sensorsChecked:boolean[] = req.body.sensorsChecked;
    console.log ( req.body.sensorsChecked );
    console.log ( 'Update software request:',sensorsChecked);
    let calibrationResponse:any[]=[];

    if ( sensorsChecked[2] )
    {

        const waterFlowResults: MachineTest[] = await machineTestRepository().find (
            {
                where : { testid : 4 } , select : [ "result"]
            }
            )
        let FlowWaterMeanAndStandardDeviation:FlowWaterStatistics = mastercoordinator.CalculateFlowWaterMeanAndStandardDeviation ( waterFlowResults );
        console.log ( waterFlowResults );
        console.log ( '\n' );
        calibrationResponse.push ( FlowWaterMeanAndStandardDeviation );
    }
    if ( sensorsChecked[3] )
    {

        const orderOption: OrderOption[] = await orderOptionRepository().find ();
        const machine: Machine[] = await machineRepository().find ();
        
        const ChemistryDataContainer:ChemistryData[] = mastercoordinator.GetChemistryData( orderOption, machine );
        
        const chemistryResults: MachineTest[] = await machineTestRepository().find (
            {
                where : { testid : 7 } 
            }
            )
        const FlowChemistryMeanAndStandardDeviation:FlowChemistryStatistics = mastercoordinator.CalculateChemistryMeanAndStandardDeviation ( chemistryResults, ChemistryDataContainer );
        calibrationResponse.push ( FlowChemistryMeanAndStandardDeviation ); 
    }          
    
    res.status ( 200 ).json( calibrationResponse );
}   