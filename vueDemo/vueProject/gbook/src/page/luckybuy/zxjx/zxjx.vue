 <template>
  	<div class="con">
        <ltop-bar></ltop-bar>
        <ltop-header></ltop-header>
        <ltop-menu></ltop-menu>
         <div class="con-top" >
           <ltop-menuleft></ltop-menuleft> 
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
import ltopMenuleft from '../../../components/luckybuy/header/topMenuleft'
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
    'ltop-menuleft':ltopMenuleft,
    'lfoo-ter':lfooter,   
  },

    computed:{

    },

    methods:{

    },
}

</script>

<style scoped>

</style>
