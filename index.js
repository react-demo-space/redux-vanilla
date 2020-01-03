/**
 * 计算新的 state
 * @param {Array} state 
 * @param {Object} action 
 */
function reducer(state, action) {
  switch (action.type) {
    case 'DELETE': 
      let newState = [...state]
      newState.splice(action.payload, 1)
      return newState
    case 'ADD':
      return [...state, action.payload]
    default:
      return state 
  }
}

/**
 * 当 state 变化时，重新执行该函数
 * 这里是个渲染页面的函数
 */
function render() {
  const state = store.getState()
  const items = state.map((item, index) => `<li>${item} <button idx=${index}>delete</button></li>`)
  document.querySelector('.todos').innerHTML = `<ul>${items.join('')}</ul>`
}

// 设置新增 todo 的事件监听
document.querySelector('.add-todo').addEventListener('click', () => {
  store.dispatch({
    type: 'ADD',
    payload: document.querySelector('.new-todo-val').value
  })
  
  document.querySelector('.new-todo-val').value = ''
}, false)

// 设置 remove todo 的事件监听
document.querySelector('.todos').addEventListener('click', e => {
  const el = e.target
  store.dispatch({
    type: 'DELETE',
    payload: el.getAttribute('idx')
  })
}, false)

// 创建 store（可以传入初始状态）
const store = Redux.createStore(reducer, ['买牛奶'])

// 注册 state 更新后应该触发的回调
store.subscribe(render)

// 根据 default state 初始化页面
render()
