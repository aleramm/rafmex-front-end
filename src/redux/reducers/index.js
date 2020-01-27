import { combineReducers } from 'redux';
import app from './appReducer';
import ui from './uiReducer';
import notification from './notificationReducer';
import snackbar from './snackbarReducer';
import entities from './entitiesReducer';
import reset from './resetReducer';

const rootReducers = combineReducers({
	app,
	ui,
	notification,
	snackbar,
	entities,
	reset,
});

export default rootReducers;
