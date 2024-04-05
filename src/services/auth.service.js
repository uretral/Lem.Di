import axios from "axios";
import {EventBus} from "@/bus";

const API_URL = 'http://localhost:3000/users/';

class AuthService {

    add(user) {
        return axios
            .post(API_URL, {
                name: user.name,
                pass: user.pass,
            })
            .then(response => response.data)
            .catch(error => this.error(error))
    }

    filter(user) {
        return axios
            .get(`${API_URL}?${new URLSearchParams(user).toString()}`)
            .then(response => response.data)
            .catch(error => this.error(error))

    }

    logout() {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
    }

    error(error) {
        EventBus.$emit('notice', {
            type: 'error',
            title: 'Ошибка запроса',
            message: error.message
        })
    }

}

export default new AuthService()
