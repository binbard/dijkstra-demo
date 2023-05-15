const docWorld = document.querySelector('.world');
const docInfo = document.querySelector(".info")
const docEdgeList = document.querySelector(".edgeList")

var vertices = [];
var edges = [];
var snode = null;
var dnode = null;

function setMsg(m) {
    msg = "Selected: " + (snode !== null ? snode.id : null) + "<br>Destination: " + (dnode !== null ? dnode.id : null) + "<br><br>";
    if (m) msg += m;
    docInfo.innerHTML = msg;
}

function addEdge() {
    setMsg("DESTINATION SELECTED");
    if (snode === null || dnode === null) {
        setMsg("INVALID");
        return;
    }
    else if(snode === dnode){
        setMsg("SRC DST CANNOT BE SAME");
        return;
    }
    for (let i = 0; i < edges.length; i++) {
        let edge = edges[i];
        if ((edge[0] == snode && edge[1] == dnode) || (edge[0] == dnode && edge[1] == snode)) {
            setMsg("EDGE ALREADY EXISTS");
            return;
        }
    }
    edges.push([snode, dnode]);
    docEdgeList.innerHTML += edges[edges.length - 1][0].id + " -> " + edges[edges.length - 1][1].id + "<br>";
}

setMsg(snode, dnode);

docWorld.addEventListener('click', function (e) {
    let node = e.target;
    let cnode = undefined;
    if (e.target.classList.contains('vertex')) cnode = e.target;
    if (snode === null) {
        snode = cnode || addVertex(e);
        setMsg("SOURCE SELECTED");
        dnode = null;
    }
    else {
        dnode = cnode || addVertex(e);
        addEdge();
        snode = null;
        dnode = null;
    }
});

function addVertex(e) {
    const V = document.createElement('div');
    V.classList.add('vertex');
    V.style.top = e.pageY + 'px';
    V.style.left = e.pageX + 'px';
    V.id = "node" + vertices.length;
    V.innerHTML = vertices.length;
    docWorld.appendChild(V);
    vertices.push(V);
    return V;
}

function connectVertices() {
    var vertex1 = snode;
    var vertex2 = dnode;
    // console.log(vertex1, vertex2);
    if (vertex1 === null || vertex2 === null) return;

    const svg = document.getElementById('line');
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    const vertex1Rect = vertex1.getBoundingClientRect();
    const vertex2Rect = vertex2.getBoundingClientRect();

    const vertex1X = vertex1Rect.left + vertex1Rect.width / 2;
    const vertex1Y = vertex1Rect.top + vertex1Rect.height / 2;
    const vertex2X = vertex2Rect.left + vertex2Rect.width / 2;
    const vertex2Y = vertex2Rect.top + vertex2Rect.height / 2;

    line.setAttribute('x1', vertex1X);
    line.setAttribute('y1', vertex1Y);
    line.setAttribute('x2', vertex2X);
    line.setAttribute('y2', vertex2Y);
    line.classList.add('line');

    svg.appendChild(line);
}