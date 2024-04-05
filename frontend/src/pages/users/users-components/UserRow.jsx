import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "../../../components";
import { useState } from "react";
import { PROP_TYPE } from "../../../constants/prop-type";
import { request } from "../../../utils/request";

export const UserRowContainer = ({
	className,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	id,
	onUserDelete,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};
	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, "PATCH", { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<Cell>
				<div>{login}</div>
				<div>{registeredAt}</div>
				<ChangeRoleWrapper>
					<select
						value={selectedRoleId}
						onChange={(target) => onRoleChange(target)}
					>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>

					<Icon
						iconId="fa-floppy-o"
						margin="0 0 0 10px"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</ChangeRoleWrapper>
			</Cell>

			<Icon iconId="fa-trash-o" margin="0 0 0 10px" onClick={onUserDelete} />
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: grid;
	grid-template: 1fr/ 680px 30px;
`;

const ChangeRoleWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

const Cell = styled.div`
	width: 680px;
	border: 1px solid black;
	display: grid;
	grid-template: 1fr/ 217px 290px 223px;
	justify-items: start;
	margin-bottom: 5px;
`;

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserDelete: PropTypes.func.isRequired,
};
