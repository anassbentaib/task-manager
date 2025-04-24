import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { supabase } from "../config/supabase";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;
  console.log("called");

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log("🚀 ~ token:", token);
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Not authorized, no token",
    });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }

    (req as any).user = data.user;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};
