import {
  Router,
  createOrUpdateTask,
  deleteTask,
  getAllTask,
  activeDeactiveTaskStatus,
} from "../Index.ts";

const taskRoutes = Router();

taskRoutes.post("/create-task", createOrUpdateTask);
taskRoutes.get("/get-all-task", getAllTask);
taskRoutes.post("/delete-task", deleteTask);
taskRoutes.post("/handle-task-status", activeDeactiveTaskStatus);

export default taskRoutes;
