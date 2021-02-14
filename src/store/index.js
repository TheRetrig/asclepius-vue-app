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

export default new Vuex.Store({
  state: {
    authenticated: false,
    idx: {},
    ceramic: {},
    ipfs: {},
    recordsList: [],
    did: "",
    ethaddress: "",
  },
  getters: {
    records: state => state.recordsList.records
  },
  mutations: {
    auth(state, info) {
      state.ethaddress = info.ethaddress;
      state.ipfs = info.ipfs;
      state.idx = info.idx;
      state.did = info.did;
      state.recordsList = info.recordList.records;
      state.authenticated = info.idx.authenticated;
      console.log('mutation executed and state stored');
    },
    newRecord(state, info){
      state.recordsList = info.record;
    }
  },
  actions: {
    async ceramicAuth({commit}){
      //create a new instance of ipfs and insert the dag jose formats
      const ipfs = await Ipfs.create({ ipld: { formats: [dagJoseFormat] } })  
      
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
          ipfs, 
          idx,
          recordList,
          did : ceramic.did.id
        }
        setTimeout(() => {
          commit('auth', payload)
        }, 4000)

        return true;
      } else{
        return false;
      }
    },

    async decryptHR({state}, payload){
      const jwe = ( await state.ipfs.dag.get(state.recordList[payload].id) ).value
      const data = await ceramic.did.decryptDagJWE(jwe)
      console.log(data)
      return data
    },

    async encryptStore({state, commit}, payload){
      const recipients = [ceramic.did.id]
      const jwe = await ceramic.did.createDagJWE(payload, recipients)
      console.log(jwe)
      const cid = await state.ipfs.dag.put(jwe, { format: 'dag-jose', hashAlg: 'sha2-256' });
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
      let payload2 = {record}

      setTimeout(() => {
        commit('newRecord', payload2)
      }, 2000)

    },

    async shareDoc({ state}, payload){
      const recipients = [payload.did]
      const jwe = await ceramic.did.createDagJWE(payload.content, recipients)
      console.log(jwe)
      const cid = await state.ipfs.dag.put(jwe, { format: 'dag-jose', hashAlg: 'sha2-256' });
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
    }

  },
  modules: {
  }
})
