/**
 * $Rev:  $
 * $LastChangedDate:  $
 * $Author:  $
 * 
 * 
 */

import { Equal } from "typeorm";
import { TestNames } from "../../../../KEN_TS_Framework/testnames";
import { MachineTest } from "../../server/src/entity/machinetest";
import { OrderOption } from "../../server/src/entity/orderoption";
import { Machine } from "../../server/src/entity/machine";
import { Station } from "../../server/src/entity/station";
import { nodeName } from "jquery";
import { plot, Plot, stack } from "nodeplotlib"

import { listenerCount } from "process";

const fetch = require ( 'node-fetch' );
let os = require('os');

interface Test
{
    name    : string;   
    status  : string;
}
interface DisplayLogBuffer
{
    m: string;      // Time of day HH:MM:SS
    t: string;      // Text
    u: string;      // User
}
export interface ChemistryData 
{
    machineID:number;
    orderId:number;
    option:string;
    value:string;
}

export interface FlowWaterStatistics
{    
    type                        : string;
    MeanWaterFlow1              : number;
    STDWaterFlow1               : number;
    MeanWaterFlowVerification   : number;
    STDWaterFlowVerification    : number;
}

export interface FlowChemistryStatistics
{
    type                : string;
    MeanRegular         : number;
    MeanConcentrated    : number;
    STDRegular          : number;
    STDConcentrated     : number;
    MeanRegularRaw      : number;
    MeanConcentratedRaw : number;
    STDRegularRaw       : number;
    STDConcentratedRaw  : number;
}
export interface StdPDF 
{
    z_score :number;
    originalData:number;
}

export interface StandStatus
{
    StandNo               : number;
    StandName             : string;
    WebLink               : string;
    State                 : string;    // "Idle" (no orderno), "Ready" (orderno selected), "Testing"
    OrderNo               : string | undefined;
    MachineType           : string | undefined;
    MachineNo             : number | undefined;
    TestName              : string;
    TestStateName         : string;
    AskConfirmation       : string;
    AskConfirmationMedia  : string;
    ViewText              : string;
    ViewTextColor         : string;
    AskYesNo              : string;
    AskYesNoMedia         : string;
    AskText1              : string;
    AskText2              : string;
    AskTextMedia          : string;
    AskSelectionText      : string;
    AskSelectionTexts     : string []; 
    SliderText            : string;
    ErrorPanelText        : string;
    ErrorCauses           : string [];
    Test                  : Test[];
    Log                   : DisplayLogBuffer[];
    Ordering              : number;
    VisibleOnDashboard    : boolean;
    AutomaticTesting      : boolean;
};



enum ResponseTarget
{
    StandUDVIWDStatus = 1,
    StandHSStatus     = 2,
    StandStatus1      = 3, 
    StandStatus2      = 4, 
    StandStatus3      = 5, 
    StandStatus4      = 6, 
}

export interface HttpResponse {
    error?      : string,
    response?   : string,
}

export class MasterCoordinator 
{

