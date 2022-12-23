import { Router } from "express";
import TodoListsController from "../controllers/todoListsController.js";

class ListsRouter {
    router = Router();
    controller = new TodoListsController();

    constructor(){
        this.initializeRouters();
    }

    initializeRouters(){
        this.router.route("/addlist").post(this.controller.addList);
        this.router.route("/updatelist").post(this.controller.updateList);
        this.router.route("/deletelist").post(this.controller.deleteList);
        this.router.route("/getlist").post(this.controller.getList);
        this.router.route("/gettitle").post(this.controller.getTitle);
    }
}

export default new ListsRouter().router;