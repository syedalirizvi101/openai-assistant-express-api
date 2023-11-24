import bodyParser from "body-parser";
import express from 'express';
import appRoutes from "./routes";
import { config } from "dotenv";
import cors from 'cors';

const app = express();

config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());

app.use('/', appRoutes);

app.listen(process.env.PORT,()=>{
    console.log("server started listening on PORT: ",process.env.PORT)
})


export default app;