var tool = {
  // 圣杯模式只能继承原型
  inherit: function (target, origin) {
    var temp = function () {}
    temp.prototype = origin.prototype
    target.prototype = new temp()
    target.prototype.constructor = target
  },
  extends: function (origin) {
    var result = function () {
      // 借用构造函数的方式去继承私有属性
      origin.apply(this, arguments)
    }
    // 继承原型
    this.inherit(result, origin)
    return result
  },
  // 单例模式
  single: function (origin) {
    var singleResult = (function () {
      var instance = null
      return function () {
        if (instance != null) {
          return instance
        }
        instance = this
        // 借用构造函数
        origin && origin.apply(this, arguments)
        return instance
      }
    }())
    // 继承origin的原型
    origin && this.inherit(singleResult, origin)
    return singleResult
  }
}
// function Square (x,y, height, width) {
//   this.x = x
//   this.y = y
//   this.height = height
//   this.width = width
// }
// // 继承面向接口和抽象，子类去回去重写
// Square.prototype.touch = function () {
//   console.log(0)
// }

// var Food = tool.extends(Square)
// var a = new Food(10, 20, 30, 30)

// // 单例
// var SnakeHead = tool.single(Square)
// var oSh1 = new SnakeHead(10,20,40,40)
// var oSh1 = new SnakeHead(10,20,40,40)

// tool.inherit(Food, Square)


