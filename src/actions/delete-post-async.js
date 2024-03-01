export const deletePostAsync = (requestServer, id) => (dispatch) => {
	return requestServer("removePost", id);
};
