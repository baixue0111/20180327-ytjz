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
                        配送费用
              	     </p>
                       
              	   </div >
              	    <div class="cjwt_d1">
              	     
                        <p class="cjwt_p3">
              			          所有商品大陆地区免费快递。（港澳台和汽车除外）
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
