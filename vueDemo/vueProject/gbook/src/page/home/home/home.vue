<template>
  	<div>
        <top-bar></top-bar>

    </div>
</template>

<script>
import topBar from '../../../components/home/header/topBar'
import topHeader from '../../../components/home/header/topHeader'
import topMenu from '../../../components/home/header/topMenu'



// import {cityGuess, hotcity, groupcity} from '../../service/getData'


export default {
    data(){
        return{ }
    },

	mounted(){

    },

  components: {
    'top-bar': topBar,
    'top-header':topHeader,
    'top-menu':topMenu,
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

