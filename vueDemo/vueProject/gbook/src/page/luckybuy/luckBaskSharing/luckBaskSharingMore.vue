 <template>
    <div>
        <ltop-bar></ltop-bar>
        <ltop-header></ltop-header>
        <ltop-menu></ltop-menu>
        <div class="con-top" >
           <ltop-menuleft></ltop-menuleft> 
        </div>
        <span v-title data-title="晒单分享-好书幸运购 好书推荐给更多读者 让更多读者了解好书 "></span>    
        <div class="sharing_con">
           <div class="sharing_nav">
              <div class="sharing_nav_d1">
                 <p class="sharing_nav_p1">晒单分享</p>
                 <p class="sharing_nav_p2">
                     共<span>{{items.length}}</span>位幸运获奖者晒单
                 </p>
              </div>
             
           </div>
           <div v-show="items.length==0" class="hrdm_zw"><p>暂无数据！</p></div>

           <div class="sharing_list" v-show="items.length>0">            
                <div class="sharing_list_d" v-for="item in items" :key="item.luck_bask_order_id">
                  <img v-lazy="item.images_url"/>
                  <p class="sharing_list_p" >{{item.luck_bask_order_title}}</p>
                  <p class="sharing_list_p1">
                  <span class="sharing_list_sp1">{{item.name}}</span>
                  <span class="sharing_list_sp2">{{item.evaluate_date}}</span>
                  </p>    
                  <p class="sharing_list_p2">
                     {{item.bask_content}}
                  </p>
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
// import {luckybuyBaskSharingMore} from '../../../service/getData'

export default {
    data(){
        return{
          items:[],
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
          luckybuyBaskSharingMore(page,limit).then(res => {
            this.items = res
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
  @import '../../../css/luckybuy/luckBaskSharingMore.css'
</style>
