 <template>
  	<div class="con">
        <ltop-bar></ltop-bar>
        <ltop-header></ltop-header>
        <ltop-menu></ltop-menu>
        <div class="con-z">
           <div class="con-top">
                 <ltop-menuHomeleft></ltop-menuHomeleft> 
                 <div class="con-c">
                   <ltop-banner></ltop-banner>
                   <lready-lottery></lready-lottery>
                 </div>
                 <lluck-prizeAffiche></lluck-prizeAffiche>
                 <lmess-ages></lmess-ages>
           </div>
           <div class="con-announce">
              <lnewest-announce></lnewest-announce>

           </div>
           <div class="con-recommend">
              <lhot-recommendation></lhot-recommendation>
           </div>
          
           <div class="con-newArrivals">
              <lnew-arrivals></lnew-arrivals>
           </div>
           <div class="con-newArrivals">
              <lluck-baskSharing></lluck-baskSharing>
           </div>
           
        </div>
         <div class="footer">
               <lfoo-ter></lfoo-ter>
         </div>
    </div>

</template>

<script>
import ltopBar from '../../../components/luckybuy/header/topBar'
import ltopHeader from '../../../components/luckybuy/header/topHeader'
import ltopMenu from '../../../components/luckybuy/header/topMenu'
import ltopMenuHomeleft from '../../../components/luckybuy/header/topMenuHomeleft'
import ltopBanner from '../../../page/luckybuy/home/topBanner'
import lreadyLottery from '../../../page/luckybuy/home/readyLottery'
import lluckPrizeAffiche from '../../../page/luckybuy/home/luckPrizeAffiche'
import lmessages from '../../../page/luckybuy/home/messages'
import lnewestAnnounce from '../../../page/luckybuy/home/newestAnnounce'
import lhotRecommendation from '../../../page/luckybuy/home/hotRecommendation'
import lnewArrivals from '../../../page/luckybuy/home/newArrivals'
import lluckBaskSharing from '../../../page/luckybuy/home/luckBaskSharing'
import lfooter from '../../../components/luckybuy/footer/footer'

// import {cityGuess, hotcity, groupcity} from '../../service/getData'


export default {
    data(){
        return{

        }
    },

	mounted(){

    },

  components: {
    'ltop-bar': ltopBar,
    'ltop-header':ltopHeader,
    'ltop-menu':ltopMenu,
    'ltop-menuHomeleft':ltopMenuHomeleft,
    'ltop-banner':ltopBanner,
    'lready-lottery':lreadyLottery,
    'lluck-prizeAffiche':lluckPrizeAffiche, 
    'lmess-ages':lmessages,  
    'lnewest-announce':lnewestAnnounce, 
    'lhot-recommendation':lhotRecommendation, 
    'lnew-arrivals':lnewArrivals,  
    'lluck-baskSharing':lluckBaskSharing, 
    'lfoo-ter':lfooter,   
  },

    computed:{

    },

    methods:{
        //点击图标刷新页面
        reload(){
            window.location.reload();
        }
    },
}

</script>

<style scoped>
@import '../../../css/luckybuy/home.css'
 .con{overflow: hidden; }
 .con-z{width: 1156px;margin:0 auto;position: relative;}
 .con-top{width: 1156px;height:481px;}
.con-c{float: left;width:718px;height:481px;overflow: hidden;padding-left: 220px; border-bottom: 1px solid #e6e6e6;position: relative; }
.con-announce{width: 1156px;overflow: hidden;}
.con-recommend{width: 1156px;}
.fr1{margin-left: 10px;}
body{font-family: "Microsoft Yahei",verdana;}
</style>
