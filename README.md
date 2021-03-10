# myReactRedux
# 在 react-redux5.x 版本 用了 hooks 对 react-redux 进行了重构

# 基础使用
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
ReactDOM.render(
    <Provider value={store}>
        <App />
    </Provider>,
    document.getElementbyId('root')
)
# store.js
import { crreateStore, applyMiddleware } from 'redux';
import thunk from 'thunk';
let defaultState = {
    name: 'redux'
}
function reducer(state, action){
    switch(action.type){
        case 'CHANGE_NAME':
            state.name = action.data;
            return state
        default:
            return state    
    }
}
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)
# App.js
import React from 'react';
import { connet } from 'react-redux';
function App(props){
    function clickHandle(){
        props.changeHandle('react-redux')
    }
    return (
        <div>
            <p>{props.name}</p>
            <button onClick={() => clickHandle()}>点击</button>
        </div>
    )
}
const mapStateToPorps = (state) => {
    return {
        name: state.name
    }
}
const mapDispatchToPorps = (dispatch) => {
    return {
        changeHandle(response){
            dispatch({type: 'CHANGE_NAME', data: response})
        }
    }
}
export default connect(mapStateToPorps, mapDispatchToProps)(APP)


## react-redux 的主要作用
- 我们知道在 react 中，去构建一个仓库来保存一些公共数据，我们会用到 redux
- redux 与 react 毫无任何关系，redux 可以单独使用，不依赖于 react
- 那么为什么我们可以在react中去修改 redux 中的状态触发 react 的组件更新呢?
- react-redux 就是他们俩之间沟通的桥梁，他可以将 redux 中的 store 通过 react 的上下文机制向下传递给需要使用的组件
- 然后 react-redux 源码中是去调用了 ReactDOM 的 unstable_batchedUpdates 批量更新组件的方法
- 到此就实现了我们的修改 state 更新关联组件的功能

## react-redux5.x 源码中会监听 store 状态，利用了 useMemo 依赖 store，然后每次 store 变化就调用一个回调函数
## 这个回调函数会创建一个监听器 这个监听器就是一个发布订阅模式 用于收集依赖，更新依赖等
## 我们这边手写了一个简版的 Provider 组件，核心的实现跟源码一致 细节优化暂时没加 适合初入坑者学习查看