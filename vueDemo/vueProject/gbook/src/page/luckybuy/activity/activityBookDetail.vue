 <template>
    <div >
        <div v-for=" itmes in gabd">
           <span v-title :data-title="itmes.activity_list_title"></span>
        </div>       
        <ltop-bar></ltop-bar>
        <ltop-header></ltop-header>
        <ltop-menu></ltop-menu>
       <div class="con-top" >
           <ltop-menuleft></ltop-menuleft> 
        </div> 

		<div class="com_content" >
		  
			<nav class="com_nav">
				<ul>
					<li><a href="#">首页</a></li>
					<li> > </li>
					<li><a href="#">全部商品</a></li>
					<li> > </li>
					<li><a href="#">商品详情</a></li>
				</ul>
			</nav>
			<div class="com_show_by" >
				<div class="com_img">
					<div class="com_img_cont">
				      <img :src="book_cover1">
					</div>

					<div class="com_img_tab">
						<ul id="com_ul1">
					        <li @click='tabToggle(imgs.book_cover)' v-for="imgs in luckybuyBookCover">
	                           <img :src="imgs.book_cover">
	                         </li>							                      
					    </ul>
					</div>

					<div class="com_share">
					   <span>分享到</span>
						<ul>
							<li><img src="../../../images/luckybuy/ti1.jpg"></li>
							<li><img src="../../../images/luckybuy/ti2.jpg"></li>
							<li><img src="../../../images/luckybuy/ti3.jpg"></li>
							<li><img src="../../../images/luckybuy/ti4.jpg"></li>
							<li><img src="../../../images/luckybuy/ti5.jpg"></li>
						</ul>
					</div>
				</div>
				
				<div class="com_qx" id="com_qx_cont_jd" v-for="item in gabd" v-show="gabd[0].remain_amount>0">
					<div class="com_qx_1">
						<p class="com_qx_headline" >{{item.activity_list_title}}</p>
					</div>
					<div class="com_qx_cont">
						<div class="com_qx_cont_div">
							<p class="com_qx_cont_p1">期号：<span>{{gabd[0].hold_number}}</span><span>每满总需人次，即抽取1人获得该商品</span></p>
							<p class="com_qx_cont_p2">?</p>
						</div>
						<div style="overflow: hidden;position: relative">
						    <el-progress :percentage="percent(gabd[0].act_amount,gabd[0].plan_amount)"></el-progress>
						</div>
						<div class="com_qx_cont_number">
							<p class="com_qx_cont_number_p1"><span>已参与</span><span id="total">{{gabd[0].act_amount}}</span></p>
							<p class="com_qx_cont_number_p2"><span >总需人数</span><span id="bar11">{{gabd[0].plan_amount}}</span></p>
							<p class="com_qx_cont_number_p3"><span >剩余人数</span><span id="total1">{{gabd[0].remain_amount}}</span></p>
						</div>
						<div class="com_qx_cont_par">
							<ul class="com_qx_cont_par_ul">
								<li class="com_par_li1"><p>参与:</p></li>
								<li class="com_par_li2">
								<el-input-number v-model="num1" v-show="gabd[0].remain_amount>0">
								</el-input-number>
								</li>
								<li class="com_par_li3"  v-show="gabd[0].remain_amount>10">
								<el-button @click="changenum(10)">10</el-button>
								</li>
								<li class="com_par_li3" v-show="gabd[0].remain_amount>20"> 
								<el-button @click="changenum(20)">20</el-button>
								</li>
								<li class="com_par_li3" v-show="gabd[0].remain_amount>50">
								<el-button @click="changenum(50)">50</el-button>
								</li>
								<li class="com_par_li3" v-show="gabd[0].remain_amount>100">
								<el-button @click="changenum(100)">100</el-button>
								</li>
								<li class="com_par_li3" v-show="gabd[0].remain_amount>0">
								<el-button @click="changenum(gabd[0].remain_amount)">包尾</el-button>
								</li>
								<li class="com_par_li8"><p>人次</p></li>
								<li class="com_par_li9"><p>参与人次越多，获得概率越大！</p></li>
							</ul>
							<div class="com_qx_cont_btn">

								<div class="com_qx_cont_btn1">
									<p>立即云购</p>
								</div>

								<div class="com_qx_cont_btn2 btns">
									<a href="javascript:;"  class=" orange  add_cart_large btnCart"  >
									<i><img src="../../../images/luckybuy/car.jpg"></i>
									<p>加入购物车</p></a>
								</div>

							</div>

						</div>
				    </div>
				   
					<div class="com_qx_cont_t">
						<div class="com_qx_cont_t1">
							<ul>
								<li><p>四大服务保证：</p></li>
								<li><i><img src="../../../images/luckybuy/tp.jpg"></i><p>公平公正</p></li>
								<li><i><img src="../../../images/luckybuy/z.jpg"></i><p>正品保正</p></li>
								<li><i><img src="../../../images/luckybuy/g.jpg"></i><p>权益保障</p></li>
								<li><i><img src="../../../images/luckybuy/ps.jpg"></i><p>免费配送</p></li>
							</ul>
						</div>
						<div class="com_qx_cont_t2">
							<p class="com_qx_cont_t2_p"><span>请登录</span>，查看您的幸运购号码</p>
						</div>
					</div>
			    </div>
			    <div class="com_qx" id="com_qx_cont_jd"   v-for="item in gabd"  v-show="t1==0 && t2==0">
                    <div class="com_qx_1">
						<p class="com_qx_headline"  >{{item.activity_list_title}}</p>
					</div>
					<div class="com_qx_cont">
						  <div class="hold_number">
					 		  <p class="holdNumber_p1">
						          期号：{{item.hold_number}}  | 幸运号码：
						      </p>
						      <p class="holdNumber_p2">1000008</p>					 
						  </div>
						  <div class="hjx">
						  	   <img src="../../../images/luckybuy/headimg.jpg" class="hjx_img">
						  	   <div class="hjx_d">	
							  	   <ul class="hjx_ul">
	                                  <li>用户昵称：<span class="hjx_sp">中辆宝马就回家 （吉林省通化市通化县电</span></li>
	                                  <li>用户 I D：142111（ID为用户唯一不变标识）</li>
	                                  <li>本期参与：<span class="hjx_sp2">2人次</span></li>
							  	   </ul>
							  	    <ul class="hjx_ul">
	                                  <li>揭晓时间：2017-06-21 10:57:33.000</li>
	                                  <li>云购时间：2017-06-20 14:01:41.634</li>
	                                  <li>
	                                      <router-link to="/lhome" target="_blank">
	                                            <span class="hjx_sp3"> 查看TA的号码   >></span>
	                                      </router-link>
	                                  </li>
	                                  <li>
	                                     <router-link to="/lhome"  target="_blank">
	                                         <span class="hjx_sp2">最近一期火热进行中   >></span> 
	                                     </router-link></li>
							  	   </ul>
						  	   </div>				 
						  </div>						  
					</div>				   
					<div class="com_qx_cont_t">						
						<div class="com_qx_cont_t2">
							<div class="com_qx_cont_d">
							    <p class="com_qx_cont_p6">如何计算？</p>
							    <p class="com_qx_cont_p4"><span>10000008</span>=<span>10000001</span>+<span>7</span></p>
							    <p class="com_qx_cont_p5">
							       <span class="com_qx_cont_sp1">本期幸运号码</span>
							       <span class="com_qx_cont_sp1">固定数值</span>
							       <span class="com_qx_cont_sp3">变化值</span>
							    </p>
							</div>
							<div class="com_qx_cont_d2">
                               <p class="com_qx_cont_p6">
	                               <span class="com_qx_cont_sp3">变化数</span>
	                               值是取下面公式的余数
                               </p>
                               <p class="com_qx_cont_p8">(<span>6334635954</span>+<span>25931</span>)÷<span> 4</span></p>
							    <p class="com_qx_cont_p5">
							       <span class="com_qx_cont_sp7">50个时间求和</span>
							       <span class="com_qx_cont_sp7">老时时彩”幸运号码</span>
							       <span class="com_qx_cont_sp7">总需人次</span>
							    </p>
							</div>
						</div>
						<div class="com_qx_cont_t1">
							<ul>
								<li><p>四大服务保证：</p></li>
								<li><i><img src="../../../images/luckybuy/tp.jpg"></i><p>公平公正</p></li>
								<li><i><img src="../../../images/luckybuy/z.jpg"></i><p>正品保正</p></li>
								<li><i><img src="../../../images/luckybuy/g.jpg"></i><p>权益保障</p></li>
								<li><i><img src="../../../images/luckybuy/ps.jpg"></i><p>免费配送</p></li>
							</ul>
						</div>
					</div>
					<p class="examine"><span>请登录</span>查看你的云购号码</p>
			    </div>
			    <div class="com_qx" id="com_qx_cont_jd" v-for="item in gabd" v-show="t1>0 && t2>0 && gabd[0].remain_amount==0">
			  
                    <div class="com_qx_1">
						<p class="com_qx_headline" >{{item.activity_list_title}}</p>
					</div>
					<div class="com_qx_cont">
					    <p class="worth">价值：<span>￥50.00</span></p>	 
						<div class="chronograph">

                           <div class="jxtime1">
                                <span>揭晓倒计时：</span>
								<strong  id='minute_show1_0'>{{t1}}</strong>
								<strong class="jxdd">:</strong>
								<strong id='second_show1_0' >{{t2}}</strong>
								<strong class="jxdd">:</strong>
								<strong id='msecond_show1_0' >00</strong>
							</div>
						</div> 
						<p class="explain">
							<span>如何计算？</span></br>
							1、取该商品最后购买时间前网站所有商品的最后100条购买时间记录；</br>
							2、按时、分、秒、毫秒排列取值之和，除以该商品总参与人次后取余数；</br>
							3、余数加上10000001 即为“幸运云购码”；</br>
							4、余数是指整数除法中被除数未被除尽部分， 如7÷3 = 2 ......1，1就是余数。 
						</p> 			  
					</div>				   
					<div class="com_qx_cont_t">						
						<div class="com_qx_cont_t2">
							<div class="equation_explain">
								<span>计算过程</span></br>
								<ul>
								   <li>(</li>
								   <li><p>?</br><span>100条时间取值之和</span></p></li>
								   <li>%</li>
								   <li><p>7130</br><span>总需参与人次</span></p></li>
								   <li> )</li>
								   <li>+</li>
								   <li><p>10000001</br><span>固定数值</span></p></li>
								   <li>=</li>
								   <li><p>?</br><span>最终计算结果</span></p></li>
								</ul>  
								
						    </div> 
						</div>
						<div class="com_qx_cont_t1">
							<ul>
								<li><p>四大服务保证：</p></li>
								<li><i><img src="../../../images/luckybuy/tp.jpg"></i><p>公平公正</p></li>
								<li><i><img src="../../../images/luckybuy/z.jpg"></i><p>正品保正</p></li>
								<li><i><img src="../../../images/luckybuy/g.jpg"></i><p>权益保障</p></li>
								<li><i><img src="../../../images/luckybuy/ps.jpg"></i><p>免费配送</p></li>
							</ul>
						</div>
					</div>					
			    </div>
			</div>
			<div class="com_particulars">
			<div class="com_particulars_tab">
			<ul id="com_particulars_ul">
			<li @click='toggleTabs("tab1")' v-bind:class="{'on':flag=='tab1'}"><p>商品详情</p></li>
			<li @click='toggleTabs("tab2")' v-bind:class="{'on':flag=='tab2'}"><p>所有参与记录</p></li>
			<li @click='toggleTabs("tab3")' v-bind:class="{'on':flag=='tab3'}"><p>晒单</p></li>
			<li @click='toggleTabs("tab4")' v-bind:class="{'on':flag=='tab4'}"><p>往期揭晓</p></li>
			</ul>
			</div>
			<div class="com_particulars_tab1">
			<div class="messagesRight">
			<component :is='currentView' keep-alive></component>
			</div>
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
	import {luckybuyBookCover,luckybuyActivityBookDetail} from '../../../service/getData'
	import b1 from "./activityBookDetail_book.vue"
	import b2 from "./activityBookDetail_record.vue"
	import b3 from "./activityBookDetail_show.vue"
	import b4 from "./activityBookDetail_announce.vue"
    import {downtimer} from '../../../js/luckybuy/downtimer.js'    
	


