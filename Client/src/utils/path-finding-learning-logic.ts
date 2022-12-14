function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
}
class Node {
    value: number;
    children: any;
    adjacencies: {
        0: number,
        1: Node
    }[]
    constructor(value: number) {
        this.value = value;
        this.children = [];
        this.adjacencies = []
    }
    setAdjacent(idLine: number, node: Node) {
        this.adjacencies.push({
            0: idLine,
            1: node
        })
    }
}

export class Tree {
    root: any;
    depth: number;
    numNodes: number;
    totalLines: number;
    lineStructure: any[];
    xCoordinatesCode: any;
    nodes: any;
    minimumBrothers: number;
    constructor(minBrothers: number) {
        this.root = null;
        this.depth = 0;
        this.numNodes = 0;
        this.totalLines = 0;
        this.nodes = [];
        this.lineStructure = [];
        this.xCoordinatesCode = [];
        this.minimumBrothers = minBrothers;
    }
    getLineStructure() {
        return this.lineStructure;
    }
    getArrNodes() {
        return this.nodes;
    }
    getNodes(arr: any = [[this.root]], currentDepth: number = 0) {
        if (currentDepth + 1 === this.depth) return arr;
        let arr2 = collectNodes(arr, currentDepth);
        currentDepth++;
        arr.push(arr2);
        this.nodes = [...arr];
        this.getNodes(arr, currentDepth);

        function collectNodes(arr: any, currentDepth: number) {
            let res = []
            for (let node of arr[currentDepth]) {
                for (let child of node.children) {
                    res.push(child);
                }
            }
            return res;
        }
    }
    getRoot() {
        if (this.root) return this.root;
    }
    getDepth() {
        return this.depth;
    }
    getTotalLines() {
        return this.totalLines;
    }
    getNumNodes() {
        return this.numNodes;
    }
    add() {

        if (this.root == null) {
            document.getElementById("myCanvas")!.innerHTML = "";
            this.numNodes++;
            const newNode = new Node(this.numNodes);
            this.root = newNode;
            this.depth = 1;
        } else {
            let node = this.root
            function evalChildren(node: Node, numNodes: number, minBrothers: number) {
                let trigger = false
                if (node.children.length < minBrothers) {
                    const newNode = new Node(numNodes + 1);
                    if (node.children.length) newNode.children.push(node.children[node.children.length - 1])
                    node.children.push(newNode)
                    return true
                } else {
                    while (!trigger) {
                        node.children.forEach((el: Node) => {
                            if (trigger) return true
                            if (Math.floor(Math.random() * 10) > 0) {//short number= longest display / long number = short display
                                trigger = evalChildren(el, numNodes, minBrothers);
                            }
                        })
                    }

                }
                return trigger
            }
            evalChildren(node, this.numNodes, this.minimumBrothers);
            this.numNodes++
            console.log(this.numNodes)
        }
    }
    bfs(queue: Node[] = [this.root], depth: number = 0) {
        let newQ: Node[] = [];
        document.getElementById("myCanvas")!.innerHTML += `<div id='tree-level${depth}' class='tree-level'></div>`;
        for (let node of queue) {
            document.getElementById(`tree-level${depth}`)!.innerHTML += `<svg class="svg-circle"><circle cx="50%" cy="50%" r="7" stroke="var(--main-green)" stroke-width="3" fill="var(--yellow)"  id="${node.value}" ></circle></svg>`
            node.children.forEach((child: Node) => {
                newQ.push(child);
            });
        }
        depth++;
        if (newQ.length !== 0) depth = this.bfs(newQ, depth);
        return depth
    }

