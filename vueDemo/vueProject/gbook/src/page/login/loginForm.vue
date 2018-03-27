<template>
    <div>
        <el-form ref="loginForm" :rules="loginRules" :model="userData">
            <el-form-item prop="userName">
                <el-input v-model="userData.userName" :minlength="11" :maxlength="11" placeholder="手机号" key="username-input">
                    <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input :type="showPassword" v-model="userData.password" icon="date" :maxlength="30" placeholder="登录密码" :on-icon-click="showEye"
                    key="password-input">
                    <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="captcha_code">
                <el-col :span="15">
                    <el-input v-model="userData.captcha_code" :icon="cCodeTipIcon" :maxlength="4" placeholder="点击右侧图片更换验证码" key="captchaCode-input">
                        <template slot="prepend"><i class="el-icon-edit"></i></template>
                    </el-input>
                </el-col>
                <el-col :span="4" :offset="2">
                    <a href="javascript://" @click.prevent="changeidentifyCode">
                        <img :src="captchaCodeImg" style="height:34px;width:112px; border:1px solid #bfcbd9 ;border-radius:4px;">
                        </a>
                </el-col>
            </el-form-item>
        </el-form>
        <el-button type="danger" @click.prevent="submitForm()" style="width:100%">登录</el-button>
        <el-row type="flex" justify="center">
            <el-col :span="6">
                <el-button type="text">QQ</el-button>
                <el-button type="text">微信</el-button>
                <el-button type="text">微博</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    // import { accountLogin, regUser, getMobileCode, getCaptchas, vCode, checkCaptchas } from '@/service/getData'
    import alertTip from '@/components/common/alertTip'
    import { accountLogin, getMobileCode, getCaptchas, checkCaptchas } from '@/service/getData'
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: 'login-form',
        props: {
        },
        components: {
            alertTip
        },
        data() {
            var checkRegName = (rule, value, callback) => {
                if (!(/^1[34578]\d{9}$/.test(value))) {
                    return callback(new Error('请输入正确的手机号'));
                } else {
                    callback()
                }
            };
            return {
                showPassword: 'password',
                cCodeTipIcon: '',
                captchaCodeImg: '',
                userInfo: null, //获取到的用户信息
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容      
                userData: {
                    userName: '',
                    password: '',
                    captcha_code: '',
                    sicode: ''
                },
                loginRules: {
                    userName: [
                        { validator: checkRegName, trigger: 'change' },
                        { validator: checkRegName, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'blur' }
                    ],
                    captcha_code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { min: 4, message: '验证码位数不足4位', trigger: 'change' }
                    ],
                },
            }
        },
        watch: {
            'userData.captcha_code': {
                handler(curVal, oldVal) {
                    if (curVal.length == 4) {
                        // console.log(curVal)
                        checkCaptchas(this.sicode).then(res => {
                            if (curVal.toUpperCase() == res.code) {
                                this.cCodeTipIcon = 'circle-check'
                            } else {
                                this.cCodeTipIcon = 'circle-cross'
                            }
                        })
                    } else {
                        this.cCodeTipIcon = ''

                    }
                },
                deep: true
            },
        },
        created: function () {
            this.changeidentifyCode()
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            closeTip() {
                this.showAlert = false;
            },
            changeidentifyCode() {
                // console.log('getimg');
                getCaptchas().then(res => {
                    this.sicode = res.code
                    this.captchaCodeImg = "http://localhost:8088/api/users/getVCode?code=" + res.code
                })
            },
            showEye() {
                if (this.showPassword == 'password') {
                    this.showPassword = ''
                } else {
                    this.showPassword = 'password'
                }
            },
            submitForm() {
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        this.saveLoginData();
                    } else {
                        console.log('error submit!')
                        return false
                    }
                });
            },
            async saveLoginData() {
                let me = this
                //.replace(/(^\s*)|(\s*$)/g, "") 替换空格
                let res = await accountLogin(me.userData)
                this.userInfo = res
                console.log('userInfo=' + JSON.stringify(this.userInfo))
                // console.log(!this.userInfo.user_id)
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (this.userInfo.status != 1) {
                    this.showAlert = true;
                    this.alertText = this.userInfo.message;
                } else {
                    this.RECORD_USERINFO(this.userInfo);
                    me.dialogVisible = false
                    // this.$router.go(-1);
                }
            },
            reset() {
                this.$refs['loginForm'].resetFields();
            }
        }
    }

</script>