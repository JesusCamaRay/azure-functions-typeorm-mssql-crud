import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { NoteRepository } from "../src/repository";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        context.log('HTTP trigger function processed a request.');
        
        const id = req.params.id;
        const {title,description} = req.body;
        
        const updatedNote = await new NoteRepository().update(Number(id),{
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