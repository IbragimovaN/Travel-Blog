import styled from "styled-components";
import { PostContent, Comments, PostForm } from "./post-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { RESET_POST_DATA, loadPost } from "../../actions";
import { selectPost } from "../../selectors/selectors";
import { useMatch } from "react-router-dom";
import { Error } from "../../components";

export const PostContainer = ({ className }) => {
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const params = useParams();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch]);

	const isEditing = useMatch("/posts/:id/edit");

	useEffect(() => {
		dispatch(loadPost(params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id]);

	if (isLoading) {
		return null;
	}

	return (
		<div>
			{error ? (
				<Error error={error} />
			) : (
				<div className={className}>
					{isEditing ? <PostForm post={post} /> : <PostContent post={post} />}
					<Comments comments={post.comments} postId={post.id} />
				</div>
			)}
		</div>
	);
};
export const Post = styled(PostContainer)`
	display: "flex";
`;
