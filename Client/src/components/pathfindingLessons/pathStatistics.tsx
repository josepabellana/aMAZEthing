function PathStatistics({
  stats,
}: {
  stats: {
    visited: number;
    path: number;
  };
}) {
  return (
    <div className="stats-flex">
      <div className="flex-row">
        <h4>Visited Nodes</h4>
        <h4>{stats.visited}</h4>
      </div>
      <div className="flex-row">
        <h4>Final Path</h4>
        <h4>{stats.path}</h4>
      </div>
    </div>
  );
}

export default PathStatistics;
