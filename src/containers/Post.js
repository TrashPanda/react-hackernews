import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {fetchComments} from '../redux/modules/hnApi';
// import {getCurrentPostId} from '../redux/modules/currentPost';

import './Post.scss';

const DEFAULT_POST = {
  title: 'title',
  points: 'points',
  user: 'user',
  time_ago: 'time_ago',
  id: 'id',
  comments_count: 'comments_count',
  url: 'url',
  domain: 'domain',
  stub: 'stub'
};

const DEFAULT_FUNC = () => {};

const Post = ({post = DEFAULT_POST, fetch = DEFAULT_FUNC, getCurrentPostId = DEFAULT_FUNC}) => {
  return (
    <div className="content-post">
      <a className="title" href={post.url}>
        {post.title}{" "}
      </a>
      {post.domain
        ?  <span className="meta">({post.domain})</span>
        : null
      }
      <div className="meta">
        <span>
          {post.points} points by {post.user}{" "}
        </span>
        <span>
          {post.time_ago}{" "}
          <span> |{" "}
            <Link
              to={`/item/${post.id}`}
              onClick={() => {
                // fetch(`/item/${post.id}`);
                // getCurrentPostId(post.id);
              }}>
              <span>
                {post.comments_count} <span>comments</span> {" "}
              </span>
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  fetch: (arg) => dispatch(fetchComments(arg)),
  // getCurrentPostId: (id) => dispatch(getCurrentPostId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
