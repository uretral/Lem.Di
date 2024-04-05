<template>
  <header>
    <div>
      <div>

        <div class="header">

          <router-link class="header-logo" to="/">TODO.APP</router-link>

          <div class="header-user">

            <template v-if="userName">

              <img src="~@/assets/icons/user-heart.svg" alt="user">
              <div class="header-user_settings">
                <span>{{ userName }}</span>
                <a href="javascript:" @click="logout">Выйти </a>
              </div>

            </template>

            <template v-else>

              <img src="~@/assets/icons/user-block.svg" alt="user">

            </template>

          </div>

          <Notice/>

          <Prompt/>

        </div>

      </div>
    </div>
  </header>

</template>

<script>
import store from "@/store";
import Notice from "@/components/frames/Notice";
import Prompt from "@/components/frames/Prompt";

export default {

  components: {Prompt, Notice},

  computed: {

    userName: () => store.getters["auth/userName"]

  },

  methods: {

    logout() {
      store.dispatch('auth/logout')
    }

  }

}

</script>
