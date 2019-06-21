import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import posts from '../../data/posts';
import HomeSlideCard from '../common/HomeSlideCard/HomeSlideCard';

const settings = {
  className: 'center',
  centerMode: true,
  infinite: true,
  centerPadding: '0px',
  slidesToShow: 3,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
};

const HomeSlideShow = ({ history }) => (
  <div>
    <Slider {...settings}>
      {posts.map(post => (
        <HomeSlideCard history={history} key={post.id} {...post} />
      ))}
    </Slider>
  </div>
);

HomeSlideShow.propTypes = {
  history: PropTypes.object.isRequired,
};

export default HomeSlideShow;
