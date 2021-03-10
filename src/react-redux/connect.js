import React, { useContext, useReducer, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import ReactContext from './context';
import {
    isFunction,
    isObject
} from './utils';
export default function connect(mapStateToProps, mapDispatchToProps){
    return function (WrapComponent){
        return (props) => {
            // 通过 react.context 上下文获取 value
            const { store } = useContext(ReactContext);
            // 这里我们要用到 store 的 getState dispatch subscribe API
            const { getState, dispatch, subscribe } = store;
            // 获取老的 state 状态
            const prevState = getState();
            // 开始处理 mapStateToProps 将我们当前组件的 prevState 传入 获取到 mapStateToProps 返回的内容
            const stateProps = mapStateToProps(prevState);
            // 然后开始判断用户传入的 mapDispatchToProps 类型
            let dispatchProps;  // 这个是最终返回给组件的 dipatach 函数的对象
            if( isFunction(mapDispatchToProps) ){
                dispatchProps = mapDispatchToProps(dispatch)
            }else if( isObject(mapDispatchToProps) ){
                // 如果是对象 我们就调用 redux 的 bindActionCreators
                // bindActionCreators 这个API 是用来将单个或者多个 actionCreators 转化为 dispatch(action)
                dispatchProps = bindActionCreators(mapDispatchToProps, dispatchProps);
            }else{
                // 如果不符合条件 就直接将 store.dispatch 传过去就好了
                dispatchProps = {dispatch}
            }''
            // console.log(dispatchProps, 'dispatchProps')
            // 上面就完成了组件的渲染功能 以及传参到组件上 让组件能获取到 dispatch state 等参数
            /**************************/
            // 下面我们会分析一个问题 比如说现在 我们使用了 mapDispatchToProps 中返回的某一个事件 促使 store.state 状态发生了变化
            // 那么 state 状态更新 如何让当前的组件进行重新渲染呢
            // 在 reactHooks 中 有一个 useReducer 方法 这个方法是可以返回当前 state 以及 更新state触发重新渲染的方法
            const [, forceUpdate] = useReducer((state, action) => {
                return state + action
            }, [prevState])
            // 这个 forceUpdate 就是更新 state 之后重新渲染组件的方法
            // 那么还有一个问题 我们在组件上怎么知道 state 更新了呢 
            // 在 store 中有个监听 state 状态修改的回调函数 subscribe 函数
            // 在 subscribe() 中去调用这个 forceUpdate 更新方法 那就完成了我们刚刚说的 组件监听到state状态改变更新视图的功能
            // 我们需要在初始化的时候 就去调起 store.subscribe 的监听
            useEffect(()=>{
                subscribe(()=>{
                    forceUpdate()
                })
            }, [subscribe])
            // 接下来我们就将上面的参数 传入到当前组件 connect 实际上就是对 stateProps dispatchProps 进行了条件处理 拿到返回值
            return <WrapComponent {...props} {...stateProps} {...dispatchProps}></WrapComponent>
        }
    }
}