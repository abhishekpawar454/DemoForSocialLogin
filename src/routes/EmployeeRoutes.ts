import {
  Router,
  deleteEmployee,
  getAllEmployee,
  activeDeactiveEmployeeStatus,
  updateEmployee,
  getSingleEmployee,
} from "../Index.ts";
import verifyToken from "../middleware/Auth.ts";
import UploadFile from "../middleware/Upload.ts";

const employeeRoutes = Router();

employeeRoutes.post(
  "/update-employee",
  verifyToken,
  UploadFile,
  updateEmployee
);
employeeRoutes.post("/delete-employee", verifyToken, deleteEmployee);
employeeRoutes.get("/get-all-employee", verifyToken, getAllEmployee);
employeeRoutes.get("/get-single-employee", verifyToken, getSingleEmployee);
employeeRoutes.post("/handle-employee-status", activeDeactiveEmployeeStatus);

export default employeeRoutes;
