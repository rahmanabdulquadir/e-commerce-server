import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/product/product.route";
import { OrderRoutes } from "./modules/order/order.route";
const app = express();


app.use(express.json())
app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! this is running now");
});



export default app
