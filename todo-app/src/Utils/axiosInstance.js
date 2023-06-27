import axios from 'axios'

const axiosInstance = axios.create({
    baseURL : 'http://localhost:4000',
    Headers : {
        'content-type' : 'application/json'
    }
})

export default axiosInstance
