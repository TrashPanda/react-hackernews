import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import get from 'lodash/fp/get';

import Post from '../containers/Post';

import CommentList from '../components/CommentList';

import {fetchComments} from '../redux/modules/hnApi';

import './CommentView.scss';

class CommentView extends PureComponent {
	componentDidMount() {
		const itemId = this.props.params.splat;
		this.props.fetch(`/item/${itemId}`);
	}

	componentWillReceiveProps(nextProps) {
		const currentItemId = this.props.params.splat;
		const nextItemId = nextProps.params.splat;

		if (currentItemId !== nextItemId) {
			this.props.fetch(`/item/${nextItemId}`);
		}
	}

	render() {
		const commentsPageData = this.props.commentsPageData;
		const comments = get('comments')(commentsPageData);
		return (
			<div>
				<Post post={commentsPageData} />
				<div className="content-comment-list">
					<CommentList comments={comments} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const commentsPageData = state.data.comments;
	return {
		commentsPageData
	};
};

const mapDispatchToProps = (dispatch) => ({
	fetch: (arg) => dispatch(fetchComments(arg))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentView);
