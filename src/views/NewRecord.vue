<template>
  <div class="home" id="form" >
    <div class="mb-3">
      <app-header> </app-header>
    </div>
    <mdb-card class="mdb-card" :style="{'backgroundImage': 'url(https://images.unsplash.com/photo-1511468102400-883d6ea28755?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)'}">
    <mdb-row>
    <mdb-col md="6" class="desc" >
      <div class="align-baseline">Enter Details for the record</div>
      <p class="text-justify ">Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet
    fermentum. Donec sed odio operae,
    eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis
    piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium
    purus sit amet fermentum.</p>
    </mdb-col>
    <mdb-col md="6">
      <div class="form-dark">
    <mdb-row>
      <mdb-col md="5">
        <mdb-card class="card-image d-flex justify-content-center" :style="{'backgroundImage': 'url(https://mdbootstrap.com/img/Photos/Others/pricing-table7.jpg)', 'width': '28rem'}">
          <div class="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
            <div class="text-center">
              <h3 class="white-text mb-5 mt-4 font-weight-bold"><strong>SIGN</strong> <a class="green-text font-weight-bold"><strong> UP</strong></a></h3>
            </div>
            <mdb-input label="Your email" type="text"/>
            <mdb-input label="Your password" type="password"/>
            <mdb-input class="my-5" type="checkbox" id="defaultCheck17" label="Accept the Terms and Conditions" />
            <mdb-row class="d-flex align-items-center mb-4">
              <div class="text-center mb-3 col-md-12">
                <mdb-btn color="success" rounded type="button" class="btn-block z-depth-1">Sign in</mdb-btn>
              </div>
            </mdb-row>
            <mdb-col md="12">
              <p class="font-small white-text d-flex justify-content-end">Have an account? <a href="#" class="green-text ml-1 font-weight-bold"> Log in</a></p>
            </mdb-col>
          </div>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </div>

    </mdb-col>
    </mdb-row>
    </mdb-card>
    </div>
    
</template>


<style scoped>
.mdb-card{
  padding: 2rem;
}
.desc{
  padding: 2rem;
}
h1{
	font-weight: normal;
	font-size: 4em;
	margin: 0 auto;
	margin-top: 100px;
	width: 500px;
	text-align: center;
}
.home{
  background: 'url(https://mdbootstrap.com/img/Photos/Others/pricing-table7.jpg)'
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
.form-dark .font-small {
    font-size: 0.8rem; }

  .form-dark [type="radio"] + label,
  .form-dark [type="checkbox"] + label {
    font-size: 0.8rem; }

  .form-dark [type="checkbox"] + label:before {
    top: 2px;
    width: 15px;
    height: 15px; }

  .form-dark .md-form label {
    color: #fff; }

  .form-dark input[type=text]:focus:not([readonly]) {
    border-bottom: 1px solid #00C851;
    -webkit-box-shadow: 0 1px 0 0 #00C851;
    box-shadow: 0 1px 0 0 #00C851; }

  .form-dark input[type=text]:focus:not([readonly]) + label {
    color: #fff; }

  .form-dark input[type=password]:focus:not([readonly]) {
    border-bottom: 1px solid #00C851;
    -webkit-box-shadow: 0 1px 0 0 #00C851;
    box-shadow: 0 1px 0 0 #00C851; }

  .form-dark input[type=password]:focus:not([readonly]) + label {
   color: #fff; }

  .form-dark input[type="checkbox"] + label:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 17px;
    height: 17px;
    z-index: 0;
    border: 1.5px solid #fff;
    border-radius: 1px;
    margin-top: 2px;
    -webkit-transition: 0.2s;
    transition: 0.2s; }

  .form-dark input[type="checkbox"]:checked + label:before {
    top: -4px;
    left: -3px;
    width: 12px;
    height: 22px;
    border-style: solid;
    border-width: 2px;
    border-color: transparent #00c851 #00c851 transparent;
    -webkit-transform: rotate(40deg);
    -ms-transform: rotate(40deg);
    transform: rotate(40deg);
    -webkit-backface-visibility: hidden;
    -webkit-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    transform-origin: 100% 100%; }
</style>

<script>
// @ is an alias to /src
import AppHeader from "../layout/AppHeader.vue";
  import { mdbRow, mdbCol, mdbCard,  mdbInput, mdbBtn } from 'mdbvue';

  export default {
  name: "NewRecord",
  components: {
    AppHeader,
    mdbRow,
      mdbCol,
      mdbCard,
      //mdbCardBody,
      mdbInput,
      mdbBtn,
     // mdbIcon
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
