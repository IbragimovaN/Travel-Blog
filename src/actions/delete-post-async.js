import { setPostData } from "./setPostData";
// export const deletePostAsync = (requestServer, id) => (dispatch) => {
// 	requestServer("removePost", id).then((postData) => {
// 		dispatch(setPostData(postData.res));
// 	});
// };

export const deletePostAsync = (requestServer, id) => (dispatch) => {
	return requestServer("removePost", id);
};
