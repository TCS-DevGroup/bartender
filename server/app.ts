import { HttpInitialize } from "./router";
require ( './router' );
const world = 'world';


//hello()
HttpInitialize( 5000 );
console.log( 'hey');


setTimeout ( ServeLoop, 1000 ); // Start after 1 sec to allow for other process to start up

function ServeLoop ( )
{
  
  setTimeout( ServeLoop, 1000 );
}