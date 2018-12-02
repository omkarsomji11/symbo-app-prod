import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Browse from './Browse';
import Pdp from './Pdp';
import Compare from './Compare';
class App extends React.Component {
    render() {
        return (<div>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#"><img src="logo.svg" style={{height: "2.5rem"}}/></a>
                    </div>
                </div>
            </nav>
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={Browse} />
                    <Route path="/Pdp" exact component={Pdp} />
                    <Route path="/Compare" exact component={Compare} />
                </div>
            </BrowserRouter>
            </div>);
    }
}

export default App;