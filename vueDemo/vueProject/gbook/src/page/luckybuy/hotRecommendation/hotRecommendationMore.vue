 <template>
  <div>
    <ltop-bar></ltop-bar>
    <ltop-header></ltop-header>
    <ltop-menu></ltop-menu>
    <div class="con-top" >
     <ltop-menuleft></ltop-menuleft> 
    </div> 
     <span v-title data-title="热门推荐-好书幸运购 好书推荐给更多读者 让更多读者了解好书 "></span>    
   <div class="hrdm_con">
     <div class="hrdm_nav">
        <div class="hrdm_d2">
         <p class="hrdm_d2_p">所有商品</p>
         <ul class="hrdm_d2_ul">
          <li v-bind:class="{'on':flag=='文学'}" @click="filtertags('文学')">文学</li>
          <li v-bind:class="{'on':flag=='科技'}" @click="filtertags('科技')">科技</li>          
          <li v-bind:class="{'on':flag=='教育'}" @click="filtertags('教育')">教育</li>
          <li v-bind:class="{'on':flag=='童书'}" @click="filtertags('童书')">童书</li>
          <li v-bind:class="{'on':flag=='励志成功'}" @click="filtertags('励志成功')">励志成功</li>
          <li v-bind:class="{'on':flag=='经管'}" @click="filtertags('经管')">经管</li>
          <li v-bind:class="{'on':flag=='人文科学'}" @click="filtertags('人文科学')">人文科学</li>
          <li v-bind:class="{'on':flag=='杂志期刊'}" @click="filtertags('杂志期刊')">杂志期刊</li>
        </ul>
      </div>               
    </div>
    <div class="hrdm_nav1">
      <p>即将揭晓</p>
      <p>人气</p>
      <p>剩余人次</p>
      <p>最新</p>
      <p>价值</p>
    </div>
    </div>
    <div v-show="items.length==0" class="hrdm_zw"><p>暂无数据！</p></div>

    <div class="hrdm_list" v-show="items.length>0">
      <div class="hrdm_list_d" v-for="item in items" :key="item.luck_activity_list_id">
       <div v-if="item.luck_activity_list_id!=0">
         <div class="glb_recommend_img">
           <router-link :to="{path:'lactivitybookdetail',query:{id:item.luck_activity_list_id}}" target="_blank" :title="item.activity_list_title">
            <img v-lazy="item.book_cover">
          </router-link> 
        </div>
        <div id="glb_recommend_p" class="glb_recommend_p">
          <p class="glb_recommend_p_con" > 
            <router-link :to="{path:'lactivitybookdetail',query:{id:item.luck_activity_list_id}}" target="_blank" :title="item.activity_list_title">
              {{item.activity_list_title}}
            </router-link>
          </p>
          <p class="glb_recommend_con1">总需人次：
            <span id="glb_recommend_con1">{{item.plan_amount}}</span>
          </p>
          <div class="glb_recommend_jd">
            <el-progress :percentage="percent(item.act_amount,item.plan_amount)"></el-progress>
          </div>
          <p class="glb_recommend_con2">已参与：
            <span id="ycy">{{item.act_amount}}</span>
            <span class="glb_recommend_con2_sp">剩余人次</span><span id="syrs">{{item.plan_amount - item.act_amount}}</span>
          </p>
          <div class="glb_recommend_btn">
            <div class="glb_recommend_btn_1">
              <p>立即云购</p>
            </div>
            <div class="glb_recommend_btn_1_img ">
              <img src="../../../images/luckybuy/btn.jpg" class="btnCart">
            </div>
          </div>
        </div>
      </div>
      <div v-if="item.luck_activity_list_id==0" style="text-align: center"> 
        <img src="../../../images/luckybuy/expect.jpg" width="210px" style="margin-top: 30px">
      </div>
    </div>
  </div>

  <div class="block">
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[20, 50, 100, 200]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="items.length">
  </el-pagination>
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
  import {luckybuyHotRecommendationMore} from '../../../service/getData'

export default {
  data(){
    return{
      flag:'艺术',
      items:[],
      filterKey:'',
      pageSize:20,
      currentPage:1,
      percent:function(a,b){
          return Math.ceil(a/b*100)
        } 
      }
    },
  created(){
      this.fetchData(this.currentPage,this.pageSize,this.filterKey)
    },  
  components: {
    'ltop-bar': ltopBar,
    'ltop-header':ltopHeader,
    'ltop-menu':ltopMenu,
    'ltop-menuleft':ltopMenuleft,    
    'lfoo-ter':lfooter,   

    },
  watch:{
    '$route': 'fetchData',
    pageSize:function(){
        this.fetchData(this.currentPage,this.pageSize,this.filterKey)
      },
   currentPage:function(){
        this.fetchData(this.currentPage,this.pageSize,this.filterKey)
      },
  },
  methods:{
      fetchData(page,limit,filterkey){
          luckybuyHotRecommendationMore(page,limit,filterkey).then(res => {
            this.items = res
          })      
      },
      filtertags(filterkey){
          this.flag = filterkey
          this.filterKey = filterkey
          this.fetchData(this.currentPage,this.pageSize,this.filterKey)
      },
      handleSizeChange(val) {
          this.pageSize = val
            // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
            this.currentPage = val
            // console.log(`当前页: ${val}`);
          }    
    },
  }

</script>

<style scoped>
  .on{background:#EA4949;color: #fff}
  @import '../../../css/luckybuy/hotRecommendationMore.css'
</style>
