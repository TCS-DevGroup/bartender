/** Constants  */

let drinksAvailable : number;


/**
 * This function runs once, when the webpage is requested from user
 */
$( document ).ready(function() {
  console.log( "ready!" );  
  // Size of HTML document (same as pageHeight/pageWidth in screenshot).
  let screenHeight : number | undefined = $(document).height();
  let screenWidth  : number | undefined = $(document).width();
  
  if ( screenHeight )
    console.log ( '$(document) height: ', screenHeight );
  if ( screenWidth )
    console.log ( '$(document) width: ', screenWidth );

  drinksAvailable = 6; // Hardcoded for front-end testing. Will be server decided.
  PresentCocktail();

});  


function myFunction() 
{
  alert("Hello, World");
}

function Mybtn()
{
  alert ( 'sup?')
  console.log( 'works!');
}
function hello(){

  alert("Hey there! I am using external JavaScript");
  
}
function myuserPicker() 
{
    alert('oy');
    //SetInnerHtml ( 'user', 'TGJ' );
}

function PresentCocktail()
{
  for ( let i : number = 0; i < drinksAvailable; i++ )
  {
    // TODO : Verify html page have room for card width screen height,width
    // TODO : Only present avaiable cocktails
    SetInnerHtml ( `cocktail${i+1}`, makeCard() );
  }
}
  

function makeCard() : string
{
  let s : string = '';
  s += '<div class="container_drinkcard">';
  s += '<h1>ThisIsADrinkCard</h1>';
  s += '</div>';
  return s;
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