var vm = new Vue({
	el: '#bg1',
	data: {
		second: (new Date()).getSeconds()
	}
});

rotate();
setInterval(rotate,1000);
function rotate(){
	var second = (new Date()).getSeconds();
	vm.second = second;
	if(second <= 30){
		$(bg2).css('transform', 'rotate(0deg)');
		$(bg3).css({'transform': 'rotate(' + second * 6 + 'deg)','border-color': 'grey'});
	} else if(second > 30) {
		$(bg2).css('transform', 'rotate(' + (second * 6 - 180) + 'deg)');
		$(bg3).css({'transform': 'rotate(0deg)','border-color': 'red'});
	}
}