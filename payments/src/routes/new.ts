import express, {Request, Response} from "express";
import {body} from 'express-validator';
import {requireAuth} from "@orionco/common";


const router = express.Router();

router.post('api/payments', requireAuth,
    [
        body('token')
            .not()
            .isEmpty()
    ],
    (req: Request, res: Response) => {
        res.send({success: true})
    })

export {router as createChargeRouter}
