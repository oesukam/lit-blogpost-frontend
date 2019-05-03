import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './HomeSlideCard.scss';

export class HomeSlideCard extends Component {
  navigateTo = () => {
    const { history, id } = this.props;
    history.push(`/posts/${id}`);
  };

  render() {
    const { cover, title, createdAt } = this.props;
    return (
      <div
        style={{
          backgroundImage: `url("${cover}")`,
        }}
        className="slide-card"
      >
        <div className="slide-card-content">
          <h1
            role="presentation"
            className="slide-card__title"
            onClick={this.navigateTo}
          >
            {title}
          </h1>
          <span className="slide-card__date">
            <i className="fas fa-calendar" />
            {moment(createdAt).format('dddd M, YYYY')}
          </span>
        </div>
      </div>
    );
  }
}

HomeSlideCard.propTypes = {
  id: PropTypes.string,
  cover: PropTypes.string,
  title: PropTypes.string,
  createdAt: PropTypes.string,
  history: PropTypes.object.isRequired,
};

HomeSlideCard.defaultProps = {
  id: '',
  cover: '',
  title: '',
  createdAt: '',
};
export default HomeSlideCard;
