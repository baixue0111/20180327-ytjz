<template>

	    <div class="stcon">
           <div class="stmaindiv" v-for="affsd in lbabs">
               <div class="stleft">
                   <div style="width: 98px"><img v-lazy="affsd.headimg" width="98px" height="98px"></div>
                   <router-link :to="''" target="_blank">{{affsd.nick_name}}</router-link>
               </div>
               <div class="stright" >
                   <div class="sdtop">
                       <router-link :to="''" target="_blank">
                       {{affsd.luck_bask_order_title}}
                       </router-link>
                       <b>期号：<c>{{affsd.hold_number}}</c></b>
                       <span>{{affsd.submit_date}}</span>
                   </div>
                   <div class="sdbottom">
                       <p>{{affsd.bask_content}}</p>
                       <div class="showphoto">
                           <router-link :to="''" target="_blank">
                                <img style="display: inline;" v-for="ll in affsd.list" v-lazy="ll.images_url">
                           </router-link>
                       </div>
                   </div>
               </div>
           </div>
                        
      </div>

</template>

<script>
import {luckybuyActivityBookBaskSharing} from '../../../service/getData'
export default {
name: 'hello',
created(){

        },
destroyed(){

        },
data () {
return {
    msg: '',
    lbabs:[],
    id:1,
    

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
       
      luckybuyActivityBookBaskSharing(null,null,id).then(res => {
       this.lbabs = res
      
      })    
      },
   
           
                
       }        
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.stmaindiv{margin-top:10px;overflow:hidden;}
.stcon{margin: 10px 0 20px 0;}

</style>
