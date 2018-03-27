<template>
<div class="messagesRight_zf">
              <p>
               <router-link :to="'lhome'" target="_blank">首页</router-link>
               <span class="top_sp1">></span>              
                <span class="top_sp2">网站公告</span>              
              </p>
			<div class="messagesRight">
			       
				   <div class="messagesRight_con">
				     
				      <div class="messagesRight_d">
				         <p>2017.06.10</p>
				      </div>
				      <div class="messagesRight_d1"></div>
				      <router-link :to="'lmessagesDetail'">
				        <p class="messagesRight_p">关注一元云购微信领20元红包</p>
				      </router-link>
				   </div>			   
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
msg: ''
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messagesRight{width: 915px;height: 500px;border: 1px solid #ddd;float: left;}
.messagesRight_d{width: 100px;height: 20px;background: #DA3552;border-radius: 5px;float: left;margin-top:25px;margin-left: 20px;}
.messagesRight_d p{width: 100px;height: 20px;line-height: 20px;text-align: center;color: #fff}
.messagesRight_con{width:95%;height:70px;border-bottom: 1px dashed #999999;margin-left: 2.5%}
.messagesRight_d1{border-left: 5px #DA3552 solid;border-bottom:5px #fff solid;border-top:5px #fff solid;border-right:none;float: left;margin-top:30px}
.messagesRight_p{margin-top:15px;float: left;}
.messagesRight_zf{float: left;margin-left: 20px; }
</style>
