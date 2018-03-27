<template>
    <div>
        <el-form ref="registerForm" :rules="registerRules" :model="registerData">
            <el-form-item prop="userName2">
                <el-input v-model="registerData.userName2" :maxlength="11" placeholder="手机号" key="regUserName-input">
                    <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="mobi_code2">
                <el-row>
                    <el-col :span="15">
                        <el-input v-model="registerData.mobi_code2" :icon="mobiTipIcon" :maxlength="4" placeholder="短信验证码" key="regmobiCode-input">
                            <template slot="prepend"><i class="el-icon-edit"></i></template>
                        </el-input>
                    </el-col>
                    <el-col :span="2" :offset="2">
                        <mob-button :correctMobNum="regMobCorrect" :mobNumber="registerData.userName2"></mob-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="password2">
                <el-input :type="showPassword" v-model="registerData.password2" :maxlength="20" icon="date" placeholder="创建登录密码" key="regPassword-input"
                    :on-icon-click="showEye">
                    <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="protocolChecked">
                <el-checkbox-group v-model="registerData.protocolChecked">
                    <el-checkbox label="checked">我已阅读并同意</el-checkbox>
                    <router-link :to="'lmessagemore'" target="_blank">《好书荐读网服务协议》</router-link>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <el-button type="danger" @click.prevent="submitForm()" style="width:100%">注册</el-button>
    </div>
</template>
<script>
    import { regUser, getMobileCode } from '@/service/getData'
    export default {
        name: 'register-form',
        props: {
            
        },
        data() {
            var checkRegName = (rule, value, callback) => {
                if (value.length == 11) {
                    if (!(/^1[34578]\d{9}$/.test(value))) {
                        return callback(new Error('请输入正确的手机号'));
                    } else {
                        this.regMobCorrect = true
                        callback()
                    }
                } else {
                    this.regMobCorrect = false
                    return callback(new Error('请输入正确的手机号'));
                }
            };
            var checkMobiCode = (rule, value, callback) => {
                // mobcode为sessionStorage
                let mobcode = sessionStorage.getItem('mobcode');
                if (!mobcode) {
                    callback(new Error('请点击右侧获取验证码'));
                } else {
                    if (value.length < 4) {
                        this.mobiTipIcon = ''
                    } else {
                        if (value == mobcode) {
                            this.mobiTipIcon = 'circle-check'
                            callback()
                        } else {
                            this.mobiTipIcon = 'circle-cross'
                            callback(new Error('验证码错误'));
                        }
                    }
                }
            };
            return {
                mobiTipIcon: '',
                regMobCorrect: false,
                showPassword: 'password',
                registerData: {
                    userName2: '',
                    mobi_code2: '',
                    password2: '',
                    protocolChecked: ['checked']
                },
                registerRules: {
                    userName2: [
                        { validator: checkRegName, trigger: 'change' },
                        { validator: checkRegName, trigger: 'blur' }
                    ],
                    mobi_code2: [
                        { validator: checkMobiCode, trigger: 'change' }
                    ],
                    password2: [
                        { required: true, message: '请创建登录密码', trigger: 'blur' },
                    ],
                    protocolChecked: [
                        { type: 'array', required: true, message: '请同意协议', trigger: 'change' },
                    ]
                },
            }
        },
        watch: {
        },
        methods: {
            showEye() {
                if (this.showPassword == 'password') {
                    this.showPassword = ''
                } else {
                    this.showPassword = 'password'
                }
            },
            submitForm() {
                this.$refs['registerForm'].validate((valid) => {
                    if (valid) {
                        this.saveRegisterData();
                    } else {
                        console.log('error submit!')
                        return false
                    }
                });
            },
            saveRegisterData() {
                let me = this
                console.log('dd', JSON.stringify(me.registerData))
                regUser(me.registerData).then(res => {
                    console.log('resultUserData', JSON.stringify(res))
                })
            },
            reset() {
                this.$refs['registerForm'].resetFields();
            }
        }
    }

</script>