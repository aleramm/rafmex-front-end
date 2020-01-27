import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import DynamicImport from 'constants/DynamicImport';
import DynamicContainer from 'util/DynamicContainer/DynamicContainer';
import { getOperacionesReadyState } from 'selectors/appSelector';
import './App.css';

const GalileoProgress = DynamicImport('components/GalileoProgress/GalileoProgress');
const GalileoNotifications = DynamicImport('components/GalileoNotifications/GalileoNotifications');
const GalileoSnackBar = DynamicImport('components/GalileoSnackBar/GalileoSnackBar');
const BreadCrumb = DynamicImport('components/BreadCrumb/BreadCrumb');

@connect(store => ({
	operacionesReady: getOperacionesReadyState(store),
}))
class App extends Component {
	render() {
		return (
			<Router>
				<Fragment>
					<Link style={{ margin: '0 0.3125rem' }} to="/operaciones/monitor-de-cierre">
						Monitor de cierre
					</Link>
					<div className="wrapper-galileo">
						<BreadCrumb />
						<Switch>
							<Route
								exact
								strict
								path="/:page?/:subpage?"
								render={({ match, history }) => (
									<DynamicContainer {...match} {...history} {...this.props} />
								)}
							/>
						</Switch>
					</div>
					<GalileoProgress />
					<GalileoNotifications />
					<GalileoSnackBar />
				</Fragment>
			</Router>
		);
	}
}

export default App;
