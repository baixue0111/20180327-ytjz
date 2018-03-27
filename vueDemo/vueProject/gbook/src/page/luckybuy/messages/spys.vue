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
                       商品验收与签收
            	     </p>
                     
            	   </div >
            	    <div class="cjwt_d1">
            	     
                      <p class="cjwt_p3">
                            1、签收时请慎重，尽量本人签收，签收时务必仔细检查商品，如：外包装是否被开封，商品是否破损，配件是否缺失，功能是否正常。在确保无误后再签收，以免产生不必要的纠纷。若有任何疑问，请及时拨打客服电话反馈信息，若因用户未仔细检查商品即签收后产生的纠纷，好书幸运购概不负责，仅承担协调处理的义务；</br>
                            2、用户所获商品，相关商品质量及保修问题请直接联系生产厂家；</br>
                            3、若因您的地址填写错误、联系方式填写有误等情况造成商品无法完成投递或被退回，所产生的额外费用及后果由用户负责；</br>
                            4、如因不可抗拒的自然原因，如地震、洪水等，所造成的商品配送延迟，好书幸运购不承担责任；</br>
                            5、温馨提醒：若商品已签收，则说明商品配送正确无误且不存在影响使用的因素，好书幸运购有权不受理换货申请。
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
  .messagesRight{width: 915px;border: 1px solid #ddd;float: left; }
  .cjwt_d{ width: 95%;font-size: 18px; height:40px;border-bottom: 2px #ddd solid;margin-left: 2.5%}
.cjwt_p{font-size: 18px; height:20px;line-height: 20px;border-left: 5px solid #EC2D2D;margin-top: 20px;margin-left: 20px;padding-left: 20px;color: #EC2D2D}
.cjwt_d1{width: 95%; margin-left: 2.5%;margin-top: 30px}
.cjwt_p2{ font-size: 14px; font-weight: bold;}
.cjwt_p3{font-size: 13px;color: #808080;margin-left: 20px;line-height: 30px;margin-bottom: 20px}
.messagesRight_zf{float: left;margin-left: 20px; }
</style>