    constructor ( stations:Station [], ServerPortNo:number )
    {
        for ( let obj of stations )
        {
            switch ( obj.stationid )
            {
                case 1 : this.m_standUDVIWD = obj.apvport;  break;
                case 2 : this.m_standHS     = obj.apvport;  break;
                case 3 : this.m_stand1Port = obj.apvport;  break;
                case 4 : this.m_stand2Port = obj.apvport;  break;
                case 5 : this.m_stand3Port = obj.apvport;  break;
                case 6 : this.m_stand4Port = obj.apvport;  break;
            }
            console.log ( obj );
            let standStatusTemplate:StandStatus = {
                StandNo               : -1,
                StandName             : '',
                WebLink               : '', 
                State                 : '',
                OrderNo               : '',
                MachineType           : '',
                MachineNo             : -1,
                TestName              : '',
                TestStateName         : '',
                AskConfirmation       : '',
                AskConfirmationMedia  : '',
                ViewText              : '',
                ViewTextColor         : '',
                AskYesNo              : '',
                AskYesNoMedia         : '',
                AskText1              : '',
                AskText2              : '',
                AskTextMedia          : '',
                AskSelectionText      : '',
                AskSelectionTexts     : [],
                SliderText            : '',
                ErrorPanelText        : '',
                ErrorCauses           : [],
                Test                  : [],
                Log                   : [],
                Ordering              : -1,
                VisibleOnDashboard    : false,
                AutomaticTesting      : false,

             };
            this.m_AllStandStatus.push ( standStatusTemplate );
        }
        this.m_ServerPortNo = ServerPortNo;
        this.getIPFromOS(); // Get IP addresse of server and store it in class member

        console.log ( 'Port',this.getPort( 1 ) )
        console.log ( 'Port',this.getPort( 2 ) )
        console.log ( 'Port',this.getPort( 3 ) )
        console.log ( 'Port',this.getPort( 4 ) )
        console.log ( 'Port',this.getPort( 5 ) )
        console.log ( 'Port',this.getPort( 6 ) )        
    }

    private getIPFromOS()
    {
        let interfaceName:string;
        if ( os.platform() === 'linux' )
            interfaceName = 'eno1';
        else
            interfaceName = 'Ethernet 3';

        let IPaddress : string [] = [];
        let interfaces:any [] = os.networkInterfaces();
        
        //console.log ( 'Interfaces:', interfaces );
        //console.log ( 'keys',Object.keys( interfaces) );
    
        for (let [key, value] of Object.entries( interfaces ) )
        {
            //console.log ( 'key', key,'value',value );
            if ( key == interfaceName )
            {
                for ( let obj of value )
                {
                    if ( obj.internal == false && obj.family == 'IPv4' )
                    {
                        IPaddress.push ( obj.address );
                    }
                }
            }
        }
        
        console.log ( 'IP', IPaddress );

        if ( IPaddress.length <= 1 )
            this.m_IP = IPaddress[0];
        else
            console.error( 'Could not dertime IP addres of system!!' );
    }

    public getIP ()
    {
        return this.m_IP;
    }

    public getPort ( stand:number ) : number
    {
        switch ( stand )
        {
            case 1 : return this.m_standUDVIWD;
            case 2 : return this.m_standHS;
            case 3 : return this.m_stand1Port;
            case 4 : return this.m_stand2Port;
            case 5 : return this.m_stand3Port;
            case 6 : return this.m_stand4Port;
            
            default : return -1
        }
    }
    public getAllPorts ( ) : number []
    {
        return [    this.m_standUDVIWD, 
                    this.m_standHS, 
                    this.m_stand1Port, 
                    this.m_stand2Port, 
                    this.m_stand3Port, 
                    this.m_stand4Port ];
    }
      
    public SendStandStatusRequestToServers ( stand:number )
    {
        //console.log ( 'request to stand:',stand );
        this.SendGetStandStatusRequest ( stand );
    }
    
    
    public getStandStatus ( stand:number ) 
    {
        let standStatus: any ; 
        //console.log ( 'Get Stand:',stand,'status' );
        const resp: HttpResponse = this.GetAndClearStandStatusResponse(stand);
        if ( resp.response )
        {
            standStatus = JSON.parse ( resp.response )
            //console.log ( `Stand ${stand} status`)
            //console.log ( standStatus);
            return standStatus;
        }
        else if ( resp.error )
        {
            console.error ( 'IWD resp failed' );
        }
        //return standStatus;
    }

