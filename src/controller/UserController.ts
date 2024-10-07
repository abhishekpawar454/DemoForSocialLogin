import {
  StatusCodes,
  ResponseMessage,
  userModel,
  hash,
  Request,
  Response,
  compare,
  jwt,
  sentMail,
} from "../Index.ts";

interface User {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
  image: string;
  dateOfBirth: Date;
  otp: number | null;
}
interface Passwords {
  id: string;
  currPassword: string;
  newPassword: string;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, mobile, password, role, image, dateOfBirth }: User =
      req.body;
    const user: User | null = await userModel.findOne({
      email,
    });
    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.EMAIL_EXISTS,
      });
    } else {
      const hashedPassword = await hash(password, 10);
      const addUser = new userModel({
        name,
        email,
        mobile,
        password: hashedPassword,
        role,
        image,
        dateOfBirth,
      });
      await addUser.save();
      return res.status(StatusCodes.CREATED).json({
        status: StatusCodes.CREATED,
        message: ResponseMessage.USER_CREATED,
        data: [],
      });
    }
  } catch (error: unknown) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: [(error as Error).message],
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: User = req.body;
    const user = await userModel.findOne({ email, isDelete: false });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.USER_NOT_FOUND,
      });
    }

    const checkPassword = await compare(password, user.password);
    if (!checkPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.INCORRECT_PASSWORD,
      });
    } else {
      const token = jwt.sign({ userid: user._id }, process.env.SECRET_KEY!, {
        expiresIn: "24h",
      });

      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessage.USER_LOGGEDIN,
        data: { token, id: user._id, role: user.role },
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

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email }: User = req.body;
    const user = await userModel.findOne({
      email,
    });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.USER_NOT_FOUND,
      });
    } else {
      const otp = Math.floor(1000 + Math.random() * 9000);
      await userModel.findByIdAndUpdate(
        { _id: user.id },
        { otp: otp },
        { new: true }
      );
      // await sentMail(email, otp);

      return res.status(StatusCodes.OK).json({
        message: ResponseMessage.SENT_OTP,
        status: StatusCodes.OK,
        data: {
          email,
        },
      });
    }
  } catch (error: unknown) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: [(error as Error).message],
    });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp }: User = req.body;
    const user = await userModel.findOne({
      email: email,
      otp: otp,
    });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.INVALID_OTP,
      });
    } else {
      const token = jwt.sign({ userid: user._id }, process.env.SECRET_KEY!, {
        expiresIn: "24h",
      });
      await userModel.findByIdAndUpdate(
        { _id: user.id },
        { otp: null },
        { new: true }
      );
      return res.status(StatusCodes.OK).json({
        message: ResponseMessage.OTP_VERIFIED,
        status: StatusCodes.OK,
        data: { token, email },
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

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { password }: User = req.body;
    const id = req.body.userid;
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.USER_NOT_FOUND,
      });
    } else {
      const hashed = await hash(password, 10);
      await userModel.findByIdAndUpdate(
        { _id: id },
        {
          password: hashed,
        },
        { new: true }
      );
      return res.status(StatusCodes.OK).json({
        message: ResponseMessage.RESET_PASSWORD,
        status: StatusCodes.OK,
        data: {
          id: user._id,
          email: user.email,
        },
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

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currPassword, newPassword, id }: Passwords = req.body;
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.USER_NOT_FOUND,
      });
    }
    const matchCurrentPassword = await compare(currPassword, user.password);
    const matchNewPassword = await compare(newPassword, user.password);

    if (!matchCurrentPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.INCORRECT_CURR_PASSWORD,
      });
    } else if (matchNewPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.CHANGE_PASSWORD,
      });
    } else {
      const hashed = await hash(newPassword, 10);
      await userModel.findByIdAndUpdate(
        { _id: id },
        {
          password: hashed,
        },
        { new: true }
      );
      return res.status(StatusCodes.OK).json({
        message: ResponseMessage.RESET_PASSWORD,
        status: StatusCodes.OK,
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
