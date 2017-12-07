import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap4-modal';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class PageRemoveConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onOpen() {
    this.setState({ visible: true });
  }

  onClose() {
    this.setState({ visible: false });
  }

  onConfirm() {
    this.props
      .removePageById({
        variables: {
          id: this.props.id
        }
      })
      .then(() => {
        this.props.onRemove();
        this.onOpen();
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <span>
        <button onClick={this.onOpen} className="btn btn-danger">
          Remove
        </button>
        <Modal visible={this.state.visible} onClickBackdrop={this.onClose}>
          <div className="modal-header">
            <h5 className="modal-title">Red Alert!</h5>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to remove{' '}
              <strong>{this.props.title}?</strong>?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.onConfirm}
            >
              Remove
            </button>
          </div>
        </Modal>
      </span>
    );
  }
}

const removePageByIdQuery = gql`
  mutation RemovePage($id: String!) {
    removePage(id: $id) {
      id
    }
  }
`;

PageRemoveConfirm.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  removePageById: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default graphql(removePageByIdQuery, {
  name: 'removePageById'
})(PageRemoveConfirm);
