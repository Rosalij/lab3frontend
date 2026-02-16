

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface LoginCredentials { 
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}