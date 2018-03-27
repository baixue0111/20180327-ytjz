<template>
<div class="messagesRight">
	   
	    <div class="cjwt_d1">
	     
        <div class="cyjldiv">
              <ul>
                  <li class="cyjili">时间</li>
                  <li class="cyjili">昵称</li>
                  <li class="cyjili">参与次数</li>
                  <li class="cyjili">IP</li>
                  <li class="cyjili">来源</li>
              </ul>
              <ul v-for="affi in lbabpr">
                  <li class="cyjili">{{affi.buy_date}}</li>
                  <li class="cyjili">{{affi.nick_name}}</li>
                  <li class="cyjili">{{affi.buy_amount}}</li>
                  <li class="cyjili">{{affi.login_ip}}</li>
                  <li class="cyjili">{{affi.login_src}}</li>
              </ul>
          </div>

	    </div >
</div>
</template>

<script>
import {luckybuyActivityBookParticipateRecord} from '../../../service/getData'
export default {
name: 'hello',
created(){

        },
destroyed(){

        },
data () {
  return {
   
    lbabpr:[],
    id:78,
        
        }
        },

 created:function() {          
             this.fetchData(this.id)

         },

 watch:{
            '$route': 'fetchData'
         },

 methods:{
       

      fetchData:function(id){
       
            luckybuyActivityBookParticipateRecord(null,null,id).then(res => {
             this.lbabpr = res
            
            })    
      },
   
       
                
       }       
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messagesRight{width: 100%;float: left;}
.cjwt_d{ width: 95%;font-size: 18px; height:40px;border-bottom: 2px #ddd solid;margin-left: 2.5%}
.cjwt_p{font-size: 18px; height:20px;line-height: 20px;border-left: 5px solid #EC2D2D;margin-left: 20px;padding-left: 20px;color: #EC2D2D}
.cjwt_d1{width: 95%; margin-top:10px}
.cjwt_p2{ font-size: 14px; font-weight: bold;}
.cjwt_p3{font-size: 13px;color: #808080;margin-left: 20px;line-height: 30px;margin-bottom: 20px}





</style>
