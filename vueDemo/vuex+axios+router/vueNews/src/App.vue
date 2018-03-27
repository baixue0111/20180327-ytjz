<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/test1">我是test1</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/test2">我是test2</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from 'components/header/header';
const ERR_OK = 0;
export default {
  data() {
    return {
      testData: {},
      testArray: []
    }
  },
  created() {
    this.$http.get('/api/test1').then((response) => {
     // console.log(response);
     response = response.body;
     this.testData = response.data;
     // console.log(this.testData);
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style>
@import 'common/reset.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  /* border: 1px solid #000; */
}
.tab-item{
  flex: 1;
  width: 50%;
}
.tab-item .active{
  line-height: 6px;
  padding: 3px 5px;
  background: #ccc;
}
</style>
