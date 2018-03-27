<template>
    <el-dialog :title="DialogTitle" :visible.sync="dialogVisible" :before-close="handleClose" size="tiny">
        <!--        
        <el-row>
            <el-col :span="12">
                <p>好书荐读</p>
            </el-col>
        </el-row>-->
        <template v-if="shiftDialogFlag2=='login'">
            <login-form ref="formLogin"></login-form>
        </template>
        <template v-else-if="shiftDialogFlag2=='register'">
            <register-form ref="formRegister"></register-form>
        </template>
        <template v-else-if="shiftDialogFlag2=='forget'">
            <forget-form ref="formForget"></forget-form>
        </template>
        <template v-else>
            <h2>sss</h2>
        </template>
        <!--公共页面切换-->
        <el-row>
            <el-col :span="6">
                <el-button v-if="shiftDialogFlag2=='login'||shiftDialogFlag2=='forget'" type="text" @click="shiftDialog('register')">马上注册</el-button>
                <el-button v-if="shiftDialogFlag2=='register'" type="text" @click.prevent="shiftDialog('forget')">忘记密码</el-button>
            </el-col>
            <el-col :span="3" :offset="15">
                <el-button v-if="shiftDialogFlag2=='login'" type="text" @click.prevent="shiftDialog('forget')">忘记密码</el-button>
                <el-button v-else-if="shiftDialogFlag2=='register'||shiftDialogFlag2=='forget'" type="text" @click.prevent="shiftDialog('login')">马上登录</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>
<script>
    import loginForm from '@/page/login/loginForm'
    import registerForm from '@/page/login/registerForm'
    import forgetForm from '@/page/login/forgetForm'
    export default {
        name: 'pop-login-dialog',
        props: {
            dialogFlag: {
                type: String,
                default: ''
            }
        },
        components: {
            loginForm,
            registerForm,
            forgetForm
        },
        data() {
            return {
                shiftDialogFlag2: this.dialogFlag,
                dialogVisible: false,
            }
        },
        watch: {
            'dialogFlag'(curVal, oldVal) {
                console.log('----------dialogFlagcurVal', curVal, '----------dialogFlagoldVal', oldVal)
                if (curVal.length == 0) {
                    this.shiftDialogFlag2 = oldVal
                } else {
                    this.shiftDialogFlag2 = curVal
                }
            }
        },
        computed: {
            DialogTitle: function () {
                let title = ''
                if (this.shiftDialogFlag2 == 'login') title = '登录'
                if (this.shiftDialogFlag2 == 'register') title = '注册'
                if (this.shiftDialogFlag2 == 'forget') title = '忘记密码'
                return title
            }
        },
        methods: {
            open(formName) {
                this.dialogVisible = true;
            },
            handleClose() {
                console.log('is close')
                if (this.$refs['formLogin']) { this.$refs.formLogin.reset(); }
                if (this.$refs['formRegister']) { this.$refs.formRegister.reset(); }
                if (this.$refs['formForget']) { this.$refs.formForget.reset(); }
                this.dialogVisible = false;
            },
            shiftDialog(Flag) {
                this.shiftDialogFlag2 = Flag
            },
        },

    }

</script>
<style scoped>

</style>