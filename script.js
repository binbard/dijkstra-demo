const docWorld = document.querySelector('.world');
const docInfo = document.querySelector(".info");
const docEdgeList = document.querySelector(".edgeList");

var vertices = [];
var edges = [];
var snode = null;
var dnode = null;
var startNode = null;
var endNode = null;
var se = false;
var bi = false;

const svgContainer = document.querySelector('svg')

const biCheck = document.querySelector('#biCheck');
const selectSe = document.querySelector('#selectSe');
const btnDij = document.querySelector('#btnDij');

function setBi(){
    bi=!bi;
}

function setMsg(m) {
    msg = "Selected: " + (snode !== null ? snode.id : null) + "<br>Destination: " + (dnode !== null ? dnode.id : null) + "<br><br>";
    msg += "Start: " + (startNode !== null ? startNode.id : null) + "<br>End: " + (endNode !== null ? endNode.id : null) + "<br><br>";
    docInfo.innerHTML = msg;
    docInfo.appendChild(biCheck);
    selectSe.innerHTML = "Start End";

    docInfo.appendChild(selectSe);
    docInfo.appendChild(btnDij);

    if (m) docInfo.innerHTML += "<br>" + m;
}

function addEdge() {
    setMsg("DESTINATION SELECTED");
    if (snode === null || dnode === null) {
        setMsg("INVALID");
        return;
    }
    else if (snode === dnode) {
        setMsg("SRC DST CANNOT BE SAME");
        return;
    }
    for (let i = 0; i < edges.length; i++) {
        let edge = edges[i];
        if (edge[0] === snode && edge[1] === dnode) {
            setMsg("EDGE ALREADY EXISTS");
            return;
        }
    }
    setMsg("EDGE ADDED");
    edges.push([snode, dnode]);
    if (bi) edges.push([dnode, snode]);


    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    let elsx = snode.offsetLeft + 10;
    let elsy = snode.offsetTop + 10;
    let eldx = dnode.offsetLeft + 10;
    let eldy = dnode.offsetTop + 10;
    line.setAttribute("x1", (elsx));
    line.setAttribute("y1", (elsy));
    line.setAttribute("x2", (eldx));
    line.setAttribute("y2", (eldy));
    line.setAttribute("stroke", "black");
    line.setAttribute("marker-end", "url(#endarrowhead)");
    line.style.cursor = "crosshair";
    if (bi) line.setAttribute("marker-start", "url(#startarrowhead)");
    svgContainer.appendChild(line);

    const cost = document.createElementNS("http://www.w3.org/2000/svg", "text");
    cost.setAttribute("x", (elsx + eldx) / 2);
    cost.setAttribute("y", (elsy + eldy) / 2);
    cost.setAttribute("dominant-baseline", "middle");
    cost.classList.add("cost");
    cost.id = "edge" + edges.length;
    cost.innerHTML = "0";
    svgContainer.appendChild(cost);

    docEdgeList.innerHTML += edges[edges.length - 1][0].id + (bi ? " ⇌ " : " ➔ ") + edges[edges.length - 1][1].id + "<br>";
}

setMsg(snode, dnode);

docWorld.addEventListener('click', function (e) {
    let pt = e.target;
    let cnode = undefined;
    if (pt.classList.contains('cost')) {
        handleCostClick(e);
        return;
    }
    else if(pt.classList.contains('vertex') && se===true){
        handleSe(pt);
        return;
    }
    handleVertexClick(e);

});

function selectStartEnd(){
    if(startNode!==null && endNode!==null){
        startNode.style.backgroundColor = "#0a0abc";
        endNode.style.backgroundColor = "#0a0abc";
        startNode = null;
        endNode = null;
    }
    se = !se;
}

function handleSe(pt){
    if(startNode===null){
        startNode = pt;
        startNode.style.backgroundColor = "green";
        setMsg("START SELECTED")
    }
    else if(endNode===null){
        endNode = pt;
        endNode.style.backgroundColor = "red";
        setMsg("END SELECTED")
        se = false;
        // TODO
    }
    console.log("handleSe");
}

function handleCostClick(e) {
    let pt = e.target;
    let cost = prompt("Enter Cost");
    if (cost === null) return;
    pt.innerHTML = cost;
}

function handleVertexClick(e) {
    var cnode = undefined;
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
}

function addVertex(e) {
    const V = document.createElement('div');
    V.classList.add('vertex');
    V.style.top = e.pageY - docWorld.offsetTop - 16 + 'px';
    V.style.left = e.pageX - docWorld.offsetLeft - 16 + 'px';
    V.id = "node" + vertices.length;
    V.innerHTML = vertices.length;
    docWorld.appendChild(V);
    vertices.push(V);
    return V;
}


