import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ITEM_HEIGHT = 48;

const SimpleMenu = ({ options, disabledMenu, handleClickSelected, data }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	return (
		<div>
			<IconButton
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				onClick={event => setAnchorEl(event.currentTarget)}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: 200,
					},
				}}
			>
				{options.map(option => (
					<MenuItem
						key={option.key}
						name={option.type}
						data={data}
						disabled={disabledMenu}
						onClick={handleClickSelected}
					>
						{option.legend}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};

export default SimpleMenu;
