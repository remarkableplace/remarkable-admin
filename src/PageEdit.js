import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';

class PageEdit extends Component {
  constructor(props) {
    super(props);

    const { getPageById } = this.props;

    this.state = {
      title: getPageById.page ? getPageById.page.title : '',
      content: getPageById.page ? getPageById.page.content : ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillReceiveProps({ getPageById }) {
    if (getPageById.page && this.state.title === '') {
      this.setState({
        title: getPageById.page.title,
        content: getPageById.page.content
      });
    }
  }

  onInputChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    });
    ev.preventDefault();
  }

  onSubmit(ev) {
    this.props
      .editPageById({
        variables: {
          id: this.props.getPageById.page.id,
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
    const { getPageById } = this.props;

    if (getPageById.loading) {
      return <p>Loading...</p>;
    }

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

PageEdit.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired,
  getPageById: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    page: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  }).isRequired,
  editPageById: PropTypes.func.isRequired
};

const getPageByIdQuery = gql`
  query PageQuery($id: String!) {
    page(id: $id) {
      id
      title
      content
    }
  }
`;

const editPageByIdQuery = gql`
  mutation UpdatePage($id: String!, $title: String!, $content: String!) {
    updatePage(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export default compose(
  graphql(getPageByIdQuery, {
    name: 'getPageById',
    options: ({ match }) => ({
      variables: {
        id: match.params.id
      }
    })
  }),
  graphql(editPageByIdQuery, {
    name: 'editPageById'
  })
)(withRouter(PageEdit));
