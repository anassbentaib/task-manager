export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthToken {
  token: string;
  expiresAt: number;
}

export interface AuthResponse {
  user: AuthUser;
  token: AuthToken;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}
