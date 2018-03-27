 <template>
  	<div id="leftMenu">
                    <div id="leftMenu_div">
                    <img src='../../../images/luckybuy/1-1.png'/>
                    <h2 id="leftMenu_h2">帮助中心</h2>
                   </div>  
                    <el-row class="tac">
                        <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
                          <el-menu-item-group title="新手指南"  class="el-menu-item-group__title">
                            <el-menu-item index="1"><p class="con_p">了解云购</p></el-menu-item>
                            <el-menu-item index="2"><p class="con_p">服务协议</p></el-menu-item>
                            <el-menu-item index="3"><p class="con_p">常见问题</p></el-menu-item>
                            <el-menu-item index="4"><p class="con_p">投诉建议</p></el-menu-item>
                          </el-menu-item-group>
                          <el-menu-item-group title="账户设置" class="el-menu-item-group__title">
                            <el-menu-item index="5"><p class="con_p">保障体系</p></el-menu-item>
                            <el-menu-item index="6"><p class="con_p">正品承诺</p></el-menu-item>
                            <el-menu-item index="7"><p class="con_p">隐私声明</p></el-menu-item>
                            <el-menu-item index="8"><p class="con_p">安全支付</p></el-menu-item>
                          </el-menu-item-group>
                          <el-menu-item-group title="商品配送" class="el-menu-item-group__title">
                              <el-menu-item index="9"><p class="con_p">商品配送</p></el-menu-item>
                              <el-menu-item index="10"><p class="con_p">配送费用</p></el-menu-item>
                              <el-menu-item index="11"><p class="con_p">商品验货与签收</p></el-menu-item>
                              <el-menu-item index="12"><p class="con_p">长时间未收的商品</p></el-menu-item>
                          </el-menu-item-group>
                        </el-menu>
                    </el-row>
               </div>

</template>

<script>

// import {cityGuess, hotcity, groupcity} from '../../service/getData'

export default {
    data(){
       return {
        
       }
    },
    created: function() {
      
    },
    watch:{
    
    },
    mounted(){

    },
    components:{
       
    },
    computed:{
       
    },
    methods:{

    },
}



</script>

<style scoped>
 .el-menu-item{
    height:30px; 
    line-height: 30px;
    font-size: 12px;
    color: #48576a;
    cursor: pointer;
    position: relative;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    white-space: nowrap;
    
    }

.el-menu{padding-bottom: 20px}
.el-menu-item-group__title {
    padding-top: 15px;
    line-height: normal;
    font-size: 14px;
    padding-left:50px;
    color: #97a8be;
  
    }
</style>
