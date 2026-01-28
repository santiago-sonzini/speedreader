import { db } from "@/server/db";
import { User } from "@prisma/client";

export type ApiResponse<T = any> = {
    status: number;
    data?: T;
    message: string;
  
  };
  
  export const getUser = async (id: string): Promise<ApiResponse<User>> => {
    try {
      const user = await db.user.findUnique({
        where: { id },
      });
  
      if (!user) {
        return {
          status: 404,
          message: "User not found",
        };
      }
      return {
        status: 200,
        data: user,
        message: "User fetched successfully",
      };
    } catch (error: any) {
      return {
        status: 500,
        message: error.message || "Failed to fetch user",
      };
    }
  };
  