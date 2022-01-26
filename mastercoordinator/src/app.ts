/**
 * $Rev:  $
 * $LastChangedDate: $
 * $Author:  $
 * 
 * 
 */

import { ConnectionOptions, createConnection } from "typeorm";
import { MasterCoordinator, StandStatus } from "./mastercoordinator";
import { HttpInitialize } from  './httpcommunication'
//import { standRepository } from "../../server/src/repositories";
import { standRepository } from "../../server/src/repositories";
import { Station } from "../../server/src/entity/station";
import { User } from "../../server/src/entity/user";
import { CalibrationLog } from "../../server/src/entity/calibrationlog";
import { Machine } from "../../server/src/entity/machine";
import { MachineLog } from "../../server/src/entity/machinelog";
import { MachineTest } from "../../server/src/entity/machinetest";
import { MachineTestHistory } from "../../server/src/entity/machinetesthistory";
import { MachineTestLog } from "../../server/src/entity/machinetestlog";
import { Order } from "../../server/src/entity/order";
import { OrderOption } from "../../server/src/entity/orderoption";
import { VerificationEquipment } from "../../server/src/entity/verificationequipment";


let connectOptions : ConnectionOptions = require ( '../../../../../../ormconfig.json' );
let connOpt : any = connectOptions;  // Since properties are marked "readonly" we have to do this Javascript hack

let stations : Station [] = [];
export let PortNo : number = 1234;

export let mastercoordinator: MasterCoordinator;

console.log( connOpt );
createConnection ( connOpt ).then(async connection => {

    HttpInitialize ( PortNo );            // Initialize web server
    
    
    stations = await standRepository().find();  // Get all stations

    console.log ( 'station:', stations )
    if ( stations )
    {
        mastercoordinator = new MasterCoordinator ( stations, PortNo );
    }
    console.log ( 'Ready for guests :) ');

});

setTimeout ( ServeLoop, 1000 );
let doOnce:boolean = true;
let stationCnt:number = 1;
function ServeLoop() 
{
    try
    {
        if ( doOnce )
        {
            mastercoordinator.SendStandStatusRequestToServers( stationCnt );
            doOnce = false;
        }
        else 
        {
            const resp : StandStatus = mastercoordinator.getStandStatus( stationCnt );
            if ( resp )
            {
                doOnce = true;
                console.log ( resp );
                if ( mastercoordinator.standStatusDiff( resp, mastercoordinator.getStatusLst( stationCnt ) ) )
                {
                    mastercoordinator.UpdateStandStatus( stationCnt , resp );                
                }                                
                else 
                {
                    console.log ( `Stand ${stationCnt}: nothing has changed` );
                }
                // Start over
                stationCnt += 1;
                if ( stationCnt > stations.length )
                {
                    stationCnt = 1;
                }
            }
        }
    }
    catch ( e )
    {
        console.log ( e );
    }
    
    setTimeout( ServeLoop, 1000 );
}