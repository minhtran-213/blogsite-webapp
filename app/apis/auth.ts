import { LoginRequest, RegisterRequest } from "../types/auth";

import axiosClient from "./axiosInstance";

export const registerUser = async (request: RegisterRequest) => {
    return await axiosClient.post('/auth/register', request)
}

export const login = async (request: LoginRequest) => {
    return await axiosClient.post('/auth/login', request)
}