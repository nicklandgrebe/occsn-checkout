import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadProduct } from '../actions/appActions';

import '../styles/index.css'

// Which part of the Redux global state does our component want to receive as props?
function stateToProps(state) {
  return {
    data: {
      order: state.$$appStore.get('order'),
      product: state.$$appStore.get('product'),
    }
  };
}

// Bind relevant action creators and map them to properties
function dispatchToProps(dispatch) {
  return {
    actions: {
      loadProduct: () => dispatch(loadProduct(window.OCCSN.product_id)),
    }
  }
}

export class AppContainer extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.loadProduct();
  }

  render() {
    const { actions, data } = this.props;

    if(data.product) {
      return (
        <div>
          <p>{ data.product.title }</p>
          <p>{ data.order ? (
            <span>{ data.order.sessionIdentifier }</span>
          ) : (null)
          }</p>
        </div>
      );
    } else {
      return <p>Hello World!!</p>;
    }
  }
}

// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(stateToProps, dispatchToProps)(AppContainer);
