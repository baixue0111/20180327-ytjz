    <template>
      <div class="block">
        <el-carousel trigger="click" height="181px">
          <el-carousel-item v-for=" items in adver" :key="items.ino">

            <ul class="it_ul">
              <li class="slides-li" v-for="item in items.iname" :key="item.luck_activity_list_id" >

                <div class="glb_bot_adver_img">
                  <router-link :to="{path:'lactivitybookdetail',query:{id:item.luck_activity_list_id}}" target="_blank" :title="item.activity_list_title">
                    <img v-lazy="item.book_cover">
                  </router-link>                  
                </div>
                <div class="glb_bot_adver_p">
                  <p class="glb_bot_adver_p_con1">
                    <router-link :to="{path:'lactivitybookdetail',query:{id:item.luck_activity_list_id}}" target="_blank" :title="item.activity_list_title">
                      {{item.activity_list_title}}
                    </router-link>                
                  </p>
                  <p class="glb_bot_adver_p_con2">
                    期号：<span>{{item.hold_number}}</span>
                  </p>
                  <p class="glb_bot_adver_p_con2">
                    总需<span >{{item.plan_amount}}</span>人次
                  </p>
                  <p class="glb_bot_adver_p_con2">
                    已参与<span>{{item.act_amount}}</span>人次
                  </p>
                  <p class="glb_bot_adver_p_con2">
                    剩余<span>{{item.remain_amount}}</span>人次
                  </p>
                </div>
                <img src="../../../images/luckybuy/2-1.png" class="glb_m">

              </li>

            </ul>

          </el-carousel-item>
        </el-carousel>
      </div>

    </template>

    <script>

      import {readyLotteryAdver} from '../../../service/getData'
      export default {
        data(){
         return {
           adver:[]
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
         readyLotteryAdver().then(res => {
           this.adver = res
         })      
       }
     }
   }


 </script>

 <style scoped>
   @import '../../../css/luckybuy/readyLottery.css'
 </style>