    private HttpCommand ( method:string, url:string, retries:number, target:ResponseTarget, body:string = '' )
    {
            const stand:number = this.GetStandFromUrlString ( url );
            //console.log ( 'httpCmd', stand );
            console.log ( method, url, `Retries left: ${retries}`, `Body: ${body}` );

            this.SetTarget ( target, { response : undefined, error : undefined } );

            let url1:string = '';
            if ( os.platform() === 'linux' )
                url1 = 'http://' + this.GetIP ( stand ) + url;
            else
                url1 = 'http://127.0.0.1'  + url;

            console.log ( url1 );
            let options: any = { method : method, headers : { 'Content-Type': 'application/json;charset=UTF-8' } };
            if ( body != '' )
                options.body = body;

            fetch ( url1, options ).then ( (response: { status     : string | number; 
                                                       statusText : string; 
                                                       text: () => Promise<any>;
                                                       headers: { get: (arg0: string) => any; };
                                                     } 
                                           ) => 
                {
                    response.text().then ( resp => 
                        {   
                            let r: HttpResponse= { error    : undefined,
                                                   response : undefined }; 
                            if ( response.status === 200 )
                            {
                                console.log ( 'Response', response.status + ' ' + response.statusText );
                                r.response = resp;
                            }
                            else
                            {
                                //console.error ( `Stand: ${this.m_stand?.name}`, 'Error', response.status + ' ' + response.statusText );
                                r.error = response.status + ' ' + response.statusText;
                            }
                            this.SetTarget ( target, r );
                        } )
                },
                ( error: { status: any; }) => 
                    {
                        console.error ('Error', error.status, error, retries );

                        // Retry to send again (but not if we have failed or canceled)

                        if ( retries > 0 )
                        {
                            this.HttpCommand ( method, url, --retries, target, body );
                        }
                        else
                        {
                            let r : HttpResponse = { error    : JSON.stringify(error), 
                                                     response : undefined };
                            this.SetTarget ( target, r );
                       }
                    }
            )        
    }

    private GetIP ( stand:number ) : string
    {
        switch ( stand )
        {
            case 1 : return this.getIP() + ':'+ this.getPort( stand ); 
            case 2 : return this.getIP() + ':'+ this.getPort( stand ); 
            case 3 : return this.getIP() + ':'+ this.getPort( stand ); 
            case 4 : return this.getIP() + ':'+ this.getPort( stand ); 
            case 5 : return this.getIP() + ':'+ this.getPort( stand ); 
            case 6 : return this.getIP() + ':'+ this.getPort( stand ); 
            default : { console.error ('IP not found. Stand: '+ stand ); return ''};
        }    
    }

    private GetStandFromUrlString( url:string ) : number
    {
        const splittedUrl:string [] = url.split('/')
        const stand:number = parseInt ( splittedUrl[splittedUrl.length-1] )
        return stand;
    }
    
    private SetTarget ( target:ResponseTarget, r : HttpResponse )
    {
        switch ( target)
        {
            case ResponseTarget.StandUDVIWDStatus     : this.m_standUDVIWDStatusResponse  = r;        break;
            case ResponseTarget.StandHSStatus         : this.m_standHSStatusResponse      = r;        break;
            case ResponseTarget.StandStatus1          : this.m_stand1StatusResponse       = r;        break;
            case ResponseTarget.StandStatus2          : this.m_stand2StatusResponse       = r;        break;
            case ResponseTarget.StandStatus3          : this.m_stand3StatusResponse       = r;        break;
            case ResponseTarget.StandStatus4          : this.m_stand4StatusResponse       = r;        break;
        }
    }

    protected SendGetStandStatusRequest ( stand:number )
    {
        let target:ResponseTarget = -1;
        switch ( stand )
        {
            case 1 : target = ResponseTarget.StandUDVIWDStatus; break;
            case 2 : target = ResponseTarget.StandHSStatus;     break;
            case 3 : target = ResponseTarget.StandStatus1;      break;
            case 4 : target = ResponseTarget.StandStatus2;      break;
            case 5 : target = ResponseTarget.StandStatus3;      break;
            case 6 : target = ResponseTarget.StandStatus4;      break;
            default : target = -1;
        }
        this.HttpCommand ( 'GET', '/api/v1/stand/' + stand , 3, target);
    }

