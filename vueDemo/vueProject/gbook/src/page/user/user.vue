 <template>
    <div>
        <span v-title :data-title="items[0].user_name"></span>
        <ltop-bar></ltop-bar>
        <ltop-header></ltop-header>
        <ltop-menu></ltop-menu>
        <div class="con-top" >
           <ltop-menuleft></ltop-menuleft> 
       </div>
            
            <img v-lazy="items[0].headimg">
            {{items[0].user_id}}
            {{items[0].user_name}}


       <lfoo-ter></lfoo-ter>               
   </div>

</template>

<script>
    import ltopBar from '../../components/luckybuy/header/topBar'
    import ltopHeader from '../../components/luckybuy/header/topHeader'
    import ltopMenu from '../../components/luckybuy/header/topMenu'
    import ltopMenuleft from '../../components/luckybuy/header/topMenuleft'
    import lfooter from '../../components/luckybuy/footer/footer'

    import {userInfo} from '../../service/getData'

    export default {
        data(){
            return {
                user_id: this.$route.query.id || '',
                items:[]
            }    
        },
        created: function() {
            this.fetchData(this.user_id)
        },
        watch:{
            '$route': 'fetchData'
        },
        mounted(){

        },
        components:{
            'ltop-bar': ltopBar,
            'ltop-header':ltopHeader,
            'ltop-menu':ltopMenu,
            'ltop-menuleft':ltopMenuleft,    
            'lfoo-ter':lfooter, 
        },
        computed:{

        },
        methods:{
            fetchData:function(user_id){
               user(user_id).then(res => {
                 this.items = res
             })      
           }
       }
   }


</script>

<style scoped>

</style>
