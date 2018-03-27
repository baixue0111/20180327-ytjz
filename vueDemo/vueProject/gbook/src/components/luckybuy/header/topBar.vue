<template>
    <!--- header begin-->
    <header id="pc-header">
        <div class="BHeader">
            <div class="yNavIndex">
                <ul class="BHeaderl">
                    <li><a href="http://www.goldbooknews.com"> 
                <img src="../../../images/luckybuy/back.jpg" style="width: 10px;height: 10px;margin-right: 5px">返回好书网首页</a></li>
                    <li class="headerul">|</li>
                    <li><a href="javascript:window.external.AddFavorite('http://www.goldbooknews.com', '好书荐读网')">收藏</a></li>
                    <li class="headerul">|</li>
                    <li>客服热线：010-62609769</li>
                    <li style="display:none;"><a href="#" style="float:left;">嘻哈杂货铺</a> <a href="#" style="float:left;">退出</a> </li>
                    <li class="nav-right">
                        <a href="javascript://" style="color:#ea4949;" @click="openFormDialog('login')">请登录</a>
                    </li>
                    <li class="headerul">|</li>
                    <li>
                        <a href="javascript://" @click="openFormDialog('register')">注册</a>
                    </li>
                    <li class="headerul">|</li>
                    <li><a href="#">签到</a> </li>
                    <li class="headerul">|</li>
                    <li>
                        <router-link to="/">我的云购</router-link>
                    </li>
                    <li class="headerul">|</li>
                    <li>
                        <router-link to="/">充值</router-link>
                    </li>
                    <li class="headerul">|</li>
                    <li>
                        <router-link to="/">帮助</router-link>
                    </li>
                    <li class="headerul">|</li>
                    <li>
                        <router-link to="/"><img src="../../../images/luckybuy/u_yh.jpg" style="width: 10px;height: 10px;">在线客服</router-link>
                    </li>
                </ul>
                <pop-login-dialog :dialog-flag="shiftDialogFlag" ref="formDialog"></pop-login-dialog>
            </div>
        </div>
    </header>
    <!-- header End -->
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        data() {
            return {
                shiftDialogFlag: ''
            }
        },
        mounted(){
            //获取用户信息
            // this.getUserInfo();

        },
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ]),            
            openFormDialog: function (action) {
                this.shiftDialogFlag=action;
                // console.log('----------------this.shiftDialogFlag',this.shiftDialogFlag)
                this.$refs.formDialog.open();
            },
        }

    }

</script>

<style scoped>
    @import '../../../css/luckybuy/topBar.css'
</style>