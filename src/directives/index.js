import store from '@/store'
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

// 自定义按钮权限指令
export const isHas = {
  // bind : 指令和dom绑定
  // inserted: 指令所绑定的dom插入到父节点中
  // updated: 指令所绑定的 Vnode>>就是虚拟dom
  inserted(el, binding) {
    console.log(binding)
    // 是否在权限组中
    const has = store.state.permission.points.includes(binding.value)
    //  不在的话就删除dom
    if (!has) {
      el.remove()
    }
  }
}
