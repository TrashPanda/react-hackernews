import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import 'rxjs';  // currently individual operator import is too tideous, let's just import all for now

import Header from '../containers/Header';

import Footer from '../components/Footer';

import './App.scss'

// redux only stores the application state
class App extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <div className="content">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect()(App);
