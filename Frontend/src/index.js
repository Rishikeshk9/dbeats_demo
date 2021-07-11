import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//For Redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import roomId from './redux/reducer';

let store=createStore(roomId,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

