<template>
  <div class="glb_recommend">
    <div class="glb_recommend_bt">
      <p class="glb_recommend_bt_p1">
        <i></i>热门推荐</p>
      <p class="glb_recommend_bt_p2">
        <router-link :to="'lhotrecommendationmore'" target="_blank">查看全部
          <i> > </i>
        </router-link>
      </p>
    </div>
    <div class="glb_recommend_con">
      <div class="glb_recommend_div_z">
        <div class="glb_recommend_div" v-for="item in items" :key="item.luck_activity_list_id">
          <div class="glb_recommend_img" v-if="item.luck_activity_list_id!==0">
            <router-link :to="{path:'lactivitybookdetail',query:{id:item.luck_activity_list_id}}" target="_blank" :title="item.activity_list_title">
              <img v-lazy="item.book_cover">
            </router-link>
          </div>
          <div id="glb_recommend_p" class="glb_recommend_p" v-if="item.luck_activity_list_id!==0">
            <p class="glb_recommend_p_con">
              <router-link :to="{path:'lactivitybookdetail',query:{id:item.luck_activity_list_id}}" target="_blank" :title="item.activity_list_title">
                {{item.activity_list_title}}
              </router-link>
            </p>
            <p class="glb_recommend_con1">总需人次：
              <span id="glb_recommend_con1">{{item.plan_amount}}</span>
            </p>
            <div class="glb_recommend_jd">
              <!--<el-progress :percentage="percent(item.act_amount,item.plan_amount)"></el-progress>-->
            </div>
            <p class="glb_recommend_con2">已参与：
              <span id="ycy">{{item.act_amount}}</span>
              <span class="glb_recommend_con2_sp">剩余人次</span>
              <span id="syrs">{{item.plan_amount - item.act_amount}}</span>
            </p>
            <div class="glb_recommend_btn">
              <div class="glb_recommend_btn_1" @click="openFormDialog('login')">
                <p>立即云购</p>
              </div>
              <div class="glb_recommend_btn_1_img ">
                <img src="../../../images/luckybuy/btn.jpg" class="btnCart">
              </div>
            </div>
          </div>
          <div v-if="item.luck_activity_list_id==0" style="text-align: center">
            <img src="../../../images/luckybuy/expect.jpg" width="210px" style="margin-top: 30px">
          </div>
        </div>
      </div>
      <div class="glb_recommend_div_z1">
        <shopping-msg></shopping-msg>
      </div>
    </div>
    <pop-login-dialog dialog-flag="login" ref="formDialog"></pop-login-dialog>
  </div>
</template>
<script>
  import { luckybuyHotRecommendation, accountLogin, regUser } from '../../../service/getData'
  import shoppingMsg from './shoppingMsg'
  export default {
    props: {
      percentage: Number
    },
    data() {
      return {
        items: [],
        percent: function (a, b) {
          return Math.ceil(a / b * 100)
        }
      }
    },
    created: function () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    mounted() {
    },
    components: {
      'shopping-msg': shoppingMsg
    },
    computed: {
    },
    methods: {
      fetchData: function () {
        luckybuyHotRecommendation().then(res => {
          this.items = res
        })
      },
      openFormDialog: function () {
        this.$refs.formDialog.open();
      },
    },
  }

</script>
<style scoped>
  @import '../../../css/luckybuy/hotRecommendation.css'
</style>