import { Request, Response, NextFunction, StatusCodes } from "../Index.ts";
import multer from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const fileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, "./public/uploads");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("image");

const UploadFile = (req: Request, res: Response, next: NextFunction): void => {
  upload(req, res, (err: unknown): void => {
    if (err as Error) {
      console.log("Unknown Error:", err);
      res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: err,
      });
    } else {
      next();
    }
  });
};

export default UploadFile;
