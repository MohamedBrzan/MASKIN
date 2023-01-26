import React from 'react';
import { Helmet } from 'react-helmet-async';

export default class PageTitle extends React.Component {
  render() {
    return (
      <Helmet>
        <title>{this.props.title}</title>
      </Helmet>
    );
  }
}
