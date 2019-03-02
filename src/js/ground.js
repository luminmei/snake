var ground = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN*SQUAREWIDTH, YLEN*SQUAREWIDTH)

ground.init = function () {
  this.viewContent.style.position = 'absolute'
  this.viewContent.style.left = this.x + 'px'
  this.viewContent.style.top = this.y + 'px'
  this.viewContent.style.width = this.width + 'px'
  this.viewContent.style.height = this.height + 'px'
  this.viewContent.style.background = '#eee'
  document.body.appendChild(this.viewContent)

  // 二维
  this.SquareTable = [
    // [{}, {}, {}],
    // [],
    // []
  ]

  // 控制生成行数
  for (var i = 0; i < YLEN; i++) {
    // (i, j) => (y, x)
    this.SquareTable[i] = new Array(XLEN)
    for (var j = 0; j < XLEN; j++) {
      var newSquare = null 
      if (j == 0 || j == XLEN - 1 || i == 0 || i == YLEN - 1) {
        // 0和最后是围墙
        // 生成围墙 障碍物
        newSquare = SquareFactory.create('Stone', j, i, 'black')
      } else {
        // 地板
        newSquare = SquareFactory.create('Floor', j, i, 'orange')
      }
      this.SquareTable[i][j] = newSquare
      this.viewContent.appendChild(newSquare.viewContent)
    }
  }
}
// 场景
ground.init()

// 拆方块
ground.remove = function (x, y) {
  // 视觉上拆 移除dom
  this.viewContent.removeChild(this.SquareTable[y][x].viewContent)// (i, j) => (y, x)
  // 数据上拆
  this.SquareTable[y][x] = null 
}

// 安装方块
ground.append = function (square) {
  // 从视觉上安上
  this.viewContent.appendChild(square.viewContent)
  // 从数据层面上安
  this.SquareTable[square.y][square.x] = square
}




