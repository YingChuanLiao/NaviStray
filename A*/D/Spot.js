function Spot(i,j,w,h,map){
    // to integrate, I add some A*feature in it.
    this.f =0;
    this.ga = 0;
    this.h = 0;
    this.parent = undefined;
    //
    
    this.i = i;
    this.j = j;
    // id for each grid
    //this.id = j*cols+i;
    // initialization
//    this.g = new Array(2);
//    for (var i = 0; i < this.g.length; i++){
//        this.g[i] = Number.MAX_SAFE_INTEGER;
//    }
//    //this.rhs = [0,0];
//    this.rhs = new Array(2);
//    for (var i = 0; i < this.rhs.length; i++){
//        this.rhs[i] = Number.MAX_SAFE_INTEGER;
//    }
    this.g =  Number.MAX_SAFE_INTEGER;
    this.rhs = Number.MAX_SAFE_INTEGER;
    this.key = new Array(2);
    this.obstacle = false;
    this.neighbors = [];
//    this.parent_ = undefined;
//    this.successor_id = undefined;
//    this.predecessor_id = undefined;
    this.successorList= [];
    this.predecessor_List= [];  
    this.grid = map.grid;// should be fixed
    this.color = color(255);    
    this.isObs = function(isobs){
        if(isobs){
            this.obstacle = true;
            this.color = color(0);
        }
        else{
            this.obstacle = false;
            this.color = color(255);
        }
        
    }
    this.generateObs = function(){
        if (random(1) < 0.1){
            console.log('obstacle');
            this.obstacle = true;
            this.color = color(0);
        }
    }

    this.show = function(){
        //draw
        fill(this.color);    
        ellipse(this.i*w + w/2, this.j*h + h/2, w/2,h/2);
        noStroke();
    }
    this.addNeighbors = function(){
        this.neighbors = [];
        var i = this.i;
        var j = this.j;
        //left
        if (i-1 >=0)
            this.neighbors.push(this.grid[i-1][j]);
        //right
        if (i+1 <= cols-1)
            this.neighbors.push(this.grid[i+1][j]);
        //up
        if (j-1 >=0)
            this.neighbors.push(this.grid[i][j-1]);
        //down
        if (j+1 <= rows-1)
            this.neighbors.push(this.grid[i][j+1]);
        //upper left
        if ((i-1>=0) &&(j-1 >=0))
            this.neighbors.push(this.grid[i-1][j-1]);        
        //upper right
        if ((i-1>=0) &&(j+1 <=rows-1))
            this.neighbors.push(this.grid[i-1][j+1]);
        //bottom left
        if ((i+1<=cols-1)&&(j-1 >=0))
            this.neighbors.push(this.grid[i+1][j-1]);
        //bottom right
        if ((i+1<=cols-1)&&(j+1 <= rows-1))
            this.neighbors.push(this.grid[i+1][j+1]);
        
        return this.neighbors;
    }
}