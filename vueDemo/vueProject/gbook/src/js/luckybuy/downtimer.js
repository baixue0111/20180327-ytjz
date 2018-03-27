function downtimer(intDiff,a,b,c){
            // console.log('intDiff='+intDiff);
              var times = intDiff * 100; // 60秒
              var countTime =window.setInterval(function(){
                  times = --times < 0 ? 0 : times
                  var  minute=0,
                          second= 0,
                          msecond=0;//时间默认值

                  if(times > 0) {

                      minute = Math.floor(times / 60 / 100);
                      second = Math.floor(times / 100)-(minute*60);
                      msecond = Math.floor(times % 100);
                  }

                  if (minute <= 9) minute = '0' + minute;
                  if (second <= 9) second = '0' + second;
                  if (msecond <= 9) msecond = '0' + msecond;
                  $('#'+a).html("<span class='jxss'>"+minute.toString().substr(0,1)+"</span><span class='jxss'>"+minute.toString().substr(1,1)+"</span>");
                  $('#'+b).html("<span class='jxss'>"+second.toString().substr(0,1)+"</span><span class='jxss'>"+second.toString().substr(1,1)+"</span>");
                  $('#'+c).html("<span class='jxss'>"+msecond.toString().substr(0,1)+"</span><span class='jxss'>"+msecond.toString().substr(1,1)+"</span>");
                  if(times == 0) {
                      clearInterval(countTime);
                  }
              }, 10);
          }

export { //很关键
  downtimer
}          
