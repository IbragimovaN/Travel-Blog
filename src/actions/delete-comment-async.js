import { setPostData } from "./setPostData";
export const deleteCommentAsync = (requestServer, postId, id) => (dispatch) => {
	requestServer("removeComment", postId, id).then((postData) => {
		dispatch(setPostData(postData.res));
	});
};
