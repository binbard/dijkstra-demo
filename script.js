const docWorld = document.querySelector('.world');
const docInfo = document.querySelector(".info");
const docEdgeList = document.querySelector(".edgeList");

var vertices = [];
var edges = [];
var snode = null;
var dnode = null;
var bi = 0;

const biCheck = document.createElement('input');
biCheck.type = "checkbox";
biCheck.id = "biCheck";
biCheck.checked = bi;

const svgContainer = document.querySelector('svg');


function setMsg(m) {
    msg = "Selected: " + (snode !== null ? snode.id : null) + "<br>Destination: " + (dnode !== null ? dnode.id : null) + "<br><br>";
    docInfo.innerHTML = msg;
    docInfo.appendChild(biCheck);
    biCheck.addEventListener('change', function () {
        bi = this.checked;
    });
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
    if (bi) line.setAttribute("marker-start", "url(#startarrowhead)");

    svgContainer.appendChild(line);

    docEdgeList.innerHTML += edges[edges.length - 1][0].id + (bi ? " ⇌ " : " ➔ ") + edges[edges.length - 1][1].id + "<br>";
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
    V.style.top = e.pageY - docWorld.offsetTop - 16 + 'px';
    V.style.left = e.pageX - docWorld.offsetLeft - 16 + 'px';
    V.id = "node" + vertices.length;
    V.innerHTML = vertices.length;
    docWorld.appendChild(V);
    vertices.push(V);
    return V;
}


