import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";

/* import route here */
import projectRoutes from "./routes/projectRoutes"
import taskRoutes from "./routes/taskRoutes"
import searchRoutes from "./routes/searchRoutes";
import getUsers  from "./routes/userRoutes";
import teamRoute from "./routes/teamRoutes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello this is home route !");
});

app.use('/projects',projectRoutes)
app.use('/tasks',taskRoutes)
app.use('/search',searchRoutes)
app.use('/users',getUsers)
app.use('/teams',teamRoute)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
