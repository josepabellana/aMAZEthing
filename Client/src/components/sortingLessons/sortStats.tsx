function MapKeys({ animations, isTrue}: { animations: any, isTrue?:string }) {
    let swaps:number = 0;

    for(let el of animations) {
        if(el.length > 2) swaps++
    }

  return (
    <div className="sort-keys">
      <h2>Summary</h2>
      <div className="flex-row">
        <h5>AVG Complexity:</h5>
       { isTrue === 'Merge' ?  <h4>O(n*log n)</h4> : isTrue === 'Quick' ?   <h4>O(n*log n)</h4> : <h4>O(n^2)</h4>}
      </div>
      <div className="flex-row">
        <h5>Best Complexity: </h5>
        { isTrue === 'Merge' ?  <h4>O(n*log n)</h4> : isTrue === 'Quick' ?   <h4>O(n*log n)</h4> : <h4>O(n^2)</h4>}
      </div>
      <div className="flex-row">
        <h5>Worst Complexity: </h5>
        { isTrue === 'Merge' ?  <h4>O(n*log n)</h4> : isTrue === 'Quick' ?   <h4>O(n*2)</h4> : <h4>O(n^2)</h4>}
      </div>
      <div className="flex-row">
        <h5>Space complexity: </h5>
        <h4>{ isTrue === 'Merge' ?  <h4>O(n)</h4> : isTrue === 'Quick' ?   <h4>O(log n)</h4> : <h4>O(n^2)</h4>}</h4>
      </div>

      <div className="stats-flex">
                <div className="flex-row">
                    <h4>Iterations:</h4>
                    <h4>{animations.length}</h4>
                </div>
                <div className="flex-row">
                    <h4>Swaps:</h4>
                    <h4>{swaps}</h4>
                </div>
            </div>
      
    </div>
  );
}

export default MapKeys;
