<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in ad" :key="item.adviertisement_id">
    	<img :src="item.adviertisement_image1" :alt="item.adviertisement_title"  width="100%" height="100%">
    </el-carousel-item>
  </el-carousel>
  
</template>

<script>
import {luckybuyAd} from '../../../service/getData'

export default {
    data(){
       return {
       ad:[]
       }
    },

	mounted(){

    },

    components:{
       
    },

    computed:{
       
    },

    methods:{
        
    },
    created: function() {
        luckybuyAd().then(res => {
            this.ad = res
        })    
    }    
}

</script>

<style scoped>
   @import '../../../css/luckybuy/topBanner.css';

</style>
