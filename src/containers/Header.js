import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {fetchPosts} from '../redux/modules/hnApi';

import '../containers/Header.scss';
import logo from '../assets/images/hackernews.jpg';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
  }

  fetch(arg) {
    this.props.dispatch(fetchPosts(arg));
  }

  render() {
    return (
      <header className="header">
        <div className="inner">
          <Link className="home-link" to="/news/1">
            <img className="logo" src={logo}></img>
          </Link>
          <Link to="/news/1">News</Link>
          <Link to="/show/1">Show</Link>
          <Link to="/ask/1">Ask</Link>
          <Link to="/jobs/1">Jobs</Link>
        </div>
      </header>
    );
  }
}

export default connect()(Header);
