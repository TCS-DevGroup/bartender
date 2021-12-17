"use strict";
var standUDVIWDPort;
var standHSPort;
var stand1Port;
var stand2Port;
var stand3Port;
var stand4Port;
var ip;
$(document).ready(function () {
    //dashboard_socket = io();
    //dashboard_socket.on('update', (data:any) => {
    //});
    //let offset = 0; // Correction for the UDV IWD and High Speed station
    GetStandIP();
    GetStandPorts();
    console.log('hello fellow');
});
function StationUDVIWD() {
    location.href = 'http://' + ip + ':' + standUDVIWDPort;
}
function StationHS() {
    location.href = 'http://' + ip + ':' + standHSPort;
}
function Station1() {
    location.href = 'http://' + ip + ':' + stand1Port;
}
function Station2() {
    location.href = 'http://' + ip + ':' + stand2Port;
}
function Station3() {
    location.href = 'http://' + ip + ':' + stand3Port;
}
function Station4() {
    location.href = 'http://' + ip + ':' + stand4Port;
}
function GetStandIP() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/api/v1/ip', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            console.log('ip', json);
            ip = json;
        }
        else if (this.readyState == 4 && this.status != 200) {
            console.error("/api/v1/ip: " + xhttp.responseText);
        }
    };
}
function GetStandPorts() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/api/v1/port', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            console.log('ports', json);
            standUDVIWDPort = json[0];
            standHSPort = json[1];
            stand1Port = json[2];
            stand2Port = json[3];
            stand3Port = json[4];
            stand4Port = json[5];
        }
        else if (this.readyState == 4 && this.status != 200) {
            console.error("/api/v1/port: " + xhttp.responseText);
        }
    };
}
