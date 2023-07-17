import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketTypes(){
    const ticketTypes = await ticketsRepository.findTicketsTypes();
    return ticketTypes;

}

async function getTicketByUserId(userId: number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollment){
        throw notFoundError();
    }
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if(!ticket){
        throw notFoundError();
    }
    return ticket;
}

async function createTicket(userId: number, ticketTypeId: number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if(!enrollment){
        throw notFoundError();
    }
    const result = await ticketsRepository.postTicket(ticketTypeId, userId)
    return result
    
}


const ticketService = {
    getTicketTypes,
    getTicketByUserId,
    createTicket
}

export default ticketService;