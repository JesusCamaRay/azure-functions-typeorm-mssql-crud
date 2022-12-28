import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Connection } from "typeorm";
import Database from "../utils/db";
import { Note } from "../entities";

const database = new Database()

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        context.log('HTTP trigger function processed a request.');
        const dbConn:Connection = await database.getConnection()
        
        const id = req.params.id;
        const body = req.body;
        
        const noteRepository = dbConn.getRepository(Note);

        const note = await noteRepository.findOne(id);
        if(!note) {
            context.res = {
                status: 404,
                body: `Note with id ${id} not found`
            };
            return;
        }

        const {title, description} = body;
        if(title){
            note.title = title;
        }
        if(description){
            note.description = description;
        }

        const updatedNote = await noteRepository.save(note);

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: updatedNote
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error
        }
    }

};

export default httpTrigger;