import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import './index.css';
import App from './components/App';
import About from './components/About';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import registerServiceWorker from './registerServiceWorker';

const Root = () => {
    return (
    <BrowserRouter>
    <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Route path="/" component={App}/>
        <Route path="/about" component={About}/>
        <Route exactly path="/Contact" component={Contact}/>
    </div>
    </BrowserRouter>
    )
}

render(<Root />, document.getElementById('root'));
registerServiceWorker();
