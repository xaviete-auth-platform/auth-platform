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

        const response = await axios.post(`${config.API_ENDPOINT_TEST}/owner/login`, body);

        const { status, message, owner } = response.data;

        setUser(owner, remember);

        return {
            status: status,
            message: message
        }

    } catch (e: any) {

        const { status, message } = e.response.data;

        if (status === code.INTERNAL_SERVER_ERROR) {

            return {
                status: code.INTERNAL_SERVER_ERROR,
                message: e.message,
                error: e
            }
        }

        return {
            status: status,
            message: message
        }
    }
}
