import {
  ResponseMessage,
  StatusCodes,
  jwt,
  Request,
  Response,
  NextFunction,
} from "../Index.ts";

interface Decoded {
  userid: string;
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: ResponseMessage.TOKEN_REQUIRED });
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY!) as Decoded;
    req.body.userid = decode.userid;
    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: ResponseMessage.INVALID_TOKEN });
  }
}
export default verifyToken;
