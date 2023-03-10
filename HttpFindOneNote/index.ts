import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import Database from "../src/config/db.config";
import { NoteRepository } from "../src/repository";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        context.log('HTTP trigger function processed a request.');
        const connection = await new Database().getConnection();
        const id = req.params.id;
        const noteRepository = new NoteRepository(connection);
        const note = await noteRepository.findOne(Number(id));
    
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: note
        };
    } catch (error) {
        console.error(error)
        context.res = {
            status: 500,
            body: error
        };
    }

};

export default httpTrigger;