import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      email: string;
      // Add any other fields you attach to req.user
    };
  }
}
