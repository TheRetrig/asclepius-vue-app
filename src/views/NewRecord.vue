<template>
  <div class="home" id="form">
    <div class="mb-3">
      <app-header> </app-header>
    </div>
    <h1 class="mt-3">New Record </h1>
    
    <div id="waterform">
      <div class="formgroup" id="message-form">
        <label for="title">Title of the Record</label>
        <input type="text" name="" id="title" v-model="record.title" placeholder="Title">
      </div>
      <div class="formgroup" id="message-form">
        <label for="doctor">Name of The Doctor</label>
        <input type="text" name="" id="doctor" v-model="record.doctor" placeholder="Name of the Doctor">
      </div>
      <div class="formgroup" id="message-form">
        <label for="D_date">Date of Diagnosis</label>
        <input type="date" name="" id="D_date" v-model="record.dateDiagnosis">
      </div>
      <div class="formgroup" id="message-form">
        <label for="message">Diagnosis</label>
        <textarea id="message" name="message" v-model="record.diagnosis" placeholder="Describe in detail...."></textarea>
      </div>
      <div class="formgroup" id="message-form">
        <label for="message">Medicines Prescribed</label>
        <textarea id="message" name="message" v-model="record.medicines" placeholder="List all with dosage...."></textarea>
      </div>
      <div class="formgroup" id="message-form" style="padding-left: 200px; margin-top:15px;">
        <vs-button size="large" @click="newRecord">
        Submit
      </vs-button>
      </div>
    </div>
    
    
  </div>
</template>

<style scoped>

h1{
	font-weight: normal;
	font-size: 4em;
	margin: 0 auto;
	margin-top: 100px;
	width: 500px;
	text-align: center;
}

#form{
	height: 100%;	
	overflow: hidden;
	position: relative;
	
}
div#waterform{
	margin: 0 auto;
	width: 500px;
	padding-top: 40px;
	color: black;
	position: relative;
	
}
label, input, textarea{
	display: block;	
}
input, textarea{
	width: 500px;	
	border: none;
	border-radius: 10px;
	outline: none;
	padding: 10px;
	font-size: 1em;
	color: #000;
	transition: border 0.5s;
	-webkit-transition: border 0.5s;
	-moz-transition: border 0.5s;
	-o-transition: border 0.5s;
	border: solid 1px #c0c0c0;	
	-webkit-box-sizing:border-box;
	-moz-box-sizing:border-box;
	box-sizing:border-box;
  background-color: rgb(252, 250, 250);
	
}
input:focus, textarea:focus{
	border: solid 1.5px #acabab;	
}

textarea{
	height: 100px;	
	resize: none; 
	overflow: auto;
}

label{
	margin-top: 20px;
  text-align: left;
  padding-bottom: 10px;
}
.formgroup, .formgroup-active, .formgroup-error{
	width: 566px;
	padding-top: 2px;
}

</style>

<script>
// @ is an alias to /src
import AppHeader from "../layout/AppHeader.vue";

export default {
  name: "NewRecord",
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
      profile: {},
      search: '',
      record: {
        date: new Date().toISOString(),
        title: "",
        doctor: "",
        dateDiagnosis: "", 
        medicines: "",
        diagnosis: "",
      }
      
    };
  },
  methods: {
    openLoading() {
      const loading = this.$vs.loading();
      setTimeout(() => {
        loading.close();
      }, 11000);
    },
    async newRecord(){
      const loading = this.$vs.loading();
      let record2 = this.record;
      console.log(record2);
      await this.$store.dispatch("encryptStore", {record: record2});
      let route = this.$router.resolve({path: '/'});
      setTimeout(() => {
        loading.close();
        window.open(route.href, "_self");
      }, 3000);
    }
  }
};
</script>
<style scoped>
.mb-3 {
  margin-bottom: 3rem;
}
</style>
