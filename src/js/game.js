var game = new Game()
// 分数
game.score = 0
// 时间间隔
game.speed = INTERVAL
// 定时器
game.timer = null

game.init = function () {
  ground.init()
  snake.init()
  // 创建食物
  createFood(ground) 
  // next hit delay  下次点击延迟  需要加上节流
  document.onkeydown = function (e) {
    // e.which 37左  38top 39 右 40 下
    if (e.which == 37 && snake.direction != DIRECTIONENUM.Right) {
      snake.direction = DIRECTIONENUM.Left
    } else if  (e.which == 38 && snake.direction != DIRECTIONENUM.Down) {
      snake.direction = DIRECTIONENUM.Up
    } else if  (e.which == 39 && snake.direction != DIRECTIONENUM.Left) {
      snake.direction = DIRECTIONENUM.Right
    } else if (e.which == 40 && snake.direction != DIRECTIONENUM.Up) {
      snake.direction = DIRECTIONENUM.Down
    }
  }
}
// 游戏开始
game.start = function () {
  clearInterval(this.timer)
  this.timer = setInterval(function () {
    snake.move(ground)
  }, game.speed)
}
game.over = function () {
  clearInterval(this.timer)
  alert(game.score)
}
game.restart = function () {
  this.init()
  this.start()
}
game.stop = function () {
  clearInterval(this.timer)
}

game.init()

function createFood() {
  // 食物不能生成在蛇身上
  var x = null
  var y = null
  var flag = true
  while (flag) {
    x = 1 + Math.floor(Math.random() * (XLEN - 2))   // [1, 28)
    y = 1 + Math.floor(Math.random() * (YLEN - 2))   // [1, 28)
    console.log(x,y)
    var ok = true
    for (var i = snake.head; i = i.next;) {
      if (x == i.x && y == i.y) {
        ok = false
        break
      }
    }
    if (ok) {
      // 证明这个食物的坐标是可以使用的 
      // 跳出循环
      flag = false
    }
  }
  // 把食物放进广场
  var food = SquareFactory.create('Food', x, y, 'green')
  ground.remove(food.x, food.y)
  ground.append(food)
}


