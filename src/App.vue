<template>
  <div id="app">

    <div class="row search-form">
      <div class="col-md-6 col-sm-4">
        <input 
          type="search"
          v-model="searchVin"
          class="search form-control region"
          placeholder="Введите VIN">
      </div>
      <div class="col-md-6 col-sm-4">
        <button class="btn-lg btn btn-default" @click="getParts(searchVin, undefined)">Найти запчасти</button>
      </div>
    </div>

    <div v-if="parts.length != 0">
      <h3>Результаты поиска для VIN: {{ searchVin }}</h3>
      <app-part
        v-for="part in parts" 
        :key="part.id"
        :name="part.name"
        :code="part.code"
        :unit="part.unit"
        :count="part.count"
      ></app-part>
      <button type="button" @click="getParts(undefined, previous)" :disabled="previous==null">Prev</button>
      <button type="button" @click="getParts(undefined, next)" :disabled="next==null">Next</button>
    </div>
    <div v-else>
      <p v-if="!showParts">Введите номер Vin</p>
      <p v-else>Запчастей для этого номера VIN не найдено.</p>
    </div>
    
  </div>
</template>

<script>
import AppPart from '@/components/AppPart.vue'
import axios from 'axios'


export default {
  name: 'App',
  components: {
    AppPart
  },
  data: () => ({
    searchVin: '',
    parts: [],
    err: [],
    next: null,
    previous: null,
    count: 0,
    showParts: false,
    url: process.env.VUE_APP_URL,
  }),
  computed: {
    nextPage(){
      if(this.next){
        return this.next;
      }
    }
  },
  methods:{
    async getParts(vin, page){
      let url = page ? page : this.url+vin;
      if(vin || page){
        axios.get(url)
        .then(response => {
          if (response.data.next){
            this.parts = response.data.results;
            this.next = response.data.next;
            this.previous = response.data.previous;
            this.count = response.data.count;
          }
          else{
            this.parts = response.data;
          }
          this.showParts = true;
        })
        .catch(e => {
          this.err.push(e)
        })
      }
      else{
        this.showParts = false;
      }
    },
  mounted() {

  },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
