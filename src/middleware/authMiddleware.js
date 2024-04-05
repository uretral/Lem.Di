import store from '@/store'

export default ({ to, from, redirect }) => {

    const userId = localStorage.getItem('userId')
    const userName = localStorage.getItem('userName')

    if(!userId) {
        redirect('/login')
    } else {
        store.commit('auth/loginSuccess', {
            name: userName,
            id: userId
        })
    }
}
