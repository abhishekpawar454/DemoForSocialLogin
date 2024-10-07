import {
  StatusCodes,
  ResponseMessage,
  taskModel,
  Request,
  Response,
} from "../Index.ts";

interface Task {
  id: string;
  name: string;
  description: string;
  duration: number;
  assignee: string;
  reporter: string;
}
interface Status {
  id: string;
  status: boolean;
}

export const createOrUpdateTask = async (req: Request, res: Response) => {
  try {
    const { id, name, description, duration, assignee, reporter }: Task =
      req.body;

    if (id) {
      const task = await taskModel.findOne({ _id: id });
      if (!task) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: StatusCodes.BAD_REQUEST,
          message: ResponseMessage.TASK_NOT_FOUND,
        });
      } else {
        await taskModel.findOneAndUpdate(
          { _id: id },
          { name, description, duration, assignee, reporter } as Task,
          { new: true }
        );
        return res.status(StatusCodes.OK).json({
          status: StatusCodes.OK,
          message: ResponseMessage.TASK_UPDATED,
          data: [],
        });
      }
    } else {
      const addTask = new taskModel({
        name,
        description,
        duration,
        assignee,
        reporter,
      });
      await addTask.save();
      return res.status(StatusCodes.CREATED).json({
        status: StatusCodes.CREATED,
        message: ResponseMessage.TASK_CREATED,
        data: [],
      });
    }
  } catch (error: unknown) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: [(error as Error).message],
    });
  }
};

export const getAllTask = async (req: Request, res: Response) => {
  try {
    const tasks = await taskModel.find();
    if (!tasks) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.DATA_NOT_FOUND,
      });
    } else {
      return res.status(StatusCodes.OK).json({
        message: ResponseMessage.DATA_FOUND,
        status: StatusCodes.OK,
        data: tasks,
      });
    }
  } catch (error: unknown) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: [(error as Error).message],
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const task = await taskModel.findOne({ _id: id });

    if (!task) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.TASK_NOT_FOUND,
      });
    } else {
      await taskModel.deleteOne({ _id: id });
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessage.TASK_DELETED,
        data: [],
      });
    }
  } catch (error: unknown) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: StatusCodes.INTERNAL_SERVER_ERROR,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: [(error as Error).message],
    });
  }
};

export const activeDeactiveTaskStatus = async (req: Request, res: Response) => {
  try {
    const { id, status }: Status = req.body;
    const task = await taskModel.findOne({ _id: id });
    if (!task) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.USER_NOT_FOUND,
      });
    } else {
      await taskModel.findByIdAndUpdate(
        { _id: id },
        {
          isActive: status,
        }
      );
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessage.USER_STATUS_UPDATED,
        data: { status },
      });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: (error as Error).message,
    });
  }
};
