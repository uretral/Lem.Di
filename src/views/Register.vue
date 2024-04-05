<template>
  <Section frame-class="login" row-class="login-row">

    <div class="login-header">
      <h1>Регистрация</h1>
      <p>Стань своим навсегда ;)</p>
    </div>

    <div class="login-form">
      <Label title="Твой логин, запомни его.">
        <input type="text" v-model="name"/>
      </Label>

      <Label title="Придумай что нибудь, не меньше 6 символов.">
        <input type="password" v-model="pass"/>
      </Label>

      <button @click="register">Зарегистрироваться</button>

    </div>

    <div class="login-footer">
      <p>Есть учётка?
        <router-link to="login"> Тогда логинься</router-link>
      </p>
    </div>

  </Section>
</template>

<script>
import Section from "@/components/frames/Section";
import Label from "@/components/form/Label";
import store from '@/store'
import userMixin from "@/mixins/user.mixin";

export default {

  name: "Register",

  mixins: [userMixin],

  components: {Section, Label},

  methods: {

    register() {
      if (this.user())
        store.dispatch('auth/register', this.user())
    }

  }
}
</script>
