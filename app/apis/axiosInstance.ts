import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const axiosClient = axios.create({
  baseURL: publicRuntimeConfig.NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

console.log('publicRuntime:', publicRuntimeConfig.NEXT_PUBLIC_BACKEND_BASE_URL)

export default axiosClient