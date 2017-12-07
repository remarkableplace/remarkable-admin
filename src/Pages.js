import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Markdown from './Markdown';
import PageRemoveConfirm from './PageRemoveConfirm';
import DateFormat from './DateFormat';

const query = gql`
  query Pages {
    pages {
      id
      title
      content
      createdAt
      author {
        id
        fullName
      }
    }
  }
`;

function Pages({ data }) {
  if (data.loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data.pages.map(page => (
        <div key={page.id}>
          <h2>{page.title}</h2>
          <p className="text-muted">
            <small>
              by{' '}
              <a
                className="text-muted"
                href={`/authors/${page.author.id}`}
                title={page.author.fullName}
              >
                <i>{page.author.fullName}</i>
              </a>
            </small>
            <span className="float-right">
              <small>
                <DateFormat date={page.createdAt} />
              </small>
              <small>{page.createdAtFormatted}</small>
            </span>
          </p>
          <Markdown markdown={page.content} />
          <a href={`/pages/${page.id}/edit`} className="btn btn-secondary">
            Edit
          </a>{' '}
          <PageRemoveConfirm
            id={page.id}
            title={page.title}
            onRemove={data.refetch}
          />
        </div>
      ))}
    </div>
  );
}

Pages.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
      })
    )
  }).isRequired
};

export default graphql(query)(Pages);
