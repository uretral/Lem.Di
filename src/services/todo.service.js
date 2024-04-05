import axios, {patch} from "axios";
import {EventBus} from "@/bus";

const API_URL = 'http://localhost:3000/todo/';

class TodoService {

    /**
     * @param userIdObject
     * @returns {Promise<axios.AxiosResponse<any> | void>}
     */
    get(userIdObject) {
        return axios
            .get(`${API_URL}?${new URLSearchParams(userIdObject).toString()}`)
            .then(response => response.data)
            .catch(error => this.error(error))
    }

    /**
     * @param todoObject
     * @returns {Promise<axios.AxiosResponse<any> | void>}
     */
    post(todoObject) {
        return axios.post(API_URL, todoObject)
            .then(response => {
                if (response.data)
                    this.success(response.data, 'Добавлена новая задача')
                return response.data
            })


            .catch(error => this.error(error))
    }

    /**
     * @param complexObject
     * @returns {Promise<axios.AxiosResponse<any> | void>}
     */
    patch(complexObject) {
        return axios.patch(API_URL + complexObject.id, complexObject.todo)
            .then(response => {
                if (response.data)
                    this.success(response.data, 'Изменена задача #' + complexObject.id)
                return response.data
            })
            .catch(error => this.error(error))
    }

    /**
     * @param id
     * @returns {Promise<axios.AxiosResponse<any> | void>}
     */
    del(id) {
        return axios.delete(API_URL + id)
            .then(response => {
                if (response.data)
                    this.success(response.data, 'Удалена задача #' + id)
                return response.data
            })
            .catch(error => this.error(error))
    }

    async add(complexObject) {
        await this.post(complexObject.todo)
        return await this.get(complexObject.user)
    }

    async update(complexObject) {
        await this.patch(complexObject)
        return await this.get(complexObject.user)
    }

    async delete(complexObject) {
        await this.del(complexObject.id)
        return await this.get(complexObject.user)
    }

    error(error) {
        EventBus.$emit('notice', {
            type: 'error',
            title: 'Ошибка запроса',
            message: error.message
        })
    }

    success(response, title) {
        EventBus.$emit('notice', {
            type: 'success',
            title: title,
            message: response.label,
            show: 2000
        })
    }

}

export default new TodoService()
