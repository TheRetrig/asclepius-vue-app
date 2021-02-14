<template>
  <div class="center examplex">
    <vs-navbar  :color="active" center-collapsed v-model="active">
      <template #left>
        <vs-navbar-item> Asclepius </vs-navbar-item>
        <vs-navbar-item> Home </vs-navbar-item>
      </template>
      <template #right>
        <vs-button primary @click="newRecord">New Record</vs-button>
      </template>
    </vs-navbar>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      active: "#ffb000",
    };
  },
  methods: {
    auth() {
      this.$store.dispatch("ceramicAuth");
    },
    newRecord() {
      let route = this.$router.resolve({path: '/new'});
      window.open(route.href);
    },
  },
};
</script>

<style>
</style>