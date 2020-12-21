import React, { Component } from 'react';
import TopNav from "../Components/TopNav"

export default function (ComposedComponent) {
  class PageLayout extends Component {

    render() {
      return (
        <React.Fragment>
          { window.scrollTo(0, 0)}
        <TopNav/>
          <main className="main-conainer">
          <ComposedComponent {...this.props} />
          </main>

        </React.Fragment>
      )

    }

  }
  return PageLayout;
}
