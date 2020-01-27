import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
	class AsyncComponent extends Component {
		_isMounted = false;
		constructor(props) {
			super(props);
			this.state = {
				module: null,
			};
		}

		async componentDidMount() {
			this._isMounted = true;
			const importcomponent = importComponent;
			const {
				default: component,
			} = await import(/* webpackChunkName: "[request]" */ `../${importcomponent}`);
			if (this._isMounted) {
				this.setState({ module: component });
			}
		}
		componentWillUnmount() {
			this._isMounted = false;
		}
		render() {
			const { module: Component } = this.state;
			return Component && <Component {...this.props} />;
		}
	}

	return AsyncComponent;
}
