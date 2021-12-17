import { HttpInitialize } from "./router";
require ( './router' );
const world = 'world';

export function hello(word: string = world): string {
  return `Hello ${world}! `;
}

hello()
HttpInitialize( 5000 );
console.log( 'hey');