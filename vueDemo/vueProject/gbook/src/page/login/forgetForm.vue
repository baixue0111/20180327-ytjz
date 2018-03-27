<template>
    <div>
        <el-form ref="forgetForm" :rules="forgetRules" :model="forgetData">
            <el-form-item prop="userName3">
                <el-input v-model="forgetData.userName3" :maxlength="11" placeholder="手机号" key="forgetUserName-input">
                    <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="mobi_code3">
                <el-row>
                    <el-col :span="15">
                        <el-input v-model="forgetData.mobi_code3" :icon="mobiTipIcon" :maxlength="4" placeholder="短信验证码" key="regmobiCode-input">
                            <template slot="prepend"><i class="el-icon-edit"></i></template>
                        </el-input>
                    </el-col>
                    <el-col :span="2" :offset="2">
                        <mob-button :correctMobNum="forMobCorrect" :mobNumber="forgetData.userName3"></mob-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="password3">
                <el-input :type="showPassword" v-model="forgetData.password3" :maxlength="20" icon="date" placeholder="请输入新密码" key="forgetPassword-input"
                    :on-icon-click="showEye">
                    <template slot="prepend"><i class="el-icon-edit"></i></template>
                </el-input>
            </el-form-item>
        </el-form>
        <el-button type="danger" @click.prevent="submitForm('forgetForm')" style="width:100%">找回密码</el-button>
    </div>
</template>
<script>
    import { getMobileCode } from '@/service/getData'
    export default {
        name: 'forget-form',
        props: {

        },
        data() {
            var checkRegName = (rule, value, callback) => {
                if (value.length == 11) {
                    if (!(/^1[34578]\d{9}$/.test(value))) {
                        return callback(new Error('请输入正确的手机号'));
                    } else {
                        this.forMobCorrect = true
                        callback()
                    }
                } else {
                    this.forMobCorrect = false
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
                forMobCorrect: false,
                showPassword: 'password',
                forgetData: {
                    userName3: '',
                    mobi_code3: '',
                    password3: ''
                },
                forgetRules: {
                    userName3: [
                        { validator: checkRegName, trigger: 'change' },
                        { validator: checkRegName, trigger: 'blur' }
                    ],
                    mobi_code3: [
                        { validator: checkMobiCode, trigger: 'change' }
                    ],
                    password3: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                    ]
                }
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
                this.$refs['forgetForm'].validate((valid) => {
                    if (valid) {
                        this.saveForgetData();
                    } else {
                        console.log('error submit!')
                        return false
                    }
                });
            },
            async saveForgetData() {
                //处理逻辑
            },
            reset() {
                this.$refs['forgetForm'].resetFields();
            }
        }
    }

</script>