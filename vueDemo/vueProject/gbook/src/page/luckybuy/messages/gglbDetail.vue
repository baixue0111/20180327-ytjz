<template>
<div class="messagesRight_zf">
                 <p>
               <router-link :to="'lhome'" target="_blank">首页</router-link>
               <span class="top_sp1">></span> 
                <router-link :to="'lmessagemore'" >             
                <span class="top_sp2">公告新闻</span>
                </router-link>
               <span class="top_sp2">网站公告</span>             
               </p>
				<div class="messagesRight">
					   <div class="cjwt_d">
					     <p class="cjwt_p">
				          关注一元云购微信领20元红包
					     </p>
				         
					   </div >
					    <div class="cjwt_d1">
					     
				          <p class="cjwt_p3">
								亲爱的云友们：<br/>
								特大！加急！喜讯！关注好书幸运购微信公众号免费领取20元红包啦！
								在好书幸运购程序猿没日没夜的开发和其他各部门精心的准备下，好书幸运购微信公众号送红包互动终于诞生了，云友们通过关注好书幸运购微信号也可以尽情买买买了！！大家赶紧关注玩起来吧！！
								好书幸运购还在不断完善中，微信手机2.0版本，app 2.0 版本，正在玩命赶过来的路上，欢迎大家给我们提意见，我们一定会越来越好！！
								扫描下方二维码，猛戳福利！方便、快捷，随时随地，想玩就玩！
								小投入，大惊喜，一切尽在好书幸运购！
								关注微信领红包任务说明：
								微信手动搜索公账号“好书幸运购CN”或“www.goldbooknews.com”扫描下图二维码，添加后回复消息"微信红包"，根据提示完成任务即可领取20元红包！
				           </p>
				           <p class="gglbDetail_s">好书幸运购运营团队</p>
				            <img  class="gglbDetail_img" src="../../../images/luckybuy/ewm.jpg"/>
				            <img  class="gglbDetail_img2" src="../../../images/luckybuy/30_84bf49df77dfb08e5437d6ae1d8af8a.gif"/>


					 </div >
				</div>
	</div>			
</template>

<script>
export default {
name: 'hello',
created(){

        },
destroyed(){

        },
data () {
return {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .messagesRight{width: 915px;border: 1px solid #ddd;float: left; }
  .cjwt_d{ width: 95%;font-size: 18px; height:40px;border-bottom: 2px #ddd solid;margin-left: 2.5%}
.cjwt_p{font-size: 18px; height:20px;line-height: 20px;border-left: 5px solid #EC2D2D;margin-top: 20px;margin-left: 20px;padding-left: 20px;color: #EC2D2D}
.cjwt_d1{width: 95%; margin-left: 2.5%;margin-top: 30px;margin-bottom: 30px}
.cjwt_p2{ font-size: 14px; font-weight: bold;}
.cjwt_p3{font-size: 15px;color: #808080;margin-left: 20px;line-height: 30px;margin-bottom: 20px}
.gglbDetail_s{font-size: 13px;color: #808080;float:right;line-height: 30px;}
.gglbDetail_img{width: 350px;height: 350px;margin-left: 30%}
.gglbDetail_img2{margin-left: 20%;}
.messagesRight_zf{float: left;margin-left: 20px; }

</style>