    calculateWidthDynamically(width: number, numNodes: number = this.numNodes) {
        let half = Math.floor(width / 2);
        let num = 1;
        for (let i = 0; i < numNodes; i++) {
            if (num === 1) {
                this.xCoordinatesCode.push([half]);
            } else {
                let newArr = [];
                if (num % 2 === 1) newArr.push(half);
                let iterations = 0;
                while (iterations < ((num - 1) / 2)) {
                    num % 2 === 1 ? newArr.unshift(half - 100 - 100 * iterations) : newArr.unshift(half - 50 - 100 * iterations);
                    num % 2 === 1 ? newArr.push(half + 100 + 100 * iterations) : newArr.push(half + 50 + 100 * iterations);
                    iterations++;
                }
                this.xCoordinatesCode.push(newArr)
            }
            num++
        }
        console.log(this.xCoordinatesCode)
    }
    createLines(refHeightTreeLevel: any = 100, linesWithWeights: boolean = false, currentDepth: number = 0, currentLevel: number = 1, lineID: number = 100) {

        if (currentLevel < this.depth) {
            let collection = document.getElementById(`tree-level${currentLevel}`)!.children
            for (let i = 0; i < collection.length; i++) {
                let collectionBLW = document.getElementById(`tree-level${currentLevel + 1}`)!.children
                let posx0 = this.xCoordinatesCode[collection.length - 1][i];
                let posy0 = (currentDepth * refHeightTreeLevel) + 50;
                for (let j = 0; j < collectionBLW.length; j++) {
                    let posx1 = this.xCoordinatesCode[collectionBLW.length - 1][j];
                    let posy1 = ((currentLevel) * refHeightTreeLevel) + 50;
                    let weight = 2;
                    let color = 'var(--yellow)'
                    if (linesWithWeights) {
                        weight = Math.floor(Math.random() * 3);
                        switch (weight) {
                            case 0:
                                weight = 2;
                                color = 'var(--yellow)'
                                break;
                            case 1:
                                weight = 8;
                                color = 'purple'
                                break;
                            case 2:
                                weight = 14;
                                color = 'red'
                                break;
                        }
                    }
                    document.getElementById(`myCanvas`)!.innerHTML += `<svg class="svg-line"><line id="${lineID}" x1="${posx0}" y1="${posy0}" x2="${posx1}" y2="${posy1}"  style="stroke:${color}; stroke-width:${weight}"/></svg>`
                    this.lineStructure.push({ id: lineID, weight: weight })
                    lineID++
                }
            }
            this.totalLines = lineID;
            this.createLines(refHeightTreeLevel, linesWithWeights, currentDepth + 1, currentLevel + 1, lineID)
        }
    }
}

export class Graph {
    vertices: any = [];
    constructor(node: Node, depth: number, lines: any) {
        this.vertices = [];
        if (typeof lines === 'number') this.createVertices(node, depth, lines);
        else this.createVerticesWeights(node, depth, lines);
    }
    getVertices() {
        return this.vertices
    }
    createVerticesWeights(nodesArr: any, depth: number, obj: any, currentDepth: number = 0, currentLine: any = 100, created: boolean = false, nodesVisited = 0) {
        if (currentDepth + 1 === depth) {
            // console.log(this.vertices)
            return
        }

        if (!created) {
            for (let i = 0; i < nodesArr.length; i++) {
                for (let node of nodesArr[i]) {
                    let cell = new Cell(node.value);
                    this.vertices.push(cell);
                }
            }
            created = true;
        }
        let nodesPrevLvl = nodesVisited;
        let nodesXlevel = nodesArr[currentDepth].length;
        let nodesNextLevel = nodesArr[currentDepth + 1].length;
        // console.log({ nodesVisited, nodesXlevel, nodesNextLevel })

        for (let i = nodesVisited; i < nodesXlevel + nodesPrevLvl; i++) {
            let source = this.vertices[i];
            // console.log(`node number ${source.id}`)
            for (let j = nodesPrevLvl + nodesXlevel; j < nodesPrevLvl + nodesNextLevel + nodesXlevel; j++) {
                let destination = this.vertices[j]

                let line = new Line(obj[currentLine - 100].id, obj[currentLine - 100].weight)
                this.setConnection(source, destination, line);
                currentLine++
                // console.log(`connection from ${source.id} to${destination.id}`)
            }
            nodesVisited++
        }
        currentDepth++;
        this.createVerticesWeights(nodesArr, depth, obj, currentDepth, currentLine, created, nodesVisited)
    }

