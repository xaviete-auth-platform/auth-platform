import { HttpStatusCode as code } from "../config/status";
import axios from "axios";
import config from "../config/config";
import {setUser} from "./auth.service";

export async function login(data: any) {

    const { email, password, remember } = data;

    const body = {
        email: email,
        password: password
    }

    try {

        const response = await axios.post(`${config.API_ENDPOINT}/owner/login`, body);

        const { status, message, owner } = response.data;

        setUser(owner, remember);

        return {
            status: status,
            message: message
        }

    } catch (e: any) {

        return {
            status: code.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong',
            error: e
        }
    }
}
