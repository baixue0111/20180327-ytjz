<template>
  <div class="bcon1">
    <h2><b>正在云购</b></h2>
    <!-- 代码开始 -->
    <div class="list_lh">
      <ul  class="list_ul">
            <li v-for="item in items" :key="item.luck_user_order_detail_id">
                 <div class="glb_recommend_div_left">
                     <img :src="item.headimg" alt="暂无图片"/>
                 </div>
                 <div class="glb_recommend_div_right">
                     <p class="glb_recommend_div_right_p1">
                      <router-link :to="{path:'user',query:{id:item.user_id}}" target="_blank" :title="item.nick_name">
                          {{item.nick_name}} 
                      </router-link>
                      <span >于{{item.buy_date}}</span></p>
                     <p class="glb_recommend_div_right_p2">购
                     <router-link :to="{path:'lactivitybookdetail',query:{id:item.luck_activity_list_id}}" target="_blank" :title="item.book_name">{{item.activity_list_title}}</router-link></p>
                 </div>
            </li>      
      </ul>
    </div>

   </div>
</template>
<script>
import a from '../../../js/luckybuy/scroll.js'
  import {luckybuyShoppingMsg} from '../../../service/getData'

export default {
    data(){
     return {
       items:[]
            }
          },
    created: function() {
        this.fetchData()
    },
    watch:{
        '$route': 'fetchData'
    },
    mounted(){

    },
    components:{

    },
    computed:{

    },
    methods:{
        fetchData:function(){
         luckybuyShoppingMsg().then(res => {
           this.items = res
       })      
     }
    },
}
</script>
<style scoped>
  @import '../../../css/luckybuy/shoppingMsg.css'
</style>