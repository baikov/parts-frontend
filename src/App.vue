<template>
  <div id="app">
    
  <div class="row">
    <div class="col-md-6 col-xs-12">

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
      <div v-if="next || previous">
        <button type="button" @click="getParts(undefined, previous)" :disabled="previous==null">Prev</button>
        <button type="button" @click="getParts(undefined, next)" :disabled="next==null">Next</button>
      </div>
    </div>
    <div v-else>
      <p v-if="isFound">Введите номер Vin</p>
      <p v-else>Запчастей для этого номера VIN не найдено.</p>
    </div>

    </div>

    <div class="col-md-6 col-xs-12">
      <app-cart 
        :addedParts="partsInCart"
        :vin="searchVin"
        :showCart="showResults"
        :orderSuccess="orderSuccess"
        @del="onDelete"
        @send="sendForm"></app-cart>
    </div>
  </div>
    
  </div>
</template>

<script>
import AppPart from '@/components/AppPart.vue'
import axios from 'axios'
import AppCart from '@/components/AppCart.vue';


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
    orderSuccess: null,
    token: process.env.VUE_APP_TOKEN,
  }),
  computed: {
    nextPage(){
      if(this.next){
        return this.next;
      }
    },
    showResults(){
      // console.log(this.parts.length, this.isFound)
      return Boolean(this.parts.length) && this.isFound;
    }
  },
  methods:{
    async getParts(vin, page){
      let url = page ? page : this.url+vin;
      const config = {
        headers: { Authorization: `Token ${this.token}` }
      };
      if(vin || page){
        axios.get(url, config)
        .then(response => {
          if (response.data.next || response.data.next === null){
            this.parts = response.data.results;
            this.next = response.data.next;
            this.previous = response.data.previous;
            this.count = response.data.count;
          }
          else{
            this.parts = response.data;
          }
          this.isFound = true;
          this.orderSuccess = false;
        })
        .catch(e => {
          this.err.push(e);
          this.isFound = false;

        })
      }
      else{
        this.isFound = false;
      }
      // this.partsInCart = []; // очищаем корзину при каждом новом поиске по VIN
      this.cleanCart();
    },
    async sendForm(e){

      for(let [name, value] of e.formData) {
        console.log(`${name} = ${value}`);
      }
      this.orderSuccess = true;
      // this.partsInCart = [];
      this.cleanCart();

      axios.post('parts_form.php', e.formData)
      .then(response => {
        this.orderSuccess = true;
        this.partsInCart = [];
        })
      .catch(e => {
          this.errors.push(e)
      })
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
    },
    cleanCart(){
      this.partsInCart = [];
      this.parts.forEach(item => {
          item.isAdded = false;
      })
    }
  },
  mounted() {
    // return this.parts.forEach(item => {
    //   this.$set(item, 'isAdded', false);
    // });
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
