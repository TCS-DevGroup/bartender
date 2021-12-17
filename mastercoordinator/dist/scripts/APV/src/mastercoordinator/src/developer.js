"use strict";
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
    console.log('hello fellow');
});
var data1 = [30, 200, 100, 400, 150, 250];
var data2 = [50, 20, 10, 40, 15, 25];
function ConfirmBtn() {
    var myHTMLInputCheckedArry = [];
    myHTMLInputCheckedArry.push(document.getElementById("StationUDVIWD"));
    myHTMLInputCheckedArry.push(document.getElementById("StationHighSpeed"));
    myHTMLInputCheckedArry.push(document.getElementById("Station1"));
    myHTMLInputCheckedArry.push(document.getElementById("Station2"));
    myHTMLInputCheckedArry.push(document.getElementById("Station3"));
    myHTMLInputCheckedArry.push(document.getElementById("Station4"));
    var user = 'TGJ';
    var stationsChecked = [];
    for (var i = 0; i < myHTMLInputCheckedArry.length; i++) {
        stationsChecked.push(myHTMLInputCheckedArry[i].checked);
        console.log("Station " + (i + 1) + " : " + myHTMLInputCheckedArry[i].checked);
    }
    ConfirmStationForNewSoftwareUpdates(user, stationsChecked);
    SetCheckedHTMLInputElementArray(myHTMLInputCheckedArry, false);
}
function ConfirmStationForNewSoftwareUpdates(user, stationsChecked) {
    var req = { "user": user,
        "stationsChecked": stationsChecked };
    restcall('/api/v1/updatesoftware', req);
}
function restcall(url, arg) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(arg));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
}
function CalculateCalibrationsLimitsBtn() {
    var myHTMLInputCheckedArry = [];
    myHTMLInputCheckedArry.push(document.getElementById("PT100 Gain"));
    myHTMLInputCheckedArry.push(document.getElementById("PT100 Offset"));
    myHTMLInputCheckedArry.push(document.getElementById("Flow Water Gain"));
    myHTMLInputCheckedArry.push(document.getElementById("Chemistry Flow Gain"));
    myHTMLInputCheckedArry.push(document.getElementById("Chemistry pump Gain"));
    myHTMLInputCheckedArry.push(document.getElementById("Conductivity Calibration"));
    myHTMLInputCheckedArry.push(document.getElementById("Conductivity Compensation"));
    var user = 'TGJ'; // TODO - make configurable
    var sensorsChecked = [];
    for (var i = 0; i < myHTMLInputCheckedArry.length; i++) {
        sensorsChecked.push(myHTMLInputCheckedArry[i].checked);
        console.log("Sensor " + (i + 1) + " : " + myHTMLInputCheckedArry[i].checked);
    }
    ConfirmCalculateCalibrationsLimitsBtn(user, sensorsChecked);
    SetCheckedHTMLInputElementArray(myHTMLInputCheckedArry, false);
}
function ConfirmCalculateCalibrationsLimitsBtn(user, sensorsChecked) {
    var req = { "user": user,
        "sensorsChecked": sensorsChecked };
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'api/v1/calculatecalibrationslimits', true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(req));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
                var sensorJSON = json_1[_i];
                console.log(sensorJSON);
                switch (sensorJSON.type) {
                    case 'FlowWater':
                        DecodeFlowWaterCalibration(sensorJSON);
                        ;
                        break;
                    case 'FlowChemistry':
                        DecodeFlowChemistryCalibration(sensorJSON);
                        break;
                }
            }
        }
    };
    //restcall ( 'api/v1/calculatecalibrationslimits', req )
}
function DecodeFlowWaterCalibration(json) {
    var s = '<table>';
    s += '<tr>' + '<th>MeanWaterFlow1</th><th>' + json.MeanWaterFlow1 + '</th>';
    s += '<tr>' + '<th>STDWaterFlow1</th><th>' + json.STDWaterFlow1 + '</th>';
    s += '<tr>' + '<th>MeanWaterFlowVerification</th><th>' + json.MeanWaterFlowVerification + '</th>';
    s += '<tr>' + '<th>STDWaterFlowVerification</th><th>' + json.STDWaterFlowVerification + '</th>';
    s += '</table>';
    SetInnerHtml("FlowWaterStatistics", s);
}
function DecodeFlowChemistryCalibration(json) {
    var s = '<table>';
    s += '<tr>' + '<th>MeanRegular</th><th>' + json.MeanRegular + '</th>';
    s += '<tr>' + '<th>MeanConcentrated</th><th>' + json.MeanConcentrated + '</th>';
    s += '<tr>' + '<th>STDRegular</th><th>' + json.STDRegular + '</th>';
    s += '<tr>' + '<th>STDConcentrated</th><th>' + json.STDConcentrated + '</th>';
    s += '<tr>' + '<th>MeanRegularRaw</th><th>' + json.MeanRegularRaw + '</th>';
    s += '<tr>' + '<th>MeanConcentratedRaw</th><th>' + json.MeanConcentratedRaw + '</th>';
    s += '<tr>' + '<th>STDRegularRaw</th><th>' + json.STDRegularRaw + '</th>';
    s += '<tr>' + '<th>STDConcentratedRaw</th><th>' + json.STDConcentratedRaw + '</th>';
    s += '</table>';
    SetInnerHtml("FlowChemistryStatistics", s);
}
function SetCheckedHTMLInputElementArray(myArray, value) {
    for (var i = 0; i < myArray.length; i++) {
        myArray[i].checked = value;
    }
}
