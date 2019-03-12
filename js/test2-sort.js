var start = (new Date()).getTime();

//快速排序算法
function quickSort(arr,startIndex,endIndex){
	if(startIndex >= endIndex){
		return 0;
	}
	var pivotIndex = partition(arr,startIndex,endIndex);
	quickSort(arr,startIndex,pivotIndex-1);
	quickSort(arr,pivotIndex+1,endIndex);
}

function partition(arr,startIndex,endIndex){
	var pivot = arr[startIndex];
	var index = startIndex;
	var left = startIndex;
	var right = endIndex;
	while(left<right){
		while(left<right){
			if(arr[right] < pivot){
				arr[index] = arr[right];
				index = right;
				left++;
				break;
			}
			right--;
		}
		while(left<right){
			if(arr[left]>pivot){
				arr[index] = arr[left];
				index = left;
				right--;
				break;
			}
			left++;
		}
	}
	arr[index] = pivot;
	return index;
}

var arr = [9,8,5,1,7,3,2,4,6,34,98,0];
quickSort(arr,0,arr.length-1);
console.log(arr);
console.log((new Date()).getTime() - start);