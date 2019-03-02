var snake = new Snake()
// 蛇头
snake.head = null
// 蛇尾
snake.tail = null

// 规定蛇移动的方向
var DIRECTIONENUM = {
  Left: { // 向左横坐标减1，纵坐标不变
    x: -1,
    y: 0
  },
  Right: {
    x: 1,
    y: 0
  },
  Up: { 
    x: 0,
    y: -1
  },
  Down: { 
    x: 0,
    y: 1
  }
}

//  初始化
snake.init = function () {
  // 创建蛇身和蛇头
  var oSnakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red');
  var oSnakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'deeppink');
  var oSnakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'deeppink');
  snake.head = oSnakeHead
  snake.tail = oSnakeBody2

  // 链表
  // 1{next:2,last:null} 2{next:3,last:1} 3{next:null,last:2}

  // 用双向链表
  oSnakeHead.next = oSnakeBody1
  oSnakeHead.last = null

  oSnakeBody1.next = oSnakeBody2
  oSnakeBody1.last = oSnakeHead

  oSnakeBody2.next = null
  oSnakeBody2.last = oSnakeBody1

  // 放入蛇头
  ground.remove(oSnakeHead.x, oSnakeHead.y)
  ground.append(oSnakeHead)

  ground.remove(oSnakeBody1.x, oSnakeBody1.y)
  ground.append(oSnakeBody1)

  ground.remove(oSnakeBody2.x, oSnakeBody2.y)
  ground.append(oSnakeBody2)

  // 规定蛇移动的方向
  this.direction = DIRECTIONENUM.Right

}

// 引入策略模式  处理touch后的消息
snake.strategies = {
  move: function (snake, square, ground, fromEat) { // 传参过来减少性能消耗   全局找能找到 耗费性能
    // 真正完成走的功能

    // 新的身体是占据头部的位置的
    var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'deeppink')

    // 融入蛇中
    newBody.next  = snake.head.next
    newBody.next.last  = newBody
    newBody.last = null

    // 放入地板中
    ground.remove(snake.head.x, snake.head.y)
    ground.append(newBody)

    // 新建蛇头  因为是单例  就算新传 还是之前的坐标  （解决：在子类工厂的时候调用父类的方法update修改）
    var newHead = new SquareFactory.create('SnakeHead', square.x, square.y, 'red')

    // 蛇头融入整个蛇身
    newHead.next = newBody
    newHead.last = null
    newBody.last = newHead

    // 新的蛇头放到地板中
    ground.remove(square.x, square.y)
    ground.append(newHead)

    if (!fromEat) {
      // 不拆掉蛇尾巴
      // 拆掉尾巴  安装地板
      var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange')
      ground.remove(snake.tail.x, snake.tail.y)
      ground.append(newFloor)
      // 更新蛇尾巴  原来的尾巴被当成垃圾回收了
      snake.tail = snake.tail.last
    }
    // 更新蛇头
    snake.head = newHead
  },
  eat: function (snake, square, ground) {
    game.score++ // 分数加
    document.getElementById('score').innerHTML = game.score
    this.move(snake, square, ground, true)
    createFood(ground) // 重新去创建食物
  },
  die: function () {
    game.over()
  }
}


// 让蛇根据移动方向来预判   下一个要碰到的方块
snake.move = function (ground) {
  // this.head.x + this.direction.x  下一个要碰到的x坐标
  // this.head.y + this.direction.y  下一个要碰到的y坐标
  // 拿到下个碰到的方块
  var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x]
  if (typeof square.touch == 'function') {
    // move die eat
    this.strategies[square.touch()](this, square, ground)
  }
}






