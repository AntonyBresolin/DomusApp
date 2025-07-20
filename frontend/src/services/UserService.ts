import type { RegisterData, AuthResponse } from '../types';

export class UserService {
  static API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

  static async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(
        `${UserService.API_BASE_URL}/users/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
          credentials: "include",
        }
      );

      if (response.status === 201) {
        return await response.json();
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }
}
