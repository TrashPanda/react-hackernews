import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {fetchPosts} from '../redux/modules/hnApi';

import '../components/Pagination.scss';

class Pagination extends PureComponent {
  constructor(props) {
    super(props);
    this.generatePrev = this.generatePrev.bind(this);
    this.generateMore = this.generateMore.bind(this);
  }

  generatePrev() {
    const current = this.props.currentPage.pageNumber;
    const type = this.props.currentPage.type;

    return (
      <Link
        className="nav-prev"
        to={`/${type}/${+current - 1}`}
        onClick={() => this.props.fetch(`/${type}?page=${+current - 1}`)}
      >
        ‹ Prev
      </Link>
    );
  }

  generateMore() {
    const current = this.props.currentPage.pageNumber;
    const type = this.props.currentPage.type;

    return (
      <Link
        to={`/${type}/${+current + 1}`}
        onClick={() => this.props.fetch(`/${type}?page=${+current + 1}`)}
      >
        More ›
      </Link>
    );
  }

  render() {
    const current = this.props.currentPage.pageNumber;
    const type = this.props.currentPage.type;
    return (
      <div className="nav">
        {(current === undefined || +current === 1)
          ? null
          : this.generatePrev()
        }
        {this.props.ifNextPageExist
          ? this.generateMore()
          : null
        }
      </div>
    );
  }
}
const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  fetch: (arg) => {
    dispatch(fetchPosts(arg))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
