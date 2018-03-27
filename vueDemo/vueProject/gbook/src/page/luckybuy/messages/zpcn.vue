<template>
<div class="messagesRight_zf">
                 <p>
               <router-link :to="'lhome'" target="_blank">首页</router-link>
               <span class="top_sp1">></span>
              
                <span class="top_sp2">账户设置</span>
              
               </p>
              <div class="messagesRight">
                   <div class="cjwt_d">
                     <p class="cjwt_p">
                         正品承诺
                     </p>
                       
                   </div >
                    <div class="cjwt_d1">
                     
                        <p class="cjwt_p3">正规渠道</br>
                         好书幸运购网严格控制供应渠道，所售商品均从正规的品牌渠道进货，供应商类型包括品牌生产商、品牌授权总代理、品牌授权总经销、品牌分支机构等。
                         </p>
                        
                       
                        <p class="cjwt_p3">正品采购</br>
                              好书幸运购网所售的商品均从品牌方、代理商、经销商等正规渠道采购，并与之签订正品采购协议。不仅如此，我们对供应商的资质都进行严格审核，企业资质及产品质检报告缺一不可。</p>
                       
                            
                     <p class="cjwt_p3">
                      全售后保障</br>
                       1、好书幸运购网保证所有商品都为正品行货，正规渠道发货，所售商品可享受生产厂家提供的全国联保服务，按照国家相关政策，履行换新、保修等（因好书幸运购网属新型的互助购物平台，不支持退货）义务。</br>
                       2、如果您对好书幸运购网网所售商品存在任何质疑，可前往商家指定检测中心或国家正规质检机构进行检测，假设检测结果证实商品为非品牌正品，您可将检测报告、问题商品及完整包装附件，一并返还好书幸运购网网，产生的相关费用由好书幸运购网追究相关责任方承担。</br>
                      3、当您收到的商品出现任何质量问题，经由商家指定或特约售后服务中心检测确认问题属实，那么在商家规定的质保及保修期内，您可以选择换新或者维修；为更快速解决您的问题，我们建议您直接拨打商品保修卡中的商家服务热线进行反馈处理。当然，您也可以直接拨打好书幸运购网网客服电话010-62609769，我们将竭诚为您解决！
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
