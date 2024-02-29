import { setPostData } from "./setPostData";

export const loadPost = (requestServer, postId) => (dispatch) =>
	requestServer("fetchPost", postId).then((postData) => {
		console.log(postData);
		if (postData.res) {
			console.log(postData.res);
			dispatch(setPostData(postData.res));
		}
		return postData;
	});
