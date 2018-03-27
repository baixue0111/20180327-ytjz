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
				           保障体系
					     </p>
				         
					   </div >
					    <div class="cjwt_d1">
					     
				          <p class="cjwt_p3">100%正品保证</br>
				           好书幸运购商城精心挑选优质服务品牌商家，保障全场云购商品100%品牌正品保证。</p>
				          
				         
				          <p class="cjwt_p3">100%公平公正</br>
				                整个过程是完全透明，您可以随时查看每件商品参与人数，参与次数，参与名单及获得者信息等记录。。</p>
				         
				          <p class="cjwt_p3" style="margin-bottom">全国免费快递</br>
				                     好书幸运购承诺全场所有商品全国免费快递。（港澳台地区除外）</p>
				         
					          <p class="cjwt_p3">
								好书幸运购严格控制供应渠道，全部商品均从品牌官方以及品牌经销商直接采购供货，并取得品牌官方网络销售授权书，如果您认为商城的商品是假货，并能提供国家相关质检机构的证明文件，经确认后，在返还商品金额的同时并提供假一赔十的服务保障。为了保障您的利益，对商城的商品，做如下说明：</br>
								  1、好书幸运购对所有商品均保证正品行货，正规渠道发货，所有商品都可以享受生产厂家的全国联保服务，按照国家三包政策，针对所售商品履行保修、换货和退货的义务。</br>
								  2、 出现国家三包所规定的功能性故障时，经由生产厂家指定或特约售后服务中心检测确认故障属实，您可以选择换货或者维修;超过15日且在保修期内，您只能在保修期内享受免费维修服务。为了不耽误您使用，缩短故障商品的维修时间，我们建议您直接联系生产厂家售后服务中心进行处理。您也可以直接在商品的保修卡中查找该商品对应的全国各地生产厂家售后服务中心联系处理。</br>
								  3、好书幸运购真诚提醒广大幸运者在您收到商品的时候，请尽量亲自签收并当面拆箱验货，如果有问题，例如：运输途中的损坏，请不要签收，并与快递员交涉，拒签，退回!</br>
								  4、在收到商品后发现有质量问题，请您不要私自处理，妥善保留好原包装，第一时间联系好书幸运购客服人员，由好书幸运购同发货商协商在48小时内解决。如有破损或丢失，我们将无法为您办理退货。</br>
								  如对协商处理结果存在异议，请您自行到当地生产厂家售后服务中心进行检测，并开据正规检测报告(对于有些生产厂家售后服务中心无法提供检测报告的，需提供维修检验单据)，如果检测报告确认属于质量问题，然后将检测报告、问题商品及完整包装附件，一并返还发货商办理换货手续，产生的相关费用由好书幸运购追究相关责任方承担。</br>
								  好书幸运购上的电子产品及配件因为生成工艺或仓储物流原因，可能会存在收到或使用过程中出现故障的几率，好书幸运购不能保证所有的商品都没有故障，但我们保证所售商品都是全新正品行货，能够提供正规的售后保障。我们保证商品的正规进货渠道和质量，如果您对收到的商品质量表示怀疑，请提供生产厂家或官方出具的书面鉴定，我们会按照国家法律规定予以处理。但对于任何欺诈性行为，好书幸运购将保留依法追究法律责任的权利。本规则最终解释权由好书幸运购所有。
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
