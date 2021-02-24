import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {
  ThreeIdConnect,
  EthereumAuthProvider,
} from "3id-connect";

import Ceramic from "@ceramicnetwork/http-client";
import { IDX } from "@ceramicstudio/idx";
import { definitions } from '../config.json'
import web3Modal from "../utils/provider.js";

import Ipfs from 'ipfs'
import dagJose from 'dag-jose'
import multiformats from 'multiformats/basics'
import legacy from 'multiformats/legacy'

multiformats.multicodec.add(dagJose)
const dagJoseFormat = legacy(multiformats, dagJose.name)

//const DEFAULT_API_URL = "https://ceramic-clay.3boxlabs.com";
const DEFAULT_API_URL = "http://localhost:7007";
const threeIdConnect = new ThreeIdConnect();
const ceramic = new Ceramic(DEFAULT_API_URL);

import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'


export default new Vuex.Store({
  state: {
    authenticated: false,
    idx: {},
    ceramic: {},
    ipfs: {},
    recordsList: [],
    did: "",
    ethaddress: "",
    currentRecord: {}
  },
  getters: {
    records: state => state.recordsList.records
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem('ethaddress')!= null) {
        state.ethaddress = localStorage.getItem('ethaddress');
      }

      if (localStorage.getItem('idx')!= null) {
        state.idx = localStorage.getItem('idx');
      }

      if (localStorage.getItem('ceramic')!= null) {
        state.ceramic = localStorage.getItem('ceramic');
      }

      if (localStorage.getItem('did')!= null) {
        state.did = localStorage.getItem('did');
      }

      if (localStorage.getItem('recordsList')!= null) {
        state.recordsList = JSON.parse(localStorage.getItem('recordsList'));
      }

      if (localStorage.getItem('authenticated')) {
        state.authenticated = true;
      }

      if (localStorage.getItem('currentRecord')!= null) {
        state.currentRecord = JSON.parse(localStorage.getItem('currentRecord'));

      }

    },
    auth(state, payload) {
      state.ethaddress = payload.ethaddress;
      localStorage.setItem('ethaddress', payload.ethaddress);

      state.idx = payload.idx;
      localStorage.setItem('idx', payload.idx);

      state.did = payload.did;
      localStorage.setItem('did', payload.did);

      state.recordsList = payload.recordList.records;
      localStorage.setItem('recordsList', JSON.stringify(payload.recordList.records));

      state.authenticated = payload.idx.authenticated;
      localStorage.setItem('authenticated', true);

      console.log('mutation executed and state stored');
    },
    newRecord(state, payload){
      state.recordsList = payload.recordList.records;
      localStorage.setItem('recordsList', JSON.stringify(payload.recordList.records));
    },
    currentRecord(state, payload){
      state.currentRecord = payload.currentRecord;
      console.log(payload.currentRecord)
      localStorage.setItem('currentRecord', JSON.stringify(payload.currentRecord));

    },
    logoutTriggered(state){
      state.ethaddress = "";
      localStorage.setItem('ethaddress', "");

      state.idx = {};
      localStorage.setItem('idx', {});

      state.did = "";
      localStorage.setItem('did', "");

      state.recordsList = [];
      localStorage.setItem('recordsList',state.recordsList);

      state.authenticated = false;
      localStorage.setItem('authenticated', false);

      console.log('User Logged out Succesfully');
    }
  },
  actions: {
    async ceramicAuth({commit}){
      const ethProvider = await web3Modal.connect();
      const addresses = await ethProvider.request({ method: "eth_accounts" });
      console.log("Got the ethaddress");
      
      const authProvider = new EthereumAuthProvider(ethProvider, addresses[0]);
      const ethaddress = addresses[0];
      await threeIdConnect.connect(authProvider);
      console.log("3id connect func executed");
      const provider = await threeIdConnect.getDidProvider();
      
      await ceramic.setDIDProvider(provider);
      console.log("Ceramic DID Provider set");
      
      const idx = new IDX({ceramic, aliases: definitions});
      console.log("new idx instance created");
      if (idx.authenticated) {
        console.log("authenticated IDX!!");
        const recordList = await idx.get('healthRecord')
        console.log("Health Records List");
        console.dir(recordList);
        let payload = {
          ethaddress,
          idx,
          recordList,
          did : ceramic.did.id,
          ceramic
        }
        await setTimeout(() => {
          commit('auth', payload)
        }, 4000)

        return true;
      } else{
        return false;
      }
    },

    async decryptHR({commit}, payload){

      const ethProvider = await web3Modal.connect();
      const addresses = await ethProvider.request({ method: "eth_accounts" });
      console.log("Got the ethaddress");
      
      const authProvider = new EthereumAuthProvider(ethProvider, addresses[0]);
      await threeIdConnect.connect(authProvider);
      console.log("3id connect func executed");
      const provider = await threeIdConnect.getDidProvider();
      
      await ceramic.setDIDProvider(provider);
      console.log("Ceramic DID Provider set");

      console.log('ID '+payload.id)
      //create a new instance of ipfs and insert the dag jose formats
      const ipfs = await Ipfs.create({ ipld: { formats: [dagJoseFormat] } })  

      const jwe = ( await ipfs.dag.get(payload.id) ).value
      console.log(jwe)
      const data = await ceramic.did.decryptDagJWE(jwe)
      console.log(data)
      setTimeout(() => {
        commit('currentRecord', {currentRecord: data})
      }, 2000)
    },

    async encryptStore({commit}, payload){
      const ethProvider = await web3Modal.connect();
      const addresses = await ethProvider.request({ method: "eth_accounts" });
      console.log("Got the ethaddress");
      
      const authProvider = new EthereumAuthProvider(ethProvider, addresses[0]);
      await threeIdConnect.connect(authProvider);
      console.log("3id connect func executed");
      const provider = await threeIdConnect.getDidProvider();
      
      await ceramic.setDIDProvider(provider);
      console.log("Ceramic DID Provider set");
      const idx = new IDX({ceramic, aliases: definitions});

      //create a new instance of ipfs and insert the dag jose formats
      const ipfs = await Ipfs.create({ ipld: { formats: [dagJoseFormat] } })  
      const recipients = [ceramic.did.id]
      const jwe = await ceramic.did.createDagJWE(payload.record, recipients)
      console.log(jwe)
      const cid = await ipfs.dag.put(jwe, { format: 'dag-jose', hashAlg: 'sha2-256' });
      console.log('CID')
      const DocID = cid.toString()
      console.log(DocID)

      const recordList = await idx.get('healthRecord')
      console.log("Health Records List");
      console.dir(recordList);
      if(recordList != null ){
        const record = await idx.set('healthRecord', {
          records: [{id: DocID, title:payload.record.title }, ...recordList.records ]
        })
        console.log(record)
      } else if(recordList == null || recordList.records.length <= 0){
        const record = await idx.set('healthRecord', {
          records: [{id: DocID, title:payload.record.title } ]
        })
        console.log(record)
      }
      //update the index doc with the addition of the newly encrypted IPLD at the top
      const recordList2 = await idx.get('healthRecord')

      setTimeout(() => {
        commit('newRecord', {recordList: recordList2})
      }, 2000)

    },

    async shareDoc({ state}, payload){
      //create a new instance of ipfs and insert the dag jose formats
      const ipfs = await Ipfs.create({ ipld: { formats: [dagJoseFormat] } })  
      const recipients = [payload.did]
      const jwe = await ceramic.did.createDagJWE(payload.content, recipients)
      console.log(jwe)
      const cid = await ipfs.dag.put(jwe, { format: 'dag-jose', hashAlg: 'sha2-256' });
      console.log('CID')
      const DocID = cid.toString()
      console.log(DocID)

      const recordList = await state.idx.get('healthRecord')
      console.log("Health Records List");
      console.dir(recordList);

      //update the index doc with the addition of the newly encrypted IPLD at the top
      const record = await state.idx.set('healthRecord', {
        records: [{id: DocID, title: "Health Record"}, ...recordList.records ]
      })         
      console.log(record)
    },
    
    async logoutTriggered({commit}){
      setTimeout(() => {
        commit('logoutTriggered')
      }, 1000)
    }

  },
  modules: {
  },
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
    })  
  ]
})
