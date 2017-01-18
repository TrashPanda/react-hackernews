import React, {PureComponent} from 'react';
import get from 'lodash/fp/get';
import map from 'lodash/fp/map';

import './CommentList.scss';

// recursively show the comments tree
class CommentList extends PureComponent {
  constructor(props) {
    super(props);
    this.generateCommentList = this.generateCommentList.bind(this);
  }

  generateCommentList() {
    const result = map(
      (subComment) => (
        <Comment comment={subComment} key={subComment.id} />
      )
    )(this.props.comments);

    return result;
  }

  render() {
    return (
      <div>
        {this.generateCommentList()}
      </div>
    );
  }
}

class Comment extends PureComponent {
  constructor(props) {
    super(props);
    this.createMarkup = this.createMarkup.bind(this);
  }

  createMarkup() {
    return {__html: this.props.comment.content};
  }

  render() {
    const comment = this.props.comment;
    return (
      <div>
        <div className="meta">
          <span>{comment.user}{" "}</span><span>{comment.time_ago}</span>
        </div>
        <div className="content-text" dangerouslySetInnerHTML={this.createMarkup()}>
        </div>
        <ul>
          <CommentList comments={get('comments')(comment)} />
        </ul>
      </div>
    );
  }
}

Comment.defaultProps = {
  comment: {
    id: '',
    content: '',
    time_ago: '',
    user: '',
    text: ''
  }
};



export default CommentList;
