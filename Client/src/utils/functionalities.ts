



export function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }


export async function showPath(path: number[], visited: boolean = false, algo:string = 'bfs') {
    for (let i = 0; i < path.length; i++) {
      await delay(10);
      document.getElementById(`${algo}${path[i]}`)!.style.background = visited
        ? "var(--purple)"
        : "var(--yellow)";
      await delay(10);
      if (i + 1 !== path.length) {
        if (
          document.getElementById(
            `${algo}${path[i]},${path[i + 1]}-${path[i + 1]},${path[i]}`
          ) ||
          document.getElementById(
            `${algo}${path[i + 1]},${path[i]}-${path[i]},${path[i + 1]}`
          )
        ) {
          if (path[i] < path[i + 1])
            document.getElementById(
              `${algo}${path[i]},${path[i + 1]}-${path[i + 1]},${path[i]}`
            )!.style.background = visited
              ? "var(--purple)"
              : "var(--yellow)";
          else
            document.getElementById(
              `${algo}${path[i + 1]},${path[i]}-${path[i]},${path[i + 1]}`
            )!.style.background = visited
              ? "var(--purple)"
              : "var(--yellow)";
        }
      }
    }
  }
