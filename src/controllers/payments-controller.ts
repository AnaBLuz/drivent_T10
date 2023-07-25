import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';


async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response){
    try{
        const ticketId = parseInt(req.query.ticketId);
        const {userId} = req;

        if(!ticketId){
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

      const payment = await paymentsService.getPaymentByTicketId(userId, ticketId);
      if(!payment){
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      res.send(payment);
    }
    catch(error){
        if(error.name === 'UnathorizedError'){
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        }
        return res.sendStatus(httpStatus.NOT_FOUND);
    }

}

async function paymentProcess(req: AuthenticatedRequest, res:Response){
    const {userId} = req;
    const { ticketId, cardData } = req.body;

    try{

    }
    catch(error){
        if(error.name === 'UnathorizedError'){
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        }
        return res.sendStatus(httpStatus.NOT_FOUND);
    }

}

const paymentController = {
    getPaymentByTicketId,
    paymentProcess
}

export default paymentController;