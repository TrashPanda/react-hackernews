// action types
const GET_CURRENT_POST_ID = 'GET_CURRENT_POST_ID';

// action creators
export const getCurrentPostId = (id) => ({
	type: GET_CURRENT_POST_ID,
	id
});

// reducers
const currentPostReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_CURRENT_POST_ID:
			return {
				...state,
				id: action.id
			};

		default:
			return state;
	}
}

export default currentPostReducer;
