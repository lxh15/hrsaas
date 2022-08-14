// 自定义 图片加载失败指令
export const imgError = {
  // 图片插入失败的回调
  inserted: function (el, { value }) {
    // dom元素的src = 传递的属性  解构value 就是图片的地址
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  // 指令绑定的dom元素更新的时候执行
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    }
  }
}
