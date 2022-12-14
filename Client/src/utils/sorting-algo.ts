export function bubbleSortAlgo(arr: any, ASC_MODE:boolean) {
  const ArrayStates: number[][] = [];
  let animations: number[][] = [];
  let swaps = false;
  let iterations = 0;
  while (swaps === false) {
    swaps = true;
    for (let i = 0, end = arr.length - 1 - iterations; i < end; i++) {
      animations.push([i, arr[i]]);
      if(ASC_MODE === false) {
        if (arr[i] > arr[i + 1]) {
          animations.push([i, arr[i], i + 1, arr[i + 1]]);
          swaps = false;
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }
    } else {
      if (arr[i] < arr[i + 1]) {
        animations.push([i, arr[i], i + 1, arr[i + 1]]);
        swaps = false;
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
  }
    iterations++;
  }
  return animations ;
}

export function generateArray(NUM:number, MIN:number, MAX:number) {
  const array = []
  for(let i = 0; i< NUM; i++) {
    array.push(randomNumGen(MIN, MAX))
  }
  return array;
}

function randomNumGen(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function insertionSortAlgo(arr: number[], ASC_MODE:boolean) {
  const ArrayStates: number[][] = [];
  ArrayStates.push([...arr]);
  let animations: number[][] = [];
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      animations.push([j, arr[j]]);
      if(ASC_MODE) {
        if (arr[j] > arr[j - 1]) {
          animations.push([j, arr[j], j - 1, arr[j - 1]]);
          [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
          ArrayStates.push([...arr]);
        } else break;
      } else  {
        if (arr[j] < arr[j - 1]) {
          animations.push([j, arr[j], j - 1, arr[j - 1]]);
          [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
          ArrayStates.push([...arr]);
        } else break;
      }
    
    }
  }
  return  animations;
}

export function selectionSortAlgo(arr: number[], ASC_MODE:boolean) {
  const ArrayStates: number[][] = [];
  ArrayStates.push([...arr]);
  let animations: number[][] = [];

  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if(ASC_MODE) {
        min = arr[j] > arr[min] ? j : min;

      } else {
        min = arr[j] < arr[min] ? j : min;

      }
      animations.push([i, j])
    }
    if (min !== i) {
      animations.push([min, arr[min], i, arr[i]]);
      [arr[i], arr[min]] = [arr[min], arr[i]];
      ArrayStates.push([...arr]);
    }
  }

  return animations;
}

export function mergeSortAlgo(arr:number[] ,ASC_MODE:boolean) {
  const aux = arr.slice();
  const animations:any = [];
  mergeSortHelper(arr, aux, 0, arr.length - 1, animations, ASC_MODE);
  return animations;
}

function mergeSortHelper(arr:any, aux:any, left:any, right:any, animations:any, ASC_MODE:boolean) {
  if (right <= left) return;
  const mid = left + Math.floor((right - left) / 2);
  mergeSortHelper(arr, aux, left, mid, animations,ASC_MODE);
  mergeSortHelper(arr, aux, mid + 1, right, animations,ASC_MODE);
  if(!ASC_MODE) {
    mergeNow(arr, aux,mid, left, right, animations)
  } else {
    mergeNowDesc(arr, aux,mid, left, right, animations)
  }
}
 
function mergeNow(arr:any, aux:any, mid:any, left:any, right:any, animations:any) {
  for (let i = left; i <= right; i++) aux[i] = arr[i];
  let i = left;
  let j = mid + 1;
  let k = left
  while (i <= mid && j <= right) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (aux[i] <= aux[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, aux[i]]);
      arr[k++] = aux[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, aux[j]]);
      arr[k++] = aux[j++];
    }
  }
  while (i <= mid) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, aux[i]]);
    arr[k++] = aux[i++];
  }
  while (j <= right) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, aux[j]]);
    arr[k++] = aux[j++];
  }
}

function mergeNowDesc(arr:any, aux:any, mid:any, left:any, right:any, animations:any) {
  for (let i = left; i <= right; i++) aux[i] = arr[i];
  let i = left;
  let j = mid + 1;
  let k = left
  while (i <= mid && j <= right) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (aux[i] >= aux[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, aux[i]]);
      arr[k++] = aux[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, aux[j]]);
      arr[k++] = aux[j++];
    }
  }
  while (i <= mid) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, aux[i]]);
    arr[k++] = aux[i++];
  }
  while (j <= right) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, aux[j]]);
    arr[k++] = aux[j++];
  }
}

export function quickSortAlgo(arr:number[], ASC_MODE:boolean) {
  const animations:any = []
   quickSortHelper(arr, 0, arr.length-1, animations, ASC_MODE)
  return animations
}

function quickSortHelper(arr:number[], left:number , right:number, animations:any, ASC_MODE:boolean) {
  if(left < right) {
    let part:number
    if(!ASC_MODE){
      part = partition(arr, left, right, animations)
    } else {
      part = partitionDESC(arr, left, right, animations)
    }
    quickSortHelper(arr, left, part-1, animations,ASC_MODE)
    quickSortHelper(arr, part+1, right, animations,ASC_MODE)
  }
}

function partition(arr:number[], left:number, right:number, animations:any) {
  let pivot = arr[right]
  let i = (left - 1)
  for(let j = left; j < right; j++){
    animations.push([j, right])
    if(arr[j] < pivot) {
      i++
      animations.push([j, arr[j], i, arr[i]])
      swap(arr, i, j)
    }
  }
  animations.push([i+1, arr[i+1], right, arr[right]])
  swap(arr, i+1, right)
  return i+1
}

function partitionDESC(arr:number[], left:number, right:number, animations:any) {
  let pivot = arr[right]
  let i = (left - 1)
  for(let j = left; j < right; j++){
    animations.push([j, right])
    if(arr[j] > pivot) {
      i++
      animations.push([j, arr[j], i, arr[i]])
      swap(arr, i, j)
    }
  }
  animations.push([i+1, arr[i+1], right, arr[right]])
  swap(arr, i+1, right)
  return i+1
}

function swap(arr:number[], i:number, j:number) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}



// export default function bogoSortAlgo(arr:number[], arrLength:number) {
//   let animations = []
//   while(!isSorted(arr, arrLength)) {
//     arr = shuffle(arr, arrLength)
//   }
//   return animations
// }

// function isSorted(arr:number[], arrLength:number) {
//   for(let i = 0; i<arr.length; i++) {
//     if(arr[i] > arr[i+1]) {
//       return false
//     }
//   }

//   return true
// }

// function shuffle(arr:number[], arrLength:number){
//   let i, j=arrLength;
//   for (i=0; i < arrLength; i++){
//       const index = Math.floor(Math.random() * arrLength);
//       swap(arr, j-i-1, index);
//   }
//   return arr;
// }


// const arr = [3,1, 6]
// const length = arr.length

// console.log(bogoSortAlgo(arr, length))