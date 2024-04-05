import AuthService from "@/services/auth.service";
import router from "@/router";
import {EventBus} from "@/bus";

const USER_ID = 'userId'
const USER_NAME = 'userName'

export const auth = {

    namespaced: true,

    state: {

        isLoggedIn: false,

        userName: null,

        userId: null

    },
    getters: {

        isLoggedIn: state => {
            return state.isLoggedIn
        },

        userName: state => {
            return state.userName
        },

        userId: (state) => {
            // return localStorage.getItem('userId')
            return state.userId
        }

    },
    mutations: {

        loginSuccess(state, user) {
            state.isLoggedIn = true
            state.userName = user.name
            state.userId = user.id
        },

        logout(state) {
            state.loggedIn = false;
            state.userName = null;
            router.push({name: 'login'}).then()
        }

    },
    actions: {

        login({commit}, user) {
            return AuthService.filter(user).then(response => {
                if (Object.keys(response).length) {

                    localStorage.setItem(USER_ID, response[0].id)
                    localStorage.setItem(USER_NAME, response[0].name)
                    commit('loginSuccess', response[0])
                    router.push({name: 'list'}).then()

                } else {

                    EventBus.$emit('notice', {
                        type: 'warn',
                        title: 'Не найден пользователь',
                        message: 'Пользователь с таким логином или паролем не найден'
                    })

                }
            })
        },

        logout({commit}) {
            AuthService.logout();
            commit('logout');
        },

        register({commit}, user) {
            AuthService.add(user).then(response => {
                localStorage.setItem(USER_ID, response['id'])
                localStorage.setItem(USER_NAME, response['name'])
                commit('loginSuccess', response)
                router.push({name: 'list'}).then()
            })
        }
    }
}
