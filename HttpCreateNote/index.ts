import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import Database from '../utils/db';
import { Note } from '../entities/index';
import { Connection } from "typeorm";

const database = new Database();

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        context.log('HTTP trigger function processed a request.');
        const dbConn:Connection = await database.getConnection()
        const body = req.body;
        const note = new Note();
        note.title = body.title;
        note.description = body.description;
    
        const noteRepository = dbConn.getRepository(Note);
        const newNote = await noteRepository.save(note);
    
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