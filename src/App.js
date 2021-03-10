import React from 'react';
import connect from './react-redux/connect';

function App(props){
    function changeName(name){
        props.changeHandle(name);
    }
    return (
        <div>
            {props.name}
            <button onClick={() => changeName('修改Name')}>点击</button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        name: state.name
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeHandle(response){
            dispatch({type: 'CHANGE_NAME', data: response})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)