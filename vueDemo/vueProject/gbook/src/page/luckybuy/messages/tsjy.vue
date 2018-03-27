<template>
<div class="messagesRight_zf">
          <p>
               <router-link :to="'lhome'" target="_blank">首页</router-link>
               <span class="top_sp1">></span>
              <span class="top_sp2">新手指南</span>
         </p>
      <div class="messagesRight">
           <div class="cjwt_d">
             <p class="cjwt_p">
                 投诉建议
             </p>
               
           </div >
            <div class="cjwt_d1">
            <p class="cjwt_p3">好书幸运购致力于为用户提供更好的服务。如果在使用过程中遇到问题，或是有任何想法和建议，请让我们知道，以便我们为大家提供更优质的产品和服务。
                      你可以联系QQ：3179221716/2871780048 提交投诉建议。</p>
                

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
  .messagesRight{width: 915px;border: 1px solid #ddd;float: left; }
  .cjwt_d{ width: 95%;font-size: 18px; height:40px;border-bottom: 2px #ddd solid;margin-left: 2.5%}
.cjwt_p{font-size: 18px; height:20px;line-height: 20px;border-left: 5px solid #EC2D2D;margin-top: 20px;margin-left: 20px;padding-left: 20px;color: #EC2D2D}
.cjwt_d1{width: 95%; margin-left: 2.5%;margin-top: 30px}
.cjwt_p2{ font-size: 14px; font-weight: bold;}
.cjwt_p3{font-size: 13px;color: #808080;margin-left: 20px;line-height: 30px}
.messagesRight_zf{float: left;margin-left: 20px; }
.cjwt_p4{font-size: 13px;color: #808080;margin-left: 20px;line-height: 30px;font-weight: bold;}


</style>
