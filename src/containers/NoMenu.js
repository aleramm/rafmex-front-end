import React from 'react';

const NoMenu = props => {
	return <h1>{props.url.slice(1).toUpperCase()}</h1>;
};

export default NoMenu;
