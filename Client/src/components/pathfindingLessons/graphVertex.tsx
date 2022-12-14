import { value } from "../../utils/graph"
import '../../css/graphVertex.css'
function GraphVertex({vertex, edges, width, setEnd, end, weightedGraph}:{
    vertex:value;
    edges:any;
    width:number;
    setEnd:any;
    end:number;
    weightedGraph:boolean;
}){

    return(<div  id={`${vertex}`} className={`vertex ${vertex===end?'selectedEndVertex':''}`} onClick={()=>{setEnd(vertex) }}>
            {edges && edges.map((edge:[number, number, number])=>{

                if(edge[2]!==0){
                    if(edge[1]===edge[0]+1){
                        //right
                        return <div key={`${edge[0]},${edge[1]}-${edge[1]},${edge[0]}`} id={`${edge[0]},${edge[1]}-${edge[1]},${edge[0]}`} className={`edge right-connection`} style={weightedGraph ? {"height":`${edge[2]*2}px`} : {}} ></div> 
                    }else if(edge[1]===edge[0]+width){
                        //bottom
                        return  <div key={`${edge[0]},${edge[1]}-${edge[1]},${edge[0]}`} id={`${edge[0]},${edge[1]}-${edge[1]},${edge[0]}`} className={`edge vertical bottom-connection`} style={weightedGraph ? {"height":`${edge[2]*2}px`} : {}} ></div>
                    } 
                } 
            })}
            </div>)
}
export default GraphVertex