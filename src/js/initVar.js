// 用大写以表示以后是常量
// 游戏场景的位置  广场的位置

// 广场左上角
var BASE_X_POINT = 200
var BASE_Y_POINT = 100

// 方块 宽度
var SQUAREWIDTH = 20

// 宽度系数 高度系数
var XLEN = 25
var YLEN = 25


// 蛇移动的时间间隔
var INTERVAL = 150

// 定义基类  父类

// 基类
function Square (x, y, width, height, dom) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.viewContent = dom || document.createElement('div')
}

// 父类
Square.prototype.touch = function () {
}
// 用来更新单例的坐标
Square.prototype.update = function (x, y) {
  this.x = x
  this.y = y
  this.viewContent.style.left = this.x * SQUAREWIDTH + 'px'
  this.viewContent.style.top = this.y * SQUAREWIDTH + 'px'
}

// 定义子类
var SnakeHead = tool.single(Square) // 蛇头
var SnakeBody = tool.extends(Square) // 蛇身体
var Snake = tool.single(Square)  // 整个蛇
var Floor = tool.extends(Square) // 地板
var Stone = tool.extends(Square) // 围墙
var Food = tool.single(Square) // 食物
var Ground = tool.single(Square) // 广场

// 其他子类
var Game = tool.single() // 游戏

// 定义方块触碰后产生的反应
var TOUCHNUM = {
  MOVE: 'move', // 移动
  EAT: 'eat', // 吃了长高高
  DIE: 'die' // 死
}