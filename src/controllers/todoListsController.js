import * as dotenv from 'dotenv'
dotenv.config()
import todoLists from "../models/todoLists.js";
import tasks from '../models/tasks.js';
import users from '../models/users.js';
export default class TodoListsController {
  constructor() { }

  /**
   * Get Lists Function
   * @param req 
   * @param res 
   * @param next 
   */

  addList = async(req, res, next) => {

    const { user_id } = req.body;

    if(user_id===undefined){
      return res.json({success:false, message:null, data:"Confirm your inputs"})
    } 

    try{
        const resp = await users.findById(user_id).exec();
        if(resp?.email===undefined){
            return res.json({"success": false, "message": null, "data": "Not existed user"});    
        }
    }catch(err){
        console.log("Checking if existed user_id",err);
        return res.json({"success": false, "message": null, "data": "Not existed user"})
    }

    try{
      const nList = new todoLists({user_id})
      await nList.save()
      return res.json({"success": true, "message": null, "data": nList})  
    } catch(error) {
      return res.json({"success": false, "message": null, "data": "Creating List failed"})
    }
  }
  
  updateList = async(req, res, next) => {
    const { id, title} = req.body;
    if( id===undefined || title===undefined ){
      return res.json({success:false, message:null, data:"Confirm your inputs"});
    }
    try{
      const resp = await todoLists.findByIdAndUpdate(id, {title}).exec();
      if(resp?.err){
        console.log("Updaing List", err);
        return res.json({success:false, message:null, data:"Updating List failed"});  
      }else{
        return res.json({success:true, message:null, data:resp.title});
      }
    }catch(err){
      console.log("updating List", err);
      return res.json({success:false, message:null, data:"Updating List failed"});
    }
  }

  deleteList = async(req, res, next) => {
    const { id } = req.body;
    if( id===undefined ){
      return res.json({success:false, message:null, data:"Confirm your inputs"});
    }
    
    try{
      const resp = await todoLists.findByIdAndDelete(id).exec();
      if(resp?.err){
        return res.json({success:false, message:null, data:"Deleting List failed"});
      }

      const resp1 = await tasks.deleteMany({list_id:id}).exec();
      if(resp1?.err){
        return res.json({success:false, message:null, data:"Deleting List failed"});
      }else{
        return res.json({success:true, message:null});
      }
    }catch(err){
      console.log("Deleting List", err);
      return res.json({success:false, message:null, data:"Deleting List failed"});
    }
  }

  getList = async(req, res, next) => {
    const user_id = req.body.user_id;
    if( user_id===undefined ){
        return res.json({success:false, message:null, data:"Confirm your inputs"});
    }

    try{
        const resp = await todoLists.find({user_id}).exec()
        if(resp?.err){
            return res.json({success:false, message:null, data:"Getting list failed"});
        }else{
            return res.json({success:true, message:null, data:resp});
        }
        
    }catch(err){
        console.log("Getting List", err);
        return res.json({success:false, message:null, data:"Getting list failed"});
    }
  }

  getTitle = async(req, res, next) => {
    const id = req.body.id;
    if( id===undefined ){
        return res.json({success:false, message:null, data:"Confirm your inputs"});
    }
    
    try{
      const resp = await todoLists.findById(id).exec();
      if(resp?.err){
        return res.json({success:false, message:null, data:"Getting title failed"});
      }else{
        return res.json({success:true, message:null, data:resp});
      }
    }catch(err){
      console.log("Getting title", err);
      return res.json({success:false, message:null, data:"Getting title failed"});
    }

  }


 
}