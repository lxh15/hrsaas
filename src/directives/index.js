// 自定义 图片加载失败指令
export const imgError = {
  // 图片插入失败的回调
  inserted: function (el, { value }) {
    // dom元素的src = 传递的属性  解构value 就是图片的地址
    el.onerror = function () {
      el.src = value
    }
  }
}
