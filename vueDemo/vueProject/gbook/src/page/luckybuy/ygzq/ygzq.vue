<template>
    <div class="con">
        <ltop-bar></ltop-bar>
        <ltop-header></ltop-header>
        <ltop-menu></ltop-menu>
        <div class="con-top" >
             <ltop-menuleft></ltop-menuleft> 
        </div>
        <ltop-banner></ltop-banner>
        <div class="tab">
            <div class="glu_z">
                     <input type="hidden" id="vest_area_id"/>
        <div class="glu_xq">
            <p >幸运购分类：</p>
            <ul class="glu_xq_ul">
                <li style="background-color: #DD2726" ng-click="area_type_changed(1)">一元区</li>
                <li  ng-click="area_type_changed(2)">二元区</li>
                <li  ng-click="area_type_changed(5)">五元区</li>
                <li  ng-click="area_type_changed(10)">十元区</li>
            </ul>
        </div>
        <di class="glu_book_px">
            <p class="glu_book1_px_p">排序：</p>
            <ul class="glu_px_ul">
                <li>
                    <a  ng-click="sortindex(1,'rqsp',1)" id="rqsp">人气商品</a>
                    <a  ng-click="sortindex(2,'rqsp',1)" id="rqspdesc" style="display: none">人气商品 ↓</a>
                    <a  ng-click="sortindex(1,'rqsp',1)" id="rqspasc" style="display: none">人气商品 ↑</a>
                </li>
                <li>
                    <a  ng-click="sortindex(1,'syrc',2)" id="syrc">剩余人次</a>
                    <a  ng-click="sortindex(2,'syrc',2)" id="syrcdesc" style="display: none">剩余人次 ↓</a>
                    <a  ng-click="sortindex(1,'syrc',2)" id="syrcasc" style="display: none">剩余人次 ↑</a>
                </li>
                <li>
                    <a ng-click="sortindex(1,'zxsp',3)" id="zxsp">最新商品</a>
                    <a ng-click="sortindex(2,'zxsp',3)" id="zxspdesc" style="display: none">最新商品 ↓</a>
                    <a ng-click="sortindex(1,'zxsp',3)" id="zxspasc" style="display: none">最新商品 ↑</a>
                </li>
                <li>
                    <a ng-click="sortindex(1,'zxrc',4)" id="zxrc">总需人次</a>
                    <a ng-click="sortindex(2,'zxrc',4)" id="zxrcdesc" style="display: none">总需人次 ↓</a>
                    <a ng-click="sortindex(1,'zxrc',4)" id="zxrcasc" style="display: none">总需人次 ↑</a>
                </li>
            </ul>
        </di>      
                <ul class="hy" style="width: 1176px; height:1280px;float: left; margin-top: 10px">
                    <li>
                        <div class="glu_booklist" style="width: 1176px; height:1280px;">
                            <div  class="glu_book1">
                                <div class="glu_book_img">
                                    <a href="#" target="_blank" title=" " > 
                                        <img src=" " class="glu_img">
                                    </a>
                                    <img src=" " class="glu_img1">
                                </div>
                                <div class="glu_book_nr">
                                   <p class="glu_bookname" title=" " > 
                                     <a href="#"></a>
                                   </p>
                                    <p class="glu_book_total">
                                        <span >总需：</span>
                                        <span id="bar11"></span>
                                        <span>&nbsp;&nbsp;人次</span>
                                    </p>
                                    <div class="glu_book_tt">
                                        <div class="bar"  id="bar" style="width:0%;"></div>
                                    </div>
                                    <p class="glu_book_nub">
                                        <span class="glu_book_sp1" id="total" ></span>
                                        <span class="glu_book_sp2" id="total1"></span>
                                    </p>
                                    <p class="glu_book_nub1">
                                        <span class="glu_book_sp3">已参与人次</span>
                                        <span class="glu_book_sp4">剩余人次</span>
                                    </p>
                                    <div class="glu_book_but">
                                        <div class="glu_book_but1">
                                           <p>立即云购</p>
                                        </div>
                                        <div class="glu_book_but2  btns">
                                            <a href=" " class=" orange  add_cart_large btnCart">
                                              <p >加入购物车</p>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                                <div style="text-align: center">
                                   <img src=" " width="210px" style="margin-top: 50px">
                                </div>
                            </div>
                            <div  class="glu_book1">
                                <div class="glu_book_img">
                                    <a href="#" target="_blank" title=" " > 
                                        <img src=" " class="glu_img">
                                    </a>
                                    <img src=" " class="glu_img1">
                                </div>
                                <div class="glu_book_nr">
                                   <p class="glu_bookname" title=" " > 
                                     <a href="#"></a>
                                   </p>
                                    <p class="glu_book_total">
                                        <span >总需：</span>
                                        <span id="bar11"></span>
                                        <span>&nbsp;&nbsp;人次</span>
                                    </p>
                                    <div class="glu_book_tt">
                                        <div class="bar"  id="bar" style="width:0%;"></div>
                                    </div>
                                    <p class="glu_book_nub">
                                        <span class="glu_book_sp1" id="total" ></span>
                                        <span class="glu_book_sp2" id="total1"></span>
                                    </p>
                                    <p class="glu_book_nub1">
                                        <span class="glu_book_sp3">已参与人次</span>
                                        <span class="glu_book_sp4">剩余人次</span>
                                    </p>
                                    <div class="glu_book_but">
                                        <div class="glu_book_but1">
                                           <p>立即云购</p>
                                        </div>
                                        <div class="glu_book_but2  btns">
                                            <a href=" " class="orange  add_cart_large btnCart">
                                              <p >加入购物车</p>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                                <div style="text-align: center">
                                   <img src=" " width="210px" style="margin-top: 50px">
                                </div>
                            </div>
                            <div  class="glu_book1">
                                <div class="glu_book_img">
                                    <a href="#" target="_blank" title=" " > 
                                        <img src=" " class="glu_img">
                                    </a>
                                    <img src=" " class="glu_img1">
                                </div>
                                <div class="glu_book_nr">
                                   <p class="glu_bookname" title=" " > 
                                     <a href="#"></a>
                                   </p>
                                    <p class="glu_book_total">
                                        <span >总需：</span>
                                        <span id="bar11"></span>
                                        <span>&nbsp;&nbsp;人次</span>
                                    </p>
                                    <div class="glu_book_tt">
                                        <div class="bar"  id="bar" style="width:0%;"></div>
                                    </div>
                                    <p class="glu_book_nub">
                                        <span class="glu_book_sp1" id="total" ></span>
                                        <span class="glu_book_sp2" id="total1"></span>
                                    </p>
                                    <p class="glu_book_nub1">
                                        <span class="glu_book_sp3">已参与人次</span>
                                        <span class="glu_book_sp4">剩余人次</span>
                                    </p>
                                    <div class="glu_book_but">
                                        <div class="glu_book_but1">
                                           <p>立即云购</p>
                                        </div>
                                        <div class="glu_book_but2  btns">
                                            <a href=" " class="orange  add_cart_large btnCart">
                                              <p >加入购物车</p>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                                <div style="text-align: center">
                                   <img src=" " width="210px" style="margin-top: 50px">
                                </div>
                            </div>
                            <div  class="glu_book1">
                                <div class="glu_book_img">
                                    <a href="#" target="_blank" title=" " > 
                                        <img src=" " class="glu_img">
                                    </a>
                                    <img src=" " class="glu_img1">
                                </div>
                                <div class="glu_book_nr">
                                   <p class="glu_bookname" title=" " > 
                                     <a href="#"></a>
                                   </p>
                                    <p class="glu_book_total">
                                        <span >总需：</span>
                                        <span id="bar11"></span>
                                        <span>&nbsp;&nbsp;人次</span>
                                    </p>
                                    <div class="glu_book_tt">
                                        <div class="bar"  id="bar" style="width:0%;"></div>
                                    </div>
                                    <p class="glu_book_nub">
                                        <span class="glu_book_sp1" id="total" ></span>
                                        <span class="glu_book_sp2" id="total1"></span>
                                    </p>
                                    <p class="glu_book_nub1">
                                        <span class="glu_book_sp3">已参与人次</span>
                                        <span class="glu_book_sp4">剩余人次</span>
                                    </p>
                                    <div class="glu_book_but">
                                        <div class="glu_book_but1">
                                           <p>立即云购</p>
                                        </div>
                                        <div class="glu_book_but2  btns">
                                            <a href=" " class="orange  add_cart_large btnCart">
                                              <p >加入购物车</p>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                                <div style="text-align: center">
                                   <img src=" " width="210px" style="margin-top: 50px">
                                </div>
                            </div>
                            <div  class="glu_book1">
                                <div class="glu_book_img">
                                    <a href="#" target="_blank" title=" " > 
                                        <img src=" " class="glu_img">
                                    </a>
                                    <img src=" " class="glu_img1">
                                </div>
                                <div class="glu_book_nr">
                                   <p class="glu_bookname" title=" " > 
                                     <a href="#"></a>
                                   </p>
                                    <p class="glu_book_total">
                                        <span >总需：</span>
                                        <span id="bar11"></span>
                                        <span>&nbsp;&nbsp;人次</span>
                                    </p>
                                    <div class="glu_book_tt">
                                        <div class="bar"  id="bar" style="width:0%;"></div>
                                    </div>
                                    <p class="glu_book_nub">
                                        <span class="glu_book_sp1" id="total" ></span>
                                        <span class="glu_book_sp2" id="total1"></span>
                                    </p>
                                    <p class="glu_book_nub1">
                                        <span class="glu_book_sp3">已参与人次</span>
                                        <span class="glu_book_sp4">剩余人次</span>
                                    </p>
                                    <div class="glu_book_but">
                                        <div class="glu_book_but1">
                                           <p>立即云购</p>
                                        </div>
                                        <div class="glu_book_but2  btns">
                                            <a href=" " class="orange  add_cart_large btnCart">
                                              <p >加入购物车</p>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                                <div style="text-align: center">
                                   <img src=" " width="210px" style="margin-top: 50px">
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
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
import ltopBanner from '../../../page/luckybuy/home/topBanner'
import lfooter from '../../../components/luckybuy/footer/footer'

