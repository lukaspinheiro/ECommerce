import axios from "axios";

export const FipeApi = axios.create({baseURL: 'https://parallelum.com.br/fipe/api/v1'})