 <template>
    <div>
        <ltop-bar></ltop-bar>
        <ltop-header></ltop-header>
        <ltop-menu></ltop-menu>
        <div class="con-top" >
           <ltop-menuleft></ltop-menuleft> 
        </div>
        <span v-title data-title="晒单分享-好书幸运购 好书推荐给更多读者 让更多读者了解好书 "></span>                
        <div class="baskSharing_con">
            <p class="baskSharing_p">
              当前位置：
               <router-link :to="'/lhome'" target="_blank">首页</router-link> 
               > 
               <router-link :to="'/lbasksharingmore'" target="_blank">晒单列表</router-link> 
               > 
               晒单详情
            </p>
            <div class="baskSharing_left " v-for="it in items">
               <div class="baskSharing_left_di">
                   <img :src="it.headimg" class="baskSharing_left_img"> 
               </div>             
               <p class="baskSharing_left_name" >{{it.nick_name}}</p>
               <p class="baskSharing_left_text">本云参与：{{it.act_amount}}人次</p>
               <p class="baskSharing_left_text">幸运云购码：{{it.lucky_number}}</p>
               <p class="baskSharing_left_text">揭晓时间：{{it.act_announce_date}}</p>
               <div class="next-period">
                 <img src="../../../images/luckybuy/publicly-get.png" class="next-period_sp">
                  <dl>
                     <dt>
                        <router-link :to="' '" target="_blank">
                           <img :src="it.book_cover" class="next-period_im">
                        </router-link>
                     </dt>
                     <dd>
                         <p class="next-period_p">
                         <router-link :to="' '" target="_blank">
                           (第{{it.hold_sub}}云){{it.book_name}}</br>                          
                         </router-link>
                          <span>商品价值：￥{{it.book_price}}</span>
                         </p>                        
                    </dd>
                    <p class="next-period_p2">
                        <router-link :to="' '" target="_blank">
                            第1686云正在进行...
                        </router-link>
                    </p>
                  </dl>                 
               </div>
               <div class="next-period1" v-show="userbask.length!=0">
                  <p class="qt_back">TA的其他晒单</p> 
                  <dl class="other-single">                 
                     <dd v-for="u in userbask">
                      <p><router-link :to="''" target="_blank">{{u.luck_bask_order_title}}</router-link></p>
                        <span class="sig-xmjdh">
                            <router-link :to="''" target="_blank" class="xianmu">
                                <i class="transparent-png"></i>0
                            </router-link>
                            <router-link :to="''" target="_blank" class="pinglun">
                                <i class="transparent-png"></i>0
                            </router-link>
                        </span>
                     </dd>                     
                  </dl> 
               </div>
            </div> 
            <div class="baskSharing_centre" v-for="it in items">
                 <p class="baskSharing_centre_p">{{it.luck_bask_order_title}}</p>
                 <ul class="baskSharing_centre_ul">
                    <li>今天 12:04</li> 
                    <li>43人阅读</li>
                    <li>0人评论</li>         
                 </ul> 
                 <div class="jlf">
                    <p>400</p>
                 </div>
                 <p class="baskSharing_centre_p1">{{it.bask_content}}</p>
                 <img src="../../../images/luckybuy/20170628115908782.jpg"  class="centre_mg">                
                 <img src="../../../images/luckybuy/20170628115908875.jpg" class="centre_mg">
                 <img src="../../../images/luckybuy/20170628115907768.jpg" class="centre_mg"> 
                 <div class="baskSharing_centre_bottom">
                    <ul>
                       <li class="bask_li1">
                          <i class="el-icon-edit"></i>共<em class="orange">0</em>条评论
                       </li>
                       <li class="bask_li2">
                           <p class="u-xianmu">
                               
                                    <i class="el-icon-star-off "></i>
                                    <em>已羡慕</em>
                                    <span class="gray9"><cite>5</cite><b><s></s></b>
                                    </span>
                                    <img class="transparent-png" src="http://skin.1yyg.net/post/images/xin.png" alt="" style="display: none;">
                              
                            </p>                                
                            <div class="get-codes-bdshare">
                                <span class="bds_more"><i class="el-icon-share"></i>分享</span>
                            </div>                             
                       </li>                      
                    </ul>
                 </div>
                 <div class="baskSharing_centre_bot">
                      <img class="imgUserPhoto" src="../../../images/luckybuy/00.jpg" alt="">
                      <div class="point-box">请您<a href="javascript:;" name="replyLoginBtn">登录</a>或<a href="https://passport.1yyg.com/register.html?forward=rego">注册</a>后再评论<b><s></s></b></div>                     
                 </div>       
            </div>
            <div class="baskSharing_right">
                <div class="baskSharing_right_d">
                    <el-carousel :interval="5000" arrow="always">
                      <p class="baskSharing_right_p">其他获得者晒单</p>
                        <el-carousel-item v-for="item in 4" :key="item">
                          <ul class="back_item_u" >
                              <li v-for="ot in Other">
                                 <img :src="ot.headimg">
                                 <div>
                                    <p class="back_title">
                                      <span>{{ot.nick_name}}</span>获得了第{{ot.hold_sub}}云
                                    </p>
                                    <p class="back_btn">
                                       <router-link :to="{path:'lbasksharingdetail',query:{id:ot.luck_bask_order_id}}" target="_blank" :title="ot.luck_bask_order_title">
                                         查看晒单
                                       </router-link>  
                                    </p> 
                                 </div>
                              </li>                         
                          </ul>
                        </el-carousel-item>
                    </el-carousel>                 
                </div>
                <div class="baskSharing_right_d2">
                    <p class="baskSharing_right_p2">最新晒单</p>
                    <ul class="baskSharing_right_ul">
                       <li v-for="ne in news">
                           <cite><i></i><em>
                             <router-link :to="{path:'lbasksharingdetail',query:{id:ne.luck_bask_order_id}}"   target="_blank" :title="ne.luck_bask_order_title">
                              {{ne.luck_bask_order_title}}
                             </router-link> 
                           </em></cite>                            
                              <span class="gray_sp">
                                 {{ne.bask_content}}
                              </span>                          
                           <p>
                              <a rel="nofollow" href="" class="nofollow1">
                                 <img src="../../../images/luckybuy/20170628115907768.jpg" border="0" alt="">
                              </a>
                              <a rel="nofollow" href="#" class="nofollow1">
                                 <img src="../../../images/luckybuy/20170628115908782.jpg" border="0" alt="">
                              </a>
                              <a rel="nofollow" href="" class="nofollow1">
                                 <img src="../../../images/luckybuy/20170628115908875.jpg" border="0" alt="">
                              </a>
                           </p>
                       </li>                      
                    </ul> 
                </div>
            </div>
        </div>    
        <div class="footer">
          <lfoo-ter></lfoo-ter>
        </div>                        
    </div>

