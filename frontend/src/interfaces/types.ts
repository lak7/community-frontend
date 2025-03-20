// src/types/index.ts
export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
  role: string;
}