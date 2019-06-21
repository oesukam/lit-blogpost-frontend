import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../containers/Layout';
import { fetchPosts } from '../../actions/postActions';
import PostCard from '../common/PostCard/PostCard';
import HomeSlideShow from './HomeSlideShow';

export class Home extends Component {
  componentDidMount() {
    const { getPosts } = this.props;
    getPosts();
  }

  renderPosts = () => {
    const { posts, history } = this.props;
    return (
      <div className="columns is-multiline">
        {posts.map(post => (
          <div key={post.id} className="column is-4">
            <PostCard history={history} {...post} />
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { match, history } = this.props;
    return (
      <Layout match={match}>
        <HomeSlideShow history={history} />
        <br />
        <div className="container">{this.renderPosts()}</div>
      </Layout>
    );
  }
}

Home.propTypes = {
  meta: PropTypes.object.isRequired,
  posts: PropTypes.array,
  getPosts: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

Home.defaultProps = {
  posts: [],
};

export const mapStateToProps = ({ post: { posts, loadingPosts, meta } }) => ({
  posts,
  loading: loadingPosts,
  meta,
});

export const mapDispatchToProps = dispatch => ({
  getPosts: payload => dispatch(fetchPosts(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
