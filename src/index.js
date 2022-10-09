import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './component/App';

import { legacy_createStore as createStore } from 'redux';
import { Provider} from 'react-redux'
// reducer -> store안에 있는 state값을 어떻게 바꿀건지 정하는 함수
// 인자 -> currentstate, action(어떻게 바꿀건지)
// return -> 새로운 state의 값
function reducer(currentstate, action){
  if(currentstate === undefined){
    return {
      login : false
    }
  }
  const newState ={...currentstate}
  if(action.type === 'Login'){
    newState.login = true;
    return newState;
  }else if(action.type === 'LogOut'){
    newState.login = false;
    return newState;
  }
}
const store = createStore(reducer);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store ={store}>
      
      <App />
      
    </Provider>
  
);