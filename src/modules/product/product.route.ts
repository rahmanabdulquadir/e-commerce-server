import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  res.send("Hi from posting method");
});

export const ProductRoutes = router;
