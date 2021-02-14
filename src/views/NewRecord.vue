<template>
  <div class="home" id="form">
    <div class="mb-3">
      <app-header> </app-header>
    </div>
    <h1 class="mt-3">New Record </h1>
    
    <form id="waterform" method="post">
      <div class="formgroup" id="message-form">
        <label for="title">Title of the Record</label>
        <input type="text" name="" id="title">
      </div>
      <div class="formgroup" id="message-form">
        <label for="doctor">Name of The Doctor</label>
        <input type="text" name="" id="doctor">
      </div>
      <div class="formgroup" id="message-form">
        <label for="D_date">Date of Diagnosis</label>
        <input type="date" name="" id="D_date">
      </div>
      <div class="formgroup" id="message-form">
        <label for="message">Diagnosis</label>
        <textarea id="message" name="message" placeholder="Describe in detail...."></textarea>
      </div>
      <div class="formgroup" id="message-form">
        <label for="message">Medicines Prescribed</label>
        <textarea id="message" name="message" placeholder="List all with dosage...."></textarea>
      </div>
      <div class="formgroup" id="message-form" style="padding-left: 200px; margin-top:15px;">
        <vs-button size="large">
        Submit
      </vs-button>
      </div>
    </form>
    
    
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
form{
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
      
    };
  }
};
</script>
<style scoped>
.mb-3 {
  margin-bottom: 3rem;
}
</style>
