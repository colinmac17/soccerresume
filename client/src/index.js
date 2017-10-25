import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';

render(<Root />, document.getElementById('root'));
registerServiceWorker();