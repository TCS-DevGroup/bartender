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


function GetTrescalCalibratedEquipment()
{
    
    const xhttp:XMLHttpRequest = new XMLHttpRequest();

    xhttp.open('GET', '/api/v1/calibrationEquipment/pull', true);
    xhttp.send();
    
    xhttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200)
        {
            const json:any = JSON.parse(xhttp.responseText);
            //console.log( json )
            
            let s:string = '<table>';
            s += '<tr>' + '<th>Verificationequipment Id</th>' + '<th>Equipment Name</th>'  + '<th>Equipment Model</th>' + 
            '<th>Trescal Nr.</th>'+ '<th>Measurement Category</th>' + '<th>Expiration Date</th>' + '<th>Calibration Date</th>';
            
            for ( let i: number = 0; i< json.length; i++ )
            {
                if ( json[i].lastcalibrationdate!= null )
                {
                    
                    json[i].lastcalibrationdate = new Date( json[i].lastcalibrationdate ).toString();
                    let stringDateLastjson:string = json[i].lastcalibrationdate.split(' '); 
                    let newDate = stringDateLastjson[0] + " " + stringDateLastjson[1] + " " + stringDateLastjson[2] + " " + stringDateLastjson[3] + " " + stringDateLastjson[4];
                    json[i].lastcalibrationdate = newDate;
                }
                if ( json[i].expirationdate!= null )
                {
                    json[i].expirationdate = new Date( json[i].expirationdate ).toString();
                    let stringDateExpjson:string = json[i].expirationdate.split(' ');
                    let newDate = stringDateExpjson[0] + " " + stringDateExpjson[1] + " " + stringDateExpjson[2] + " " + stringDateExpjson[3] + " " + stringDateExpjson[4];
                    json[i].expirationdate = newDate ; 
                }
                
            }

            for (let [key, value] of Object.entries(json)) 
            {
                //console.log(`${key} : ${value}`)
                let nest :any= value
                s += '<tr>';
                
                for ( let [key2, value2] of Object.entries(nest) )
                {
                    
                    //console.log(`${key2} : ${value2}`)
                    if ( value2 != null )
                    {
                        s += '<th>' + value2 + '</th>' ;
                    }
                    else
                    {
                        s += '<th>' + ' ' + '</th>' ;
                    }
                }
                
              }
            
            s += '</table>';

            SetInnerHtml ( 'testtable', s );

        } 
        else if (this.readyState == 4 && this.status != 200) {
            console.error("/api/v1/calibrationEquipment/pull: " + xhttp.responseText);
        }
    };
    setTimeout(GetTrescalCalibratedEquipment, 5000);
}

function GetCalibrationLog()
{
    const xhttp:XMLHttpRequest = new XMLHttpRequest();
    xhttp.open('GET', '/api/v1/calibrationlog/pull', true);
    xhttp.send();
    
    xhttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200)
        {
            const json:any = JSON.parse(xhttp.responseText);
            //console.log( json )
            
            let s:string = '<table>';
            s += '<tr>' + '<th>Log ID</th>' + '<th>Station </th>'  + '<th>User</th>' + 
            '<th>Last Calibrated</th>'+ '<th>Expiration Date</th>' + '<th>Equipment Category</th>';
            
            for ( let i: number = 0; i< json.length; i++ )
            {
                if ( json[i].olddate!= null )
                {        
                    json[i].olddate = new Date( json[i].olddate ).toString();
                    let stringDateLastjson:string = json[i].olddate.split(' '); 
                    let newDate = stringDateLastjson[0] + " " + stringDateLastjson[1] + " " + stringDateLastjson[2] + " " + stringDateLastjson[3] + " " + stringDateLastjson[4];
                    json[i].olddate = newDate;
                }
                if ( json[i].newdate!= null )
                {
                    json[i].newdate = new Date( json[i].newdate ).toString();
                    let stringDateExpjson:string = json[i].newdate.split(' ');
                    let newDate = stringDateExpjson[0] + " " + stringDateExpjson[1] + " " + stringDateExpjson[2] + " " + stringDateExpjson[3] + " " + stringDateExpjson[4];
                    json[i].newdate = newDate ; 
                }
                
            }
            
            for (let [key, value] of Object.entries(json)) 
            {
                //console.log(`${key} : ${value}`)
                let nest :any= value
                s += '<tr>';            
                
                for ( let [key2, value2] of Object.entries(nest) )
                {
                    //console.log(`${key2} : ${value2}`)
                    if ( key2 != "verificationdate" )
                    {
                        if ( key2 != 'logtype')
                        {

                            if ( value2 != null )
                            {
                                s += '<th>' + value2 + '</th>' ;
                            }
                            else
                            {
                                s += '<th>' + ' ' + '</th>' ;
                            }
                        }
                    }
                }
            }
            
            s += '</table>';

            SetInnerHtml ( 'stationtable', s );

        } 
        else if (this.readyState == 4 && this.status != 200) {
            console.error("/api/v1/calibrationlog/pull: " + xhttp.responseText);
        }
    };
    setTimeout(GetCalibrationLog, 5000);
}

