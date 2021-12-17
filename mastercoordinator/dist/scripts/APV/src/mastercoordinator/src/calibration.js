"use strict";
/**
 * $Rev: 13421 $
 * $LastChangedDate: 2020-11-06 10:58:55 +0100 (Fri, 06 Nov 2020) $
 * $Author: tgj $
 *
 *
 */
$(document).ready(function () {
    setTimeout(GetTrescalCalibratedEquipment, 1000);
    setTimeout(GetCalibrationLog, 1000);
    setTimeout(GetVerificationTable, 1000);
});
function GetTrescalCalibratedEquipment() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/api/v1/calibrationEquipment/pull', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            //console.log( json )
            var s = '<table>';
            s += '<tr>' + '<th>Verificationequipment Id</th>' + '<th>Equipment Name</th>' + '<th>Equipment Model</th>' +
                '<th>Trescal Nr.</th>' + '<th>Measurement Category</th>' + '<th>Expiration Date</th>' + '<th>Calibration Date</th>';
            for (var i = 0; i < json.length; i++) {
                if (json[i].lastcalibrationdate != null) {
                    json[i].lastcalibrationdate = new Date(json[i].lastcalibrationdate).toString();
                    var stringDateLastjson = json[i].lastcalibrationdate.split(' ');
                    var newDate = stringDateLastjson[0] + " " + stringDateLastjson[1] + " " + stringDateLastjson[2] + " " + stringDateLastjson[3] + " " + stringDateLastjson[4];
                    json[i].lastcalibrationdate = newDate;
                }
                if (json[i].expirationdate != null) {
                    json[i].expirationdate = new Date(json[i].expirationdate).toString();
                    var stringDateExpjson = json[i].expirationdate.split(' ');
                    var newDate = stringDateExpjson[0] + " " + stringDateExpjson[1] + " " + stringDateExpjson[2] + " " + stringDateExpjson[3] + " " + stringDateExpjson[4];
                    json[i].expirationdate = newDate;
                }
            }
            for (var _i = 0, _a = Object.entries(json); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                //console.log(`${key} : ${value}`)
                var nest = value;
                s += '<tr>';
                for (var _c = 0, _d = Object.entries(nest); _c < _d.length; _c++) {
                    var _e = _d[_c], key2 = _e[0], value2 = _e[1];
                    //console.log(`${key2} : ${value2}`)
                    if (value2 != null) {
                        s += '<th>' + value2 + '</th>';
                    }
                    else {
                        s += '<th>' + ' ' + '</th>';
                    }
                }
            }
            s += '</table>';
            SetInnerHtml('testtable', s);
        }
        else if (this.readyState == 4 && this.status != 200) {
            console.error("/api/v1/calibrationEquipment/pull: " + xhttp.responseText);
        }
    };
    setTimeout(GetTrescalCalibratedEquipment, 5000);
}
function GetCalibrationLog() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/api/v1/calibrationlog/pull', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            //console.log( json )
            var s = '<table>';
            s += '<tr>' + '<th>Log ID</th>' + '<th>Station </th>' + '<th>User</th>' +
                '<th>Last Calibrated</th>' + '<th>Expiration Date</th>' + '<th>Equipment Category</th>';
            for (var i = 0; i < json.length; i++) {
                if (json[i].olddate != null) {
                    json[i].olddate = new Date(json[i].olddate).toString();
                    var stringDateLastjson = json[i].olddate.split(' ');
                    var newDate = stringDateLastjson[0] + " " + stringDateLastjson[1] + " " + stringDateLastjson[2] + " " + stringDateLastjson[3] + " " + stringDateLastjson[4];
                    json[i].olddate = newDate;
                }
                if (json[i].newdate != null) {
                    json[i].newdate = new Date(json[i].newdate).toString();
                    var stringDateExpjson = json[i].newdate.split(' ');
                    var newDate = stringDateExpjson[0] + " " + stringDateExpjson[1] + " " + stringDateExpjson[2] + " " + stringDateExpjson[3] + " " + stringDateExpjson[4];
                    json[i].newdate = newDate;
                }
            }
            for (var _i = 0, _a = Object.entries(json); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                //console.log(`${key} : ${value}`)
                var nest = value;
                s += '<tr>';
                for (var _c = 0, _d = Object.entries(nest); _c < _d.length; _c++) {
                    var _e = _d[_c], key2 = _e[0], value2 = _e[1];
                    //console.log(`${key2} : ${value2}`)
                    if (key2 != "verificationdate") {
                        if (key2 != 'logtype') {
                            if (value2 != null) {
                                s += '<th>' + value2 + '</th>';
                            }
                            else {
                                s += '<th>' + ' ' + '</th>';
                            }
                        }
                    }
                }
            }
            s += '</table>';
            SetInnerHtml('stationtable', s);
        }
        else if (this.readyState == 4 && this.status != 200) {
            console.error("/api/v1/calibrationlog/pull: " + xhttp.responseText);
        }
    };
    setTimeout(GetCalibrationLog, 5000);
}
function GetVerificationTable() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/api/v1/verificationlog/pull', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            //console.log( json )
            var s = '<table>';
            s += '<tr>' + '<th>Log ID</th>' + '<th>Station </th>' + '<th>User</th>' + '<th>Verification Date</th>';
            var sortedArray = json;
            sortedArray = json.sort(function (n1, n2) {
                if (n1.verificationdate > n2.verificationdate) {
                    return -1;
                }
                if (n1.verificationdate < n2.verificationdate) {
                    return 1;
                }
                return 0;
            });
            for (var _i = 0, sortedArray_1 = sortedArray; _i < sortedArray_1.length; _i++) {
                var obj = sortedArray_1[_i];
                console.log(obj);
                obj.verificationdate = new Date(obj.verificationdate).toString();
                var stringDateLastjson = obj.verificationdate.split(' ');
                var newDate = stringDateLastjson[0] + " " + stringDateLastjson[1] + " " + stringDateLastjson[2] + " " + stringDateLastjson[3] + " " + stringDateLastjson[4];
                obj.verificationdate = newDate;
                console.log(obj);
                s += '<tr><th>' + obj.logid + '</th><th>' + obj.stationid + '<th>' +
                    obj.user + '</th><th>' + obj.verificationdate + '</th>';
            }
            s += '</table>';
            SetInnerHtml('VerificationTable', s);
        }
        else if (this.readyState == 4 && this.status != 200) {
            console.error("/api/v1/cyclicverificationlog/pull: " + xhttp.responseText);
        }
    };
    setTimeout(GetVerificationTable, 5000);
}
function StoreNewDate() {
    if (GetElementVisible('loadpanel')) {
        var calibratedToday = document.getElementById("calibratedToday");
        var calibrationdate = "";
        var verificationequipmentid = "";
        if (calibratedToday.checked) {
            console.log('checked');
            calibrationdate = getTodaysDate();
        }
        else {
            console.log('NOTchecked');
        }
        var newdate = $("#newdate").val();
        var selection = $("#selectequipment").val();
        verificationequipmentid = selection.split(":");
        var req = {
            "verificationequipmentid": verificationequipmentid[0],
            "equipmentname": verificationequipmentid[1],
            "expirationdate": newdate,
            "calibrationdate": calibrationdate,
        };
        console.log(newdate, calibrationdate);
        var url = '/api/v1/calibrationEquipment/push';
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', url, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(req));
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                console.log('StoreNewDate', this.status, this.statusText);
                if (this.status == 200) {
                    var e_1 = $("#ChangeExpirationModal");
                    e_1.modal("hide");
                }
                else {
                    SetLoadOrderMessage(this.statusText);
                }
            }
        };
        var e = $("#ChangeExpirationModal");
        e.modal("hide");
    }
}
function changeExpirationDateShow() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/api/v1/calibrationEquipment/pull', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            //console.log( 'Changing experation date')
            //console.log ( json.length)
            var s = '';
            for (var i = 0; i < json.length; i++) {
                s += '<option value="' + json[i].verificationequipmentid + ': ' + json[i].equipmentname +
                    '">' + json[i].verificationequipmentid + ': ' + json[i].equipmentname + '</option>';
                SetInnerHtml('selectequipment', s);
                //console.log( json[i].verificationequipmentid )
                //console.log( json[i].equipmentname )
            }
            SetElementVisible('loadpanel', true);
            var e = $("#ChangeExpirationModal");
            e.modal("show");
        }
    };
}
function getTodaysDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = String(today.getFullYear());
    var seconds = String(today.getSeconds());
    var minutes = String(today.getMinutes());
    var hour = String(today.getHours());
    var td = yyyy + '-' + mm + '-' + dd + ' ' + hour + ':' + minutes + ':' + seconds;
    return td;
}
function SetElementVisible(element, on) {
    var el = document.getElementById(element);
    if (el) {
        var d = void 0;
        if (on)
            d = 'block';
        else
            d = 'none';
        if (el.style.display != d)
            el.style.display = d;
    }
}
function GetElementVisible(element) {
    var el = document.getElementById(element);
    if (el) {
        if (el.style.display == 'block') {
            return true;
        }
    }
    return false;
}
function SetLoadOrderMessage(s) {
    SetInnerHtml('loadOrderMessage', s);
}
function SetInnerHtml(element, html) {
    var el = document.getElementById(element);
    if (el) {
        el.innerHTML = html;
    }
}
function GetInnerHtml(element) {
    var el = document.getElementById(element);
    if (el) {
        return el.innerHTML;
    }
    else
        return '';
}
