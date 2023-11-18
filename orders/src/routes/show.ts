import express, {request, Request, Response} from "express";
import {NotAuthorizedError, NotFoundError, requireAuth} from "@orionco/common";
import {Order} from "../models/orders";


const router = express.Router();

router.get(
    '/api/orders/:orderId',
    requireAuth,
    async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.Id).populate('ticket')

    if (!order) {
        throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    res.send(order);
});

export {router as showOrderRouter};
