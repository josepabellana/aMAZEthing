import PathStatistics from './pathStatistics';

function MapKeys({
  stats,
}: {
  stats: {
    visited: number;
    path: number;
  };
}) {
  return (
    <div className="map-keys">
      <h2>Keys</h2>
      <div className="flex-row">
        <h5>Vertex</h5>
        <div className="vertex"></div>
      </div>
      <div className="flex-row">
        <h5>Edge</h5>
        <div className="edge-key"></div>
      </div>
      <div className="flex-row">
        <h5>Visited</h5>
        <div className="edge-key-visited"></div>
      </div>
      <div className="flex-row">
        <h5>Endpoint</h5>
        <div className="edge-key-path"></div>
      </div>
      <PathStatistics stats={stats}></PathStatistics>
    </div>
  );
}

export default MapKeys;
