import styled from "styled-components";
import { PostContent, Comments } from "./post-components";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { loadPost } from "../../actions";
import { selectPost } from "../../selectors/selectors";
import { useServer } from "../../hooks";

export const PostContainer = ({ className }) => {
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const requestServerFun = useServer();
	const params = useParams();

	useEffect(() => {
		dispatch(loadPost(requestServerFun, params.id));
	}, [dispatch, requestServerFun, params.id]);

	return (
		<div className={className}>
			<PostContent post={post} />
			<Comments comments={post.comments} postId={post.id} />
		</div>
	);
};
export const Post = styled(PostContainer)`
	display: "flex";
`;