</template>

<script>
import ltopBar from '../../../components/luckybuy/header/topBar'
import ltopHeader from '../../../components/luckybuy/header/topHeader'
import ltopMenu from '../../../components/luckybuy/header/topMenu'
import ltopMenuleft from '../../../components/luckybuy/header/topMenuleft'
import lfooter from '../../../components/luckybuy/footer/footer'
import {luckybuyActivityBaskSharingDetail,luckybuyActivityBaskSharingOther,luckybuyNewBaskSharing,luckybuyUserBaskSharing} from '../../../service/getData'

export default {

    data(){
        return{

           items:[],
           Other:[],
           id: this.$route.query.id || '',           
           news:[],
           userbask:[],
          
        }
    },
  created:function() {          
             this.fetchData(this.id)
         },


  components: {
    'ltop-bar': ltopBar,
    'ltop-header':ltopHeader,
    'ltop-menu':ltopMenu,
    'ltop-menuleft':ltopMenuleft,    
    'lfoo-ter':lfooter,   
  },

  watch:{
    '$route': 'fetchData',
    },

    methods:{      
       fetchData(id){
            luckybuyActivityBaskSharingDetail(id).then(res => {
              this.items = res
            })
            luckybuyActivityBaskSharingOther(1).then(res => {
              this.Other = res
            }) 
            luckybuyNewBaskSharing(id).then(res => {
              this.news = res
            }) 
            luckybuyUserBaskSharing(1).then(res => {
              this.userbask = res
            })       
        },

      },
}


</script>

<style scoped>

  @import '../../../css/luckybuy/luckBaskSharingDetail.css'

</style>
