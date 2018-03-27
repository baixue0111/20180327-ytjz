<template>
   <div class="glb_share">
    <div class="glb_share_bt">
        <p class="glb_share_bt_p1"><i></i>晒单分享</p>
        <p  class="glb_share_bt_p2">
           <router-link :to="'lbasksharingmore'" target="_blank">查看全部<i> > </i></router-link>
        </p>
    </div>
    <div class="glb_share_con">
        <div class="glb_share_div" v-for="item in items ">
           
            <div class="glb_share_img">
                <router-link :to="{path:'lbasksharingdetail',query:{id:item.luck_bask_order_id}}" target="_blank" :title="item.luck_bask_order_title">
                <img :src="item.images_url">         
                </router-link>                               
            </div>
            <div class="glb_share_p">
                <p class="glb_share_p_con">
                 <router-link :to="{path:'lbasksharingdetail',query:{id:item.luck_bask_order_id}}" target="_blank" :title="item.luck_bask_order_title">
                 {{item.nick_name}}
                 </router-link>
             </p>
             <p class="glb_share_con1">
                 {{item.bask_content}}
             </p>
              
         </div>
     </div>
 </div>
</div>
</template>

<script>
  import {luckybuyBaskSharing} from '../../../service/getData'
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
     luckybuyBaskSharing().then(res => {
       this.items = res
   })      
 },
},
}

</script>

<style scoped>
  @import '../../../css/luckybuy/luckBaskSharing.css'
</style>
