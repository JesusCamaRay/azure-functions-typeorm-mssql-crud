import { AzureFunction, Context } from "@azure/functions"
import Database from "../src/config/db.config";
import { Connection } from 'typeorm';

const database = new Database()

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    try {
        const dbConn:Connection= await database.getConnection()
        const notes = await dbConn.getRepository('Note').find()
        context.log('Timer trigger function ran!', notes);   
    } catch (error) {
        context.log(error)
    }
};

export default timerTrigger;
