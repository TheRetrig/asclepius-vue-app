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
      style="margin-bottom:25px"
    />


    <div class="center grid">
      <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="3">
    {{this.$store.did}}
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6" class="mb-3">
       <vs-table>
        <template #header>
          <vs-input v-model="search" border placeholder="Search" />
        </template>
        <template #thead>
          <vs-tr  >
            <vs-th sort @click="users = $vs.sortData($event ,users, 'id')">
              ID
            </vs-th>
            <vs-th sort @click="users = $vs.sortData($event ,users, 'name')">
              Title
            </vs-th>
            <vs-th >
              Option
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getSearch(users, search)"
            :data="tr"
          >
            <vs-td>
              {{ tr.id }}
            </vs-td>
            <vs-td>
            {{ tr.name }}
            </vs-td>
            <vs-td>
               <vs-button gradient success  @click="myFunc(tr.id )" >
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
      
    </div>

    <hr />
    <br />
    <br />
    
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeader from "../layout/AppHeader.vue";

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
      search: '',
      users: [
          {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "website": "hildegard.org",
          },
          {
            "id": 2,
            "name": "Ervin Howell",
            "username": "Antonette",
            "email": "Shanna@melissa.tv",
            "website": "anastasia.net",
          },
          {
            "id": 3,
            "name": "Clementine Bauch",
            "username": "Samantha",
            "email": "Nathan@yesenia.net",
            "website": "ramiro.info",
          },
          {
            "id": 4,
            "name": "Patricia Lebsack",
            "username": "Karianne",
            "email": "Julianne.OConner@kory.org",
            "website": "kale.biz",
          },
          {
            "id": 5,
            "name": "Chelsey Dietrich",
            "username": "Kamren",
            "email": "Lucio_Hettinger@annie.ca",
            "website": "demarco.info",
          },
          {
            "id": 6,
            "name": "Mrs. Dennis Schulist",
            "username": "Leopoldo_Corkery",
            "email": "Karley_Dach@jasper.info",
            "website": "ola.org",
          },
          {
            "id": 7,
            "name": "Kurtis Weissnat",
            "username": "Elwyn.Skiles",
            "email": "Telly.Hoeger@billy.biz",
            "website": "elvis.io",
          },
          {
            "id": 8,
            "name": "Nicholas Runolfsdottir V",
            "username": "Maxime_Nienow",
            "email": "Sherwood@rosamond.me",
            "website": "jacynthe.com",
          },
          {
            "id": 9,
            "name": "Glenna Reichert",
            "username": "Delphine",
            "email": "Chaim_McDermott@dana.io",
            "website": "conrad.com",
          },
          {
            "id": 10,
            "name": "Clementina DuBuque",
            "username": "Moriah.Stanton",
            "email": "Rey.Padberg@karina.biz",
            "website": "ambrose.net",
          }
        ]
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
    myFunc(id){
      let route = this.$router.resolve({path: '/content/' + id});
      window.open(route.href, "_self");
    }
  },
  created:  () => {
   
  },
  computed: {
    getAuth() {
      return this.$store.getters.authstatus;
    },
    getProfile() {
      return this.$store.getters.profile;
    },
    getPost() {
      return this.$store.getters.post;
    }
  },
};
</script>
<style scoped>
.mb-3 {
  margin-bottom: 3rem;
}
</style>
