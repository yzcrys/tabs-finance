import { Document,  Model } from 'mongoose'

export interface TaskDocument extends Document {
    houseId: String,
    taskListId:String,
    owner: String,
    task: String,
    dateDue: String,
    doneStatus: Boolean
}
//interface