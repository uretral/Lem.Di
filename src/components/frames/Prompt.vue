<template>

  <Section class="prompt" :class="{active}">
    <div class="prompt-box">
      <div class="prompt-header">
        <b>{{ prompt?.title }}</b>
      </div>
      <div class="prompt-body">
        <p>{{ prompt?.message }}</p>
      </div>
      <div class="prompt-footer">
        <button class="prompt-agree" @click="agree">Согласен ;)</button>
        <button class="prompt-cancel" @click="disagree">Отмена :(</button>
      </div>
    </div>
  </Section>

</template>


<script>
import Section from "@/components/frames/Section";
import {EventBus} from "@/bus";

export default {
  components: {Section},
  data() {
    return {
      prompt: {
        type: Object,
        default: null
      },
      active: false
    }
  },

  methods: {
    firePrompt(prompt) {
      this.prompt = prompt
    },
    agree() {
      EventBus.$emit(this.prompt.eventAgree, this.prompt.payload)
      this.active = false
    },
    disagree() {
      if (Object.prototype.hasOwnProperty.call(this.prompt,'eventDisagree')) {
        EventBus.$emit(this.prompt['eventDisagree'])
      }
      this.active = false
    }
  },
  mounted() {
    EventBus.$on('onPrompt', (payload) => {
      if (payload) {
        this.firePrompt(payload)
        this.active = true
      }
    })
  },
  beforeDestroy() {
    EventBus.$off('onPrompt')
  }
}
</script>
