import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter.get("/", authenticateToken, getPaymentByTicketId);
paymentRouter.post("/process", paymentProcess)

export default paymentRouter;