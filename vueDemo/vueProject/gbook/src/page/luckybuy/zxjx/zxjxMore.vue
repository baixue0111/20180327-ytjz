 <template>
  	<div class="con">
        <ltop-bar></ltop-bar>
        <ltop-header></ltop-header>
        <ltop-menu></ltop-menu>

         <div class="footer">
            <lfoo-ter></lfoo-ter>
         </div>
    </div>

</template>

<script>
import ltopBar from '../../../components/luckybuy/header/topBar'
import ltopHeader from '../../../components/luckybuy/header/topHeader'
import ltopMenu from '../../../components/luckybuy/header/topMenu'

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
    'lfoo-ter':lfooter,   
  },

    computed:{

    },

    methods:{

    },
}

</script>

<style scoped>
@import '../../../css/luckybuy/home.css'
 .con{margin:0 auto;overflow: hidden;}
 .con-z{width: 1156px;margin:0 auto;}
 .con-top{width: 1156px;height:481px;}
.con-c{float: left;width:748px;height:481px;border: 1px solid #e6e6e6;overflow: hidden;padding-left: 190px; }
.con-announce{width: 1156px;border: 1px solid #e6e6e6;}
.con-recommend{width: 1156px;border: 1px solid #e6e6e6;}
</style>
