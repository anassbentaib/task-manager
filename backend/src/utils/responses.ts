import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const sendSuccessResponse = (
  res: Response,
  data: any,
  message = 'Success',
  statusCode = StatusCodes.OK
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendErrorResponse = (
  res: Response,
  message = 'Error',
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};