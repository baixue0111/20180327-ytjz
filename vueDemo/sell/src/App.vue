<template>
  <div>
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view v-bind:seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header.vue';
  const ERR_OK = 0;
  export default {
    data() {
      return {
        seller: {}
      };
    },
    // 生命周期钩子函数，当vue实例生成后调用此函数，一般在此函数中调用ajax初始化页面数据，其中第一个then函数表示成功时候执行的，也可以并列有多个then表示不同状态时完成不同任务
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
         // console.log(this.seller);
        };
      });
    },
    watch: {
      $route(to, from) {
        console.log(to);
        console.log(from);
        console.log(this.$route.path);
      }
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./common/stylus/mixin.styl"
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))

  .tab-item
    flex: 1
    text-align: center

    & > a
      display: block
      font-size: 14px
      color: rgb(77, 85, 93)
      line-height: 14px
      height: 40px
      line-height: 40px

      &.active
        color: rgb(240, 20, 20)
</style>
