import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import Database from "../src/config/db.config";
import { NoteRepository } from "../src/repository";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        context.log('HTTP trigger function processed a request.');
        
        const id = req.params.id;
        const {title,description} = req.body;
        const connection = await new Database().getConnection();
        
        const updatedNote = await new NoteRepository(connection).update(Number(id),{
            title,
            description
        })

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