    protected GetAndClearStandStatusResponse( stand:number ) : HttpResponse
    {
        let v: HttpResponse = {};
        switch ( stand )
        {
            case 1 : { v = this.m_standUDVIWDStatusResponse ; this.m_standUDVIWDStatusResponse = { response : undefined, error : undefined }; } ; break;
            case 2 : { v = this.m_standHSStatusResponse     ; this.m_standHSStatusResponse = { response : undefined, error : undefined }; } ; break;
            case 3 : { v = this.m_stand1StatusResponse      ; this.m_stand1StatusResponse = { response : undefined, error : undefined }; } ; break;
            case 4 : { v = this.m_stand2StatusResponse      ; this.m_stand2StatusResponse = { response : undefined, error : undefined }; } ; break;
            case 5 : { v = this.m_stand3StatusResponse      ; this.m_stand3StatusResponse = { response : undefined, error : undefined }; } ; break;
            case 6 : { v = this.m_stand4StatusResponse      ; this.m_stand4StatusResponse = { response : undefined, error : undefined }; } ; break;
        }
        return v;
    }

    public getStandStatusList( ) : any []
    {
        return this.m_AllStandStatus;
    }
    
    public getStatusLst( stand:number ) : StandStatus 
    {
//        console.log( 'stand',stand );
        return this.m_AllStandStatus[stand-1];
    }
    public UpdateStandStatus ( stand:number, status:StandStatus )
    {
        this.m_AllStandStatus[stand - 1 ] = status;
    }

    public standStatusDiff( standRemote:StandStatus, standLocal:StandStatus ) : boolean 
    {
        let diff:boolean=false;
        let diffLst:boolean[]= [];
        if (standRemote.StandNo               == standLocal.StandNo)              {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.StandName             == standLocal.StandName)            {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.WebLink               == standLocal.WebLink)              {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.State                 == standLocal.State)                {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.OrderNo               == standLocal.OrderNo)              {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.MachineType           == standLocal.MachineType)          {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.MachineNo             == standLocal.MachineNo)            {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.TestName              == standLocal.TestName)             {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.TestStateName         == standLocal.TestStateName)        {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.AskConfirmation       == standLocal.AskConfirmation)      {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.AskConfirmationMedia  == standLocal.AskConfirmationMedia) {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.ViewText              == standLocal.ViewText)             {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.ViewTextColor         == standLocal.ViewTextColor)        {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.AskYesNo              == standLocal.AskYesNo)             {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.AskYesNoMedia         == standLocal.AskYesNoMedia)        {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.AskText1              == standLocal.AskText1)             {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.AskText2              == standLocal.AskText2)             {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.AskTextMedia          == standLocal.AskTextMedia)         {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.AskSelectionText      == standLocal.AskSelectionText)     {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.SliderText            == standLocal.SliderText)           {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.ErrorPanelText        == standLocal.ErrorPanelText)       {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.Ordering              == standLocal.Ordering)             {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.VisibleOnDashboard    == standLocal.VisibleOnDashboard)   {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.AutomaticTesting      == standLocal.AutomaticTesting)     {diffLst.push(false)} else { diffLst.push(true)  ; };
        // Lists
        if (standRemote.Test.length              == standLocal.Test.length)       {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.Log.length               == standLocal.Log.length)        {diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.ErrorCauses.length       == standLocal.ErrorCauses.length){diffLst.push(false)} else { diffLst.push(true); };
        if (standRemote.AskSelectionTexts.length == standLocal.AskSelectionTexts.length) {diffLst.push(false)} else { diffLst.push(true); };
        
        for ( let i:number=0; i<diffLst.length; i++ )
        {
            if ( diffLst[i] == true )
            {
                diff = true;
                break;
            }
        }
        return diff;
    }

