import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { PostCard, Pagination } from "./main-components";
import { PAGINATION_LIMIT } from "../../constants/pagination-limit";
import { Search } from "../../components";
import { debounce } from "../../components/utills/debounce";
import { request } from "../../utils/request";

export const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState("");

	useEffect(() => {
		request(
			`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			if (posts.error) {
				return;
			}
			setPosts(posts);
			setLastPage(lastPage);
		});
	}, [lastPage, page, searchPhrase]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<Search onChange={onSearch} searchPhrase={searchPhrase} />
			{posts.length ? (
				<div className="post-list">
					{posts.map(({ id, title, publishedAt, imgUrl, comments }) => (
						<PostCard
							key={id}
							id={id}
							title={title}
							publishedAt={publishedAt}
							imgUrl={imgUrl}
							commentsCount={comments.length}
						/>
					))}
				</div>
			) : (
				<div className="post-not-found">Ничего не найдено</div>
			)}
			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};
export const Main = styled(MainContainer)`
	& .post-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	? .post-not-found {
		text-align: center;
	}
`;
