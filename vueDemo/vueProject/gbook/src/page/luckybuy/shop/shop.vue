<template>
  <div>
    <hr>
    <h2>Products</h2>
    <product-list></product-list>
    <hr>
    <h2>Cart</h2>    
    <cart></cart>
  </div>
</template>

<script>
  import ProductList from './productList.vue'
  import Cart from './cart.vue'

  export default {
    data(){
      return {}
    },
    components: { 
      'product-list':ProductList, 
      'cart':Cart 
    }
  }
</script>