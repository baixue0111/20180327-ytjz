<template>
    <div class="test1">
        <!-- <p>这是从header组件接收的Msg：</p>
        <span>{{getheader}}</span> -->
        <input type="text" v-model="getheader" />
    </div>
    
</template>

<script>
import bus from 'common/script';
export default {
    data() {
        return {
            getheader: ''
        }
    },
    mounted() {
        bus.$on("setMsg", function(msg) {
            this.getheader = msg;
            console.log(this.getheader);
        })    
    }
};
</script>
<style>
    
</style>