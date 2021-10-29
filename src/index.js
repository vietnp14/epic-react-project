import {loadDevTools} from './dev-tools/load';
import './bootstrap';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {Profiler} from 'components/profiler';
import {App} from './app';
import AppStoreProvider from 'store';

loadDevTools(() => {
  ReactDOM.render(
    <Profiler id="App Root" phases={['mount']}>
      <AppStoreProvider>
          <App />
      </AppStoreProvider>
    </Profiler>,
    document.getElementById('root'),
  )
})
