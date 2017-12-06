import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd'
import { createConfirmation, confirmable } from 'react-confirm';

class _ConfirmDialog extends React.Component {
  render() {
    return (
      <Modal
        onHide={this.props.dismiss} 
        show={this.props.show}
        title={this.props.options.title || "Confirmation"}
        wrapClassName="vertical-center-modal"
        visible={true}
        onOk={() => this.props.proceed("proceed")}
        onCancel={() => this.props.cancel("cancel")}
        okText={this.props.options.okText || "Ok"}
        cancelText={this.props.options.cancelText || "Cancel"}
      >
        <p>{this.props.confirmation}</p>
      </Modal>
    )
  }
}

_ConfirmDialog.propTypes = {
  show: PropTypes.bool,            // from confirmable. indicates if the dialog is shown or not.
  proceed: PropTypes.func,         // from confirmable. call to close the dialog with promise resolved.
  cancel: PropTypes.func,          // from confirmable. call to close the dialog with promise rejected.
  dismiss: PropTypes.func,         // from confirmable. call to only close the dialog.
  confirmation: PropTypes.string,  // arguments of your confirm function
  options: PropTypes.object        // arguments of your confirm function
}

const ConfirmDialog = confirmable(_ConfirmDialog);

const confirm = createConfirmation(ConfirmDialog);

export default function(confirmation, options = {}) {
  return confirm({ confirmation, options });
}