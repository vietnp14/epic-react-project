import {loadDevTools} from './dev-tools/load';
import './bootstrap';
import * as React from 'react';
import ReactDOM from 'react-dom';
import Profiler from 'components/Profiler';
import App from './App';
import { NotificationContainer } from 'react-notifications';
import AppProviders from 'store';

loadDevTools(() => {
  ReactDOM.render(
    <Profiler id="App Root" phases={['mount']}>
      <AppProviders>
        <App />
      </AppProviders>
      <NotificationContainer />
    </Profiler>,
    document.getElementById('root'),
  )
})
