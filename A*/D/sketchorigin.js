new p5();// import random
// setup how many rows/cols
var cols = 10;
var rows = 10;
// width and height are defined in createCanvas
// setup the size of the grid
var w_grid;
var h_grid;
// setup the map
var gamemap;
// setup start and goals
var start;
var goals = [];
// set up the algorithm
var pathAlg;
// setup the canvas
var canvas;
// setup the count for coordinate
var count = 0;
//this function resets everything on the grid. 
var coords = [];

function mapSize(){
    var c = $("#mapsize").val();
    var r = $("#mapsize").val();
    cols = (c === "")? cols:c;
    rows = (r === "")? rows:r;
}

// this function get
function inputSpot(){
    console.log("hi  I am jquery");
    $(".initiateSpot").on("change",function(){
    var coord = $(this).val();
    coords.push(coord);
    });
}

function reset(){
    totalPath = [];
    go = false;
    count = 0;
    for (var j = 0; j < coord.length;j++){
        coord[j] = undefined;
    }
    for (var i = 0 ; i < cols; i++){
        for (var j = 0; j < rows; j++){
            if ((gamemap.grid[i][j] === start)|| visitedS.includes(gamemap.grid[i][j])||goals.includes(gamemap.grid[i][j])){
                continue;
            }
            gamemap.grid[i][j].isObs(false);
        }
    }
    console.log("clear");
    loop();
}
function defaultObs(){
    gamemap.grid[1][0].isObs(true);
    gamemap.grid[1][2].isObs(true);
    gamemap.grid[1][1].isObs(true);
        gamemap.grid[2][2].isObs(true);
        gamemap.grid[3][2].isObs(true);
        gamemap.grid[4][2].isObs(true);
        gamemap.grid[5][2].isObs(true);
        gamemap.grid[6][2].isObs(true);
//    gamemap.grid[5][6].isObs(true);
//    gamemap.grid[4][6].isObs(true);
//    gamemap.grid[7][6].isObs(true);
//    gamemap.grid[4][6].isObs(true);
//    gamemap.grid[4][5].isObs(true);
//    gamemap.grid[4][4].isObs(true);
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
// should turn into backends in the future
function defaultGoals(coords){
    var len = coords.length;
    console.log(len);
    for (var i = 0; i < len; i+=2){
        goals.push(gamemap.grid[coords[i]][coords[i+1]]);
    }
    goals.forEach(function(element){
        element.obstacle = false;
        element.color = color(255,51,0);      
    });
}

var nearestGoalInfo;
function setSG(){
    goals = [];
    noDrawPath = false;
    noStroke();
    mapSize();
    w_grid = 400/cols;
    h_grid = 400/rows;
    gamemap = new Map(cols,rows,w_grid,h_grid);
    //////
    if (coords.length === 0){
        start = gamemap.grid[0][0];
    }
    else{
        start = gamemap.grid[coords[0]][coords[1]];
        //start = gamemap.grid[4][1];
        //start = gamemap.grid[0][0];
    }
    start.obstacle = false;
    start.color = color(255,51,0);
    if (coords.length === 0){
        defaultGoals([cols-1,rows-1]);
    }
    else{
        coords.splice(0,2);
        defaultGoals(coords);
    }
    //default obs
    defaultObs();
    ////
}
// this function finds the nearest goal from start. use A* algorithm for comparison.
function spotFinder(start,goals){
    var index = 0;
    var values = [];
    var text ="";
    var minDist = Number.MAX_SAFE_INTEGER;
    for (var i = 0; i < goals.length; i++){
        var pathAlgAStar = new Astar(start,goals[i]);
        var distance;// distance from start
        do{distance = pathAlgAStar.step()
        }
        while(distance === 0);
        if (distance < minDist){
            index = i;
            minDist = distance;
        }
        text+="goal"+ i + ": "+goals[i].i +"," + goals[i].j + " with distance "+ distance +"\n";
        console.log("distance is: "  + distance);
        console.log("min distance is:" + minDist);
    }
     setTimeout(function (){
         alert("CURRENT START: " + start.i +","+start.j+"\n" + text + "\nNEXT GOAL: "+ goals[index].i + "," + goals[index].j + " distance: "+ goals[index].ga);},100);
    return [goals[index], minDist];
}

//this function turns the current goal to next start and adjust the remaining goals
var visitedSCoord = []; //the list stores visited starts' coordinate
var visitedS = [];// the list stores visited starts as an object
function spotConnector(){
    // if there are more than one goal, it means the connection is not completed
    if(goals.length >1){
        pathAlg.removeFromArray(goals,nearestGoalInfo[0]);
        // update: every info in the grid should be clear!
        gamemap = new Map(cols,rows,w_grid,h_grid);
        visitedSCoord.push([start.i,start.j]);// I might know the reason. its about the memory
        // the number of goals is decreasing
        var updatedGoals= [];
        for (var i = 0; i < goals.length; i++){
            var x = goals[i].i;
            var y = goals[i].j;
            updatedGoals.push(gamemap.grid[x][y]);
        }
        goals = updatedGoals;
        // the number of visited starts are increasing
        visitedS = [];
        for (var i = 0; i < visitedSCoord.length; i++){
            var x = visitedSCoord[i][0];
            var y = visitedSCoord[i][1];
            visitedS.push(gamemap.grid[x][y]);
        }
        // the next start is the current nearest goal
        var x = nearestGoalInfo[0].i;
        var y = nearestGoalInfo[0].j;
        start = gamemap.grid[x][y];
        console.log("next start: "+ start.i + "," + start.j);
        start.obstacle = false;
        start.color = color(255,51,0);
        goals.forEach(function(element){
            element.obstacle = false;
            element.color = color(255,51,0);  
        });
        visitedS.forEach(function(element){
            element.obstacle = false;
            element.color = color(255,51,0);  
        });
        defaultObs();
        // find nearest goal
        nearestGoalInfo = spotFinder(start,goals); 
        console.log("next goal: "+ nearestGoalInfo[0].i + "," + nearestGoalInfo[0].j);
        pathAlg = new Dstarlite(start,nearestGoalInfo[0],goals);
        pathAlg.Init();// finish initialization
        timeS = new Date().getTime(); 
        pathAlg.ComputePath();
        timeE = new Date().getTime();
        // alert("processing time : " + (timeE-timeS)/1000 + "sec");
        
    }
    else{
        noLoop();
        alert("path finding completed");
    }
}



function drawObs(){
    for (var i = 0 ; i < cols; i++){
        for (var j = 0; j < rows; j++){
            if ((gamemap.grid[i][j] === start)|| visitedS.includes(gamemap.grid[i][j])||goals.includes(gamemap.grid[i][j])){
                continue;
            }
            gamemap.grid[i][j].generateObs();
        }
    }
}

//store the start and goal coordinte
var totalPath = [];
function drawPath(path,c){
    noFill();
    stroke(c);
    strokeWeight(w_grid/4);
    beginShape();
    for (var i = 0; i < path.length; i++){
        vertex(path[i].i*w_grid + w_grid/2, path[i].j*h_grid+h_grid/2);
    }
    endShape();
    noStroke();
}

var go = false;
function findRoute(){
    // return the nearest goal
    nearestGoalInfo = spotFinder(start,goals);
    console.log("the nearest goal is: " + nearestGoalInfo[0].i + "," + nearestGoalInfo[0].j + " whose distance is " + nearestGoalInfo[1] + " from the start point :" + start.i + "," + start.j);
    pathAlg = new Dstarlite(start,nearestGoalInfo[0]);
    pathAlg.Init();// finish initialization
    go = true;
    timeS = new Date().getTime();   
    pathAlg.ComputePath();
    timeE = new Date().getTime();
    // alert("processing time : " + (timeE-timeS)/1000 + "sec");
}
var obstacleList = [];
function mouseDragged(){
    var i = floor(mouseX/(400/cols));
    var j = floor(mouseY/(400/rows));
    console.log(typeof i);
    if (obstacleList.length ===0){
        obstacleList.push([i,j]);
    }
    else{
        var dubplicate = false;
        for (var k = 0; k < obstacleList.length; k++){
            if (obstacleList[k][0] ===i && obstacleList[k][1]===j){
                console.log("dubplicate!");
                dubplicate = true;
                break;
                //pathAlg.recalCount++;
                //pathAlg.newObsList.push(gamemap.grid[i][j]);
            }
        }
        if(!dubplicate){
            console.log("succeed!");
            obstacleList.push([i,j]);
        }
    }
    
    
    gamemap.grid[i][j].isObs(true);
    // newObslist is in charge of dynamic obstacles
//    if (!pathAlg.newObsList.includes(gamemap.grid[i][j])){
//       // gamemap.grid[i][j].isObs(true);
//        pathAlg.recalCount++;
//        pathAlg.newObsList.push(gamemap.grid[i][j]);
//    }
}

function drawMap() {
    for (var i = 0; i < gamemap.cols; i++) {
        for (var j = 0; j < gamemap.rows; j++) {
            if ((gamemap.grid[i][j] === start)||visitedS.includes(gamemap.grid[i][j])||goals.includes(gamemap.grid[i][j])){
                continue;
            }
            gamemap.grid[i][j].show();
        }
    }
}

function drawBoarder(){
    noFill();
    stroke(color('#8c8c8c'));
    strokeWeight(5);
    beginShape();
    vertex(0,0);
    vertex(400,0);
    vertex(400,400);
    vertex(0,400);
    endShape(CLOSE);
    noStroke();    
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
        //rhs is the real distance!
        text("rhs = " + node.rhs, 430, 230);
        text("g = " + node.g, 430, 250);
        text("distance = " + node.ga, 430, 270);
    }
}

