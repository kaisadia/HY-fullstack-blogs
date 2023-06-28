import React from 'react';
import { useState, useImperativeHandle, forwardRef  } from 'react';

const Togglable = forwardRef((props, ref) => {
const [visible, setVisible] = useState(false)

const hideWhenVisible = { display: visible ? 'none' : '' }
const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
      }

      useImperativeHandle(ref, () => {
        return {
          toggleVisibility
        }
      })

    return (
        <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.button1}</button> 
        </div>
        <div style={showWhenVisible}>
          <button onClick={toggleVisibility}>{props.button2}</button>
          {props.children}
        </div>
      </div>
    )
}
)

export default Togglable;