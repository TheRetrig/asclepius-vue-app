<template>
  <div class="home">
    <div class="mb-3">
      <app-header> </app-header>
    </div>
    <h1>Your Profile</h1>

    <div class="frame">
      <div id="center">
        <div class="card">
          <div class="left">
            <div class="avatar">
              <div class="circle"></div>
              <div class="circle"></div>
              <img
                src="https://pbs.twimg.com/profile_images/894730722271010816/1g-2p3_m_400x400.jpg"
              />
            </div>
            <div class="info">
              <span class="big">salix dubois</span
              ><span class="small">programmer</span>
            </div>
            <div class="buttons">
              <button class="flw" @click="editProfile">edit</button>
            </div>
          </div>
          <div class="right">
            <div class="stats posts">
              <span class="big">523</span><span class="small">posts</span>
            </div>
            <div class="stats likes">
              <span class="big">1387</span><span class="small">likes</span>
            </div>
            <div class="stats flwrs">
              <span class="big">146</span><span class="small">followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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

@import url("https://fonts.googleapis.com/css?family=Open+Sans:700,600,300");
.frame {
  position: absolute;
  top: 40%;
  left: 50%;
  width: 400px;
  height: 400px;
  margin-top: -200px;
  margin-left: -200px;
  border-radius: 2px;
  box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background: linear-gradient(to bottom left, #2d6120, #bee6b4);
  background-size: 125% 125%;
  color: #2d6120;
  font-family: "Open Sans", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card {
  width: 320px;
  height: 300px;
  background: white;
  box-shadow: 4px 8px 16px 0 #1b3b14;
}
.card .left {
  position: absolute;
  left: 0;
  width: 190px;
  height: 300px;
  overflow: hidden;
}
.card .left .avatar {
  position: absolute;
  left: 60px;
  top: 32px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
  background: #bee6b4;
}
.card .left .avatar .circle {
  box-sizing: border-box;
  position: absolute;
  border-radius: 50%;
  transition: all 1.5s ease-in-out;
  border: 1px solid;
}
.card .left .avatar .circle:first-child {
  left: -3px;
  top: -3px;
  width: 76px;
  height: 76px;
  border-color: #2d6120 #2d6120 #2d6120 transparent;
}
.card .left .avatar .circle:nth-child(2) {
  left: -6px;
  top: -6px;
  width: 82px;
  height: 82px;
  border-color: #2d6120 transparent #2d6120 #2d6120;
}
.card .left .avatar:hover .circle:first-child {
  transform: rotate(360deg);
}
.card .left .avatar:hover .circle:nth-child(2) {
  transform: rotate(-360deg);
}
.card .left .avatar img {
  width: inherit;
  height: inherit;
  display: block;
  border-radius: inherit;
}
.card .left .info {
  position: absolute;
  text-align: center;
  top: 122px;
  width: 100%;
}
.card .left .info span {
  display: block;
}
.card .left .info span.small {
  top: 22px;
}
.card .left .buttons {
  position: absolute;
  text-align: center;
  bottom: 32px;
  width: 100%;
  height: 80px;
}
.card .left .buttons button {
  padding-top: 2px;
  text-transform: capitalize;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #2d6120;
  width: 120px;
  height: 26px;
  margin: 8px 0;
  background: white;
  border-radius: 15px;
  border: none;
  box-shadow: 0 0 0 1px #2d6120;
  cursor: pointer;
}
.card .left .buttons button:hover {
  background: #2d6120;
  color: white;
}
.card .right {
  position: absolute;
  right: 0;
  width: 130px;
  height: 300px;
}
.card .right .stats {
  position: relative;
  height: 100px;
  background: #cfecc7;
  box-shadow: 0 -1px white;
  cursor: pointer;
}
.card .right .stats:first-child {
  box-shadow: none;
}
.card .right .stats:hover {
  background: #bee6b4;
}
.card .right .stats span.big {
  top: 30px;
}
.card .right .stats span.small {
  top: 50px;
}

span {
  position: absolute;
  left: 0;
  width: 100%;
  text-transform: capitalize;
  text-align: center;
}
span.big {
  font-size: 18px;
  font-weight: 600;
}
span.small {
  font-size: 12px;
  font-weight: 300;
}
</style>


<script>
// @ is an alias to /src
import AppHeader from "../layout/AppHeader.vue";
//import { mapState } from "vuex";
import socket from "../utils/socket";

export default {
  name: "Profile",
  components: {
    AppHeader,
  },
  data() {
    return {
      active: false,
      name: "",
      did: "",
      userID: "",
      sessionID: "",
    };
  },
  methods: {
    editProfile() {
      let route = this.$router.resolve({ path: "/editprofile" });
      window.open(route.href, "_self");
    },
  },
  computed: {},
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
