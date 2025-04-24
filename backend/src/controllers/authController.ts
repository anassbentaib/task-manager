import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { supabase } from "../config/supabase";
import { LoginDto, RegisterDto } from "../types/auth";

export const register = async (req: Request, res: Response) => {
  const { email, password }: RegisterDto = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User registered successfully",
    data: {
      user: data.user,
      session: data.session,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: LoginDto = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "User logged in successfully",
    data: {
      user: data.user,
      session: data.session,
    },
  });
};

export const getMe = async (req: Request, res: Response) => {
  const { user } = req as any;

  return res.status(StatusCodes.OK).json({
    success: true,
    data: {
      user,
    },
  });
};

export const logout = async (req: Request, res: Response) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "User logged out successfully",
  });
};
