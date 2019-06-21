import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ErrorPage.scss';

class ErrorPage extends Component {
  state = {
    errors: {
      404: {
        title: 'Sorry, the page was not found',
        text: 'The page your are looking for might be moved permanently',
        button: 'Go Back',
        url: '',
      },
      500: {
        title: 'ERROR',
        text: 'We are fixing it',
        button: 'Try Again',
        url: '',
      },
    },
  };

  navigateTo = () => {
    const { history, type } = this.props;
    switch (type) {
      case '404':
        history.goBack();
        break;
      case '500':
        window.location.reload();
        break;
      default:
        window.location.reload();
        break;
    }
  };

  renderNavigationButton = () => {
    const { type } = this.props;
    const { errors } = this.state;
    return (
      <button className="button primary" onClick={this.navigateTo}>
        {errors[type || 404].button}
      </button>
    );
  };

  render() {
    const { type } = this.props;
    const { errors } = this.state;
    return (
      <div className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <div className="error-block">
                  <div className="error-content">
                    <h1 className="error-code">{type}</h1>
                    <h3 className="error-title">{errors[type || 404].title}</h3>
                    <p className="error-text">{errors[type || 404].text}</p>
                    {this.renderNavigationButton()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  type: PropTypes.string,
  history: PropTypes.object,
};

ErrorPage.defaultProps = {
  type: '404',
  history: {},
};

export default ErrorPage;
