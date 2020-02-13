/* tool */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import reducers from '../../reducers';
import Routes from './routes';

/*
url : http://www.blog.com/{parm}post/5
parm : null -> browserHistory, # -> hashHistory
*/

const createStoreWithMiddleware = applyMiddleware(
  ReduxThunk
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    {/* <BrowserRouter basename="/Mobile/ReactOpenAcc"> */}
    <HashRouter>
      <Routes />
    </HashRouter>
  </Provider>
  , document.querySelector('.containers'));
