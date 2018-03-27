<template>
  <div class="Menu">
     
       <div class="Menu_ul">
         <h2>全部分类</h2>
            <router-link  tag="li" v-for="item in lMenu" :to="item.target_url" :key="item.webmenu_id">
                 <a href="#">{{item.menu_name}}</a>
            </router-link>
        </div>
        
            
  </div>

</template>

<script> 

import '../../../js/luckybuy/index.js'
import '../../../js/luckybuy/js-tab.js'
import '../../../js/luckybuy/MSClass.js'
import '../../../js/luckybuy/jcarousellite.js'
import '../../../js/luckybuy/top.js'


import {luckybuyMenu} from '../../../service/getData'


export default {
    name: 'topMenu',
    data () {
      return {
        lMenu: []
      }
    },
    created: function() {
        luckybuyMenu().then(res => {
            this.lMenu = res;
        })    
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  @import '../../../css/luckybuy/topMenu.css';

</style>
