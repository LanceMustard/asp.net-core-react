import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Promise from 'redux-promise';
import reducers from './reducers';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

const createStoreWithMiddleware = applyMiddleware(Promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <LocaleProvider locale={enUS}><App /></LocaleProvider>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
