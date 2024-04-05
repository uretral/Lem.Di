import router from "@/router";
import TodoService from "@/services/todo.service";
import {EventBus} from "@/bus";
import store from "@/store/index";

export const todo = {

    namespaced: true,

    state: {
        list: [],
        statuses: [
            {
                status: 'new',
                label: 'Новое'
            },
            {
                status: 'done',
                label: 'Выполнено'
            },
            {
                status: 'cancel',
                label: 'Отменено'
            },
        ]
    },
    getters: {
        list: state => {
            return state.list
        },

        statuses: state => {
            return state.statuses
        }
    },
    mutations: {
        list(state, todoArray) {
            state.list = todoArray
        }
    },
    actions: {
        list({commit}, userObject) {
            TodoService.get(userObject).then(response => commit('list', response))
        },

        add({commit}, complexObject) {
            TodoService.add(complexObject).then(response => commit('list', response))
        },

        update({commit}, complexObject) {
            TodoService.update(complexObject).then(response => commit('list', response))
        },

        delete({commit}, item) {
            TodoService.delete(item).then(response => commit('list', response))
        }
    }
}
