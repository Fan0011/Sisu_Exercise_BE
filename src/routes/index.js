import usersRouter from './usersRouter.js';
import tasksRouter from './tasksRouter.js';
import listsRouter from './listsRouter.js';
export default class Routes {

  constructor(app) {   
    
    //welcomes
    app.use('/', usersRouter)

    app.use('/api/v1/users', usersRouter);
    app.use('/api/v1/tasks', tasksRouter);
    app.use('/api/v1/lists', listsRouter);
    
  }
}