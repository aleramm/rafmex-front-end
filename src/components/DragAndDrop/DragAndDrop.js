/* eslint-disable no-plusplus */
import React, { Component, Fragment } from 'react';
import { Button } from '@material-ui/core';
import { Attachment } from '@material-ui/icons';
import Container from 'components/Container/Container';
import ContainerContent from 'components/Container/ContainerContent';
import ContainerActions from 'components/Container/ContainerActions';

class DragAndDrop extends Component {
	state = {
		dragging: false,
		file: '',
		fileName: 'No disponible',
	};
	dragCounter = 0;
	dragDropContainer = React.createRef();
	componentDidMount = () => {
		const div = this.dragDropContainer;
		div.addEventListener('dragenter', this.handleDragIn);
		div.addEventListener('dragleave', this.handleDragOut);
		div.addEventListener('dragover', this.handleDrag);
		div.addEventListener('drop', this.handleDrop);
	};
	componentWillUnmount() {
		const div = this.dragDropContainer;
		div.removeEventListener('dragenter', this.hangleDragIn);
		div.removeEventListener('dragleave', this.handleOut);
		div.removeEventListener('dragover', this.handleDrag);
		div.removeEventListener('drop', this.handleDrop);
	}
	handleDrag = e => {
		e.preventDefault();
		e.stopPropagation();
	};
	handleDragIn = e => {
		e.preventDefault();
		e.stopPropagation();
		this.dragCounter++;
		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
			this.setState({
				dragging: true,
			});
		}
	};
	handleDragOut = e => {
		e.preventDefault();
		e.stopPropagation();
		this.dragCounter--;
		if (this.dragCounter !== 0) {
			this.setState({ dragging: false });
		}
	};
	handleDrop = e => {
		const { onDrop } = this.props;
		e.preventDefault();
		e.stopPropagation();
		this.setState({ dragging: false });
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			onDrop(e.dataTransfer.files);
			e.dataTransfer.clearData();
			this.dragCounter = 0;
		}
	};
	handleChangeInputFile = ({ target }) => {
		const { onDrop } = this.props;
		const [file] = target.files;
		console.log(file);
		const fileName = file.name;
		onDrop(target.files);
		this.setState({ fileName });
	};
	render() {
		const { children } = this.props;
		const { dragging, fileName } = this.state;
		return (
			<Container title="Cargar plantilla csv" ref={node => (this.dragDropContainer = node)}>
				<ContainerContent>
					<ContainerContent
						padding={false}
						style={{
							position: 'relative',
							border: 'dashed grey 4px',
							height: '6.375rem',
						}}
					>
						<Fragment>
							{dragging && (
								<div
									style={{
										position: 'absolute',
										top: 0,
										bottom: 0,
										left: 0,
										right: 0,
										zIndex: 9999,
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											flexGrow: 0,
											alignItems: 'center',
											height: '100%',
										}}
									>
										<h2 className="center color-light fw-400">
											Soltar archivo
										</h2>
									</div>
								</div>
							)}
						</Fragment>
						<Fragment>
							{!dragging && (
								<div
									style={{
										position: 'absolute',
										top: 0,
										bottom: 0,
										left: 0,
										right: 0,
										zIndex: 9999,
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-around',
											flexGrow: 0,
											alignItems: 'center',
											height: '100%',
										}}
									>
										<Attachment color="primary" style={{ fontSize: '3rem' }} />
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'space-around',
												height: '100%',
											}}
										>
											<p className="center color-light fw-400 inline-block g-mt-8 g-ml-0 g-mb-0 g-mr-0">
												Arrastre y suelte el archivo aquí
											</p>
											<span className="block">ó</span>
											<label htmlFor="cargar-csv-cartera">
												<input
													type="file"
													accept=".csv"
													id="cargar-csv-cartera"
													style={{ display: 'none' }}
													ref={this.fileCsv}
													onChange={this.handleChangeInputFile}
													// eslint-disable-next-line no-param-reassign
													onClick={event => (event.target.value = null)}
												/>
												<Button
													type="button"
													size="small"
													color="primary"
													component="span"
												>
													buscar manualmente
												</Button>
											</label>
										</div>
									</div>
								</div>
							)}
						</Fragment>
					</ContainerContent>
				</ContainerContent>
				<ContainerActions style={{ justifyContent: 'center' }}>
					<span className="g-mt-8 g-ml-0 g-mb-8 g-mr-0 color-light fw-400">
						<span className="fw-500">{`Archivo cargado: ${fileName}`}</span>
					</span>
				</ContainerActions>
			</Container>
		);
	}
}

export default DragAndDrop;
