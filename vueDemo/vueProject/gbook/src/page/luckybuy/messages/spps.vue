<template>
<div class="messagesRight_zf">
                 <p>
               <router-link :to="'lhome'" target="_blank">首页</router-link>
               <span class="top_sp1">></span>
              
                <span class="top_sp2">商品配送</span>
              
               </p>
              <div class="messagesRight">
              	   <div class="cjwt_d">
              	     <p class="cjwt_p">
                        商品配送
              	     </p>
                       
              	   </div >
              	    <div class="cjwt_d1">
              	     
                        <p class="cjwt_p3">
                    				在您成为幸运用户后，好书幸运购会第一时间为您寄出商品，大陆地区免快递费。</br>
                            获得商品后，请您尽快提交收货地址，超过15天未确认收货地址，视为自动放弃该商品。
                        </p>

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
msg: ''
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .messagesRight{width: 915px;border: 1px solid #ddd;float: left;}
  .cjwt_d{ width: 95%;font-size: 18px; height:40px;border-bottom: 2px #ddd solid;margin-left: 2.5%}
.cjwt_p{font-size: 18px; height:20px;line-height: 20px;border-left: 5px solid #EC2D2D;margin-top: 20px;margin-left: 20px;padding-left: 20px;color: #EC2D2D}
.cjwt_d1{width: 95%; margin-left: 2.5%;margin-top: 30px}
.cjwt_p2{ font-size: 14px; font-weight: bold;}
.cjwt_p3{font-size: 13px;color: #808080;margin-left: 20px;line-height: 30px;margin-bottom: 20px}
.messagesRight_zf{float: left;margin-left: 20px; }
</style>
