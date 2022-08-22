import { Injectable } from '@angular/core';
import {HttpStatusCode as code} from "../config/status";
import axios from "axios";
import config from "../config/config";
import {getUser} from "./auth.service";

@Injectable()
export class ProjectService {

    projectInformation = {
        detailsInformation: {
            name: ''
        },
        settingsInformation: {},
        confirmationInformation: {
            token: ''
        }
    };

    getProjectInformation() {
        return this.projectInformation;
    }

    setUserInformation(projectInformation: any) {
        this.projectInformation = projectInformation;
    }

    async saveProject() {

        try {

            const user_id = getUser();

            const {name} = this.projectInformation.detailsInformation;

            const body = {
                name: name,
                owner: user_id,
                settings: {}
            };

            const response = await axios.post(`${config.API_ENDPOINT}/project/create`, body);

            if (response.status !== code.CREATED) {
                return {
                    status: response.status,
                    message: response.data.message
                };
            }

            this.projectInformation.confirmationInformation.token = response.data.token;

            return {
                status: code.CREATED,
                data: response.data,
                projectToken: response.data.token
            };

        } catch (e: any) {

            return {
                status: code.INTERNAL_SERVER_ERROR,
                message: e.message,
                error: e
            }

        }

    }

}
