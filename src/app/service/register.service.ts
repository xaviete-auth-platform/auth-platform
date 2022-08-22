import { Injectable } from '@angular/core';
import axios from "axios";
import config from "../config/config";

@Injectable()
export class RegisterService {

    userInformation = {
        personalInformation: {
            firstname: '',
            lastname: '',
            username: '',
        },
        emailInformation: {
            email: ''
        },
        passwordInformation: {
            password: ''
        }
    };

    getUserInformation() {
        return this.userInformation;
    }

    validateEmailInformationStep() {
        return this.userInformation.personalInformation.firstname == '' ||
            this.userInformation.personalInformation.lastname == '' ||
            this.userInformation.personalInformation.username == '';
    }

    validatePasswordInformationStep() {
        return this.userInformation.emailInformation.email === '';
    }

    async validateEmail(email: string) {

        try {

            const body = {
                email: email
            }

            const response = await axios.post(`${config.API_ENDPOINT}/email/verify/`, body);
            return response.data;

        } catch (e: any) {

            return {
                status: 500,
                message: e.message,
                error: e
            }

        }

    }

    async verifyCode(code: string, email: string) {

            try {

                const body = {
                    code: code,
                    email: email
                }

                const response = await axios.post(`${config.API_ENDPOINT}/owner/verify/code`, body);
                return response.data;

            } catch (e: any) {

                return {
                    status: 500,
                    message: 'Something went wrong. Please try again.',
                    error: e
                }
            }

    }

    async saveUser() {

        try {

            const {firstname, lastname, username} = this.userInformation.personalInformation;
            const {email} = this.userInformation.emailInformation;
            const {password} = this.userInformation.passwordInformation;

            const body = {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password
            }

            const response = await axios.post(`${config.API_ENDPOINT}/owner/register`, body);
            return response.data;

        } catch (e: any) {

            return {
                status: 500,
                message: 'Something went wrong. Please try again.',
                error: e
            }

        }


    }

}
