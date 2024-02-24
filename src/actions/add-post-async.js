import { setPostData } from "./setPostData";

export const addPostAsync = (requestServer, postData) => (dispatch) =>
	requestServer("addNewPost", postData).then((newData) => {
		dispatch(setPostData(newData.res));
		return newData.res;
	});
