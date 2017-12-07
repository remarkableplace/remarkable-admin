import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';

class PageCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    });
    ev.preventDefault();
  }

  onSubmit(ev) {
    this.props
      .createPage({
        variables: {
          title: this.state.title,
          content: this.state.content
        }
      })
      .then(() => {
        this.props.history.replace('/');
      })
      .catch(err => {
        console.error(err);
      });
    ev.preventDefault();
  }

  render() {
    const { title, content } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="formTitle">Title</label>
            <input
              name="title"
              id="formTitle"
              type="text"
              className="form-control"
              placeholder="Title"
              onChange={this.onInputChange}
              value={title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="formContent">Content</label>
            <textarea
              name="content"
              id="formContent"
              className="form-control"
              rows="10"
              onChange={this.onInputChange}
              value={content}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

PageCreate.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired,
  createPage: PropTypes.func.isRequired
};

const createPageByIdQuery = gql`
  mutation CreatePage($title: String!, $content: String!) {
    createPage(title: $title, content: $content) {
      id
    }
  }
`;

export default compose(
  graphql(createPageByIdQuery, {
    name: 'createPage'
  })
)(withRouter(PageCreate));
