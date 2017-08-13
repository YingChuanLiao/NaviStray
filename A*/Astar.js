function Astar(start,end){
    //new p5();// import random
    // remove the node if visited
    function removeFromArray(arr,element){
        for (var i = arr.length-1; i >= 0; i--){
            if (arr[i] === element){
                arr.splice(i,1);
            }
        }
    }
    // calculate the h value
    function heuristic (a,b){
        //min(dx, dy) * 14 + abs(dx - dy) * 10
        var dx = Math.abs(a.i-b.i);
        var dy = Math.abs(a.j-b.j);
        var d = Math.min(dx,dy)*1.4 + Math.abs(dx-dy);
        //var d = dist(a.i,a.j, b.i,b.j);
        return d;
    }
//    function movementcost(node1,node2){
//        var cost = (Math.abs(node1.i-node2.i)+Math.abs(node1.j-node2.j)===2)? 1.4:1;
//        return cost;
//    }
    //this.map = map;
    this.start = start;
    this.end = end;
    this.openSet = [];
    this.closedSet = [];
    this.openSet.push(start);
    this.lastCheckedNode = start;
    this.neighbors = [];
    this.step = function() {
        if (this.openSet.length >0){
            // find the lowest F in the openSet
            var lowestFindex = 0;
            for(var i = 0; i < this.openSet.length; i++){
                //open list key
                if(this.openSet[i].f < this.openSet[lowestFindex].f){
                    lowestFindex = i; 
                }
//                else if(this.openSet[i].f === this.openSet[lowestFindex].f){
//                    lowestFindex = (this.openSet[i].h < this.openSet[lowestFindex].h)? i:lowestFindex; 
//                }
            }
            var current = this.openSet[lowestFindex];
            this.lastCheckedNode = current;
            // if reaching the goal
            if (current === end){
                console.log("done");
                console.log(current.ga);
                return current.ga;// return the length

            }
            // put current node to the closeSet and remove from the openSet
            removeFromArray(this.openSet,current);
            this.closedSet.push(current);

            this.neighbors = current.addNeighbors();
            for (var i = 0; i < this.neighbors.length; i++){
                //check if neighbors are already in closeSet
                if (!this.closedSet.includes(this.neighbors[i])&& !this.neighbors[i].obstacle){ // not in 
                    
                    // need to figure out
                    var tempG = current.ga + heuristic(current,this.neighbors[i]);
                    //var tempG = current.ga + 1; 
//                    not the shortest path. why? cuz now moving diagonal has the same cost as the moving hor/ver, so the robot tend to move diagonal.
                    var newPath = false;
                    // check if neighbors are already in openSet
                    if (this.openSet.includes(this.neighbors[i])){ // in 
                        // that means the neighbor is already evaluated!
                        // spatial check
                        if (tempG < this.neighbors[i].ga){
                            this.neighbors[i].ga = tempG;
                            newPath = true;
                        }
                    }
                    // not in openSet
                    else{
                        this.openSet.push(this.neighbors[i]);
                        this.neighbors[i].ga = tempG;
                        newPath = true;
                    }
                    if (newPath){
                        this.neighbors[i].h = heuristic(this.neighbors[i],end);
                        this.neighbors[i].f = this.neighbors[i].h + this.neighbors[i].ga;
                        this.neighbors[i].parent = current;
                    }

                }
            }        
        }
        else{
            console.log('no solution');
            //noSol = true;
            //noLoop();// only draw once
            return -1;
        }
        console.log(current.ga);
        return 0;
    }
}