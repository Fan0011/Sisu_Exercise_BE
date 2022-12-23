import * as mongoose from "mongoose"
const Schema = mongoose.Schema

const usersSchema = new Schema({
    email:{
        type:String
    },
    pwd: {
        type: String
    }
}, 
{ timestamps: true })

export default mongoose.model('users', usersSchema)