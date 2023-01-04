import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { NoteRepository } from '../src/repository';
import Database from "../src/config/db.config";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        context.log('HTTP trigger function processed a request.');
        const database = new Database();
        const connection = await database.getConnection();
        const {title,description,reminder} = req.body;
        const newNote = await new NoteRepository(connection).create({
            title,
            description,
            reminder
        })
    
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: newNote
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error
        }
    }

};

export default httpTrigger;