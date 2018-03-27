 <template>
    <div>
        <span v-title :data-title="items[0].activity_list_title"></span>
        <ltop-bar></ltop-bar>
        <ltop-header></ltop-header>
        <ltop-menu></ltop-menu>
        <div class="con-top" >
           <ltop-menuleft></ltop-menuleft> 
       </div>
            <div v-for="item in items">
            <img v-lazy="item.book_cover">
            {{item.activity_list_title}}

</div>

       <lfoo-ter></lfoo-ter>               
   </div>

</template>

<script>
    import ltopBar from '../../../components/luckybuy/header/topBar'
    import ltopHeader from '../../../components/luckybuy/header/topHeader'
    import ltopMenu from '../../../components/luckybuy/header/topMenu'
    import ltopMenuleft from '../../../components/luckybuy/header/topMenuleft'
    import lfooter from '../../../components/luckybuy/footer/footer'

    import {luckybuyBookCover} from '../../../service/getData'

    export default {
        data(){
            return {
                luck_activity_list_id: this.$route.query.id || '',
                items:[]
            }    
        },
        created: function() {
            // console.log('this.luck_activity_list_id='+this.luck_activity_list_id)
            this.fetchData(this.luck_activity_list_id)
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
            fetchData:function(luck_activity_list_id){
               luckybuyBookCover(luck_activity_list_id).then(res => {
                 this.items = res
             })      
           }
       }
   }


</script>

<style scoped>

</style>
