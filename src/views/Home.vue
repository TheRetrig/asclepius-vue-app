<template>
  <div class="home">
    <div class="mb-3">
      <app-header> </app-header>
    </div>
    <h1>All your Health Records will appear here</h1>
    <img
      alt="Vue logo"
      src="../../public/Asset1@3x.png"
      width="250px"
      style="margin-bottom: 25px"
    />

    <div class="center grid">
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="3">
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          w="6"
          class="mb-3"
        >
          <h4>Your DID : {{ did }}</h4>
          <h4>Your Session ID : {{ socketUserID }}</h4>
          <div class="center mb-3" v-if="socketUserID != null">
            <vs-button @click="active = !active"> Open Dialog </vs-button>
          </div>
          <vs-table>
            <template #header>
              <vs-input v-model="search" border placeholder="Search" />
            </template>
            <template #thead>
              <vs-tr>
                <vs-th
                  sort
                  @click="recordsList = $vs.sortData($event, recordsList, 'id')"
                >
                  ID
                </vs-th>
                <vs-th
                  sort
                  @click="
                    recordsList = $vs.sortData($event, recordsList, 'title')
                  "
                >
                  Title
                </vs-th>
                <vs-th> Option </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getSearch(recordsList, search)"
                :data="tr"
              >
                <vs-td>
                  {{ tr.id }}
                </vs-td>
                <vs-td>
                  {{ tr.title }}
                </vs-td>
                <vs-td>
                  <vs-button gradient success @click="myFunc(tr.id)">
                    Open
                  </vs-button>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vs-col>
      </vs-row>
    </div>

    <div class="center">
      <vs-dialog v-model="active">
        <template #header>
          <h4 class="not-margin">QR COde <b>Generator</b></h4>
        </template>

        <div class="con-form">
          <canvas id="canvas"></canvas>
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button block @click="createQRCode"> Generate QR Code </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>

    <hr />
    <br />
    <br />
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeader from "../layout/AppHeader.vue";
import { mapState } from "vuex";
import socket from "../utils/socket";
import QRcode from 'qrcode'

export default {
  name: "Home",
  components: {
    AppHeader,
  },
  data() {
    return {
      active: false,
      records: [],
      search: "",
      socketUserID: "",
    };
  },
  methods: {
    createQRCode(){
      console.log(this.socketUserID)
      console.log(this.did)
      let text = JSON.stringify({sessionID: this.socketUserID, did: this.did})
      let canvas = document.getElementById('canvas')

      QRcode.toCanvas(canvas, text, function(err) {
        if(err) console.error(err);
        console.log('successfully generated QR Code')
      })
    },
    openLoading() {
      const loading = this.$vs.loading();
      setTimeout(() => {
        loading.close();
      }, 3000);
    },
    auth() {
      this.$store.dispatch("ceramicAuth");
    },
    publish() {
      const loading = this.$vs.loading();
      let seed = this.seed;
      let text = this.text;
      this.$store.dispatch("publish", { seed, text, loading });
    },
    updateProfile() {
      const loading = this.$vs.loading();
      console.log(this.profile);
      this.$store.dispatch("updateProfile", { profile: this.profile, loading });
    },
    fetch() {
      const loading = this.$vs.loading();
      this.$store.dispatch("fetchSky", { seed: this.seed, loading });
    },
    sessionIDstore(takeID) {
      this.socketUserID = takeID;
    },
    async myFunc(id) {
      await this.$store.dispatch("decryptHR", { id });
      let route = this.$router.resolve({ path: "/content/" + id });
      setTimeout(() => {
        window.open(route.href, "_self");
      }, 10000);
    },
    async retrieveDispatch(Pname, cid) {
      let payload = {
        cid: cid,
        name: Pname,
      };
      console.log(payload);
      const loading = this.$vs.loading();
      await this.$store.dispatch("retireve", payload);
      setTimeout(() => {
        loading.close();
      }, 3000);
    },
  },
  created() {
    const sessionID = localStorage.getItem("sessionID");

    if (sessionID != undefined) {
      socket.auth = { sessionID };
      socket.connect();
    } else {
      socket.auth = { did: this.did };
      socket.connect();

      console.log(socket.id);

      socket.on("session", ({ sessionID, userID }) => {
        // attach the session ID to the next reconnection attempts
        socket.auth = { sessionID };
        // store it in the localStorage
        localStorage.setItem("sessionID", sessionID);
        // save the ID of the user
        socket.userID = userID;
      });
    }

    socket.on("connect", () => {
      this.socketUserID = socket.id;
      console.log(socket.id);
    });

    socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      socket.userID = userID;
    });

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    });

    socket.on("private message", ({ Pname, cid, from }) => {
      console.log("From: " + from);
      console.log("Content");
      console.log(Pname);
      console.log(cid);
      this.retrieveDispatch(Pname, cid);
    });

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    console.dir(socket);
  },
  destroyed() {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("private message");
  },
  computed: {
    ...mapState(["recordsList", "did", "ethaddress"]),
  },
};
</script>
<style scoped>
.mb-3 {
  margin-bottom: 3rem;
}
</style>
