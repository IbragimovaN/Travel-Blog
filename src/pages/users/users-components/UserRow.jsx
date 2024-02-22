import styled from "styled-components";
import { Icon } from "../../../components";
import { useState } from "react";
import { useServer } from "../../../hooks";

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

	const requestServerFunc = useServer();
	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};
	const onRoleSave = (userId, newUserRoleId) => {
		requestServerFunc("updateUserRole", userId, newUserRoleId).then(() => {
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
					<div onClick={() => onRoleSave(id, selectedRoleId)}>
						<Icon
							iconId="fa-floppy-o"
							margin="0 0 0 10px"
							disabled={isSaveButtonDisabled}
						/>
					</div>
				</ChangeRoleWrapper>
			</Cell>

			<div onClick={onUserDelete}>
				<Icon iconId="fa-trash-o" margin="0 0 0 10px" />
			</div>
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
