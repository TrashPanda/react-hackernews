import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import map from 'lodash/fp/map';
import get from 'lodash/fp/get';

import Post from '../containers/Post';

import Pagination from '../components/Pagination';

import {fetchPosts} from '../redux/modules/hnApi';

// aggregation of Post
class PostView extends PureComponent {
	constructor(props) {
		super(props);
		this.ifNextPageExist = this.ifNextPageExist.bind(this);
		this.currentPage = this.currentPage.bind(this);
		this.postList = this.postList.bind(this);
	}

	componentDidMount() {
		const page = this.props.params.splat;

		const path = this.props.routes[1].path;

		console.log(this.props)
		const storyType = path.split('/')[0];
		this.props.fetch(`/${storyType}?page=${page}`);
	}

	componentWillReceiveProps(nextProps) {
		const currentPage = this.props.params.splat;
		const path = this.props.routes[1].path;
		const currentStoryType = path.split('/')[0];

		const nextPage = nextProps.params.splat;
		const nextPath = nextProps.routes[1].path;
		const nextStoryType = nextPath.split('/')[0];


		if ( nextPage !== currentPage
			|| nextStoryType !== currentStoryType
		) {

			this.props.fetch(`/${nextStoryType}?page=${nextPage}`);
		}
	}

	ifNextPageExist() {
		return get('length')(this.props.posts) === 30;
	}

	currentPage() {
		const pathPartial = this.props.location.pathname.split('/');

		return {
			type: pathPartial[1],
			pageNumber: pathPartial[2]
		};
	}

	postList() {
		const posts = this.props.posts;
		const result = map(
			(post) => (
				<Post post={post} key={post.id}/>
			)
		)(posts);
		return result;
	}

	render() {
		return (
			<div>
				<div className="content-post-list">
					{this.postList()}
				</div>
				{/*this is a hack with this limited api to mimic the 'more' button on official site, use it for now*/}
				<Pagination
					ifNextPageExist={this.ifNextPageExist()}
					currentPage={this.currentPage()}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		posts: state.data.posts
	};
};

const mapDispatchToProps = (dispatch) => ({
	fetch: (arg) => (dispatch(fetchPosts(arg)))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostView);
