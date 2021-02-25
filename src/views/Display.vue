<template>
  <div class="home">
    <div class="mb-3">
      <app-header> </app-header>
    </div>
    <h1>Viewing Your Health Record</h1>

    <div class="content">
      <h3>Title: {{ currentRecord.title }}</h3>
      <h4>Date of Diagnosis: {{ currentRecord.dateDiagnosis }}</h4>
      <h4>Name of the Doctor: {{ currentRecord.doctor }}</h4>
      <h4>Diagnosis</h4>
      <p>{{ currentRecord.diagnosis }}</p>
      <h4>Medicines</h4>
      <p>{{ currentRecord.medicines }}</p>
      <h6>Document Created On: {{ currentRecord.date }}</h6>
      <h6>CID: {{ $route.params.id }} <small>(IPFS Doc ID)</small></h6>

      <div style="padding: 0px 200px; display: block">
        <div class="grid">
          <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
              <vs-button @click="home">
                <i class="bx bx-home-alt"></i> Home
              </vs-button>
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
              <vs-button @click="active = !active"> Share </vs-button>
            </vs-col>
          </vs-row>
        </div>
      </div>
    </div>

    <vs-dialog v-model="active">
      <template #header>
        <h4 class="not-margin">Sharing Health Record</h4>
      </template>

      <div
        class="con-form"
        style="width: 400px; text-align: center; padding: 0px 0px"
      >
        <p>
          Enter the exact DID of the doctor you wish to share your health record
          with. Note this action cannot be reveresed by you.
        </p>
        <div
          class="formgroup"
          style="display: block; align-items: center; padding: 20px 100px"
        >
          <vs-input placeholder="Name" v-model="name">
            <template #icon> @ </template>
          </vs-input>
          <br />
          <vs-input placeholder="DID" v-model="did">
            <template #icon> DID </template>
          </vs-input>
          <br />
          <vs-input placeholder="Session ID" v-model="sessionID">
            <template #icon> ID </template>
          </vs-input>
        </div>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block @click="shareDoc"> Confirm and Submit </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<style scoped>
h1 {
  font-weight: normal;
  font-size: 2.5em;
  margin: 25px auto;
  margin-top: 100px;
  width: 800px;
  text-align: center;
}

.content {
  margin: 0 auto;
  width: 600px;
  padding-top: 40px;
  color: black;
  position: relative;
  text-align: left;
}
</style>


<script>
// @ is an alias to /src
import AppHeader from "../layout/AppHeader.vue";
import { mapState } from "vuex";
import socket from "../utils/socket"

export default {
  name: "Display",
  components: {
    AppHeader,
  },
  data() {
    return {
      active: false,
      name: "",
      did: "",
      userID: "",
      sessionID: ""
    };
  },
  methods: {
    home() {
      let route = this.$router.resolve({ path: "/" });
      window.open(route.href, "_self");
    },
    async shareDoc() {
      let payload = {
        did: this.did,
        name: this.name,
        record: this.currentRecord,
        sessionID: this.sessionID
      };
      console.log(payload);
      const loading = this.$vs.loading();
      await this.$store.dispatch("shareDoc", payload);
      setTimeout(() => {
        loading.close();
        this.active = false;
      }, 3000);
    },
  },
  computed: {
    ...mapState(["currentRecord"]),
  },
  created() {
    const sessionID = localStorage.getItem("sessionID");

    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }
    
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    });

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    console.dir(socket);

    socket.on("private message", ({ content, from }) => {
      console.log("From: " + from);
      console.log("Content");
      console.log(content);
    });
  },
};
</script>
<style scoped>
.mb-3 {
  margin-bottom: 3rem;
}
</style>
