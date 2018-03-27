<template>
 <!--- header begin-->
<header id="pc-header">
    <div class="BHeader">
        <div class="yNavIndex">
            <ul class="BHeaderl">
                <li style="display:none;"><a href="#" style="float:left;">嘻哈杂货铺</a> <a href="#" style="float:left;">退出</a> </li>
                <li><a href="login.html" style="color:#ea4949;">请登录</a> </li>
                <li class="headerul">|</li>
                <li><a href="register.html">免费注册</a> </li>
                <li class="headerul">|</li>
                <li><a href="my-s.html">我的收藏</a> </li>
                <router-link to="/lhome" @click.native="gotoAddress">router-link-好书幸运购</router-link>
                <li class="headerul">|</li>

            </ul>
        </div>
    </div>
</header>
<!-- header End -->


</template>

<script>

    export default {
      data(){
            return{    }
        },
        created(){
           
        },
        mounted(){
            
        },
        computed: {

        },
        methods: {

        gotoAddress:function(){
        	this.$router.go(0)
        }

        },

    }

</script>

<style scoped>
    @import '../../../css/home/topBar.css'
</style>