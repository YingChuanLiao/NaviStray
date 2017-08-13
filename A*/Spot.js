function Spot(i,j,w,h,map){
    this.i = i;
    this.j = j;
    this.f = 0;
    this.ga = 0;
    this.h = 0;
    this.obstacle = false;
    this.route = false;
    this.neighbors = [];
    this.parent = undefined;
    this.grid = map.grid;
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
        if (random(1) < 0.3){
            console.log('obstacle');
            this.obstacle = true;
            this.color = color(0);
        }
    }

    this.show = function(geo,c){
        if (geo ==="grid"){
            fill(c);    
            rect(this.i*w, this.j*h, w,h);
            //ellipse(this.i*w + w/2, this.j*h + h/2, w/2,h/2);
            noStroke();        
        }
        //draw
        else{
            fill(this.color);
            //rect(this.i*w, this.j*h, w,h);
            ellipse(this.i*w + w/2, this.j*h + h/2, w/2,h/2);
            noStroke();
        }
    }
    this.addNeighbors = function(){
        var i = this.i;
        var j = this.j;
        if (i-1 >=0)
            this.neighbors.push(this.grid[i-1][j]);
        if (i+1 <= cols-1)
            this.neighbors.push(this.grid[i+1][j]);
        if (j-1 >=0)
            this.neighbors.push(this.grid[i][j-1]);
        if (j+1 <= rows-1)
            this.neighbors.push(this.grid[i][j+1]);
        if ((i-1>=0) &&(j-1 >=0))
            this.neighbors.push(this.grid[i-1][j-1]);
        if ((i-1>=0) &&(j+1 <=rows-1))
            this.neighbors.push(this.grid[i-1][j+1]);
        if ((i+1<=cols-1)&&(j-1 >=0))
            this.neighbors.push(this.grid[i+1][j-1]);
        if ((i+1<=cols-1)&&(j+1 <= rows-1))
            this.neighbors.push(this.grid[i+1][j+1]);
        return this.neighbors;
    }
}