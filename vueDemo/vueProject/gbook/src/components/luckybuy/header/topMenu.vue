 <template>
  <div class="Menu">
     
       <div class="Menu_ul subpage">
         <h2 >全部分类
           <img src="../../../images/luckybuy/0-1.png" style="position:absolute;top:15px;right: 20px" id="im_f">
         </h2>
         	<router-link to="/lhome" class="menu_li" target="_blank">首页</router-link>
         	<router-link to="/lygzq" class="menu_li" target="_blank">云购专区</router-link>
         	<router-link to="/lnewestannouncemore" class="menu_li" target="_blank">最新揭晓</router-link>
         	<router-link to="/lbasksharingmore" class="menu_li" target="_blank">晒单分享</router-link>
         	<router-link to="/lhome" class="menu_li" target="_blank">新手指南</router-link>
         	<router-link to="/lhome" class="menu_li" target="_blank">发现惊喜</router-link>
        </div>
         
  </div>

</template>

<script> 

import '../../../js/luckybuy/index.js'
import '../../../js/luckybuy/js-tab.js'
import '../../../js/luckybuy/MSClass.js'
import '../../../js/luckybuy/jcarousellite.js'
import '../../../js/luckybuy/top.js'

export default {
    name: 'topMenu',
    data () {
      return {
        
      }
    },
    mounted() {
 
    },
        methods: {
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../css/luckybuy/topMenu.css';

</style>