    createVertices(nodesArr: any, depth: number, totalLines: number, currentDepth: number = 0, currentLine: number = 100, created: boolean = false, nodesVisited = 0) {
        if (currentDepth + 1 === depth) {
            // console.log(this.vertices)
            return
        }
        if (!created) {
            for (let i = 0; i < nodesArr.length; i++) {
                for (let node of nodesArr[i]) {
                    let cell = new Cell(node.value);
                    this.vertices.push(cell);
                }
            }
            created = true;
        }
        let nodesPrevLvl = nodesVisited;
        let nodesXlevel = nodesArr[currentDepth].length;
        let nodesNextLevel = nodesArr[currentDepth + 1].length;
        // console.log({ nodesVisited, nodesXlevel, nodesNextLevel })

        for (let i = nodesVisited; i < nodesXlevel + nodesPrevLvl; i++) {
            let source = this.vertices[i];
            // console.log(`node number ${source.id}`)
            for (let j = nodesPrevLvl + nodesXlevel; j < nodesPrevLvl + nodesNextLevel + nodesXlevel; j++) {
                let destination = this.vertices[j]
                let line = new Line(currentLine, 1)
                this.setConnection(source, destination, line);
                currentLine++
                // console.log(`connection from ${source.id} to${destination.id}`)
            }
            nodesVisited++
        }
        currentDepth++;

        this.createVertices(nodesArr, depth, totalLines, currentDepth, currentLine, created, nodesVisited)
    }

    setConnection(source: any, destination: any, line: Line) {
        source.setAdjacent(destination, line);
        destination.setAdjacent(source, line);
    }

    async dfs(currentPos: any = this.vertices[0], end: any = this.vertices[this.vertices.length - 1], path: any = [{ 0: { id: 0, weight: 0 }, 1: this.vertices[0] }]) {
        let neighbors = currentPos.getAdjacencies()
        let res = checkNeighbors(neighbors, end)
        if (res[0]) return path.concat(res[1])
        for (let neighbor of neighbors) {
            let visitedFlag = false;
            for (let visited of path) {
                if (neighbor['1'].id === visited['1'].id) {
                    visitedFlag = true;
                    break;
                }
            }
            // console.log(neighbor)
            if (visitedFlag === true) continue;
            let search: any = await this.dfs(neighbor['1'], end, path.concat(neighbor));
            if (search) return search;

        }

        return false;
        function checkNeighbors(neighbors: any, end: any) {
            // console.log({neighbors})
            for (let neighbor of neighbors) {
                // console.log(`${neighbor['1'].id} compared to ${end.id}`)
                if (neighbor['1'].id === end.id) return [true, [neighbor]]
            }
            return [false, null]
        }
    }
    async printPath(path: any) {
        document.getElementById(`${path[0]['1'].id}`)!.style.fill = 'var(--main-green)';
        path.shift()

        for (let el of path) {
            await delay(100);
            document.getElementById(`${el['0'].id}`)!.style["stroke"] = 'var(--main-green)';
            await delay(100);
            document.getElementById(`${el['1'].id}`)!.style.fill = 'var(--main-green)';
        }
    }

    async bfs(currentPos: any = this.vertices[0], end: any = this.vertices[this.vertices.length - 1], path: any = [{ 0: { id: 0, weight: 0 }, 1: this.vertices[0] }], depth = 0) {
        let q = [];
        let found = false;
        let count = 0
        let emptyQueue = false;
        let currentChilds = 0;
        let numChildsVisited = 0;
        q.unshift({ '0': 0, '1': currentPos });
        while (q.length && !found && count < 100) {

            count++
            let node = q.pop();
            emptyQueue = true;
            let neighbors: any = node['1'].adjacencies;
            if (emptyQueue) {
                currentChilds = neighbors.length;
                numChildsVisited = 0;
                emptyQueue = false;
            }
            console.log(neighbors)
            for (let neighbor of neighbors) {
                numChildsVisited++
                let visitedFlag = false;
                for (let visited of path) {
                    if (neighbor['1'].id === visited['1'].id) {
                        visitedFlag = true;
                    }
                }
                if (visitedFlag === true) continue;
                path.push(neighbor)

                if (numChildsVisited < currentChilds / 2) continue;
                q.unshift(neighbor)
                if (neighbor['1'].id === end.id) {
                    found = true;
                }
            }
        }
        console.log('FINAL PATH', path)
        return path;
    }


