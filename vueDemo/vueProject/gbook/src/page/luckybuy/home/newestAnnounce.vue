<template>
	<div class="glb_announce">
		<div class="glb_announce_bt">
			<p class="glb_announce_bt_p1"><i></i>最新揭晓</p>
			<p  class="glb_announce_bt_p2">
				<router-link :to="'lnewestannouncemore'" target="_blank">查看全部<i> > </i></router-link>
			</p>
		</div>

		<div class="glb_announce_con">
			<div class="glb_announce_div" v-for="(item, index) in items" :key="item.luck_activity_list_id">
				<div v-if="item.luck_activity_list_id!==0">
					<div class="glb_announce_img">
						<router-link :to="{path:'lactivitybookdetail',query:{id:item.luck_activity_list_id}}" target="_blank" :title="item.activity_list_title">
							<img v-lazy="item.book_cover" alt="暂无图片">
						</router-link>    						
					</div>
					<div class="glb_announce_p">
						<p class="glb_announce_p_con" >
							<router-link :to="{path:'lactivitybookdetail',query:{id:item.luck_activity_list_id}}" target="_blank" :title="item.activity_list_title">
								{{item.activity_list_title}}
							</router-link>   						
						</p>
						<p class="glb_announce_con1">总需人次：
							<span>{{item.plan_amount}}</span>
						</p>
						<div class="glb_announce_time">
							<div class="jxtime1">
								<strong  :id='"minute_show1_"+index'>00</strong>
								<strong class="jxdd">:</strong>
								<strong :id='"second_show1_"+index'>00</strong>
								<strong class="jxdd">:</strong>
								<strong :id='"msecond_show1_"+index'>00</strong>
							</div>
						</div>
					</div>
					<img src="../../../images/luckybuy/6-1.png" class="glb_announce_img_bt">
				</div>
				<div v-if="item.luck_activity_list_id==0" style="text-align: center"> 
					<img src="../../../images/luckybuy/expect.jpg" width="210px" style="margin-top: 30px">
				</div>

			</div>
		</div>

	</div>

</template>


<script>

	import {luckybuyNewestAnnounce} from '../../../service/getData'
	import {downtimer} from '../../../js/luckybuy/downtimer.js'

// downtimer(500,'minute_show1_0','second_show1_0','msecond_show1_0')  
// downtimer(600,'minute_show1_1','second_show1_1','msecond_show1_1')    


export default {

	data:function(){
		return {
			items:[],
			store:[]
		}
	},
	created: function() {
		this.fetchData()
	},
	watch:{
		'$route': 'fetchData'
	},
	mounted(){

	},
	components:{

	},
	computed:{

	},

	methods:{
		fetchData:function(){
			luckybuyNewestAnnounce().then(res => {
				this.items = res
				for (var i = 0; i < res.length; i++) {
					downtimer(res[i].announced_duration,'minute_show1_'+i,'second_show1_'+i,'msecond_show1_'+i) 
				}					
			})      
		},
	}
}


</script>

<style scoped>
	@import '../../../css/luckybuy/newestAnnounce.css'
</style>
