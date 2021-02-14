<template>
  <div class="home">
    <div class="mb-3">
      <app-header> </app-header>
    </div>
    <h1>Viewing Your Health Record</h1>

    <div class="content">
      <h3>Title: This is a title</h3>
      <h4>Date of Diagnosis: </h4>
      <h4>Name of the Doctor: </h4>
      <h5>Document Created On:</h5>
      <h5>CID: byefhdjdhkdsjchsk <small>(This is the IPFS Doc ID)</small></h5>
      <h4>Diagnosis</h4>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam impedit error sunt vero quia facilis rem provident ea tenetur neque. Nihil placeat autem ducimus vitae debitis sit perspiciatis sunt maiores.</p>
      <h4>Medicines</h4>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam impedit error sunt vero quia facilis rem provident ea tenetur neque.</p>

      <div style="padding: 0px 200px; display: block;">
        <div class="grid">
          <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
               <vs-button>
                  <i class="bx bx-home-alt"></i> Home
                </vs-button>
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
              <vs-button @click="active=!active">
                 Share
               </vs-button>
            </vs-col>
          </vs-row>
        </div>
      </div>
    </div>
   
    
    <vs-dialog v-model="active">
        <template #header>
          <h4 class="not-margin">
            Sharing Health Record
          </h4>
        </template>


        <div class="con-form" style="width: 400px; text-align:center; padding: 0px 0px;">
          <p>Enter the exact DID of the person you wish to share your health record with. Note this action cannot be reveresed by you.</p>
          <div class="formgroup" style="display: block; align-items: center; padding: 20px 100px;">
          <vs-input v-model="email" placeholder="Name" >
            <template #icon>
              @  
            </template>
          </vs-input>
          <br>
          <vs-input v-model="email" placeholder="DID" >
            <template #icon>
              DID  
            </template>
          </vs-input>
          </div>
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button block>
              Confirm and Submit
            </vs-button>

            
          </div>
        </template>
      </vs-dialog>  
  </div>
</template>

<style scoped>
  h1{
	font-weight: normal;
	font-size: 2.5em;
	margin: 25px auto;
	margin-top: 100px;
	width: 800px;
	text-align: center;
}

.content{
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

export default {
  name: "Display",
  components: {
    AppHeader,
  },
  data() {
    return {
      active: false,
      seed: "",
      text: "",
      name: "",
      homeLocation: "",
      url: "",
      bio: "",
      profile: {},
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
  }
};
</script>
<style scoped>
.mb-3 {
  margin-bottom: 3rem;
}
</style>
