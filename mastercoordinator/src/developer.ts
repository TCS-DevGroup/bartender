
/**
 * $Rev:  $
 * $LastChangedDate: $
 * $Author:  $
 * 
 * 
 */
// import { plot, Plot} from 'nodeplotlib'

 $(document).ready(function () {

    
    //dashboard_socket = io();
    //dashboard_socket.on('update', (data:any) => {
    //});


    console.log ( 'hello fellow');

});

const data1 = [30, 200, 100, 400, 150, 250];
const data2 = [50, 20, 10, 40, 15, 25];


function ConfirmBtn()
{
    let myHTMLInputCheckedArry : HTMLInputElement [] = [];
    myHTMLInputCheckedArry.push (  document.getElementById("StationUDVIWD") as HTMLInputElement);
    myHTMLInputCheckedArry.push (  document.getElementById("StationHighSpeed") as HTMLInputElement);
    myHTMLInputCheckedArry.push (  document.getElementById("Station1") as HTMLInputElement);
    myHTMLInputCheckedArry.push (  document.getElementById("Station2") as HTMLInputElement);
    myHTMLInputCheckedArry.push (  document.getElementById("Station3") as HTMLInputElement);
    myHTMLInputCheckedArry.push (  document.getElementById("Station4") as HTMLInputElement);
    const user = 'TGJ';

    let stationsChecked:boolean [] = [];
    for (let i:number=0; i<myHTMLInputCheckedArry.length;i++)
    {
        stationsChecked.push(myHTMLInputCheckedArry[i].checked );    
        console.log ( `Station ${i+1} : ${myHTMLInputCheckedArry[i].checked}`);
    }

    ConfirmStationForNewSoftwareUpdates ( user, stationsChecked );
    SetCheckedHTMLInputElementArray( myHTMLInputCheckedArry, false);    
}

function ConfirmStationForNewSoftwareUpdates ( user:string, stationsChecked:boolean [] )
{
    const req : any = { "user"      : user,
                        "stationsChecked"  : stationsChecked };

    restcall ( '/api/v1/updatesoftware', req )
}

function restcall ( url:string, arg: any )
{
    const xhttp:XMLHttpRequest = new XMLHttpRequest();
    xhttp.open ( 'POST', url, true );
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send ( JSON.stringify ( arg ) );
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    }
}

function CalculateCalibrationsLimitsBtn()
{
    let myHTMLInputCheckedArry : HTMLInputElement [] = [];
    myHTMLInputCheckedArry.push ( document.getElementById("PT100 Gain") as HTMLInputElement );
    myHTMLInputCheckedArry.push ( document.getElementById("PT100 Offset") as HTMLInputElement );
    myHTMLInputCheckedArry.push ( document.getElementById("Flow Water Gain") as HTMLInputElement );
    myHTMLInputCheckedArry.push ( document.getElementById("Chemistry Flow Gain") as HTMLInputElement );
    myHTMLInputCheckedArry.push ( document.getElementById("Chemistry pump Gain") as HTMLInputElement );
    myHTMLInputCheckedArry.push ( document.getElementById("Conductivity Calibration") as HTMLInputElement );
    myHTMLInputCheckedArry.push ( document.getElementById("Conductivity Compensation") as HTMLInputElement );
    
    const user = 'TGJ'; // TODO - make configurable

    let sensorsChecked:boolean [] = [];
    for (let i:number=0; i<myHTMLInputCheckedArry.length;i++)
    {
        sensorsChecked.push(myHTMLInputCheckedArry[i].checked );    
        console.log ( `Sensor ${i+1} : ${myHTMLInputCheckedArry[i].checked}`);
    }
    
    ConfirmCalculateCalibrationsLimitsBtn ( user, sensorsChecked );
    
    SetCheckedHTMLInputElementArray( myHTMLInputCheckedArry, false);    
}

function ConfirmCalculateCalibrationsLimitsBtn ( user:string, sensorsChecked:boolean [] )
{
    const req : any = { "user"      : user,
                        "sensorsChecked"  : sensorsChecked };

    
    
    const xhttp:XMLHttpRequest = new XMLHttpRequest();
    xhttp.open ( 'POST', 'api/v1/calculatecalibrationslimits', true );
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send ( JSON.stringify ( req ) );
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) 
        {
            const json:any = JSON.parse(xhttp.responseText);
            for ( let sensorJSON of json )
            {                
                console.log ( sensorJSON );                                 
                switch ( sensorJSON.type )
                {
                    case 'FlowWater'     : DecodeFlowWaterCalibration ( sensorJSON ); ; break;
                    case 'FlowChemistry' : DecodeFlowChemistryCalibration ( sensorJSON ); break;
                } 
                
            }
        }
    }

    //restcall ( 'api/v1/calculatecalibrationslimits', req )
}

function DecodeFlowWaterCalibration ( json:any )
{
    let s:string = '<table>';
    s += '<tr>' + '<th>MeanWaterFlow1</th><th>' + json.MeanWaterFlow1 + '</th>';
    s += '<tr>' + '<th>STDWaterFlow1</th><th>' + json.STDWaterFlow1 + '</th>';
    s += '<tr>' + '<th>MeanWaterFlowVerification</th><th>' + json.MeanWaterFlowVerification + '</th>';
    s += '<tr>' + '<th>STDWaterFlowVerification</th><th>' + json.STDWaterFlowVerification + '</th>';
    s += '</table>';
    SetInnerHtml( "FlowWaterStatistics",s)
}
function DecodeFlowChemistryCalibration ( json:any )
{

    let s:string = '<table>';
    s += '<tr>' + '<th>MeanRegular</th><th>' + json.MeanRegular + '</th>';
    s += '<tr>' + '<th>MeanConcentrated</th><th>' + json.MeanConcentrated + '</th>';
    s += '<tr>' + '<th>STDRegular</th><th>' + json.STDRegular + '</th>';
    s += '<tr>' + '<th>STDConcentrated</th><th>' + json.STDConcentrated + '</th>';
    s += '<tr>' + '<th>MeanRegularRaw</th><th>' + json.MeanRegularRaw + '</th>';
    s += '<tr>' + '<th>MeanConcentratedRaw</th><th>' + json.MeanConcentratedRaw + '</th>';
    s += '<tr>' + '<th>STDRegularRaw</th><th>' + json.STDRegularRaw + '</th>';
    s += '<tr>' + '<th>STDConcentratedRaw</th><th>' + json.STDConcentratedRaw + '</th>';
    s += '</table>';
    SetInnerHtml( "FlowChemistryStatistics",s)
}

function SetCheckedHTMLInputElementArray( myArray:HTMLInputElement[], value:boolean )
{
    for ( let i:number=0; i<myArray.length; i++ )
    {
        myArray[i].checked = value;
    }
}

