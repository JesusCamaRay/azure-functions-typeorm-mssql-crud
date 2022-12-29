import { AzureFunction, Context } from "@azure/functions"
import Database from "../src/config/db.config";
import { Connection } from 'typeorm';
import { NoteRepository } from "../src/repository";

const database = new Database()

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    try {
        const connection = await new Database().getConnection();
        const notes = await new NoteRepository(connection).find()
        context.log('Timer trigger function ran!', notes);   
    } catch (error) {
        context.log(error)
    }
};

export default timerTrigger;
