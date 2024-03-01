export const getRoles = () => {
	return fetch("http://localhost:3005/roles").then((loadedRoles) =>
		loadedRoles.json(),
	);
};