// import {cityGuess, hotcity, groupcity} from '../../service/getData'


export default {
    data(){
        return{

        }
    },

  mounted(){

    },

  components: {
    'ltop-bar': ltopBar,
    'ltop-header':ltopHeader,
    'ltop-menu':ltopMenu,
    'ltop-menuleft':ltopMenuleft,
    'ltop-banner':ltopBanner,
    'lfoo-ter':lfooter,   
  },

    computed:{

    },

    methods:{
        //点击图标刷新页面
        reload(){
            window.location.reload();
        }
    },
}

  /*进度条*/
    function run()
    {
        $('.glu_book1').each(function(){
            var bar = $(this).find("#bar") ;
            var total1 =  $(this).find("#total1");/*剩余可参与人数元素*/
            var bar1 =$(this).find("#bar11").html()*1;/*总可参与人数*/
            var total = $(this).find("#total");/*已参与人数元素*/
            var b=$(this).find("#total").html()*1;/*获取以参与人数*/
            total1.html(bar1-b);/*获得剩余可参与人数*/
            bar.css('width',b/bar1*100+"%");/*获得渐变进度条的宽度（进度）*/
        });
    }
    /*滑门*/
    $(function(){
        var timeId=null;
        $(".glu_xq_ul li").click(function(){
            var _this=$(this);
            $(_this).css("background-color","#DD2726").siblings().css("background-color","#FF6868");
            timeId=setTimeout(function(){
                var index =$(_this).index();
                $(".hy li").eq(index).show(800).siblings().hide(800);
            },300);
        })

    });

  
</script>

<style scoped>
 .con{margin:0 auto;overflow: hidden;}
 .el-carousel{width: 100%;}
@import '../../../css/luckybuy/ygzq.css'


</style>
