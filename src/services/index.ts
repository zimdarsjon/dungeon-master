import axios, { AxiosError } from "axios";

const axiosInstance = axios.create();

const handleError = function (error: AxiosError) {
    console.log(error.message)
};

export { axiosInstance, handleError}