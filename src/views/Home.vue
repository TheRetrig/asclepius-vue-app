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

    <div class="center"></div>

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

export default {
  name: "Home",
  components: {
    AppHeader,
  },
  data() {
    return {
      active: 0,
      seed: "",
      text: "",
      name: "",
      homeLocation: "",
      url: "",
      bio: "",
      records: [],
      search: "",
      socketUserID: "",
    };
  },
  methods: {
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
    sessionIDstore(takeID){
      this.socketUserID = takeID;
    },
    async myFunc(id) {
      await this.$store.dispatch("decryptHR", { id });
      let route = this.$router.resolve({ path: "/content/" + id });
      setTimeout(() => {
        window.open(route.href, "_self");
      }, 10000);
    },
    async retrieveDispatch(Pname, cid){
       
      let payload = {
        cid: cid,
        name: Pname
      };
      console.log(payload);
      const loading = this.$vs.loading();
      await this.$store.dispatch("retireve", payload);
      setTimeout(() => {
        loading.close();
      }, 3000);
    }
  },
  created() {
    const sessionID = localStorage.getItem("sessionID");

    if (sessionID != undefined) {
      socket.auth = { sessionID };
      socket.connect();
    } else {
      socket.auth = { did: this.did };
      socket.connect();

      console.log(socket.id)
      let takeID = socket.id.slice()
      this.sessionIDstore(takeID)

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
      this.retrieveDispatch(Pname, cid)
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
