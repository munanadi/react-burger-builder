import React from "react";

const Lazyloader = importComponent => {
  return class extends React.Component {
    state = {
      component: null
    };

    componentDidMount() {
      importComponent().then(c => {
        this.setState({ component: c.default });
      });
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default Lazyloader;