var Button;
function setup() {
    inputSpot();
    canvas = createCanvas(600,600);
    //canvas.parent("container");
    var timeS = 0;
    var timeE = 0;
    noStroke();
    Button = select("#1");
    Button.mousePressed(reset);
    setSG();
    Button = select("#2");
    Button.mousePressed(setSG);
    Button = select("#3");
    Button.mousePressed(drawObs);
    Button = select("#4");
    Button.mousePressed(findRoute);
    frameRate(3);
}
 function draw() {
     background(255);
     drawBoarder();
     start.show();
     goals.forEach(function(element){
        element.show();  
     });
     visitedS.forEach(function(element){
        element.show();  
     });
     drawMap();
     totalPath.forEach(function(subPath){
         drawPath(subPath,pathAlg.c); 
         });
     showInfo();
         if(go){
            if (pathAlg.recalCount > 0){
                pathAlg.reCalPath();
            }
            var path = pathAlg.reconPath();
            if (pathAlg.currentSpot.g === Number.MAX_SAFE_INTEGER){
                alert("no solution!");
                noLoop();
            }
            else{
                console.log(pathAlg.path);
                drawPath(path,pathAlg.c);
                if (pathAlg.reached){
                    // alert("done!");
                    //noLoop();
                    totalPath.push(path);
                    spotConnector();
                }
            }
         }
     }
