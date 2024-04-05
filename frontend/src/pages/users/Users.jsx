import styled from "styled-components";
import { UserRow } from "./users-components/UserRow";
import { useEffect, useState } from "react";
import { Content } from "../../components/content/content";
import { ROLE } from "../../constants/roleId";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors/selectors";
import { request } from "../../utils/request";

export const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUsersList, setSouldUpdateUsersList] = useState(false);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		if (![ROLE.ADMIN].includes(userRole)) {
			return;
		}
		Promise.all([request("/users"), request("/users/roles")]).then(
			([userRes, rolesRes]) => {
				if (userRes.error || rolesRes.error) {
					setErrorMessage(userRes.error || rolesRes.error);
					return;
				}

				setUsers(userRes.data);
				setRoles(rolesRes.data);
			},
		);
	}, [shouldUpdateUsersList, userRole]);

	const onUserDelete = (userId) => {
		if (![ROLE.ADMIN].includes(userRole)) {
			return;
		}
		request(`/users/${userId}`, "DELETE").then(() => {
			setSouldUpdateUsersList(!shouldUpdateUsersList);
		});
	};

	return (
		<div className={className}>
			<Content access={[ROLE.ADMIN]} serverError={errorMessage}>
				<h2>Пользователи</h2>
				<TableHeader>
					<div>Логин</div>
					<div>Дата регистрации</div>
					<div>Роль</div>
				</TableHeader>
				<Table>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(({ id }) => Number(id) !== ROLE.GUEST)}
							onUserDelete={() => onUserDelete(id)}
						/>
					))}
				</Table>
			</Content>
		</div>
	);
};
export const Users = styled(UsersContainer)`
	margin: 0 auto;
	width: 754px;
`;

const TableHeader = styled.div`
	margin-top: 20px;
	display: grid;
	grid-template: 1fr/ 217px 290px 223px;
	justify-items: start;
`;

const Table = styled.div`
	display: flex;
	flex-direction: column;
`;
