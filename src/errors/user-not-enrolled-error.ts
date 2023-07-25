import { ApplicationError } from '@/protocols';

export function userNotEnrolledError(): ApplicationError {
  return {
    name: 'userNotEnrolledError',
    message: 'You must enroll first',
  };
}