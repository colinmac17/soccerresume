import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link, Route} from 'react-router-dom';
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
        <Link to="/contact">Contact</Link>
        <Route exact path="/" component={App}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/Contact" component={Contact}/>
        <Route component={NotFound}/>
    </div>
    </BrowserRouter>
    )
}

render(<Root />, document.getElementById('root'));
registerServiceWorker();
