import {EventBus} from "@/bus";

export default {
    data() {
        return {
            name: '',
            pass: '',
        }
    },

    methods: {
        user() {
            let name = this.validateName()
            let pass = this.validatePass()

            return name && pass ? {name, pass} : null
        },

        validateName() {
            if (this.name.length < 6) {
                EventBus.$emit('notice', {
                    type: 'warn',
                    title: 'Некорректный логин',
                    message: 'Логин должен содержать не менее 6 символов'
                })
                return false
            }

            return this.name;
        },

        validatePass() {
            if (this.pass.length < 6) {
                EventBus.$emit('notice', {
                    type: 'warn',
                    title: 'Некорректный пароль',
                    message: 'Пароль должен содержать не менее 6 символов'
                })
                return false
            }

            return this.pass
        }
    }
}


