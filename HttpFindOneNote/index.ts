import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { NoteRepository } from "../src/repository";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        context.log('HTTP trigger function processed a request.');
        const id = req.params.id;
        const note = await new NoteRepository().findOne(Number(id));
    
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: note
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error
        };
    }

};

export default httpTrigger;