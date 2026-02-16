import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

//types for auth context
import type {
    User,
    LoginCredentials,
    AuthResponse,
    AuthContextType,
} from "../types/auth.types";

//create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//provider component
interface AuthProviderProps {
    children: ReactNode;
}

//provider component for global state management of authentication
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
const login = async (credentials: LoginCredentials) => {
  try {
    const response = await fetch("https://snowshopbackend.onrender.com/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json(); // parse JSON first

    if (!response.ok) {
      // throw an error with backend message
      throw new Error(data.error || "Login failed");
    }

    localStorage.setItem("token", data.token);
    setUser(data.user);
  } catch (err: any) {
    console.error("Login failed:", err);
    throw err; // re-throw so LoginPage can catch it
  }
};


    //check token on app load
    const checkToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }

        try {
            const response = await fetch(
                "https://snowshopbackend.onrender.com/users/me",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const userData: User = await response.json();
                setUser(userData);
            }


        } catch (error) {
            console.error("Token verification failed:", error);
                localStorage.removeItem("token");
                setUser(null);
        }
    };

    //check token on app load to keep user logged in
    useEffect(() => {
        checkToken();
    }, []);

    //logout functino
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    //provide user and auth function to children
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

//custom hook to use auth context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};
