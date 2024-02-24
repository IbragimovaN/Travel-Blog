import styled from "styled-components";
import { PostContent, Comments, PostForm } from "./post-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { loadPost } from "../../actions";
import { selectPost } from "../../selectors/selectors";
import { useServer } from "../../hooks";
import { useMatch } from "react-router-dom";

export const PostContainer = ({ className }) => {
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const requestServerFun = useServer();
	const params = useParams();

	const isEditing = useMatch("/posts/:id/edit");

	useEffect(() => {
		dispatch(loadPost(requestServerFun, params.id));
	}, [dispatch, requestServerFun, params.id]);

	return (
		<div className={className}>
			{isEditing ? <PostForm post={post} /> : <PostContent post={post} />}
			<Comments comments={post.comments} postId={post.id} />
		</div>
	);
};
export const Post = styled(PostContainer)`
	display: "flex";
`;
