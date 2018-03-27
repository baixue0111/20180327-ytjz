 <template>
    <div>
        <ltop-bar></ltop-bar>
        <ltop-header></ltop-header>
        <ltop-menu></ltop-menu>
        <div class="con-top" >
           <ltop-menuleft></ltop-menuleft> 
        </div>
        <span v-title data-title="最新揭晓-好书幸运购 好书推荐给更多读者 让更多读者了解好书 "></span>
        <div class="newstannouncenore_con">
           <div class="newstannouncenore_left">
              <p class="newstannouncenore_left_p">最近三天揭晓的所有商品</p>

              <div v-show="items.length==0" class="hrdm_zw"><p>暂无数据！</p></div>



             <div class="newstannouncenore_left_div" v-show="items.length>0">
                    <div class="newstannouncenore_left_d" v-for="item in items" :key="item.luck_activity_list_id">
                            <img v-lazy="item.book_cover"/>
                            <p class="sharing_list_p">{{item.activity_list_title}}</p>
                            <p class="sharing_list_p1">总需：{{item.plan_amount}} 人次</p>
                            <p class="sharing_list_p1">期号：{{item.hold_number}}</p>
                            <div class="sharing_list_d1">
                                <div class="sharing_list_left">
                                     <img src='../../../images/luckybuy/headimg.jpg'/>
                                </div>
                                <div class="sharing_list_right">
                                     <p class="sharing_list_right_p">恭喜<span>{{item.name}}</span> 获得该商品</p>
                                     <p class="sharing_list_right_p1">幸运号码：<span>{{item.lucky_number}}</span></p>
                                     <p class="sharing_list_right_p1">本期参与：<span>{{item.total_number}}</span>人次</p>
                                     <p class="sharing_list_right_p1">揭晓时间：{{item.announce_date}}</p>
                                     <p class="sharing_list_right_btn">查看详情</p>
                                </div> 
                            </div>
                    </div> 
            </div>

            </div>

           <div class="newstannouncenore_right">
              <h4 class="newstannouncenore_right_p">最快揭晓</h4>
              <img class="newstannouncenore_right_img" src='../../../images/luckybuy/2017-06-15_142113.jpg'/>
              <div class="newstannouncenore_right_d" v-for="item in itemsFastest" :key="item.luck_activity_list_id">
                   <img class="newstannouncenore_right_img" v-lazy="item.book_cover"/>
                    <p class="sharing_list_p">{{item.activity_list_title}}</p>
                    <p class="sharing_list_p1">总需：{{item.plan_amount}} 人次</p>
                    <el-progress :text-inside="true" :stroke-width="10" :percentage="percent(item.act_amount,item.plan_amount)"></el-progress>
                    <p class="sharing_list_p1">
                        <span class="sharing_list_sp1">{{item.act_amount}}</span>
                        <span class="sharing_list_sp2">{{item.plan_amount - item.act_amount}}</span>
                    </p>
                    <p class="sharing_list_p1">
                        <span class="sharing_list_sp1">已参与人次</span>
                        <span class="sharing_list_sp2">剩余人次</span>
                    </p>
                    <p class="sharing_list_right_btn2">我来包尾</p>
              </div>
           </div>
        </div> 

            <div class="block">          
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
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
// import {luckybuyNewestAnnounceFastest} from '../../../service/getData'
// import {luckybuyNewestAnnounceMore,luckybuyNewestAnnounceFastest} from '../../../service/getData'
export default {
    data(){
        return{
          items:[],
          itemsFastest:[],
          pageSize:20,
          currentPage:1,
          percent:function(a,b){
            return Math.ceil(a/b*100)
          }
        }
    },

  created(){
      this.fetchData(this.currentPage,this.pageSize)
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
        this.fetchData(this.currentPage,this.pageSize)
      },
    currentPage:function(){
        this.fetchData(this.currentPage,this.pageSize)
      },
    },

    methods:{
      fetchData(page,limit){
          luckybuyNewestAnnounceMore(page,limit).then(res => {
            this.items = res
          })  
          luckybuyNewestAnnounceFastest(page,limit).then(res => {
            this.itemsFastest = res
          })  
      },
      filtertags(){
          this.fetchData(this.currentPage,this.pageSize)
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
  @import '../../../css/luckybuy/newestAnnounceMore.css'
</style>