    async dijkstra(currentPos: any = this.vertices[0], end: any = this.vertices[this.vertices.length - 1], path: any = [{ 0: { id: 0, weight: 0 }, 1: this.vertices[0] }]) {
        let found = false;
        let visitedNodes: any = {};
        let count = 0;
        let unvisitedNodes: any = {};
        for (let vertex of this.vertices) {
            if (vertex.id === currentPos.id) unvisitedNodes[currentPos.id] = [0, 0]
            else unvisitedNodes[vertex.id] = [Infinity, 0]
        }
        console.log('FIRST STAGE', unvisitedNodes);
        let dictionaryLines: any = {};
        for (let vertex of this.vertices) {
            let neighbors = vertex.adjacencies;
            for (let neighbor of neighbors) {
                if (neighbor['1'] !== currentPos.id) dictionaryLines[`${neighbor['1'].id},${neighbor['0'].id}`] = neighbor['0'].weight;
            }
        }
        console.log('SECOND STAGE', unvisitedNodes, dictionaryLines);
        while (Object.keys(unvisitedNodes) && !found && count < 50) {
            count++;
            let node: any = Object.keys(unvisitedNodes).reduce((acc, key) => {
                return unvisitedNodes[key][0] < acc[1][0] ? [key, unvisitedNodes[key]] : acc;
            }, ['null', [Infinity, 0]]);
            console.log('NODE1:', node)
            console.log(`comparing ${node[0]}, with ${node[1][0]}  to  ${end.id}`)
            visitedNodes[node[0]] = [node[0] == 1 ? 0 : node[1][0], node[0] == 1 ? 0 : node[1][1]];
            if (node[0] == end.id) break;
            if (node[1][0] === Infinity) return false;
            console.log('VISITED', visitedNodes)
            //NEED TO STORE THE VISITED NODES
            node = this.vertices.filter((el: Cell) => el.id == node['0'])[0];
            console.log('NODE:', node)
            let neighbors: any = node.adjacencies;
            console.log('NEIGHBORS', neighbors)

            for (let neighbor of neighbors) {
                let weight = dictionaryLines[`${neighbor['1'].id},${neighbor['0'].id}`];
                let sum = unvisitedNodes[`${node.id}`][0] + (weight as number);
                if (!unvisitedNodes[`${neighbor['1'].id}`]) continue;
                if (sum < unvisitedNodes[`${neighbor['1'].id}`][0]) unvisitedNodes[`${neighbor['1'].id}`] = [sum, node.id];
            }

            console.log('BEFORE DELETE', unvisitedNodes)
            delete unvisitedNodes[node.id]
            console.log('AFTER DELETE', unvisitedNodes)
            console.log('herereeee', visitedNodes, count)
        }
        console.log('VISITED', visitedNodes)
        let length = Object.keys(visitedNodes).length;
        console.log('length', length);
        let start = visitedNodes[end.id];
        let revPath: any = [];
        revPath.unshift(length)

        revPath.unshift(start[1]);
        console.log(length, start)
        console.log('START', start, revPath)

        while (visitedNodes[start[1]][0] != 0) {
            start = visitedNodes[start[1]];
            revPath.unshift(start[1]);
            if (visitedNodes[`${start[1]}`][0] == 0 || visitedNodes[start[1]][0] == '0') {
                console.log('hey')
                break;
            }
        }
        console.log('path', revPath)

        let finalPath: any = []
        finalPath.push({ '0': 0, '1': currentPos })
        revPath.shift()
        let node = { '0': 0, '1': currentPos }
        while (revPath.length) {
            node = node['1'].adjacencies.filter((el: any) => el['1'].id == revPath[0])[0];
            console.log(node, revPath)
            finalPath.push(node);
            revPath.shift();
            console.log(revPath)
        }
        console.log(finalPath)
        return finalPath;
    }
}

class Cell {
    id: number;
    adjacencies: {
        0: Line,
        1: Cell
    }[];
    constructor(id: number) {
        this.id = id;
        this.adjacencies = [];
    }
    getAdjacencies() {
        let shuffledAdj = Array(this.adjacencies.length).fill(null);
        for (let i = 0; i < shuffledAdj.length; i++) {
            let index = Math.floor(Math.random() * shuffledAdj.length);
            while (shuffledAdj[index] !== null) {
                index = Math.floor(Math.random() * shuffledAdj.length);
            }
            shuffledAdj[index] = this.adjacencies[i];
        }
        return shuffledAdj;
    }
    setAdjacent(node: any, line: Line) {
        this.adjacencies.push({
            '0': line,
            '1': node
        });
    }
}

class Line {
    id: number;
    weight: number;
    constructor(id: number, weight: number) {
        this.id = id;
        this.weight = weight;
    }

}
