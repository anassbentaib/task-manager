import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || "9000",
  nodeEnv: process.env.NODE_ENV || "development",
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_SERVICE_KEY,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
};
