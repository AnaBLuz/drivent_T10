import { ApplicationError } from '@/protocols';

export function ticketTypeIdNotFound(): ApplicationError {
  return {
    name: 'ticketTypeIdNotFound',
    message: 'You must send information about ticket type id',
  };
}