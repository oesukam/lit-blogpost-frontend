import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { fetchPost } from '../../actions/postActions';
import './SinglePost.scss';
import DefaultAvatar from '../../assets/svg/avatar.svg';
import Layout from '../../containers/Layout';

export class SinglePost extends Component {
  componentDidMount() {
    const {
      match: {
        params: { postId },
      },
      getPost,
    } = this.props;
    getPost(postId);
  }

  render() {
    const { post, match } = this.props;
    if (!post.id) return '';
    return (
      <Layout match={match}>
        <div className="container">
          <h3 className="post-date">
            <i className="fas fa-calendar" />
            {moment(post.createdAt).format('dddd M, YYYY')}
          </h3>
          <h3 className="post-title">{post.title}</h3>
          <img className="post-cover" src={post.cover} alt="post cover" />
          <p className="post-content">{post.text}</p>
          <div className="post-author">
            <DefaultAvatar className="post-author__avatar" />
            <div className="post-author-details">
              <div className="post-author-details__names">
                {`${post.author.firstName} ${post.author.lastName}`}
              </div>
              <div className="post-author-details__email">
                <i className="fas fa-at" />
                {post.author.email}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

SinglePost.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  match: PropTypes.any.isRequired,
};

export const mapStateToProps = ({ post: { singlePost } }) => ({
  post: singlePost,
});

export const mapDispatchToProps = dispatch => ({
  getPost: postId => dispatch(fetchPost(postId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SinglePost);
