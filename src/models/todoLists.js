import * as mongoose from "mongoose"
const Schema = mongoose.Schema

const todoListsSchema = new Schema({
    title:{
        type:String  
    },
    user_id:{
        type:String
    }
}, 
{ timestamps: true })

export default mongoose.model('todoLists', todoListsSchema)