import * as mongoose from "mongoose"
const Schema = mongoose.Schema

const tasksSchema = new Schema({
    title:{
        type:String      
    },
    list_id:{
        type:String
    }
}, 
{ timestamps: true })

export default mongoose.model('tasks', tasksSchema)