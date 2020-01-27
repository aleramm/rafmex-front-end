import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDom from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import 'flexboxgrid/dist/flexboxgrid.css';
import App from './App';
import 'moment/locale/es';

const store = configureStore();

const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary: { main: '#233A79', contrastText: '#ffffff' },
		secondary: { main: '#081A4B', contrastText: '#ffffff' },
		error: { main: '#D32F2F' },
		contrastThreshold: 3,
		tonalOffset: 0.2,
	},
});

const renderApp = () => {
	ReactDom.render(
		<MuiThemeProvider theme={theme}>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<Provider store={store}>
					<App />
				</Provider>
			</MuiPickersUtilsProvider>
		</MuiThemeProvider>,
		document.getElementById('root')
	);
};
renderApp();

if (module.hot) {
	module.hot.accept('./App', () => {
		renderApp();
	});
}
