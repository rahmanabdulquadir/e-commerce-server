import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/product/product.route";
const app = express();


app.use(express.json())
app.use('/api/products', ProductRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! this is running now");
});



export default app
