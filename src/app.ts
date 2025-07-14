import express from 'express'
import cors from "cors"
import { UserRoutes } from './modules/user/user.route';
const app = express()
app.use(cors())
app.use(express.json());
app.use("/api/v1/user", UserRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})


export default app