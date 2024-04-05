<template>
  <div class="notice" :class="notice.type" v-if="notice">
    <a href="javascript:" @click="close"></a>
    <div class="notice-title">
      {{ notice.title }}
    </div>
    <div class="notice-content">
      {{ notice.message }}

    </div>
  </div>
</template>

<script>
import {EventBus} from "@/bus";

export default {
  name: "Notice",
  data() {
    return {
      notice: null,
    }
  },

  methods: {
    fireNotice(notice) {
      this.notice = notice
      setTimeout(() => this.notice = null, 2000);
    },

    close() {
      this.notice = null
    }

  },
  mounted() {
    EventBus.$on('notice', (ob) => {
      this.notice = null
      this.fireNotice(ob)
    })
  },
  beforeDestroy() {
    EventBus.$off('notice')
  }
}
</script>