    public CalculateFlowWaterMeanAndStandardDeviation ( WaterFlowCalibrationResults : MachineTest [] ) : FlowWaterStatistics
    {
        let WaterFlow1Calibrations:number [] = [];        
        let WaterFlowVerificationCalibrations:number [] = [];
        let AverageWaterFlow1Calibration:number = 0;        
        let STDWaterFlow1Calibration:number = 0;        
        let AverageWaterFlowVerificationCalibration:number = 0;
        let STDWaterFlowVerificationCalibration:number = 0;

        
        for (let i:number=0; i<WaterFlowCalibrationResults.length;i++)        
        {
            let res:any = JSON.parse ( WaterFlowCalibrationResults[i].result );
            if ( res.FlowWater1 && (res.FlowWater1 != 0 ) )
            {
                WaterFlow1Calibrations.push ( res.FlowWater1 )                
            }
            if ( res.FlowWaterVerification && ( res.FlowWaterVerification != 0 ) )
            {
                WaterFlowVerificationCalibrations.push ( res.FlowWaterVerification )
            }            
        }

        console.log( 'Population size WaterFlow1', WaterFlow1Calibrations.length )
        console.log( 'Population size WaterFlowVerification', WaterFlowVerificationCalibrations.length )
        
        AverageWaterFlow1Calibration =  this.GetMeanOfVector( WaterFlow1Calibrations );
        STDWaterFlow1Calibration = this.CalculateStandardDeviation( WaterFlow1Calibrations );

        console.log ( 'STD W1',STDWaterFlow1Calibration );
        
        AverageWaterFlowVerificationCalibration = this.GetMeanOfVector( WaterFlowVerificationCalibrations );
        STDWaterFlowVerificationCalibration = this.CalculateStandardDeviation ( WaterFlowVerificationCalibrations )
        console.log ( 'mean flow1',AverageWaterFlow1Calibration );
        console.log ( 'mean flowVeification',AverageWaterFlowVerificationCalibration );        
        this.PlotStandardNormalDistribution( AverageWaterFlow1Calibration, STDWaterFlowVerificationCalibration, WaterFlowVerificationCalibrations )                
        let flowWaterMeanAndStandDeviation : FlowWaterStatistics = 
            { type : 'FlowWater',
              MeanWaterFlow1 : AverageWaterFlow1Calibration,
              STDWaterFlow1  : STDWaterFlow1Calibration,
              MeanWaterFlowVerification : AverageWaterFlowVerificationCalibration,
              STDWaterFlowVerification  : STDWaterFlowVerificationCalibration                                     
            };

        return flowWaterMeanAndStandDeviation;          
    }

    public PlotStandardNormalDistribution ( mean:number, std:number, originalData:number[] ) 
    {
        let x_lst:number[] = [];
        let y_lst:number[] = [];
        for ( let i:number=0;i<originalData.length;i++)
        {            
            let x = originalData[i];
            let y = ( 1 / ( std*Math.sqrt( 2* Math.PI ) ) ) * Math.exp( (-Math.pow( x - mean , 2 ) ) / (2* Math.pow(std,2) ) )            
            x_lst.push( x );
            y_lst.push( y );            
        }
        
        let data: Plot []= [{x: x_lst, y: y_lst, type: 'bar'  } ]; // Looks good
        //stack(data);
        data.push({x: x_lst, y: y_lst,type : 'scattergl' }) ;
        //const data: Plot[] = [{x: x_lst, y: y_lst, type: 'scatter', line : { dash : 'dot' }  } ];
        
    }
  
