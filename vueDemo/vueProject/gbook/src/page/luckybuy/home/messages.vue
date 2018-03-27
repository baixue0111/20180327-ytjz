<template>
    <div class="glb_news">
       <dt class="glb_news_p">
         <router-link :to="'lmessagemore'" target="_blank">新闻公告</router-link>
       </dt>
       <dd class="glb_news_list" v-for="item in lMes" :key="item.messages_id">
       	   <b></b>
           <router-link :to="'lmessagesDetail'" target="_blank">{{item.messages_title}}</router-link>
       </dd>
       
   </div>
</template>

<script>

import {luckybuyMessages} from '../../../service/getData'

export default {
    data(){
       return {
         lMes:[],
         display:false
       }
    },
    created: function() {
    	this.fetchData()
    },
    watch:{
		'$route': 'fetchData'
    },
	mounted(){

    },
    components:{
       
    },
    computed:{
       
    },
    methods:{
    	fetchData:function(){
			 luckybuyMessages().then(res => {
			 this.lMes = res
			 this.display = this.lMes.length>4
			})    	
    	}
        
    },
}

</script>
<style scoped>
          @import '../../../css/luckybuy/messages.css'
</style>


