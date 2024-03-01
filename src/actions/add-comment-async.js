import { setPostData } from "./setPostData";

export const addCommentAsync =
	(requestServer, userId, postId, content) => (dispatch) => {
		requestServer("addCommentToPost", userId, postId, content).then(
			(postData) => {
				dispatch(setPostData(postData.res));
			},
		);
	};

// export const addCommentAsync = (requestServer, userId, postId, content) => {
// 	return (dispatch) => {
// 		return requestServer("addComment", userId, postId, content).then(
// 			(postData) => {
// 				dispatch(setPostData(postData.res));
// 			},
// 		);
// 	};
// };
