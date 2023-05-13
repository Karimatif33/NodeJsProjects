import  express  from "express";
import bodyparser from "body-parser"
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
// import config from "config";
import dbConnect from "./config/db";
import  routes  from "./routes";

const app = express()

app.use(
    cors({
      origin:("http://localhost:3000"),
    })
  );

app.use(bodyparser.json())

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server up an runing on http://localhost:${port}`);
    dbConnect()
    routes(app)
}) 