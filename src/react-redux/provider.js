import React from 'react';
import ReactContext from './context';
export default function Provider(props){
    // provider 通过 React.context 上下文向下传入 store
    return <ReactContext.Provider value = {{
        store: props.store
    }}>{props.children}</ReactContext.Provider>
}