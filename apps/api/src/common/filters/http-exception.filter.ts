import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // TODO: only catches HttpExceptions,  unexpected runtime error (e.g. TypeORM connection failure) will bypass the filter and let NestJS return its default error shape, which includes a stack trace in development that could leak in production if NODE_ENV is not set correctly. Change to @Catch() (catch-all) and return a generic 500 for non-HttpException errors.
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errors: string[] =
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse &&
      Array.isArray((exceptionResponse as Record<string, unknown>).message)
        ? ((exceptionResponse as Record<string, unknown>).message as string[])
        : [];

    const message =
      errors.length > 0
        ? 'Validation failed'
        : typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (((exceptionResponse as Record<string, unknown>)
              .message as string) ?? HttpStatus[status]);

    response.status(status).json({
      statusCode: status,
      message,
      errors,
      timestamp: new Date().toISOString(),
      path: request.path,
    });
  }
}
