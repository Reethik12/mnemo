import { NextResponse } from "next/server";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: unknown;
}

export const respond = {
  success: <T>(data: T, meta?: unknown, status = 200) => {
    return NextResponse.json({ success: true, data, meta }, { status });
  },

  error: (message: string, status = 400, data?: unknown) => {
    return NextResponse.json(
      { success: false, error: message, data },
      { status },
    );
  },

  unauthorized: (message = "Unauthorized") => {
    return NextResponse.json(
      { success: false, error: message },
      { status: 401 },
    );
  },

  notFound: (message = "Resource not found") => {
    return NextResponse.json(
      { success: false, error: message },
      { status: 404 },
    );
  },

  serverError: (message = "Internal Server Error") => {
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  },
};
