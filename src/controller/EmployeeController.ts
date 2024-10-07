import {
  StatusCodes,
  ResponseMessage,
  Request,
  Response,
  userModel,
} from "../Index.ts";

interface Employee {
  id: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  image: string;
  dateOfBirth: Date;
}

interface Status {
  id: string;
  status: boolean;
}

export const getAllEmployee = async (req: Request, res: Response) => {
  try {
    const id = req.body.userid;
    const employeeData = await userModel.find({
      isDelete: false,
      _id: { $nin: id },
    });
    if (!employeeData) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.DATA_NOT_FOUND,
      });
    } else {
      return res.status(StatusCodes.OK).json({
        message: ResponseMessage.DATA_FOUND,
        status: StatusCodes.OK,
        data: employeeData,
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

export const getSingleEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const employeeData = await userModel.findOne({ _id: id, isDelete: false });
    if (!employeeData) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.EMPLOYEE_NOT_FOUND,
      });
    } else {
      return res.status(StatusCodes.OK).json({
        message: ResponseMessage.EMPLOYEE_FOUND,
        status: StatusCodes.OK,
        data: employeeData,
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

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id, name, email, mobile, dateOfBirth }: Employee = req.body;
    const employee = await userModel.findOne({ _id: id, isDelete: false });
    if (!employee) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.EMPLOYEE_NOT_FOUND,
      });
    } else {
      let updatedData = await userModel.findOneAndUpdate(
        { _id: id },
        {
          name,
          email,
          mobile,
          image: req.file?.filename,
          dateOfBirth,
        } as Employee,
        { new: true }
      );
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessage.EMPLOYEE_UPDATED,
        data: [updatedData],
      });
    }
  } catch (error: unknown) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      data: [(error as Error).message],
    });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const employee = await userModel.findOne({ _id: id, isDelete: false });

    if (!employee) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.EMPLOYEE_NOT_FOUND,
      });
    } else {
      await userModel.updateOne({ _id: id }, { isDelete: true });
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessage.EMPLOYEE_DELETED,
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

export const activeDeactiveEmployeeStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { id, status }: Status = req.body;
    const employee = await userModel.findOne({ _id: id });
    if (!employee) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.EMPLOYEE_NOT_FOUND,
      });
    } else {
      await userModel.findByIdAndUpdate(
        { _id: id },
        {
          isActive: status,
        }
      );
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessage.EMPLOYEE_STATUS_UPDATED,
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
