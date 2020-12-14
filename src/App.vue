<template>
  <div id="app">
    
  <div class="row">
    <div class="col-md-9">

    <div class="row">
      <div class="col-md-12">
        <div class="search-form">
          <input 
            type="search"
            v-model="searchVin"
            class="search form-control region"
            placeholder="Введите VIN">

          <button class="btn-lg btn btn-default btn-search" @click="getParts(searchVin, undefined)">Найти запчасти</button>
        </div>
      </div>
    </div>

    <div v-if="showResults">
      <h3>Результаты поиска для VIN: {{ searchVin }}</h3>
      <app-part
        v-for="(part, i) in parts" 
        :key="part.id"
        :name="part.name"
        :code="part.code"
        :isAdded="part.isAdded"
        @tocart="addToCart(i, $event)"
      ></app-part>
      <div v-if="next || prev">
        <button type="button" @click="getParts(undefined, previous)" :disabled="previous==null">Prev</button>
        <button type="button" @click="getParts(undefined, next)" :disabled="next==null">Next</button>
      </div>
    </div>
    <div v-else>
      <p v-if="isFound">Введите номер Vin</p>
      <p v-else>Запчастей для этого номера VIN не найдено.</p>
    </div>

    </div>

    <div class="col-md-3">
      <app-cart :addedParts="partsInCart" :vin="searchVin" :showCart="showResults" @del="onDelete"></app-cart>
    </div>
  </div>
    
  </div>
</template>

<script>
import AppPart from '@/components/AppPart.vue'
import axios from 'axios'
import AppCart from './components/AppCart.vue';


export default {
  name: 'App',
  components: {
    AppPart,
    AppCart
  },
  data: () => ({
    searchVin: '',
    parts: [],
    err: [],
    next: null,
    previous: null,
    count: 0,
    isFound: true,
    url: process.env.VUE_APP_URL,
    partsInCart: [],
  }),
  computed: {
    nextPage(){
      if(this.next){
        return this.next;
      }
    },
    showResults(){
      return Boolean(this.parts.length) && this.isFound;
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
          this.isFound = true;
        })
        .catch(e => {
          this.err.push(e);
          this.isFound = false;

        })
      }
      else{
        this.notFound = false;
      }
    },
    addToCart(i, e){
      this.partsInCart.push({name: e.name, code: e.code});
      this.parts[i].isAdded = true;
    },
    onDelete(e){
      this.partsInCart = this.partsInCart.filter(function(item){return item.code != e.code});
      this.parts.forEach(item => {
        if(item.code == e.code){
          item.isAdded = false;
        }
      })
    }
  },
  mounted() {
    return this.parts.forEach(item => {
      this.$set(item, 'isAdded', false);
    });
  },
}
</script>

<style>
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0px 20px;
}
.app{
  display: flex;
}
.search-form{
  padding: 20px;
  border: 1px solid #eff1f5;
  margin: 0px 0px 20px 0px;
  display: flex;
  justify-content: space-between;
}
.btn-search{
  min-width: fit-content;
}
</style>
