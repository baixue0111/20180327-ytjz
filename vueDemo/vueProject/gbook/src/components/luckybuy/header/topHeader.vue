<template>
<div>
	 <div class="container clearfix">
        <div class="header-logo fl">
           <h1>
              <a href="首页.html">
                <img src="../../../images/luckybuy/logo-1.png">
              </a> 
            </h1>
        </div>
        <div class="head-form fl">
            <form class="clearfix">
                <input type="text" class="search-text" accesskey="" id="key" autocomplete="off"  placeholder="抢先购">
                <button class="button" onClick="search('key');return false;">搜索</button>
            </form>
            <div class="words-text clearfix">
              <a href="#" class="red">1元秒爆</a>
                <a href="#">低至五折</a>
                <a href="#">新书抢先</a>
                <a href="#">买一赠一</a>
                <a href="#">幸运转转转</a>
                <a href="#">正在进行</a>
                <a href="#">已揭晓</a>
            </div>
        </div>
        <div class="header-cart fr">
           <a href="#">
              <img src="../../../images/luckybuy/car.png">
            </a> 
            <i class="head-amount">99</i>
        </div>
        
    </div>

</div>

</template>

<script>
export default {
	data () {
		return {

		}

	},
	ready () {
	},
	methods: {

	},
	components: {

	}
}
</script>

<style scoped>
    @import '../../../css/luckybuy/topHeader.css'
</style>