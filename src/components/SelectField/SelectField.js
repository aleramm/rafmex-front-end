import React from 'react';
import { TextField, MenuItem, Paper } from '@material-ui/core';
import Select from 'react-select';

const NoOptionsMessage = ({ children }) => {
	return (
		<div style={{ paddingLeft: 10, textAlign: 'left', color: 'rgba(0,0,0,0.75)' }}>
			{children || 'No existe la opción'}
		</div>
	);
};
const inputComponent = ({ inputRef, ...props }) => {
	return (
		<div
			ref={inputRef}
			{...props}
			style={{
				display: 'flex',
				cursor: 'pointer',
				alignItems: 'center',
			}}
		/>
	);
};
const Control = ({ innerRef, children, innerProps, selectProps }) => {
	return (
		<TextField
			fullWidth
			InputProps={{
				inputComponent,
				inputProps: {
					style: { display: 'flex', padding: 0, cursor: 'pointer' },
					inputRef: innerRef,
					children,
					...innerProps,
				},
			}}
			{...selectProps.textFieldProps}
		/>
	);
};
const Option = ({ innerRef, isFocused, isSelected, innerProps, children }) => {
	return (
		<MenuItem
			buttonRef={innerRef}
			selected={isFocused}
			component="div"
			style={{
				fontWeight: isSelected ? 500 : 400,
				background: isSelected ? '#233a79' : '',
				color: isSelected ? '#ffffff' : '',
			}}
			{...innerProps}
		>
			{children}
		</MenuItem>
	);
};
const Placeholder = ({ children }) => {
	return (
		<div
			style={{
				color: 'rgba(0,0,0,0.54)',
			}}
		>
			{children}
		</div>
	);
};
const SingleValue = ({ children }) => {
	return children;
};
const ValueContainer = ({ children }) => {
	return (
		<div
			style={{
				flexWrap: 'wrap',
				flex: '1 1 0%',
				alignItems: 'center',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				lineHeight: '32px',
			}}
		>
			{children}
		</div>
	);
};
const Menu = ({ innerProps, children }) => {
	return (
		<Paper
			square
			{...innerProps}
			style={{
				left: 0,
				right: 0,
				zIndex: 1,
				position: 'absolute',
				marginTop: 8,
			}}
		>
			{children}
		</Paper>
	);
};

const components = {
	NoOptionsMessage,
	Control,
	Menu,
	Option,
	Placeholder,
	ValueContainer,
	SingleValue,
};

const SelectField = ({
	name,
	options,
	value,
	textFieldProps,
	onChange,
	isClearable = true,
	isDisabled = false,
	placeholder,
	maxMenuHeight,
	isMulti,
	defaultValue,
	autoFocus,
	styles,
	className,
	classNamePrefix,
	noOptionsMessage,
	portal = false,
	backspaceRemovesValue = true,
	blurInputOnSelect = true,
}) => {
	const componentStyles = {
		input: () => ({
			display: 'inline-flex',
			justifyContent: 'flex-start',
			left: 0,
			position: 'absolute',
			top: 0,
			margin: 0,
			padding: 0,
			bottom: 0,
		}),
		dropdownIndicator: provided => ({
			...provided,
			padding: 4,
		}),
		container: provided => ({
			...provided,
			...styles,
		}),
	};
	return (
		<Select
			aria-label={name}
			options={options}
			value={value}
			components={components}
			onChange={e =>
				onChange({
					target: {
						type: 'select',
						name,
						value: (e && e.value) || null,
						option: (e && e) || null,
					},
				})
			}
			noOptionsMessage={({ inputValue }) => {
				if (inputValue) {
					return noOptionsMessage;
				}
			}}
			textFieldProps={textFieldProps}
			menuPortalTarget={portal && document.body}
			styles={componentStyles}
			classNamePrefix={classNamePrefix}
			className={className}
			placeholder={placeholder}
			isClearable={isClearable}
			isDisabled={isDisabled}
			maxMenuHeight={maxMenuHeight}
			isMulti={isMulti}
			tabIndex="0"
			defaultValue={defaultValue}
			autoFocus={autoFocus}
			backspaceRemovesValue={backspaceRemovesValue}
			blurInputOnSelect={blurInputOnSelect}
		/>
	);
};

export default SelectField;
