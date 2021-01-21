import React from 'react'
import PropTypes from 'prop-types'

import './reply.css';

const Reply = ({reply}) => {
    
    const key = Object.keys(reply)[0];
    const keySplitted = key.split("-");
    
    return (
        <div className="reply">
            <h2>{keySplitted[1]}</h2>
            <small>{keySplitted[0]}</small>
            <br />
            <div>
                {reply[key]}
            </div>
        </div>
    )
}

Reply.propTypes = {
    reply: PropTypes.object.isRequired
}

export default Reply
