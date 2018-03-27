<template>
    <div class="con" >
         <div>
           <span v-title :data-title="title"></span>
        </div>
        <ltop-bar></ltop-bar>
        <ltop-header></ltop-header>
        <ltop-menu></ltop-menu>
        <div class="con-top" >
            <ltop-menuleft></ltop-menuleft>  
        </div>

        <div class="zxgg_tab">
            
            <div id="main"> 
                <div id="top">
                   <h2 @click='tabToggle("tab013")'>网站公告</h2>
              
                </div>
                <div id="leftMenu">
                    <div id="leftMenu_div">
                    <img src='../../../images/luckybuy/1-1.png'/>
                    <h2 id="leftMenu_h2">帮助中心</h2>
                   </div>  
                   <div>
                     <div class="top">
                        <ul class="top_ul">
                        <p>
                         <i class="ico ico-instruction ico-instruction-1"> 
                          <img src="../../../images/luckybuy/mix-icon1.png"/>
                         </i>
                        新手指南</p>
                        <li @click='tabToggle("tab01")'  v-bind:class="{'on':flag=='tab01'}"><span>服务协议</span></li>
                        <li @click='tabToggle("tab02")'  v-bind:class="{'on':flag=='tab02'}"><span>了解云购</span></li>
                        <li @click='tabToggle("tab03")'  v-bind:class="{'on':flag=='tab03'}"><span>常见问题</span></li>
                        <li @click='tabToggle("tab04")'  v-bind:class="{'on':flag=='tab04'}"><span>投诉建议</span></li>
                        <p>
                         <i class="ico ico-instruction ico-instruction-1"> 
                          <img src="../../../images/luckybuy/mix-icon2.png"/>
                         </i>
                        账户设置</p>
                        <li @click='tabToggle("tab05")'  v-bind:class="{'on':flag=='tab05'}"><span>保障体系</span></li>
                        <li @click='tabToggle("tab06")'  v-bind:class="{'on':flag=='tab06'}"><span>正品承诺</span></li>
                        <li @click='tabToggle("tab07")'  v-bind:class="{'on':flag=='tab07'}"><span>隐私声明</span></li>
                        <li @click='tabToggle("tab08")'  v-bind:class="{'on':flag=='tab08'}"><span>安全支付</span></li>
                        <p>
                          <i class="ico ico-instruction ico-instruction-1"> 
                          <img src="../../../images/luckybuy/mix-icon3.png"/>
                         </i>
                        商品配送</p>
                        <li @click='tabToggle("tab09")'   v-bind:class="{'on':flag=='tab09'}"><span>商品配送</span></li>
                        <li @click='tabToggle("tab010")'  v-bind:class="{'on':flag=='tab010'}"><span>配送费用</span></li>
                        <li @click='tabToggle("tab011")'  v-bind:class="{'on':flag=='tab011'}"><span>商品验货与签收</span></li>
                        <li @click='tabToggle("tab012")'  v-bind:class="{'on':flag=='tab012'}"><span>长时间未收的商品</span></li>
                        <p>
                          <i class="ico ico-instruction ico-instruction-1"> 
                          <img src="../../../images/luckybuy/mix-icon4.png"/>
                         </i>
                          友情链接
                         </p>
                         <li><span>友情链接</span></li>
                         
                        </ul>

                      </div>
                      <div class="lxfs">
                           <p class="lxfs_p">如果不能在帮助内容中找到答案，您还可以拨打：
                           </p>
                           <div class="lxfs_d">
                             <p  class="lxfs_p2">
                                <i class="ico ico-instruction ico-instruction-1"> 
                                  <img src="../../../images/luckybuy/mix-icon5.png"/>
                                </i>
                              服务热线
                             </p>
                             <p class="lxfs_p3">010-62609769</p>
                           </div> 
                         </div>
                      
                    </div>

                </div>
                       
            </div>

            <div class="messagesRight">
                  <component :is='currentView' keep-alive></component>
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

import a1 from "./fwxy.vue"
import b1 from "./ljyg.vue"
import c1 from "./cjwt.vue"
import d1 from "./tsjy.vue"
import e1 from "./bztx.vue"
import f1 from "./zpcn.vue"
import g1 from "./yssm.vue"
import h1 from "./aqzf.vue"
import j1 from "./spps.vue"
import k1 from "./psfy.vue"
import l1 from "./spys.vue"
import m1 from "./wssp.vue"
import n1 from "./gglb.vue"
// import {cityGuess, hotcity, groupcity} from '../../service/getData'

// import a from '../../../js/luckybuy/zxgg-tab.js'
export default {
    data(){
        return{
          currentView: 'tab013',
          title:'新闻公告',
         // flag:'tab02'         
        }
    },
    mounted(){
         
    },
  components: {
    'ltop-bar': ltopBar,
    'ltop-header':ltopHeader,
    'ltop-menu':ltopMenu,
    'ltop-menuleft':ltopMenuleft,
    'tab01': a1,
    'tab02': b1,
    'tab03': c1,
    'tab04': d1,
    'tab05': e1,
    'tab06': f1,
    'tab07': g1,
    'tab08': h1,
    'tab09': j1,
    'tab010':k1,
    'tab011':l1,
    'tab012':m1,
    'tab013':n1,
    'lfoo-ter':lfooter,   
  },
    computed:{
            
    },
    methods:{

        tabToggle: function(tabText) {
                this.currentView = tabText
                 this.flag=tabText;

            },
    },
}

   
</script>
<style scoped>
 .con{margin:0 auto;overflow: hidden;}
 .el-carousel{width: 100%;}
 .zxgg_tab{width:1156px;margin:0 auto;overflow: hidden;padding-top:10px;}
 .el-menu-item{height:30px;line-height: 30px;font-size: 12px;color: #48576a;cursor: pointer;position: relative;transition: border-color .3s,background-color .3s,color .3s;box-sizing: border-box;white-space: nowrap;
 }
.el-menu{padding-bottom: 20px}
.el-menu-item-group__title {padding-top: 15px;line-height: normal; font-size: 14px; padding-left:50px;color: #97a8be; 
}

@import '../../../css/luckybuy/messagesMore.css'

</style>
