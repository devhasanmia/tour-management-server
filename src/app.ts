import express from 'express'
import cors from "cors"
import { router } from './routes';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './errorHandler/notFound';
import cookieParser from 'cookie-parser';

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use("/api/v1", router);

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.use(globalErrorHandler)
app.use(notFound)

export default app