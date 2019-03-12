function lis(arr){
	var len = arr.length,
		dp = [1],
		n = 1,
		i, j, index;
	for(i = 1; i < len; i++){
		dp[i] = 1;
		for(j = 0; j < i; j++){
			if(arr[j] < arr[i] && dp[j] + 1 > dp[i]){
				dp[i] = dp[j] + 1;
			}
		}
	}
	//dp = dp.map(function(item){return parseInt(item)}).sort(function(a,b){return a - b});
	dp.sort();
	return dp[len - 1];
}
function lis2(arr){
	var len = arr.length,
		ans = [0, arr[0]],
		n = 1,
		start, end, mid, i;
	for(i = 1; i < len; i++){
		// 如果当前数比ans中最后一个数还大，直接添加
		if(arr[i] > ans[n])	{
			ans[++n] = arr[i];
		}
		else {
			start = 1;
			end = n;
			// 否则，先找到ans中第一个比当前数大的数
			while(start < end) {
				mid = (start + end) / 2;
				mid = parseInt(mid);
                if(ans[mid] < arr[i]) start = mid + 1;
                else if(ans[mid] > arr[i]) end = mid;
                else start = end = mid;
			}
			//如果ans中第一个比当前数大的数就是ans中最后一个数，ans中最后一个数替换为当前数
			end === n && (ans[n] = arr[i]);
		}
	}
	return ans.slice(1);
}
console.log(lis2([2,1,4,5,3,7,6,9]));
