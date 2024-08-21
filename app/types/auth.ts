export interface RegisterRequest {
    email: string,
    firstName: string,
    lastName: string | null,
    preferredName: string | null,
    dateOfBirth: Date | null | undefined,
    gender: string | null,
    professional: string | null,
    interests: (string | null)[],
    password: string,
}

export interface LoginRequest {
    email: string,
    password: string
}

export interface LoginResponse {
    accessToken: string
}