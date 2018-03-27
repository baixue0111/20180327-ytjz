<template>
    <div class="header">
        <div class="header-wrapper">
            <h1 v-on:click="getData">我是header组件</h1>
        </div>
    </div>
</template>

<script>
import bus from 'common/script';
export default {
    data() {
       return{
           header: {}
       }
    },
    created() {
        this.$http.get('/api/test2').then((response) => {
            response = response.body;
            this.testArray = response.data;
            // console.log(this.testArray);
        })
       
    },
    methods: {
        getData() {
             bus.$emit("setMsg", "this is from headerComponent!");
        }
    }
}
</script>
<style>
.header-wrapper{
    background: #ccc;
}
</style>