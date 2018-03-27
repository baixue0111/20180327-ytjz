<template>
  <ul>
    <li v-for="p in products">
      {{ p.title }} - {{ p.price | currency}}
      <el-input-number size="small" @change="handleChange" v-model="inventory" :min="1" :max="p.inventory">
        
      </el-input-number>
      <br>


      <pre>{{p.inventory}}</pre>


      <button
      :disabled="!p.inventory"
      @click="addToCart(p)">
      Add to cart
    </button>
    <br>
  </li>
</ul>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data(){
      return {
        inventory:1,
        total:0.00

      }
    },
    computed: {
      ...mapGetters({
        products: 'allProducts'
      }),
    },
    watch:{
      inventory:function(){
        this.total = this.total + this.inventory*5.0
      }
    },
    methods: {
      ...mapActions([
        'addToCart'
        ]),
      handleChange:(value)=> {
        console.log(value)
      }
    },
    created () {
      this.$store.dispatch('getAllProducts')
    }
  }
</script>
