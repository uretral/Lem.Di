<template>
  <label :class="classes">
    <span v-if="title">{{title}}</span>
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: "Label",
  props: {
    classes : String,
    title: String
  }
}
</script>
