<template>

  <Section frame-class="login" row-class="login-row">

    <div class="login-header">
      <h1>Авторизация</h1>
      <p>Нам нужно знать кто ты, <br/> а то шляются тут всякие ;)</p>
    </div>

    <div class="login-form">
      <Label title="Твой логин.">
        <input type="text" v-model="name"/>
      </Label>

      <Label title="Твой pass.">
        <input type="password" v-model="pass"/>
      </Label>

      <button @click="login()">Авторизоваться</button>

    </div>

    <div class="login-footer">
      <p>Нет регистрации?
        <router-link to="register"> Тогда тебе сюда</router-link>
      </p>
    </div>

  </Section>

</template>

<script>
import Section from "@/components/frames/Section";
import Label from "@/components/form/Label";
import store from "@/store";
import userMixin from "@/mixins/user.mixin"

export default {
  name: "AuthView",

  mixins: [userMixin],

  components: {Label, Section},

  methods: {

    login() {
      if (this.user())
        store.dispatch('auth/login', this.user())
    }

  }
}
</script>
