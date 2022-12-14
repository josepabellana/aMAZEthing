
export async function bubbleSortVisual(animations:number[][], DELAY_MS:number, width:number, margin:number,  tower:'' = '', height?:number, cb?: () => void) {
  for ( let i = 0, len = animations.length; i < len; i++ ) {
      await delay(DELAY_MS);
      if (animations[i].length > 2) {
        const [indexOne, elementOne, indexTwo, elementTwo] = animations[i];
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)';
        document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)';

        document.getElementById(
          `${indexOne}arrayColumn${tower}`
        )!.style.transform += `translateX(${width+margin*2}px)`;
        document.getElementById(
          `${indexTwo}arrayColumn${tower}`
        )!.style.transform += `translateX(-${width+margin*2}px)`;


        await delay(DELAY_MS);
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor =
          'var(--dark-green)';
        document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor =
          'var(--dark-green)';


        let tempNode = document.getElementById(`${indexTwo}arrayColumn${tower}`);
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.setAttribute('id', `${indexTwo}arrayColumn${tower}`)
        tempNode!.setAttribute('id', `${indexOne}arrayColumn${tower}`);

      } else {
        const [indexOne, elementOne] = animations[i];
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor =
          'var(--red)';
        await delay(DELAY_MS);
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor =
          'var(--dark-green)';
      }
    }

    if (cb) cb()
  }
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  export async function insertionSortVisual(animations:number[][], DELAY_MS:number, width:number, margin:number, tower: string = '',  height?:number, cb?: () => void) {
    for ( let i = 0, len = animations.length; i < len; i++ ) {
      await delay(DELAY_MS);
      if (animations[i].length > 2) {
        const [indexOne, elementOne, indexTwo, elementTwo] = animations[i];
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)';
        document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)';
        document.getElementById(
          `${indexOne}arrayColumn${tower}`
        )!.style.transform += `translateX(-${width+margin*2}px)`;
        document.getElementById(
          `${indexTwo}arrayColumn${tower}`
        )!.style.transform += `translateX(${width+margin*2}px)`;

        await delay(DELAY_MS);
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--dark-green)';
        document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor = 'var(--dark-green)';


        let tempNode = document.getElementById(`${indexTwo}arrayColumn${tower}`);
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.id = `${indexTwo}arrayColumn${tower}`;
        tempNode!.id = `${indexOne}arrayColumn${tower}`;
      } else {
        const [indexOne, elementOne] = animations[i];
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)';
        await delay(DELAY_MS);
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--dark-green)';
      }
    }
    if (cb) cb()

  }

export async function selectionSortVisual(animations:number[][], DELAY_MS:number, width:number, margin:number, tower: string = '', height?:number, cb?: () => void) {
  for ( let i = 0, len = animations.length; i < len; i++ ) {
      await delay(DELAY_MS)
      if(animations[i].length > 2) {
        const [indexOne, elementOne, indexTwo, elementTwo] = animations[i]
      const distance = (indexOne - indexTwo)
      document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)'
      document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)'
      document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.transform += `translateX(${distance*-(width+margin*2)}px)`
      document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.transform += `translateX(${distance*(width+margin*2)}px)`
      await delay(DELAY_MS)
      document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--dark-green)'
      document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor = 'var(--dark-green)'
      let tempNode =  document.getElementById(`${indexTwo}arrayColumn${tower}`) 
      document.getElementById(`${indexOne}arrayColumn${tower}`)!.id = `${indexTwo}arrayColumn${tower}`
      tempNode!.id =`${indexOne}arrayColumn${tower}`
      } else {
        const [indexOne, indexTwo] = animations[i]
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)'
        document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)'
        await delay(DELAY_MS)
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--dark-green)'
        document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor = 'var(--dark-green)'
      }
      
    }   
    if (cb) cb()

  }

  export async function mergeSortVisual(animations:any, DELAY_MS:number, width:number, margin:number, tower: string = '', height: number ,  cb?: () => void) {
    const arrayBars = document.getElementsByClassName(`array-el${tower}`);
    for ( let i = 0, len = animations.length; i < len; i++ ){
      await delay(DELAY_MS)
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOne = arrayBars[barOneIdx] as HTMLElement;
        const barTwo = arrayBars[barTwoIdx] as HTMLElement;
        const color = i % 3 === 0 ? 'var(--red)' : 'var(--dark-green)';
        await delay(DELAY_MS)
          barOne.style.backgroundColor = color;
          barTwo.style.backgroundColor = color;
      } else {
        const [barOneIdx, newHeight] = animations[i];
        const barOne = arrayBars[barOneIdx] as HTMLElement;
        await delay(DELAY_MS)
        barOne.style.height = `${newHeight*height}px`;
        await delay(0)

        barOne.textContent = newHeight
    }
  }

  if (cb) cb()


}

export async function quickSortVisual(animations:any, DELAY_MS:number, width:number, margin:number, tower: string = '', height:number,  cb?: () => void) {
  const arrayBars = document.getElementsByClassName(`array-el${tower}`);
  for ( let i = 0, len = animations.length; i < len; i++ ) {
    await delay(DELAY_MS)
    if (animations[i].length === 2) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOne = arrayBars[barOneIdx] as HTMLElement;
      const barTwo = arrayBars[barTwoIdx] as HTMLElement;
      console.log(barTwoIdx, barTwo)
      const colorRed =  'var(--red)' 
      const colorGreen = 'var(--dark-green)';
      await delay(DELAY_MS)
        barOne.style.backgroundColor = colorRed;
        barTwo.style.backgroundColor = colorRed;
      await delay(DELAY_MS)

        barOne.style.backgroundColor = colorGreen;
        barTwo.style.backgroundColor = colorGreen;


    } else {
      const [barOneIdx, barOneHeight, barTwoIdx, barTwoHeight] = animations[i];
      const barOne = arrayBars[barOneIdx] as HTMLElement;
      const barTwo = arrayBars[barTwoIdx] as HTMLElement;
      await delay(DELAY_MS)
      barOne.style.height = `${barTwoHeight*height}px`;
      barTwo.style.height= `${barOneHeight*height}px`;
      await delay(DELAY_MS)
      barOne.textContent = barTwoHeight
      barTwo.textContent = barOneHeight
  }
}

if (cb) cb()

}
  


