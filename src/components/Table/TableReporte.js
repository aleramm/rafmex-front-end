/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SimpleLabel from 'components/SimpleLabel/SimpleLabel';
import {
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TablePagination,
	TableSortLabel,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { getContentFormat } from 'util/Formatters';

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rowSelectedStyles = {
	rowSelected: {
		backgroundColor: 'rgb(224,224,224) !important',
	},
};

class EnhancedTableHead extends React.Component {
	createSortHandler = property => event => {
		const { onRequestSort } = this.props;
		onRequestSort(event, property);
	};

	cellLabel = (order, orderBy, header) => {
		const { id = '', key = '', label, sortable = false } = header;
		const sortableKey = id || key;
		return (
			<React.Fragment>
				{(sortable && (
					<TableSortLabel
						active={sortable}
						direction={order}
						onClick={this.createSortHandler(sortableKey)}
					>
						{label}
					</TableSortLabel>
				)) ||
					label}
			</React.Fragment>
		);
	};
	render() {
		const {
			onSelectAllClick,
			order,
			orderBy,
			numSelected,
			headers,
			rowCount,
			showCheckbox,
		} = this.props;

		return (
			<TableHead>
				<TableRow style={{ height: 35 }}>
					{showCheckbox && (
						<TableCell padding="dense">
							<Checkbox
								indeterminate={numSelected > 0 && numSelected < rowCount}
								checked={numSelected === rowCount}
								onChange={onSelectAllClick}
								style={{ padding: 0 }}
							/>
						</TableCell>
					)}
					{headers.map((header, index) => (
						<TableCell
							key={header.id}
							align={header.align || 'left'}
							padding={header.padding || 'default'}
							sortDirection={orderBy === (header.id || header.key) ? order : false}
							style={{ padding: '8px 16px 8px 8px' }}
						>
							{this.cellLabel(order, orderBy, header)}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		);
	}
}

// eslint-disable-next-line react/no-multi-comp
class DataTable extends Component {
	state = {
		rowsPerPage: 5,
		page: 0,
		order: 'asc',
		orderBy: '',
		selected: [],
		selectedRows: [],
	};
	data = [];

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	fillOrEmptyRowsChecked = (checked, arr) => {
		return checked ? arr : [];
	};

	componentDidUpdate = prevProps => {
		const { clearSelected } = this.props;
		if (prevProps.clearSelected !== clearSelected) {
			this.handleCleanSelected();
		}
	};
	handleCleanSelected = () => {
		this.setState({
			selected: [],
			selectedRows: [],
		});
	};

	handleTableCells = (row, headers) => {
		let createOptions = [];

		headers.map(itemHead => {
			Object.keys(row).map(itemRow => {
				if (itemRow === itemHead.key) {
					let newObj = { content: row[itemRow] };
					createOptions.push(newObj);
					return createOptions;
				}
			});
			return createOptions;
		});

		let options = createOptions.map((op, i) => {
			let { content } = op;

			content = getContentFormat(content, headers[i]);
			return (
				<TableCell style={{ padding: '8px 16px 8px 8px' }} key={i}>
					<SimpleLabel content={content} fullWidth />
				</TableCell>
			);
		});

		return options;
	};

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		// eslint-disable-next-line react/destructuring-assignment
		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		this.setState({ order, orderBy });
	};
	handleSelectAllClick = event => {
		const { options, selectedRows } = this.props;
		if (event.target.checked) {
			this.setState({
				selected: options.map(n => n.id),
				selectedRows: options.filter(n => n),
			});
			selectedRows(options.filter(n => n));
			return;
		}
		this.setState({ selected: [], selectedRows: [] });
		selectedRows([]);
	};
	handleRowSelected = (showCheckbox = false, rowSelected) => {
		let multipleSelected = [];
		let singleSelected = [];
		let multipleRowsSelected = [];
		const { selected, selectedRows } = this.state;
		const { id } = rowSelected;
		const selectedIndex = selected.indexOf(id);

		if (this.props.selectable && showCheckbox) {
			const selectedRowObject = this.props.options.filter(item => item.id === id);
			if (selectedIndex === -1) {
				multipleSelected = multipleSelected.concat(selected, id);
				multipleRowsSelected = multipleRowsSelected.concat(selectedRows, selectedRowObject);
			} else if (selectedIndex === 0) {
				multipleSelected = multipleSelected.concat(selected.slice(1));
				multipleRowsSelected = multipleRowsSelected.concat(selectedRows.slice(1));
			} else if (selectedIndex === selected.length - 1) {
				multipleSelected = multipleSelected.concat(selected.slice(0, -1));
				multipleRowsSelected = multipleRowsSelected.concat(selectedRows.slice(0, -1));
			} else if (selectedIndex > 0) {
				multipleSelected = multipleSelected.concat(
					selected.slice(0, selectedIndex),
					selected.slice(selectedIndex + 1)
				);
				multipleRowsSelected = multipleRowsSelected.concat(
					selectedRows.slice(0, selectedIndex),
					selectedRows.slice(selectedIndex + 1)
				);
			}

			this.setState({
				selected: multipleSelected,
				selectedRows: multipleRowsSelected,
			});
			this.props.selectedRows(multipleRowsSelected);
		}
		if (this.props.selectable && !showCheckbox) {
			const selectedRowObject = this.props.options.find(item => item.id === id);
			singleSelected = singleSelected.concat(selected.slice(0, -1), id);

			this.setState({
				selected: singleSelected,
				selectedRows: selectedRowObject,
			});
			this.props.selectedRows(selectedRowObject);
		}
	};

	isSelected = id => {
		const { selected } = this.state;
		return selected.indexOf(id) !== -1;
	};
	getTable = () => {
		const {
			headers,
			options,
			showCheckbox,
			registersPerPage,
			classes,
			tableWidth,
			selectable,
		} = this.props;
		const { order, selected, orderBy, rowsPerPage, page } = this.state;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, options.length - page * rowsPerPage);
		const totalColSpan = headers.length + (showCheckbox && 1);
		return (
			<Fragment>
				<div style={{ overflowX: 'auto' }}>
					<Table style={{ minWidth: tableWidth || '500px' }}>
						<EnhancedTableHead
							numSelected={selected.length}
							showCheckbox={showCheckbox}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={this.handleSelectAllClick}
							onRequestSort={this.handleRequestSort}
							headers={headers}
							rowCount={options.length}
						/>

						<TableBody>
							{stableSort(options, getSorting(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isSelected = this.isSelected(row.id);
									return (
										<TableRow
											hover
											// eslint-disable-next-line react/no-array-index-key
											key={index}
											onClick={() =>
												this.handleRowSelected(showCheckbox, row)
											}
											style={{
												height: 35,
												cursor: selectable && 'pointer',
												fontWeight: 400,
											}}
											role="checkbox"
											aria-checked={isSelected}
											selected={isSelected}
											classes={{ selected: classes.rowSelected }}
										>
											{showCheckbox && (
												<TableCell padding="dense">
													<Checkbox
														checked={isSelected}
														style={{ padding: 0 }}
													/>
												</TableCell>
											)}
											{this.handleTableCells(row, headers)}
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 35 * emptyRows }}>
									<TableCell colSpan={totalColSpan} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<TablePagination
					rowsPerPageOptions={registersPerPage && [5, 10, 25]}
					count={options.length}
					component="div"
					rowsPerPage={rowsPerPage}
					page={page}
					labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
					labelRowsPerPage="Registros por página"
					onChangePage={this.handleChangePage}
					onChangeRowsPerPage={this.handleChangeRowsPerPage}
				/>
			</Fragment>
		);
	};

	render() {
		const { height, card } = this.props;
		return (
			<Fragment>
				{card && <div style={{ overflowX: 'auto' }}>{this.getTable()}</div>}

				{!card && <div style={{ height, boxShadow: 'none' }}>{this.getTable()}</div>}
			</Fragment>
		);
	}
}
DataTable.propTypes = {
	headers: PropTypes.array.isRequired,
	options: PropTypes.array.isRequired,
	card: PropTypes.bool,
	showCheckbox: PropTypes.bool,
	selectable: PropTypes.bool,
	clearSelected: PropTypes.bool,
	registersPerPage: PropTypes.bool,
	tableWidth: PropTypes.string,
};
DataTable.defaultProps = {
	card: true,
	headers: [],
	multiSelectable: false,
	order: 'asc',
	showCheckbox: false,
	selectable: false,
	clearSelected: false,
	registersPerPage: false,
};

export default withStyles(rowSelectedStyles)(DataTable);
