import axios from "axios"

const instance = axios.create({
    baseURL: 'https://fakestoreapi.com'
})

export const paymentAxiosInstance = axios.create({
    // baseURL: 'http://127.0.0.1:5001/clone-de55a/us-central1/api'
    baseURL: 'https://amazon-api-deploy-1ym7.onrender.com'
})



export default instance