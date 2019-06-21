import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './PostCard.scss';

export class PostCard extends Component {
  navigateTo = () => {
    const { history, id } = this.props;
    history.push(`/posts/${id}`);
  };

  render() {
    const { cover, title, createdAt, text } = this.props;
    return (
      <div role="presentation" className="post-card" onClick={this.navigateTo}>
        <img src={cover} className="post-card__image" alt="post cover" />
        <div className="post-card-container">
          <div className="post-card__content">
            <h1 className="post-card__content__title">{title}</h1>
            <span className="post-card__content__date">
              <i className="fas fa-calendar" />
              {moment(createdAt).format('dddd M, YYYY')}
            </span>
            <div className="post-card__content__text">{text}</div>
          </div>
        </div>
      </div>
    );
  }
}

PostCard.propTypes = {
  id: PropTypes.string,
  cover: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  createdAt: PropTypes.string,
  history: PropTypes.object.isRequired,
};

PostCard.defaultProps = {
  id: '',
  cover: '',
  title: '',
  text: '',
  createdAt: '',
};
export default PostCard;
