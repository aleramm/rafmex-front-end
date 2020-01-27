/* eslint-disable no-invalid-this */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
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
import Skeleton from '@material-ui/lab/Skeleton';

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
						<TableCell padding="none">
							<Checkbox
								indeterminate={numSelected > 0 && numSelected < rowCount}
								checked={numSelected === rowCount}
								onChange={onSelectAllClick}
								style={{ padding: 0 }}
							/>
						</TableCell>
					)}
					{headers.map(header => (
						<TableCell
							key={header.key}
							align={header.align || 'left'}
							padding="none"
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
const SkeletorTable = props => {
	const { total, headers, active } = props;
	if (!active) return null;
	const skeletonItems = [...Array(total).keys()].map((itm, idx) => {
		return (
			<TableRow
				key={idx}
				style={{
					height: 35,
					fontWeight: 400,
				}}
			>
				<TableCell colSpan={headers.length} padding="none">
					<Skeleton height={35} width="99%" />
				</TableCell>
			</TableRow>
		);
	});
	return <TableBody>{skeletonItems}</TableBody>;
};
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
		const createOptions = [];

		headers.map(itemHead => {
			Object.keys(row).map(itemRow => {
				if (itemRow === itemHead.key) {
					const newObj = { content: row[itemRow] };
					createOptions.push(newObj);
					return createOptions;
				}
			});
			return createOptions;
		});

		const options = createOptions.map((op, i) => {
			let { content } = op;
			content = getContentFormat(content, headers[i]);
			return (
				<TableCell padding="none" style={{ padding: '8px 16px 8px 8px' }} key={i}>
					{content}
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
		const { selectable, options } = this.props;
		let multipleSelected = [];
		let singleSelected = [];
		let multipleRowsSelected = [];
		const { selected, selectedRows } = this.state;
		const { id } = rowSelected;
		const selectedIndex = selected.indexOf(id);

		if (selectable && showCheckbox) {
			const selectedRowObject = options.filter(item => item.id === id);
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
			// eslint-disable-next-line react/destructuring-assignment
			this.props.selectedRows(multipleRowsSelected);
		}
		if (selectable && !showCheckbox) {
			const selectedRowObject = options.find(item => item.id === id);
			singleSelected = singleSelected.concat(selected.slice(0, -1), id);

			this.setState({
				selected: singleSelected,
				selectedRows: selectedRowObject,
			});
			// eslint-disable-next-line react/destructuring-assignment
			this.props.selectedRows(selectedRowObject);
		}
	};
	isSelected = id => {
		const { selected } = this.state;
		return selected.indexOf(id) !== -1;
	};
	getTable = () => {
		const {
			stickyHeader,
			headers,
			options,
			showCheckbox,
			registersPerPage,
			classes,
			tableWidth,
			selectable,
			size = 'small',
			padding = 'none',
		} = this.props;
		const { order, selected, orderBy, rowsPerPage, page } = this.state;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, options.length - page * rowsPerPage);
		const totalColSpan = headers.length + (showCheckbox && 1);
		const showRowsPerPageOptions = (registersPerPage && [5, 10, 25]) || [];

		return (
			<Fragment>
				<div style={{ overflowX: 'auto' }}>
					<Table
						stickyHeader={stickyHeader}
						size={size}
						padding={padding}
						style={{ minWidth: tableWidth || '500px' }}
					>
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
												<TableCell padding="none">
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
					rowsPerPageOptions={showRowsPerPageOptions}
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
	getTableInfinite = () => {
		const {
			headers,
			options,
			classes,
			skeletor,
			tableWidth,
			selectable,
			showCheckbox,
			skeletorItems,
			size = 'small',
			padding = 'none',
			skeletorActivate,
		} = this.props;
		const { order, selected, orderBy } = this.state;
		const conditionalSkeleton = options.length !== 0 && !skeletorActivate;
		return (
			<Fragment>
				<Table size={size} padding={padding} style={{ minWidth: tableWidth || '500px' }}>
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

					{(conditionalSkeleton && (
						<TableBody>
							{stableSort(options, getSorting(order, orderBy)).map((row, index) => {
								const isSelected = this.isSelected(row.id);
								return (
									<TableRow
										hover
										// eslint-disable-next-line react/no-array-index-key
										key={index}
										onClick={() => this.handleRowSelected(showCheckbox, row)}
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
											<TableCell padding="none">
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
						</TableBody>
					)) || (
						<SkeletorTable headers={headers} total={skeletorItems} active={skeletor} />
					)}
				</Table>
			</Fragment>
		);
	};
	render() {
		const { height, card, pagination } = this.props;
		return (
			<Fragment>
				{card && pagination && <div style={{ overflowX: 'auto' }}>{this.getTable()}</div>}
				{!card && pagination && (
					<div style={{ height, boxShadow: 'none' }}>{this.getTable()}</div>
				)}
				{card && !pagination && (
					<div style={{ height, overflowY: 'auto', overflowX: 'auto' }}>
						{this.getTableInfinite()}
					</div>
				)}
				{!card && !pagination && (
					<div style={{ height, overflowY: 'auto', boxShadow: 'none' }}>
						{this.getTableInfinite()}
					</div>
				)}
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
