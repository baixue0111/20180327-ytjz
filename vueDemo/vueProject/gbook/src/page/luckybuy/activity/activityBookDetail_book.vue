<template>
<div class="messagesRight">
     <div class="com_book_par" v-for="tex in gabd">
           <div id="article_content" v-html="tex.description"></div>
     </div>

      
</div>
</template>

<script>
import {luckybuyActivityBookDetail} from '../../../service/getData'
export default {
 
created(){

        },

destroyed(){


        },

data () {
  return {
           gabd:[],
          luck_activity_list_id:1,
              }
         },

created:function() {          
        this.fetchData(this.luck_activity_list_id)

         },

watch:{
            '$route': 'fetchData'
         },


methods:{
    
          fetchData:function(luck_activity_list_id){        

             luckybuyActivityBookDetail(luck_activity_list_id).then(res => {
                this.gabd = res   
                downtimer(this.gabd[0].announced_duration,'minute_show1_0','second_show1_0','msecond_show1_0','description')  

                           })                     

        
            
                     },
    
        
            },
    
       
     

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .messagesRight{width: 100%;float: left;}
  .cjwt_d{ width: 95%;font-size: 18px; height:40px;border-bottom: 2px #ddd solid;margin-left: 2.5%}
.cjwt_p{font-size: 18px; height:20px;line-height: 20px;border-left: 5px solid #EC2D2D;margin-left: 20px;padding-left: 20px;color: #EC2D2D}
.cjwt_d1{width: 95%; margin-left: 2.5%;margin-top: 30px}
.cjwt_p2{ font-size: 14px; font-weight: bold;}
.cjwt_p3{font-size: 13px;color: #808080;margin-left: 20px;line-height: 30px;margin-bottom: 20px}

</style>
