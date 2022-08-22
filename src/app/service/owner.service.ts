import { HttpStatusCode as code } from "../config/status";
import axios from "axios";
import config from "../config/config";
import {getUser} from "./auth.service";

export async function getOwnerProjects() {

    try {

        // Get current user id
        const user_id = getUser();

        // Create body request
        const body = {
            query: {
                owner: user_id
            }
        }

        // Make the request to get all the projects
        const response = await axios.post(`${config.API_ENDPOINT}/project/search`, body);

        const { status, result } = response.data;

        if (status !== code.OK) {

            return {
                status: status,
                message: response.data.message
            }
        }

        return {
            status: status,
            projects: result
        }

    } catch (e: any) {

        return {
            status: code.INTERNAL_SERVER_ERROR,
            message: e.message,
            error: e
        }


    }

}
