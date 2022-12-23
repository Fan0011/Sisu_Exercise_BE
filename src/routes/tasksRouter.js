import { Router } from "express";
import TaskItemsController from "../controllers/taskItemsController.js"; 

class TasksRouter {
    router = Router();
    controller = new TaskItemsController();

    constructor(){
        this.initializeRouters();
    }

    initializeRouters(){
        this.router.route("/addtask").post(this.controller.addTask);
        this.router.route("/updatetask").post(this.controller.updateTask);
        this.router.route("/deletetask").post(this.controller.deleteTask);
        this.router.route("/gettask").post(this.controller.getTask);
    }
}

export default new TasksRouter().router;