export default {
  props: {
      percentage: Number
    },
    data(){
        return{
             book_cover1:null,
             luckybuyBookCover:[],
			 gabd:[],             
             num1: '1',
             t1:1,
             t2:1,
             currentView: 'tab1',
             flag:'tab1',
             luck_activity_list_id: this.$route.query.id || '',

			 percent:function(a,b){
                  return Math.ceil(a/b*100)
                    },             
             }

         },
   
       created:function() {          
             this.fetchData(this.luck_activity_list_id)
         },

        watch:{
            '$route': 'fetchData',
			't1':function(oldVal){
					console.log('oldVal'+oldVal);
　　　　　　　　},
         },

     	mounted(){            
            this.$nextTick(function () {
            	this.dtimer(this.t1)
            })
  　　 
	         },

	    components:{
		    'ltop-bar': ltopBar,
		    'ltop-header':ltopHeader,
		    'ltop-menu':ltopMenu,
		    'ltop-menuleft':ltopMenuleft, 
		    'tab1': b1,
		    'tab2': b2,
		    'tab3': b3,
		    'tab4': b4, 
		    'lfoo-ter':lfooter,
	    },

computed:{
         },

methods:{
	  changenum(value){
				this.num1 = value
			},
       tabToggle: function(tabText) {
                 this.flag=tabText
                 this.book_cover1=tabText
                  },

       toggleTabs: function(tabText) {
	             this.currentView = tabText;
	             this.flag=tabText;
      
                  },

       fetchData:function(luck_activity_list_id){
				 luckybuyBookCover(luck_activity_list_id).then(res => {
				 this.luckybuyBookCover = res
				 this.book_cover1 = res[0].book_cover		
			               })

				 luckybuyActivityBookDetail(luck_activity_list_id).then(res => {
				 		this.gabd = res		
				 		// downtimer(this.times,'minute_show1_0','second_show1_0','msecond_show1_0')  

			              })             
                  },
		        dtimer:function(t){
				var times = t * 100; // 60秒
                var countTime =window.setInterval(function(){
		                  times = --times < 0 ? 0 : times
		                  var  minute=0,
                          second= 0,
                          msecond=0;//时间默认值
                  if(times > 0) {

                      minute = Math.floor(times / 60 / 100);
                      second = Math.floor(times / 100)-(minute*60);
                      msecond = Math.floor(times % 100);

                  }else{
	                  this.t1 = 0
	                  this.t2 = 0
	                  console.log('this.t1='+this.t1)
	                   }

                  if (minute <= 9) minute = '0' + minute;
                  if (second <= 9) second = '0' + second;
                  if (msecond <= 9) msecond = '0' + msecond;
                  $('#minute_show1_0').html("<span class='jxss'>"+minute.toString().substr(0,1)+"</span><span class='jxss'>"+minute.toString().substr(1,1)+"</span>");
                  $('#second_show1_0').html("<span class='jxss'>"+second.toString().substr(0,1)+"</span><span class='jxss'>"+second.toString().substr(1,1)+"</span>");
                  $('#msecond_show1_0').html("<span class='jxss'>"+msecond.toString().substr(0,1)+"</span><span class='jxss'>"+msecond.toString().substr(1,1)+"</span>");
                  if(times == 0) {
                      clearInterval(countTime);
                  }
              }, 10);					           
		        }  
       
       }
}

</script>
<style scoped>
   @import '../../../css/luckybuy/activityBookDetail.css'
</style>
