import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  parallax: {
    height: '70vh',
    maxHeight: '1000px',
    overflow: 'hidden',
    position: 'relative',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    margin: '0',
    padding: '0',
    border: '0',
    display: 'flex',
    alignItems: 'center',
    // zIndex: -10,
  },
  filter: {
    '&:before': {
      background: '#061220' /*#030b18*/,
    },
    '&:after,&:before': {
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: "''",
    },
  },
  small: {
    height: '380px',
  },
}));

export default function Parallax(props: any) {
  // let windowScrollTop;
  // if (typeof window !== 'undefined') {
  //   if (window.innerWidth >= 768) {
  //     windowScrollTop = window.pageYOffset / 3;
  //   } else {
  //     windowScrollTop = 0;
  //   }
  // }

  // const [transform, setTransform] = React.useState(
  //   'translate3d(0,' + windowScrollTop + 'px,0)'
  // );
  // React.useEffect(() => {
  //   if (window.innerWidth >= 768) {
  //     window.addEventListener('scroll', resetTransform);
  //   }
  //   return function cleanup() {
  //     if (window.innerWidth >= 768) {
  //       window.removeEventListener('scroll', resetTransform);
  //     }
  //   };
  // });
  // const resetTransform = () => {
  //   var windowScrollTop = window.pageYOffset / 3;
  //   setTransform('translate3d(0,' + windowScrollTop + 'px,0)');
  // };

  const { filter, className, children, style, small } = props;
  const classes = useStyles();
  const parallaxClasses = classNames({
    [classes.parallax]: true,
    [classes.filter]: filter,
    // [classes.small]: small,
    // [className]: className !== undefined,
  });

  return (
    <div
      className={parallaxClasses}
      style={{
        ...style,
        // transform: transform,
      }}
    >
      {children}
    </div>
  );
}

Parallax.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool,
};
