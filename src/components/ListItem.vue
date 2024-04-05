<template>
  <label :class="{active: !disabled}">
    <input type="text" autocomplete="off" :disabled="disabled" v-model="model" :class="status"/>
    <span>
      <button class="save" v-if="save && previous !== model" @click="saving"></button>
      <button class="cancel" v-if="save" @click="canceling"></button>
      <button class="edit" v-if="!save" @click="editing"></button>
      <button class="delete" v-if="!save" @click="confirmDeleting"></button>
    </span>
  </label>
</template>

<script>
import {EventBus} from "@/bus";

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    itemId: String,
    status: String,
    confirmEvent: String
  },
  data() {
    return {
      save: false,
      disabled: true,
      previous: null
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {

    /*states*/
    setPrevious() {
      this.previous = this.value
    },

    setModel() {
      this.model = this.previous
    },

    unsetDisabled() {
      this.disabled = true
      this.save = false
    },

    /*buttons*/

    editing() {
      this.disabled = false
      this.save = true
    },

    canceling() {
      this.unsetDisabled()
      this.setModel()
    },

    saving() {
      this.$emit('saving', this.itemId, this.model)
      this.unsetDisabled()
      this.setPrevious()
    },

    confirmDeleting() {
      EventBus.$emit('onPrompt',{
        title: `Удаление заметки - "${this.value.substring(0,30)} ..."`,
        message: 'Сейчас грохнешь заметку, а потом будешь жалеть. Она тебе точно не нужна?',
        eventAgree: this.confirmEvent,
        payload:  this.itemId
      })
    },
  },

  mounted() {
    this.setPrevious()
  }
}
</script>
