import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {NoteRepository} from "../src/repository";
import Database from "../src/config/db.config";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        context.log('HTTP trigger function processed a request.');
        const connection = await new Database().getConnection();
        const notes = await new NoteRepository(connection).find();

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: notes
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error
        };
    }

};

export default httpTrigger;