    public CalculateChemistryMeanAndStandardDeviation ( ChemistryCalibrationResults : MachineTest [], ChemistryDataContainer:ChemistryData[] ) : FlowChemistryStatistics
    {
        let FlowChemistryTypeRegular:number []     = [];        
        let FlowChemistryTypeConcentrated:number[] = [];        
                
        let FlowChemistryTypeRegularRaw:number[]      = [];        
        let FlowChemistryTypeConcentratedRaw:number []= [];        
        
        let FlowChemistryList_mean:number[] = [0,0]; // [ regular, concetrated]
        let FlowChemistryList_STD:number[]  = [0,0]; // [ regular, concetrated]
        let FlowChemistryRaw_mean:number[]  = [0,0]; // [ regular, concetrated]
        let FlowChemistryRaw_STD:number[]   = [0,0]; // [ regular, concetrated]

        for (let i:number=0; i<ChemistryCalibrationResults.length;i++)        
        {
            let res:any = JSON.parse ( ChemistryCalibrationResults[i].result );
            let testname:string =  ChemistryCalibrationResults[i].testname ;

            if ( res != null )
            {                
                for ( let j:number=0; j<ChemistryDataContainer.length; j++ )
                {
                    if ( ChemistryCalibrationResults[i].machineid == ChemistryDataContainer[j].machineID )
                    {                                                
                        if ( testname == TestNames.ChemistryCalibration1 && ChemistryDataContainer[j].option == 'Dosing pump 1' )
                        {
                            console.log ( testname,ChemistryDataContainer[j].option, ChemistryDataContainer[j].machineID, ChemistryDataContainer[j].value, res.FlowChemical  );                        
                            if ( parseInt(ChemistryDataContainer[j].value) != NaN )
                            {
                                if ( parseInt(ChemistryDataContainer[j].value) != 2 )// IFS regular soap value for dosing pump 1
                                {
                                    if ( res.FlowChemical != null )
                                    {                    
                                        //console.log ( testname,ChemistryDataContainer[j].option,ChemistryDataContainer[j].machineID,ChemistryDataContainer[j].value,'Flow',res.FlowChemical  );                        
                                        FlowChemistryTypeRegular.push ( res.FlowChemical )
                                    }
                                    
                                    if ( res.FlowChemical_pulses_pr_min != null )
                                    {   
                                        //console.log ( testname,ChemistryDataContainer[j].option,ChemistryDataContainer[j].machineID,ChemistryDataContainer[j].value,'Raw',res.FlowChemical_pulses_pr_min  );                        
                                        FlowChemistryTypeRegularRaw.push ( res.FlowChemical_pulses_pr_min)
                                    }
                                }
                                else if ( parseInt(ChemistryDataContainer[j].value) == 2 )// IFS concentrate value for dosing pump 1
                                {
                                    if ( res.FlowChemical != null )
                                    {                    
                                        FlowChemistryTypeConcentrated.push ( res.FlowChemical )
                                        //console.log ( testname,ChemistryDataContainer[j].option,ChemistryDataContainer[j].machineID,ChemistryDataContainer[j].value,'Conc raw',res.FlowChemical  );                        
                                    }
                                    
                                    if ( res.FlowChemical_pulses_pr_min != null )
                                    {   
                                        FlowChemistryTypeConcentratedRaw.push ( res.FlowChemical_pulses_pr_min)
                                    }   
                                }                                                                                                   
                            }
                        }
                        if( testname == TestNames.ChemistryCalibration2 && ChemistryDataContainer[j].option == 'Dosing pump 2' )
                        {
                            console.log ( testname,ChemistryDataContainer[j].option, ChemistryDataContainer[j].machineID, ChemistryDataContainer[j].value, res.FlowChemical  );                        
                            if ( parseInt(ChemistryDataContainer[j].value) != NaN )
                            {
                                if ( parseInt(ChemistryDataContainer[j].value) != 3 )// IFS regular soap value for dosing pump 3
                                {                                        
                                    if ( res.FlowChemical != null )
                                    {                    
                                        FlowChemistryTypeRegular.push ( res.FlowChemical )
                                    }
                                    
                                    if ( res.FlowChemical_pulses_pr_min != null )
                                    {   
                                        FlowChemistryTypeRegularRaw.push ( res.FlowChemical_pulses_pr_min)
                                    }
                                }
                                else if ( parseInt(ChemistryDataContainer[j].value) == 3 )// IFS concentrate value for dosing pump 2
                                {
                                    if ( res.FlowChemical != null )
                                    {                    
                                        FlowChemistryTypeConcentrated.push ( res.FlowChemical )
                                    }
                                    
                                    if ( res.FlowChemical_pulses_pr_min != null )
                                    {   
                                        FlowChemistryTypeConcentratedRaw.push ( res.FlowChemical_pulses_pr_min)
                                    }
                                }
                            }
                        }
                        
                        if ( testname == TestNames.ChemistryCalibration3 && ChemistryDataContainer[j].option == 'Dosing pump 3' )
                        {
                            console.log ( testname,ChemistryDataContainer[j].option, ChemistryDataContainer[j].machineID, ChemistryDataContainer[j].value, res.FlowChemical  );                        
                            if ( parseInt(ChemistryDataContainer[j].value) != NaN )
                            {
                                
                                if ( res.FlowChemical != null )
                                {                    
                                    FlowChemistryTypeRegular.push ( res.FlowChemical )
                                }
                                
                                if ( res.FlowChemical_pulses_pr_min != null )
                                {   
                                    FlowChemistryTypeRegularRaw.push ( res.FlowChemical_pulses_pr_min)
                                }                                    
                            }
                        }
                        if ( testname == TestNames.ChemistryCalibration4 && ChemistryDataContainer[j].option == 'Dosing pump 4' )
                        {
                            console.log ( testname,ChemistryDataContainer[j].option, ChemistryDataContainer[j].machineID, ChemistryDataContainer[j].value, res.FlowChemical  );                        
                            if ( parseInt(ChemistryDataContainer[j].value) != NaN )
                            {
                                if ( res.FlowChemical != null )
                                {                    
                                    FlowChemistryTypeRegular.push ( res.FlowChemical )
                                }
                                
                                if ( res.FlowChemical_pulses_pr_min != null )
                                {   
                                    FlowChemistryTypeRegularRaw.push ( res.FlowChemical_pulses_pr_min)
                                }
                            }
                        }                                                                        
                    }   
                }
            }        
        }
        
        console.log ( 'Population size FlowChemistryRegular', FlowChemistryTypeRegular.length );
        console.log ( 'Population size FlowChemistryRegularRaw', FlowChemistryTypeRegularRaw.length );
        console.log ( 'Population size FlowChemistryConcentrated', FlowChemistryTypeConcentrated.length );
        console.log ( 'Population size FlowChemistryConcentratedRaw', FlowChemistryTypeConcentratedRaw.length );
        
        FlowChemistryList_mean[0] = this.GetMeanOfVector( FlowChemistryTypeRegular );
        FlowChemistryList_mean[1] = this.GetMeanOfVector( FlowChemistryTypeConcentrated );
        FlowChemistryList_STD[0] = this.CalculateStandardDeviation( FlowChemistryTypeRegular );
        FlowChemistryList_STD[1] = this.CalculateStandardDeviation( FlowChemistryTypeConcentrated );
        FlowChemistryRaw_mean[0] = this.GetMeanOfVector ( FlowChemistryTypeRegularRaw );
        FlowChemistryRaw_mean[1] = this.GetMeanOfVector ( FlowChemistryTypeConcentratedRaw );
        FlowChemistryRaw_STD[0] = this.CalculateStandardDeviation ( FlowChemistryTypeRegularRaw ); 
        FlowChemistryRaw_STD[1] = this.CalculateStandardDeviation ( FlowChemistryTypeConcentratedRaw ); 
        console.log ( `Flow regu${0} mean: ${FlowChemistryList_mean[0]} STD regu: ${FlowChemistryList_STD[0]}`);
        console.log ( `Flow Conc${0} mean: ${FlowChemistryList_mean[1]} STD Conc: ${FlowChemistryList_STD[1]}`);
        console.log ( `FlowRaw regu${0} mean: ${FlowChemistryRaw_mean[0]} STD regu: ${FlowChemistryRaw_STD[0]}`);
        console.log ( `FlowRaw Conc${1} mean: ${FlowChemistryRaw_mean[1]} STD Conc: ${FlowChemistryRaw_STD[1]}`);
        let flowChemistryMeanAndStandDeviation : FlowChemistryStatistics = 
        {
            type : 'FlowChemistry',
            MeanRegular         : FlowChemistryList_mean[0],
            MeanConcentrated    : FlowChemistryList_mean[1],
            STDRegular          : FlowChemistryList_STD[0],
            STDConcentrated     : FlowChemistryList_STD[1],
            MeanRegularRaw      : FlowChemistryRaw_mean[0],
            MeanConcentratedRaw : FlowChemistryRaw_mean[1],
            STDRegularRaw       : FlowChemistryRaw_STD[0],
            STDConcentratedRaw  : FlowChemistryRaw_STD[1]
        }
        return flowChemistryMeanAndStandDeviation
    }
        
