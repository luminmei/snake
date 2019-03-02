// 方块工厂(工厂方法模式)  帮我管理那么多对象的生成
function SquareFactory () {

}
SquareFactory.create = function (type, x, y, color) {
  if (typeof SquareFactory.prototype[type] == undefined) {
    throw  'no this type'
  }
  if (SquareFactory.prototype[type].prototype.__proto__  != SquareFactory.prototype) {
    // 证明子类没有继承自它
    // 为了扩展的时候用
    SquareFactory.prototype[type].prototype = new SquareFactory()
  }
  var newSquare = new SquareFactory.prototype[type](x, y, color)
  return  newSquare
}
// 创建的时候先判断一下是否有这个工厂子类

// 先包装一下、才能出厂   把之前的参数落实到方块中
SquareFactory.prototype.init = function (square, color, strategyMessage) {
  square.viewContent.style.position = 'absolute'
  square.viewContent.style.width = square.width + 'px'
  square.viewContent.style.height = square.height + 'px'
  square.viewContent.style.left = square.x * SQUAREWIDTH + 'px' // X ,Y 只是坐标，乘了宽度才是距离
  square.viewContent.style.top = square.y * SQUAREWIDTH + 'px'
  square.viewContent.style.backgroundColor = color
  // square.viewContent.style.border = '1px solid #000'
  // square.viewContent.style.boxSixing = 'border-box'
  square.touch = function () { // 重写
    return strategyMessage
  }
}


// 定义子类工厂
SquareFactory.prototype.Floor = function (x, y, color) { // 只要关注位置就可以了，方块的宽度由坐标决定
  var obj = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(obj, color, TOUCHNUM.MOVE)
  return obj
}
SquareFactory.prototype.Stone = function (x, y, color) { // 只要关注位置就可以了，方块的宽度由坐标决定
  var obj = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(obj, color, TOUCHNUM.DIE)
  return obj
}
SquareFactory.prototype.Food = function (x, y, color) {
  var obj = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(obj, color, TOUCHNUM.EAT)
  obj.update(x, y) // 单例需要手动更新坐标
  return obj
}
SquareFactory.prototype.SnakeHead = function (x, y, color) { 
  var obj = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(obj, color, TOUCHNUM.DIE)
  obj.viewContent.style.borderRadius = '50%'
  obj.update(x, y) // 单例需要手动更新坐标
  return obj
}
SquareFactory.prototype.SnakeBody = function (x, y, color) {
  var obj = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(obj, color, TOUCHNUM.DIE)
  obj.viewContent.style.borderRadius = '50%'
  return obj
}