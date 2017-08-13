function Map(cols, rows,w_grid, h_grid) {
    // How many columns and rows?
    // only plus "this" to store the variable
    this.cols = cols;
    this.rows = rows;
    this.r = 1;

    // This will the 2D array
    this.grid = [];
    //this.path = [];
    // drawing from the upper left point (x,y)
    //this.x = x;
    //this.y = y;
    this.w_grid = w_grid;
    this.h_grid = h_grid;

    // Making a 2D array
    for (var i = 0; i < cols; i++) {
        this.grid[i] = [];
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            this.grid[i][j] = new Spot(i, j,w_grid, h_grid,this);
        }
    }
}
