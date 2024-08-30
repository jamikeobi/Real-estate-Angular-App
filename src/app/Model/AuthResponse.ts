export interface AuthResponse{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
    username?: string;
    role?: string;
    name: string;
}