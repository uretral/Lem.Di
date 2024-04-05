<template>
  <section :class="frameClass">
    <div>
      <div :class="rowClass">
        <slot></slot>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  name: "Section",
  props: {
    frameClass: String,
    rowClass: String,
  }
}
</script>
