function PseudoCode({steps}:{

    steps:any;

}){


    return(
        steps.length && <div className ="pseudo-visualization">
            <h4>Pseudo Code:</h4>
            {steps.map((step:string,index:any)=>{
                
                 return <div><h5>{step}</h5></div>
                
            })}
        </div>
    )

}


export default PseudoCode