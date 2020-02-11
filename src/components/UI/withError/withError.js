import React from "react";

import Modal from "../Modal/Modal";

const withError = (WrapperComponent, axios) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null
      };
      // axios interceptors to catch the errors on responses and clear them out while sending requests.
      axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });
      axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({ error: error });
        }
      );
    }

    handleErrorModalClose = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.handleErrorModalClose}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />
        </>
      );
    }
  };
};

export default withError;
