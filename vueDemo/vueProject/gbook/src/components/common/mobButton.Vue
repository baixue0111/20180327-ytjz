<template>
    <el-button :disabled="pCodButtDisabled" @click.prevent="sendmbcode">{{pCodButtContent}}</el-button>
</template>
<script>
    import { getMobileCode } from '@/service/getData'
    export default {
        name: 'mob-button',
        props: {
            correctMobNum: {
                type: Boolean,
                default: false
            },
            mobNumber: {
                type: String,
                default: '',
                required: true
            }
        },
        data() {
            return {
                pCodButtDisabled: !this.disabled,
                pCodButtContent: '获取短信验证码',
            }
        },
        watch: {
            'correctMobNum'(curVal, oldVal) {
                console.log('----------correctMobNumcurVal', curVal, '----------correctMobNumoldVal', oldVal)
                if (curVal.length == 0) {
                    this.pCodButtDisabled = !curVal
                } else {
                    this.pCodButtDisabled = !curVal
                }
            }
        },
        methods: {
            sendmbcode: function () {
                let me = this
                let mobcode = this.generate4code()
                sessionStorage.setItem('mobcode', mobcode);
                let mob = this.mobNumber;
                let mbData = { mob: mob, p1: mobcode }
                console.log('mbData=' + JSON.stringify(mbData));
                getMobileCode(mbData).then(res => {
                    let result = JSON.parse(res.status)
                    if (result.code.toString() == "0") {
                        console.log('发送成功了！')
                        this.countdown(90);
                    }
                    else {
                        me.pCodButtContent = '重新获取验证码'
                        console.log('发送失败了！')
                    }
                })
            },
            //90秒倒计时
            countdown(second) {
                let me = this;
                me.pCodButtDisabled = true;
                let sec = second;
                for (let i = 0; i <= sec; i++) {
                    window.setTimeout(function () {
                        if (sec != 0) {
                            me.pCodButtContent = `${sec}秒后重发验证`
                            sec--;
                        } else {
                            sec = second;//如果倒计时结束就让获取短信验证码显示出来
                            me.pCodButtDisabled = false
                            me.pCodButtContent = '重新获取验证码'
                        }
                    }, i * 1000)
                }
            },
            generate4code() {
                let out = 0;
                do
                    out = Math.floor(Math.random() * 10000);
                while (out < 1000)
                return out;
            },
        }
    }

</script>