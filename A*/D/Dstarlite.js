function Dstarlite(start,goal){
    Array.prototype.insert = function ( index, item ) {
    this.splice(index,0,item);
    };
    
    //this function remove element from array
    this.removeFromArray = function(arr,element){
        for (var i = arr.length-1; i >= 0; i--){
            if (arr[i] === element){
                arr.splice(i,1);
            }
        }
    }
    //this function calcuate the movement cost betwween two spots
    function heuristic(spot1,spot2){
        if (spot1.obstacle||spot2.obstacle){
            return Number.MAX_SAFE_INTEGER;
        }
        var d = dist(spot1.i,spot1.j,spot2.i,spot2.j);
        return d;
    }
    //var k = 0; //why I can't use this.k ?
    this.start = start;
    this.goal = goal;
    this.openSet =[];
    this.closedSet = [];
    for (var i = 0; i < this.closedSet.length;i++){
        console.log(this.closedSet.length);
    }
    this.neighbors = [];
    
    
    //this function return the index we should insert in order to keep the order 
    this.InsertIndex = function(spot){
        if (this.openSet.length === 0){
            console.log("empty openset!");
            return 0;
        }
        for (var index = 0; index < this.openSet.length;index++){
            if(spot.key[0]<this.openSet[index].key[0])
                break;
            if (spot.key[0] === this.openSet[index] && spot.key[1]<spot.key[1])
                break;
        }
        return index;
    }
    //this function gives the key pair for every single node
    function CalculateKey(spot){
        spot.key[0] = Math.min(spot.g,spot.rhs);//+heuristic(spot,goal);
        spot.key[1] = Math.min(spot.g,spot.rhs);// tie breaking
    }
    // if you want to use the global variable, you should be in the same scope!Otherwise you just pass the variable from the argument
    this.predecessors;
    this.updatedS = start; 
    //this function update the spot's information. 
    // first,calculate the key of the start. we pop the openlist until the start has the smallest key value on the list.
    // the popped element will update their neighbors, which are called prdecessors. the predecessors would find its successor with the smallest g+c(movement cost) by the function called UpdatedVertex
    this.ComputePath = function(){
        console.log("----this message is in the compute path---");
        console.log("current start node : " + this.updatedS.i+ " , "+ this.updatedS.j);
        console.log("goal node : " + goal.i+ " , "+ goal.j);
        CalculateKey(this.updatedS);
        while(this.openSet.length !=0 &&(this.openSet[0].key[0]<this.updatedS.key[0]||this.updatedS.rhs != this.updatedS.g)){
            var element = this.openSet.shift();// pop the value
            
            console.log("POPPED element : " + element.i+ " , " + element.j);
            if (element.g > element.rhs){
                element.g = element.rhs;
                // for all S's predecessor, updateVertex();
                this.predecessors = element.addNeighbors(); 
                for (var i = 0; i < this.predecessors.length; i++){
                    this.UpdateVertex(this.predecessors[i]);
                }
                console.log("updated vertex(not including itself) ended");
            }
            else{
                element.g = Number.MAX_SAFE_INTEGER;
                this.predecessors = element.addNeighbors();
                this.predecessors.push(element);
                for (var i = 0; i < this.predecessors.length; i++){
                    this.UpdateVertex(this.predecessors[i]);
                }
                console.log("updated vertexed(including itself) ended");
            }
        }
    }
    this.successors; 
    // this function helps predecessor find the successor which has the smallest g + movementCost
    // two thing must keep in mind: 1. never that consistent node (obstacle and visited node) into the openlist 2. self-expanded node must remove itself from the openlist first
    this.UpdateVertex = function(predecessor){
        var changed = false;
        var index = 0;
        console.log("---- this message is in the updateVertex ----")
        if (predecessor != goal){
            this.successors = predecessor.addNeighbors();
            var mincost = Number.MAX_SAFE_INTEGER;
            for (var i = 0; i < this.successors.length;i++){
                
                var cost = this.successors[i].g + heuristic(predecessor,this.successors[i]);
                if (mincost > cost){
                    changed = true;
                    index = i;
                }
                mincost = Math.min(cost,mincost);
            }
            if (predecessor.rhs != mincost){
                console.log(predecessor.i+" , " + predecessor.j + " is pointed to : " + this.successors[index].i + " , " + this.successors[index].j);
            }
            predecessor.rhs = mincost;// = the successor's g+cost value 
            if (changed){
                console.log(predecessor.i+" , " + predecessor.j + " : " + predecessor.g +" , " + predecessor.rhs);
            }
        }
        if (this.openSet.includes(predecessor)){
            //remove predecessor from the openlist
            this.removeFromArray(this.openSet,predecessor);
        }
        CalculateKey(predecessor);
         if (predecessor.g != predecessor.rhs){
             // insert predecessor to the openlist
             this.openSet.insert(this.InsertIndex(predecessor),predecessor);
         }
        // it's you, big bug!
         else{
             this.removeFromArray(this.openSet,predecessor);
         }
    }
    // initialization
    // assign goals' rhs value to 0 and put it in the openslist
    this.Init = function(){
        goal.rhs = 0;
        CalculateKey(goal);
        console.log(goal.key[0]);
        this.openSet.insert(this.InsertIndex(goal),goal);
    }
    // this function find a next spot from the current spot
    function futureSpot(spot){
        if (spot === goal) return spot;
        var successors;
        var nextSpot;
        successors = spot.addNeighbors();
        nextSpot = successors[0];

        for (var i =1; i < successors.length; i++){
            if (successors[i].g < nextSpot.g){
                nextSpot = successors[i];
            }
        }
        return nextSpot;
    }
    
    this.currentSpot = start;
    this.nextSpot;
    this.path = [];
    this.path.push(start);
    this.reached = false;    
    //find the smallest g in each iteration
    // key is undefined: obstacle (g and rhs is always infinity, unless user adds obstacle while program runs)
    //spot is the current spot 
    this.reconPath = function(){
//        while (spot != goal){
        if (this.currentSpot === goal){
            this.reached = true;
        }
        else{
            var next = futureSpot(this.currentSpot);
            this.path.push(next);
            this.currentSpot = next;
            this.nextSpot = futureSpot(next);
            //console.log("nextSpot : " + next.i+ " , " + next.j);
            //console.log("nextnextSpot : " + this.nextSpot.i+ " , " + this.nextSpot.j);
            
        }
        return this.path;
    }
    
    this.newObsList = [];
    this.updatedSpot = function(curPos){
        console.log(curPos);
        if (this.newObsList.length ===0){
            return undefined;
        }
        else{
            for (var k = 0; k < this.newObsList.length;k++){
                // should be equal?
                if (this.newObsList[k] === this.nextSpot){
                    var spot = this.newObsList[k];
                    return spot;
                }
            }
        }
    }
    this.c = color(155,0,55);
    this.recalCount = 0;   
    this.reCalPath = function(){
        console.log("-----------------recal path------------------");
        var spot = this.updatedSpot(this.currentSpot);
        if (spot != undefined){
            var timeS = new Date().getTime();  
            this.c = color(0,255,0);
            this.UpdateVertex(spot);
            console.log("new obstacle is : "+ spot.i + " , " + spot.j);
            this.updatedS = this.currentSpot;
            console.log ("the updated start is : " + this.updatedS.i +" , "+ this.updatedS.j);
            this.ComputePath();
            this.recalCount--;
            timeE = new Date().getTime(); 
            alert("processing time : " + (timeE-timeS)/1000 + "sec");
        }
    }  
}