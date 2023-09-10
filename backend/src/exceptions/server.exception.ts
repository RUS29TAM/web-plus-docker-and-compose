import { HttpException, HttpStatus } from '@nestjs/common';
import { code2message, code2status, ErrorCode } from './errors';

export class ServerException extends HttpException {
  public code: ErrorCode;

  constructor(code: ErrorCode) {
    const message =
      code2message[code] ||
      'Произошла ошибка, пожалуйста, повторите попытку позже';
    const status = code2status[code] || HttpStatus.INTERNAL_SERVER_ERROR;

    super(message, status);

    this.code = code;
  }
}