    public GetChemistryData( orderOption : OrderOption[], machine : Machine[] )
    {
        let ChemistryValueAndID:ChemistryData[] = [];
        /**
         * Shave OrderOptions list into only Dosing pump data
         */
        for ( let i:number=0; i<orderOption.length; i++ )
        {
            let objOption:string = orderOption[i].option;
            if ( objOption == 'Dosing pump' || objOption == 'Dosing pump 1' || objOption == 'Dosing pump 2' 
                || objOption == 'Dosing pump 3' || objOption == 'Dosing pump 4' ) 
            {                
                ChemistryValueAndID.push ( 
                    { machineID : -1,
                      orderId : orderOption[i].orderid,
                      option  : orderOption[i].option,
                      value   : orderOption[i].value,  
                    } );
            }
        }
        /**
         * Add machineID to dosing pump data
         */
        for ( let i:number=0; i<machine.length; i++ )
        {
            for ( let j:number=0; j<ChemistryValueAndID.length; j++ )
            {
                if ( machine[i].orderid == ChemistryValueAndID[j].orderId )
                {
                    ChemistryValueAndID[j].machineID = machine[i].machineid;
                }
            }
        }        
        console.log ( ChemistryValueAndID);
        return ChemistryValueAndID;
    }

    public CaluculatePT100MeanAndStandardDeviation ( PT100CalibrationResults : MachineTest[] )
    {
        // Sensor [gain][offset]        
        for (let i:number=0; i<PT100CalibrationResults.length;i++)        
        {
            let res:any = JSON.parse ( PT100CalibrationResults[i].result );
            if ( res != null )
            {                
                
            }
        }
    }

