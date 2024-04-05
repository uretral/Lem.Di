<template>
  <div class="select" :class="{active}"  @mouseleave="dropped" >
    <div class="select-title"  @click="active = !active">
      <slot></slot>
    </div>
    <div class="select-options" @mouseleave="dropped">
      <div class="select-option" v-for="option in options" :key="option.status" @click="selected(option.status)">
        <span>{{option.label}}</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    options: Array,
    item: Object
  },
  data() {
    return {
      active: false
    }
  },
  methods: {
    selected(status) {
      this.$emit('selected', {
        status,
        id: this.item.id
      })
      this.active = false
    },
    dropped() {
      this.active = false
    }
  }

}
</script>
