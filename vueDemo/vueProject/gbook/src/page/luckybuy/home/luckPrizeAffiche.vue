<template>
  <div class="glb_user">
   <div class="bcon">
     <dt class="glb_news_p">
      <router-link :to="'lprizeaffichemore'" target="_blank">最新中奖</router-link>
    </dt>   
    <div id="marqueeA">
      <ul id="marqueeB">
        <li class="liscroll list_lh1" v-for="item in lAffiche" :key="item.luck_prize_affiche_id" >
         
          <img :src="item.headimg" :alt="item.name"/>
          <div class="list_lh_d">
           <p>
            <router-link :to="{path:'user',query:{id:item.user_id}}" target="_blank" :title="item.user_name">
              {{item.user_name}}
            </router-link>           
            <span class="list_date">于{{item.announce_date}}</span>
          </p>
          <div class="list_lh_p">
           <span class="list_lh_pan">{{item.cnt_affiche}}人次</span>夺得&nbsp;
           <router-link :to="{path:'lactivitybookdetail',query:{id:item.luck_activity_list_id}}" target="_blank" :title="item.book_name">
            {{item.book_name}}
          </router-link>              
        </div>
        <div class="list_lh_p2"><span>总需：{{item.sum_plan_amount}} 人次</span></div>
      </div>
    </li>
  </ul>

  <div id="marqueeC"></div>
</div>
</div>
</div>
</template>

<script>

  import a from '../../../js/luckybuy/jquery.cxscroll.js'
  import {luckybuyPrizeAffiche} from '../../../service/getData'


  export default {
    data(){
     return {
       lAffiche:[],
     }
   },
   created: function() {
    this.fetchData()
  },
  watch:{
    '$route': 'fetchData'
  },
  mounted(){
    this.$nextTick(() => {
      var speed=40
      window.onload=function(){
        var demo=document.getElementById("marqueeA");
        var demo2=document.getElementById("marqueeC");
        var demo1=document.getElementById("marqueeB");
        demo2.innerHTML=demo1.innerHTML
        function Marquee(){
          if(demo.scrollTop>=demo1.offsetHeight){
            demo.scrollTop=0;
          }
          else{
            demo.scrollTop=demo.scrollTop+1;
          }
        }
        var MyMar=setInterval(Marquee,speed)
        demo.onmouseover=function(){clearInterval(MyMar)}
        demo.onmouseout=function(){MyMar=setInterval(Marquee,speed)}
      }
      
    })
  },
  components:{

  },
  computed:{
  },
  methods:{
    fetchData:function(){
     luckybuyPrizeAffiche().then(res => {
       this.lAffiche = res
     })      
   }
 },
}


</script>

<style scoped>
 .liscroll{}
 .liscroll img{height:30px;
  width:30px;}
  #marqueeA{
    overflow:hidden;
    height:254px;
    width:214px;
    position:relative;
  }
  #marqueeB{
    height:auto;
    text-align:left;
  }
  #marqueeC{
    height:auto;
    text-align:left;
  }
  #marqueeB li{
    list-style-type:none;

    text-align:left;
    /*text-indent:15px;*/
  }
  #marqueeC li{
    list-style-type:none;
    
    text-align:left;
    /*    text-indent:15px;*/
  }

  @charset "utf-8";
  *{margin:0;padding:0;font-size:12px;}
  body{background:none;}
  input,button,select,textarea{outline:none;}
  ul,li,dl,ol{list-style:none;}
  a{color:#666;text-decoration:none;}

  /* bcon */
  .bcon{margin:0px auto;}
  .bcon h2{border-bottom:1px solid #eee;padding:0 10px;background: #EA4949;height: 40px;}
  .bcon h2 b{padding:0 8px;margin-top:-1px;display:inline-block;color: white;font-size: 15px;line-height: 40px}
  .list_lh1{overflow:hidden;width:215px}
  .list_date{color:#000;}
  .scroll_vertical{position:relative;width:214px;height:340px;line-height:20px;}
  .scroll_vertical .box{overflow:hidden;position:relative;height:280px;}
  .scroll_vertical .plus,
  .scroll_vertical .minus{position:absolute;left:50px;width:120px;height:30px;background:#09f;cursor:pointer;}
  .scroll_vertical .plus{top:10px;}
  .scroll_vertical .minus{bottom:10px;}
  .scroll_vertical .plus:hover,
  .scroll_vertical .minus:hover{background:#0cf;}
  .scroll_vertical ul{position:absolute;top:0;left:0;}
  .scroll_vertical li{height:75px;text-align:center;width: 214px}
  .list_box_div{width: 214px;height: 75px;}
  .list{width: 214px}
  .liscroll{padding:10px 0 0 10px; overflow: hidden;border-bottom: 1px solid #eee}
  .list_lh{height:400px;overflow:hidden;width:215px}
  .list_date{color:#000;float:right}

  .list:nth-child(even){background:#F0F2F3;}
  .list_bookname{width: 100px;overflow: hidden;background: red;height:20px;}
  .btn_lh:hover{color:#fff;text-decoration:none;}
  .glb_user{overflow: hidden; height: 296px; width:100%;text-align:center}
  .glb_user{width: 214px;height:296px;float: right;border: 1px solid #e6e6e6;float: left;border-left:none; border-top:none; }
  .list_lh1 img{width:30px;height:30px;float: left;margin-top: 10px;margin-right: 10px}
  .list_lh_d{width: 155px;float: left;height: 65px}
  .list_lh_d p a{color: #3DB4F8;}
  .list_lh_a{color: #3399FF}
  .list_lh_p{width: 150;overflow:hidden;height:20px;text-overflow:ellipsis;white-space:nowrap; text-align: left;color: #000}
  .list_lh_pan{color: #EC2D2F;font-weight: bold;}
  .list_lh_p2 span{color: #000}
  .glb_news_p{width: 100%;height: 40px;line-height: 40px;font-size: 18px;background: #EA4949;text-align: center;}
  .glb_news_p a{color:white;font-size: 15px;}
  .glb_news_p a:hover{border-bottom:1px solid white;} 
</style>
