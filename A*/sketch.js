new p5();// import random
// setup how many rows/cols
var cols = 20;
var rows = 20;

// width and height are defined in createCanvas
// setup the size of the grid
var w_grid;
var h_grid;
// setup the map
var gamemap;
// setup start ang goal
var start;
var goal;
// set up the algorithm
var pathAlg;
// setup the canvas
var canvas;
// setup the icon
var ib1,ib2,ib3,ib4;
// setup the count for coordinate
var count = 0;
//  res == 1 if solution exist
var res;
// pause the drawing
var pause = false;
var Button;
//var resetButton;
function reset(){
    loop();
    background(255);
    go = false;
    pause = false;
    count = 0;
    for (var j = 0; j < coord.length;j++){
        coord[j] = undefined;
    }
    for (var i = 0 ; i < cols; i++){
        for (var j = 0; j < rows; j++){
            if ((gamemap.grid[i][j] === start)||(gamemap.grid[i][j]===goal)){
                continue;
            }
            gamemap.grid[i][j].isObs(false);
        }
    }
  console.log("clear");
}

//var setSGButton;
function setSG(){
    noStroke();
    gamemap = new Map(cols,rows,w_grid,h_grid);
    var s_x = coord[0];
    var s_y = coord[1];
    var g_x = coord[2];
    var g_y = coord[3];
    if (s_x!= undefined && s_y!=undefined){
        start = gamemap.grid[s_x][s_y];
    }
    else
        //start = gamemap.grid[4][1];
        start = gamemap.grid[0][0];
    
    if (g_x!= undefined && g_y!=undefined){
        goal = gamemap.grid[g_x][g_y];
    }
    else
        //goal = gamemap.grid[0][3];
        goal = gamemap.grid[cols-1][rows-1];
    
    start.obstacle = false;
    goal.obstacle = false;
    start.color = color(255,51,0);
    goal.color = color(255,51,0);
    pathAlg = new Astar(start,goal);
}
//var setMapButton;
function drawObs(){
    for (var i = 0 ; i < cols; i++){
        for (var j = 0; j < rows; j++){
            if ((gamemap.grid[i][j] === start)||(gamemap.grid[i][j]===goal)){
                continue;
            }
            gamemap.grid[i][j].generateObs();
        }
    }
}

//store the start and goal coordinte
var coord = new Array(4);
//store the icon
var icon = new Array(4);
var I;
var P;
//var index;
//var InputAndButton(name,index){
//  I : createInput("0");
//  P : createP(name);   
//  this.P.class("input");
//  icon[index] = this.I;
//  this.I.changed(updateCoord);
//};
function InputAndButton(name,index){
    this.I = createInput("0");
    //this.I.position(x,y);
    this.P = createP(name);
    this.P.class("input");
    //this.P.position(this.I.x+this.I.width,y-19)//I don't know why their standard are different
    icon[index] = this.I;
    this.I.changed(updateCoord);
}
function updateCoord(){
    coord[count] = icon[count].value();
    count++;
}
function evalPath(node){
    var subpath= [];
    subpath.push(node);
    while(node.parent){
        subpath.push(node.parent);
        node = node.parent;
    }
    //console.log(subpath.length);
    return subpath;
}
function drawPath(path){
    noFill();
    stroke(255,0,255);
    strokeWeight(w_grid/2);
    beginShape();
    for (var i = 0; i < path.length; i++){
        vertex(path[i].i*w_grid + w_grid/2, path[i].j*h_grid+h_grid/2);
        console.log("drawing..");
    }
    endShape();
    noStroke();
}



//var findRouteButton;
var go = false;
function findRoute(){
    go = true;
    timeS = new Date().getTime();
}
var value =0;
function mouseDragged(){
    var i = floor(mouseX/(400/cols));
    var j = floor(mouseY/(400/rows));
    gamemap.grid[i][j].isObs(true);
    var neighbor = gamemap.grid[i][j].addNeighbors();
    for (var i = 0 ; i < neighbor.length; i++){
        neighbor[i].isObs(true);
    }
}
function drawMap() {
    for (var i = 0; i < gamemap.cols; i++) {
        for (var j = 0; j < gamemap.rows; j++) {
            if ((gamemap.grid[i][j] === start)||(gamemap.grid[i][j]===goal)){
                continue;
            }
            gamemap.grid[i][j].show();
        }
    }
}
function showInfo(){
    var i = floor(mouseX/(400/cols));
    var j = floor(mouseY/(400/rows));
    if (i >= 0 && i < cols && j >=0 && j < rows){
        var node = gamemap.grid[i][j];
        fill(0);
        text("mouseX = " + mouseX,430,170);
        text("i = " + node.i, 430, 190);
        text("j = " + node.j, 430, 210);
        text("f = " + node.f, 430, 230);
        text("g = " + node.ga, 430, 250);
        text("h = " + node.h, 430, 270);
    }
}
function drawBoarder(){
    noFill();
    stroke(0,0,255);
    strokeWeight(2);
    beginShape();
    vertex(0,0);
    vertex(400,0);
    vertex(400,400);
    vertex(0,400);
    endShape(CLOSE);
    noStroke();    
}




function drawSet(){
    // red represents openset
    for (var i = 0; i < pathAlg.openSet.length;i++){
        var spot = pathAlg.openSet[i];
        spot.show("grid",color(255,0,0));
    }
    // green represents closeset
    for (var i = 0; i < pathAlg.closedSet.length;i++){
        var spot = pathAlg.closedSet[i];
        spot.show("grid",color(0,255,0));
    }
}
var p;
function setup() {
//    ib = new InputAndButton("start_x",0);
//    ib2 = new InputAndButton("start_y",1);
//    ib3 = new InputAndButton("goal_x",2);
//    ib4 = new InputAndButton("goal_y",3);
    canvas = createCanvas(600,600);
    //canvas.parent("container");
    var timeS = 0;
    var timeE = 0;
    noStroke();
    w_grid = 400/cols;
    h_grid = 400/rows;
    Button = select("#1");
    Button.mousePressed(reset);
    //Button.id("reset");
    setSG();
    Button = select("#2");
    Button.mousePressed(setSG);
    //Button.id("sandg");
    Button = select("#3");
    Button.mousePressed(drawObs);
    //Button.id("map");
    Button = select("#4");
    Button.mousePressed(findRoute);
    //Button.id("route");
    //frameRate(3);
    gamemap.grid[1][2].isObs(true);
    gamemap.grid[2][2].isObs(true);
    gamemap.grid[2][3].isObs(true);

//    gamemap.grid[0][1].isObs(true);
//    gamemap.grid[1][1].isObs(true);
//    gamemap.grid[2][6].isObs(true);
//    gamemap.grid[5][5].isObs(true);
//    gamemap.grid[5][6].isObs(true);
//    gamemap.grid[6][6].isObs(true);
//    gamemap.grid[7][6].isObs(true);
//    gamemap.grid[8][5].isObs(true);
//    gamemap.grid[3][9].isObs(true);
//    gamemap.grid[8][4].isObs(true);
//    gamemap.grid[6][2].isObs(true);
    
}

 function draw() {
     background(255);
     drawBoarder();
     start.show();
     goal.show();
     showInfo();
     drawMap();
     if(go){
        res = pathAlg.step();
        var path = evalPath(pathAlg.lastCheckedNode);
        drawSet();
        drawPath(path);
        if (!pause){
            if (res != 0){
                pause = true;
                timeE = new Date().getTime();
                setTimeout( function (){alert((timeE - timeS) / 1000 + "sec");},10);
                noLoop();
            }
        }
     }
}