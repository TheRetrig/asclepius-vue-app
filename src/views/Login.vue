<template>
  <div class="home">
    <div class="center" style="margin-top: 250px">
      <img
      alt="Vue logo"
      src="../../public/Asset1@3x.png"
      width="250px"
      style="margin-bottom:25px"
    />
    </div>
    <div class="center grid">
      <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="5">
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="1" class="mb-3">
      <div class="div" style="margin: 100px 100px">
        <vs-button
          size="xl"
          @click="auth"
        >
          LOGIN
        </vs-button>
      </div>
      </vs-col>
    </vs-row>
    </div>
    
  </div>
</template>

<script>

export default {
  name: "Login",
  components: {
  },
  data() {
    return {
      active: true,
      
    };
  },
  methods: {
    openLoading() {
      const loading = this.$vs.loading();
      setTimeout(() => {
        loading.close();
      }, 11000);
    },
    async auth() {
      //const vs = this.$vs;
      let boolean = await this.$store.dispatch("ceramicAuth");
      if(boolean){
        let route = this.$router.resolve({path: '/'});
         setTimeout(() => {
         // loading.close();
          window.open(route.href, "_self")
        }, 9500)
        
      }
    }
    
  },
  computed: {
    getAuth() {
      return this.$store.getters.authstatus;
    }
  },
};
</script>
<style scoped>

.center{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
