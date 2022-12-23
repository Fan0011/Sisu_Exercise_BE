import * as dotenv from 'dotenv'
dotenv.config()
import tasks from "../models/tasks.js";
import todoLists from '../models/todoLists.js';


export default class TaskItemsController {
  constructor() { }

  /**
   * Get Tasks Function
   * @param req 
   * @param res 
   * @param next 
   */

  addTask = async(req, res, next) => {

    const { list_id } = req.body;
    console.log('lists_id', list_id);
    if( list_id===undefined ){
      return res.json({success:false, message:null, data:"Confirm your inputs"})
    } 
    try{
      const resp = await todoLists.findById(list_id);
      if(resp?.title===undefined){
          return res.json({"success": false, "message": null, "data": "Not existed List"});    
      }
    }catch(err){
        console.log("Checking if existed list_id",err);
        return res.json({"success": false, "message": null, "data": "Not existed List"})
    }
    try{    
      const nTask = new tasks({list_id});
      await nTask.save()
      return res.json({"success": true, "message": null, "data": nTask})  
    } catch(err) {
      console.log('creating task', err);
      return res.json({"success": false, "message": null, "data": "Creating task failed"})
    }
  }
  
  updateTask = async(req, res, next) => {
    const { id, title} = req.body;
    if( id===undefined || title===undefined ){
      return res.json({success:false, message:null, data:"Confirm your inputs"});
    }
    try{
      const resp = await tasks.findByIdAndUpdate(id, {title}).exec();
      if(resp?.err){
        console.log("Updaing Task", err);
        return res.json({success:false, message:null, data:"Updating task failed"});  
      }else{
        return res.json({success:true, message:null, data:resp.title});
      }
    }catch(err){
      console.log("updating Task", err);
      return res.json({success:false, message:null, data:"Updating task failed"});
    }
  }

  deleteTask = async(req, res, next) => {
    const { id } = req.body;
    if( id===undefined ){
      return res.json({success:false, message:null, data:"Confirm your inputs"});
    }
    
    try{
      console.log('id',id);
      const {err, docs} = await tasks.findByIdAndDelete(id).exec();
      if(err){
        return res.json({success:false, message:null, data:"Deleting task failed"});
      }else{
        return res.json({success:true, message:null, data:docs});
      }
    }catch(err){
      console.log("Deleting Task", err);
      return res.json({success:false, message:null, data:"Deleting task failed"});
    }
  }

  getTask = async(req, res, next) => {
    const list_id = req.body.list_id;
    if( list_id===undefined ){
        return res.json({success:false, message:null, data:"Confirm your inputs"});
    }

    try{
        const resp = await tasks.find({list_id}).exec()
        if(resp?.err){
            return res.json({success:false, message:null, data:"Getting tasks failed"});
        }else{
            return res.json({success:true, message:null, data:resp});
        }
        
    }catch(err){
        console.log("Getting List", err);
        return res.json({success:false, message:null, data:"Getting list failed"});
    }
  }

 
}