function GetVerificationTable()
{
    const xhttp:XMLHttpRequest = new XMLHttpRequest();
    xhttp.open('GET', '/api/v1/verificationlog/pull', true);
    xhttp.send();
    
    xhttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200)
        {
            const json:any = JSON.parse(xhttp.responseText);
            //console.log( json )
            let s:string = '<table>';
            s += '<tr>' + '<th>Log ID</th>' + '<th>Station </th>'  + '<th>User</th>' + '<th>Verification Date</th>';                        
            let sortedArray:any = json;
            sortedArray = json.sort((n1:any,n2:any) => {
            if (n1.verificationdate > n2.verificationdate) {
                return -1;
            }
        
            if (n1.verificationdate < n2.verificationdate) {
                return 1;
            }
        
            return 0;
            });

            for ( let obj of sortedArray )
            {
                console.log ( obj)
                obj.verificationdate = new Date( obj.verificationdate ).toString();
                let stringDateLastjson:string = obj.verificationdate.split(' '); 
                let newDate = stringDateLastjson[0] + " " + stringDateLastjson[1] + " " + stringDateLastjson[2] + " " + stringDateLastjson[3] + " " + stringDateLastjson[4];
                obj.verificationdate = newDate;
                console.log ( obj)
                s += '<tr><th>' + obj.logid + '</th><th>'+ obj.stationid + '<th>' + 
                obj.user + '</th><th>' + obj.verificationdate + '</th>';                        
            }

            s += '</table>';

            SetInnerHtml ( 'VerificationTable', s );
        } 
        else if (this.readyState == 4 && this.status != 200) {
            console.error("/api/v1/cyclicverificationlog/pull: " + xhttp.responseText);
        }
    
    };
    setTimeout(GetVerificationTable, 5000);
}

function StoreNewDate()
{
    if ( GetElementVisible ( 'loadpanel' ) )
    {
        let calibratedToday = document.getElementById("calibratedToday") as HTMLInputElement;
        let calibrationdate:string = "";
        let verificationequipmentid:string = "";
        if ( calibratedToday.checked )
        {
            console.log('checked')
            calibrationdate = getTodaysDate();
        }
        else
        {
            console.log('NOTchecked')
        }

        let newdate   : any = $("#newdate").val () ;
        
        const selection :any = $("#selectequipment").val ();

        verificationequipmentid = selection.split(":"); 

        const req : any = 
        {   
            "verificationequipmentid"   : verificationequipmentid[0],
            "equipmentname"             : verificationequipmentid[1],
            "expirationdate"            : newdate,
            "calibrationdate"           : calibrationdate,
        }
        console.log( newdate, calibrationdate )
        const url:string = '/api/v1/calibrationEquipment/push'
        const xhttp:XMLHttpRequest = new XMLHttpRequest();
        xhttp.open ( 'POST', url, true );
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send ( JSON.stringify ( req ) );
        xhttp.onreadystatechange = function () {
            if ( this.readyState == 4 )
            {
                console.log ( 'StoreNewDate', this.status,  this.statusText )

                if ( this.status == 200 ) 
                {
                    const e:any = $("#ChangeExpirationModal");
                    e.modal("hide");
                }
                else
                {
                    SetLoadOrderMessage ( this.statusText );
                }
            }
        }

        const e:any = $("#ChangeExpirationModal");
        e.modal("hide");
    
    }
}
function changeExpirationDateShow()
{

    const xhttp:XMLHttpRequest = new XMLHttpRequest();
    xhttp.open('GET', '/api/v1/calibrationEquipment/pull', true);
    xhttp.send();
    
    xhttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200)
        {
            const json:any = JSON.parse(xhttp.responseText);
     
            //console.log( 'Changing experation date')
            //console.log ( json.length)
            
            let s: string = '';
            for ( let i: number = 0; i< json.length; i++ )
            {
                s += '<option value="' + json[i].verificationequipmentid +': ' + json[i].equipmentname + 
                '">' + json[i].verificationequipmentid +': ' + json[i].equipmentname + '</option>';
                SetInnerHtml ( 'selectequipment' , s )
                //console.log( json[i].verificationequipmentid )
                //console.log( json[i].equipmentname )
            }
            SetElementVisible ( 'loadpanel', true )

            const e:any = $("#ChangeExpirationModal");
            e.modal("show");
        }
    }
}
function getTodaysDate()
{
    let today = new Date();
    let dd      = String(today.getDate()).padStart(2, '0');
    let mm      = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy    = String(today.getFullYear() );
    let seconds = String(today.getSeconds() );
    let minutes = String(today.getMinutes() );
    let hour    = String(today.getHours() );
    let td      = yyyy + '-' + mm + '-' + dd + ' ' + hour + ':' + minutes + ':' + seconds ;
    return td
}

function SetElementVisible ( element: string, on: boolean )
{
    const el:HTMLElement|null = document.getElementById( element );
    if ( el )
    {
        let d:string;

        if ( on )
            d = 'block';
        else
            d = 'none';

        if ( el.style.display != d)
            el.style.display = d;
    }
}

function GetElementVisible ( element: string ) : boolean
{
    const el:HTMLElement|null = document.getElementById( element );
    if ( el )
    {
        if ( el.style.display == 'block' )
        {
            return true;
        }
    }
    return false;        
}

function SetLoadOrderMessage ( s:string )
{
    SetInnerHtml ( 'loadOrderMessage', s );
}

function SetInnerHtml ( element: string, html: string )
{
    const el:HTMLElement|null = document.getElementById( element );
    if ( el )
    {
        el.innerHTML = html;
    }
}

function GetInnerHtml ( element: string ) : string
{
    const el:HTMLElement|null = document.getElementById( element );
    if ( el )
    {
        return el.innerHTML;
    }
    else
        return '';
}