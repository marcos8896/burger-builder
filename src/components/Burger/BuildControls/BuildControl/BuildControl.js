import React from 'react'
import PropTypes from 'prop-types'

import classes from './BuildControl.css';

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button>Less</button>
      <button>More</button>
    </div>
  )
}

export default buildControl;
