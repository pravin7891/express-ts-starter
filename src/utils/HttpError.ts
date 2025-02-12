export class HttpError extends Error {
    public status: number;
    public details?: any;
  
    constructor(status: number, message: string, details?: any) {
      super(message);
      this.status = status;
      this.details = details;
      this.name = "HttpError";
    }
  }
  