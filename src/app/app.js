// import React from 'react';
// import logo from '../logo.svg';
// import './app.scss';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../core/store/configureStore';

import Home from '../components/home/home';
import Character from '../components/character/character';
import Species from '../components/species/species';
import Planet from '../components/planet/planet';
import Starship from '../components/starship/starship';
import Vehicles from '../components/vehicles/vehicles';
import Films from '../components/films/films';
import Details from '../components/detail/detail';

import './app.scss';

function App(props) {
  return (
    <>
     <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path="/" render={props => <Home match={props.match} {...props}/>} />
            <Route path="/character" render={props => <Character match={props.match} {...props}/>} />
            <Route path="/species" render={props => <Species match={props.match} {...props}/>} />
            <Route path="/planets" render={props => <Planet match={props.match} {...props}/>} />
            <Route path="/starships" render={props => <Starship match={props.match} {...props}/>} />
            <Route path="/vehicles" render={props => <Vehicles match={props.match} {...props}/>} />
            <Route path="/films" render={props => <Films match={props.match} {...props}/>} />
            <Route path="details/:type/:id" render={props => <Details match={props.match} {...props}/>} />
            <Route render={props => (<div>404</div>)} />
          </Switch>
        </>
    	</ConnectedRouter>
    </>
  );
}

export default App;
