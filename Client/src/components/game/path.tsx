import '../../css/game/path.css'

function Path({thoughtProcess}: {thoughtProcess: 'THOUGHTPROCESS' | 'PATH'}) {
  return <div className={`path ${thoughtProcess}`}/>  
}

export default Path;