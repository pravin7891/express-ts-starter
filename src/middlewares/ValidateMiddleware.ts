import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/Responses";
import { ZodError, ZodSchema } from "zod";

// const formatZodErrors = (error: ZodError) => {
//     return error.errors.map((err) => ({
//       field: err.path.join("."), // Converts array paths to dot notation (e.g., "user.email")
//       message: err.message,
//     }));
//   };
  const formatZodErrors = (error: ZodError) => {
    return error.errors.map((err) => ({
      field: err.path.join("."), // Converts array paths to dot notation (e.g., "user.address.street")
      messages: [err.message], // Wraps messages in an array
    }));
  };
const validate =
  (schema: ZodSchema, type: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[type]);
    if (!result.success) {
        //console.log("result: ", formatZodErrors(result.error))

      return res.status(400).json(errorResponse("invalid data", formatZodErrors(result.error)));
    }

    next();
  };

export default validate;
 