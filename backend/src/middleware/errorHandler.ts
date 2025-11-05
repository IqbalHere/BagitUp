import { Request, Response, NextFunction } from 'express'

interface ErrorResponse {
  message: string
  status: number
  stack?: string
}

export const errorHandler = (
  err: Error & { status?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'

  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    status,
  })

  const response: ErrorResponse = {
    message,
    status,
  }

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack
  }

  res.status(status).json(response)
}
