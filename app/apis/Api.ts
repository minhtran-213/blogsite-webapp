import { AxiosResponse } from "axios"
import axiosClient from "./axiosInstance"

export interface ApiBaseParam {
    path: string,
    credentials?: string
}

export interface ApiBaseParamWithBody<T> extends ApiBaseParam{
    body: T
}


const Api = {
    post<TRequest, TResponse>(request: ApiBaseParamWithBody<TRequest>):  Promise<AxiosResponse<TResponse>>{
        return axiosClient.post(request.path, request)
    }
}

export default Api