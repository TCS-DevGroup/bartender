
import { Request, Response } from "express";


interface DeleteInterface {
    deleted : string,
}

export const GetUsers = async ( req: Request, res: Response ) =>
{
    res.status ( 200 ).send ( 'Returning users' );
}

export const addNewUser = async ( req: Request, res: Response ) =>
{
    console.log ( 'req', req );
    const newUser : string = req.body.newUser;
    if ( newUser )
    { 
        if ( newUser != '' )
        {
            res.status ( 200 ).send ( 'Adding new user' );
        }       
        else
        {
            res.status ( 400 ).send( 'User string empty' );    
        }
    }
    else
    {
        res.status ( 400 ).send( 'Did not recieve a user' );
    }
}

export const DeleteUser = async ( req: Request, res: Response ) =>
{
    const user : string = req.body.user;
    if ( user )
    { 
        if ( user != '' )
        {
            const responseJson : DeleteInterface = {
                deleted : user
            }
            res.status ( 200 ).send ( JSON.stringify (responseJson) );
        }       
        else
        {
            res.status ( 400 ).send( 'User string empty' );    
        }
    }
    else
    {
        res.status ( 400 ).send( 'Did not recieve a user' );
    }

}
