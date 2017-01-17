import {Observable} from 'rxjs/Observable';

// unofficial hacker-news api
const baseUrl = 'https://node-hnapi.herokuapp.com';

// action types
const FETCH_POSTS = 'FETCH';
const FETCH_POSTS_FULFILLED = 'FETCH_FULFILLED';

const FETCH_COMMENTS = 'FETCH_COMMENTS';
const FETCH_COMMENTS_FULFILLED = 'FETCH_COMMENTS_FULFILLED';

// action creators
export const fetchPosts = (url) => ({
	type: FETCH_POSTS,
	url
});
export const fetchPostsFulfilled = (payload) => ({
	type: FETCH_POSTS_FULFILLED,
	payload
});

export const fetchComments = (url) => ({
	type: FETCH_COMMENTS,
	url
});
export const fetchCommentsFulfilled = (payload) => ({
	type: FETCH_COMMENTS_FULFILLED,
	payload
});

// epics
export const fetchPostsEpic = (action$) => (
	__fetch(FETCH_POSTS, action$, fetchPostsFulfilled)
);

export const fetchCommentsEpic = (action$) => (
	__fetch(FETCH_COMMENTS, action$, fetchCommentsFulfilled)
);

// type: (actionType: actionType, action$: Observable, fulfilled: function) => (Observable)
function __fetch(actionType, action$, fulfilled) {
	return action$.ofType(actionType)
		.mergeMap(action =>
			Observable.ajax.getJSON(`${baseUrl}${action.url}`)
				.map(response => fulfilled(response))
		);
}

// reducers
const asyncData = (state = {}, action) => {
	switch (action.type) {
		case FETCH_POSTS:
			return state;

		case FETCH_POSTS_FULFILLED:
			return {
				...state,
				posts: action.payload
			};

		case FETCH_COMMENTS:
			return state;

		case FETCH_COMMENTS_FULFILLED:
			return {
				...state,
				comments: action.payload
			};

		default:
			return state;
	}
};

export default asyncData;
