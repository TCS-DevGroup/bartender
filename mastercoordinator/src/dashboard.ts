/**
 * $Rev: 13737 $
 * $LastChangedDate: 2021-01-22 13:18:20 +0100 (Fri, 22 Jan 2021) $
 * $Author: tgj $
 * 
 * 
 */




let dashboard_socket; 
let serverIP:string;

$(document).ready(function () {

    
    //dashboard_socket = io();
    //dashboard_socket.on('update', (data:any) => {
    //});


    setTimeout(GetStandStatus, 10 , 2);
    setTimeout(GetStandStatus, 10 , 3);
    setTimeout(GetStandStatus, 10 , 4);
    setTimeout(GetStandStatus, 10 , 5);
    setTimeout(GetStandStatus, 10 , 6);
    console.log ( 'hello fellow');
});

function GetStandStatus( standNo:number )
{
    const xhttp:XMLHttpRequest = new XMLHttpRequest();
    xhttp.open('GET', '/api/v1/stands/status/'+standNo, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const json:any = JSON.parse(xhttp.responseText);

            let el:any = document.getElementById(`washStatusContainer${standNo}`);
            if ( el !== null )
            {
                let html:string = '';
                    //let obj = json[1];
                    if ( json.VisibleOnDashboard )
                    {
                        html += MakeCard ( json );
                    }
                //}
                el.innerHTML = html;
            }
        } 
        else if (this.readyState == 4 && this.status != 200) {
            console.error( "Error Stand "+ standNo +  "/api/v1/stands/status: " + xhttp.responseText);
        }
    };
    setTimeout(GetStandStatus, 1000, standNo );
}


function MakeCard ( obj: any ) : string
{
    let bg:string = '#808080';
    let txt:string = '&nbsp;';
    let txtTestname:string = '&nbsp;';

    if ( obj.State == 'Ready')
    {
        bg = '#fffff';
    }
    else if (  obj.State == 'Testing' )
    {
        //bg = '#28a745';
        bg = '#f0f0f0';
        if ( obj.ErrorPanelText != '' )
        {
            //console.log ( obj.ErrorPanelText )
            bg = '#dc3545';
            if ( obj.ErrorPanelText == 'Cancel')
                txt = obj.ErrorPanelText;
            else 
               txt = 'Failed';
        }
        else if ( obj.ViewText != '' )
        {
            bg = obj.ViewTextColor;
            let splitTxt = obj.ViewText.split(' ');
            for (let i:number=0; i<splitTxt.length; i++ )
            {
                if ( ( splitTxt[i] == 'Time') || (splitTxt[i] == 'Waiting...' ) )
                {
                    txt = obj.ViewText;
                    break;
                }
            }
           //txt = obj.ViewText;
        }
        else if ( obj.AskConfirmation != '' )
        {
            bg = '#ffc107';
//            txt = obj.AskConfirmation;
        }
        else if ( obj.AskYesNo != '' )
        {
            bg = '#ffc107';
//            txt = obj.AskYesNo;
        }
        else if ( obj.AskText1 != '' )
        {
            bg = '#ffc107';
//            txt = obj.AskText1;
        }
        else if ( obj.AskSelectionText != '' )
        {
            bg = '#ffc107';
//            txt = obj.AskSelectionText;
        }

        
//        let indexOfTest : number = obj.Test.findIndex( (i: { name: string; }) => i.name === obj.TestName ) + 1
//        txt = ''+ indexOfTest + '/' + obj.Test.length;
  
        txtTestname = obj.TestName;
    }

    const width:number = 600;
    let progress:string = '<div><center><svg width="' + ( width + 5 ) + '" height="60">';
    //let progress:string = '<div><center><svg width=2pc"' + '" height="60">';
    let pos:number = 3.5;

    if ( obj.State == 'Ready' ||  obj.State == 'Testing' )
    {
        const cellwidth:number = width / obj.Test.length;

        for ( let tst of obj.Test  )
        {
            let strokeColor:string = 'black';
            let color:string = 'white';
            if ( tst.status === 'Failed' || tst.status === 'Canceled' )
                color = 'red';
            else if ( tst.status === 'OK' )
                color = 'green';
            let strokewidth:number = 1;
            if ( tst.name === obj.TestName )
            {
                strokeColor = 'blue'
                strokewidth = 3;
                color = 'white';
            }
            progress += '<rect x="' + pos + '" y="5.5" width="' + (cellwidth - 2) + '" height="40" style="fill:' + color + ';stroke:' + strokeColor +';stroke-width:' +  strokewidth + '" />';
            pos += cellwidth;
         }
    }
    progress += '</svg></center></div>';


    let machine:string = '';
    if ( obj.MachineType )
        machine = obj.MachineType;
    if ( obj.MachineNo )
    {
        if ( machine != '' )
            machine += '<br>';
        machine += 'Shop order: ' + obj.OrderNo + '&nbsp;&nbsp;&nbsp;&nbsp;Machine no: ' + obj.MachineNo;
    }


    let s:string = 
        '<div >' +
            '<div class="shadow m-1 h-lg-100 card">' +
                '<div class="pb-0 card-header">' +
                    '<center><h1>' + obj.StandName +'</h1></center>' +
                    '<center><h2>' + txtTestname +'</h2></center>' +
                    '<div>' + progress + '</div>' +
                '</div>' +
                '<div class="d-flex justify-content-center align-items-end card-body" style="background-color:' + bg + ';overflow:hidden;white-space:nowrap;height:11pc;">' +
                    '<h1 style="font-size:400%;">' + txt + '</h1>' +
                '</div>' +
                '<div class="card-footer" style="padding-top:1pc;padding-bottom:0px;height:10pc;">' +
                    '<center><h3>' + machine + '</h3></center>' +
                '</div>' +
            '</div>' +
        '</div>';

    return s;
}

