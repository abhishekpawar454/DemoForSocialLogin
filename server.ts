import {
  cors,
  dbConnection,
  express,
  userRoutes,
  taskRoutes,
  employeeRoutes,
} from "./src/Index.ts";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRoutes);
app.use("/api", employeeRoutes);
app.use("/api", taskRoutes);
app.use("/image", express.static("./public/uploads"));

app.listen(process.env.PORT, () => {
  dbConnection();
  console.log(`Server started at ` + process.env.PORT);
});
