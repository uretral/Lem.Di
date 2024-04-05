<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>


<script>
import Header from "@/components/frames/Header";
import Footer from "@/components/frames/Footer";

export default {
  components: {Footer, Header}
};
</script>
<style lang="less">
//@import "vue-select/dist/vue-select.css";
//@import "vue-multiselect/dist/vue-multiselect.min.css";
@import "@/assets/less/app.less";

</style>
