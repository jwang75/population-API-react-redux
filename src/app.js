
import logger from 'redux-logger';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers/index';
import {Provider} from 'react-redux';
import React from 'react';
import thunk from 'redux-thunk';
import {render} from 'react-dom';
import {clearRanking,fetchRanking,toggleTable,fetchWorld, fetchUSA,fetchAllCountries,fetchEighteenCountry} from './actions/populationActions';

import PopulationToday from './components/populationToday';
import ShortestName from './components/shortestName';
import Ranking from './components/ranking';

const middleware = applyMiddleware(thunk,logger);
const store = createStore(reducers, middleware);

render(
	<Provider store={store}>
		<div>
			<PopulationToday />
			<br /><br />
			<ShortestName />
			<br /><br /><br />
			<Ranking />
		</div>

	</Provider>, document.querySelector('.container')
);