    private GetMeanOfVector ( vector:number[] )
    {
        let sum:number= 0;
        for( var i = 0; i < vector.length; i++ ){
            sum +=  vector[i] ; //don't forget to add the base
        }

        return sum/vector.length;
    }

    private CalculateStandardDeviation( dataPoints:number[] )
    {
        let mean = this.GetMeanOfVector( dataPoints );
        let distanceFromPoints:number [] = []
        let sum:number = 0;
        for ( let i:number=0; i<dataPoints.length; i++)
        {
            distanceFromPoints.push ( Math.pow( (dataPoints[i] - mean) ,2) );            
        }
        for ( let i:number=0; i<distanceFromPoints.length; i++)
        {
            sum += distanceFromPoints[i];
        }
        return Math.sqrt ( sum / dataPoints.length );
    }
    
    private m_standUDVIWDStatusResponse : HttpResponse = { response : undefined, error : undefined};
    private m_standHSStatusResponse     : HttpResponse = { response : undefined, error : undefined};
    private m_stand1StatusResponse      : HttpResponse = { response : undefined, error : undefined};
    private m_stand2StatusResponse      : HttpResponse = { response : undefined, error : undefined};
    private m_stand3StatusResponse      : HttpResponse = { response : undefined, error : undefined};
    private m_stand4StatusResponse      : HttpResponse = { response : undefined, error : undefined};

    private m_IP:string;
    private m_standUDVIWD:number;
    private m_standHS:number;
    private m_stand1Port:number;
    private m_stand2Port:number;
    private m_stand3Port:number;
    private m_stand4Port:number;

    private m_AllStandStatus:StandStatus [] = [];

    private m_ServerPortNo:number;
}


