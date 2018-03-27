<template>
  <div class="glb_newProduct">
    <div class="glb_newProduct_bt">
      <p class="glb_newProduct_bt_p1"><i></i>新品上架</p>
      <p  class="glb_newProduct_bt_p2">
        <router-link :to="'lnewarrivalsmore'" target="_blank">查看全部<i> > </i></router-link>
      </p>
    </div>
    <div class="glb_newProduct_con">
      <div class="glb_newProduct_div" v-for="item in items" :key="item.luck_activity_list_id" >
        <div v-if="item.luck_activity_list_id!==0">
          <div class="glb_newProduct_img" >
            <router-link :to="{path:'lactivitybookdetail',query:{id:item.luck_activity_list_id}}" target="_blank" :title="item.activity_list_title">
              <img v-lazy="item.book_cover" alt="暂无图片">
            </router-link>  
          </div>
          <div class="glb_newProduct_p" >
            <p class="glb_newProduct_p_con">
              <router-link :to="{path:'lactivitybookdetail',query:{id:item.luck_activity_list_id}}" target="_blank" :title="item.activity_list_title">
                {{item.activity_list_title}}
              </router-link> 
            </p>
            <p class="glb_newProduct_con1">总需人次：<span id="glb_recommend_con1">{{item.plan_amount}}</span></p>
          </div>
        </div>
        <div v-if="item.luck_activity_list_id==0" style="text-align: center"> 
          <img src="../../../images/luckybuy/expect.jpg" width="210px" height="270px">
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {luckybuyNewArrivals} from '../../../service/getData'

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
     luckybuyNewArrivals().then(res => {
       this.items = res
     })      
   }
 },
}

</script>

<style>
  @import '../../../css/luckybuy/newArrivals.css'
</style>
