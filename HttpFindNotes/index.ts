import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {NoteRepository} from "../src/repository";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        context.log('HTTP trigger function processed a request.');
        const notes = await new NoteRepository().find();

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