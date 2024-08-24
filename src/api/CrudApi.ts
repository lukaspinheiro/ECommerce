import axios from "axios";

export const CrudApi = axios.create({baseURL: 'http://localhost:5000/'})