import React from 'react';
import PropTypes from 'prop-types';
import clickAway from '../middleware/clickAway';

const Dropdown = ({
  Opener, children, size, margin, height, padding, stopAutoclose,
}) => {
  const { ref, isComponentVisible, setIsComponentVisible } = clickAway(false);

  return (
    <React.Fragment>
      <Opener open={() => setIsComponentVisible(true)} />

      {isComponentVisible && (
        <div
          ref={ref}
          onClick={() => (stopAutoclose ? null : setIsComponentVisible(false))}
          className={`w-${size} mt-${margin} h-${height} px-${padding || 6} absolute bg-white shadow rounded py-3 z-10 overflow-y-scroll`}
        >
          {children}
        </div>
      )}
    </React.Fragment>
  );
};

// Opener, stopAutoclose,
Dropdown.propTypes = {
  Opener: PropTypes.func.isRequired,
  children: PropTypes.element,
  size: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number,
  padding: PropTypes.number,
  stopAutoclose: PropTypes.bool,
};

Dropdown.defaultProps = {
  stopAutoclose: false,
  children: null,
  size: null,
  height: null,
  padding: null,
  margin: null,
};

export default Dropdown;
