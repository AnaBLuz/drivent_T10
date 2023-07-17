import { prisma } from '@/config';
import { ticketTypeIdNotFound } from '@/errors/ticket-type-id-not-found';
import { userNotEnrolledError } from '@/errors/user-not-enrolled-error';
import { TicketData } from '@/protocols';


async function findTicketsTypes(){
    return await prisma.ticketType.findMany();
}


async function findTicketByEnrollmentId(enrollmentId: number){
    return await prisma.ticket.findFirst({
        where:{
            enrollmentId
        },
        include: {
            TicketType: true
        }
    })
}

async function postTicket(ticket: CreateTicketParams){
    if (!ticketTypeId) {
        throw ticketTypeIdNotFound()
      }
      
      const enrollment = await prisma.enrollment.findFirst({
        where: {
          userId
        },
      });
    
      if (!enrollment) {
        throw userNotEnrolledError()
      }
    
      const newTicket = await prisma.ticket.create({
        data: {
          status: 'RESERVED',
          ticketTypeId: ticketTypeId,
          enrollmentId: enrollment.id,
        },
        include: {
          TicketType: true,
        },
      });
    
      const {
        id,
        status,
        ticketTypeId: typeId,
        enrollmentId,
        createdAt,
        updatedAt,
        TicketType,
      } = newTicket;
    
      const ticketData: TicketData = {
        id,
        status,
        ticketTypeId: typeId,
        enrollmentId,
        TicketType: {
          id: TicketType.id,
          name: TicketType.name,
          price: TicketType.price,
          isRemote: TicketType.isRemote,
          includesHotel: TicketType.includesHotel,
          createdAt: TicketType.createdAt,
          updatedAt: TicketType.updatedAt,
        },
        createdAt,
        updatedAt,
      };
    
      return ticketData;
}

async function findTicketById(ticketId: number){
    return await prisma.ticket.findFirst({
        where: {
            id: ticketId
        },
        include: {
            Enrollment: true
        }
    })
}

const ticketsRepository = {
    findTicketsTypes,
    findTicketByEnrollmentId,
    postTicket,
    findTicketById
}

export default ticketsRepository;












