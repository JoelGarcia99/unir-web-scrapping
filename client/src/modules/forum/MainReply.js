import React from 'react'
import PropTypes from 'prop-types'

import './reply.css';

const MainReply = ({reply}) => {
    
    const key = Object.keys(reply)[0];
    const keySplitted = key.split("-");
    
    return (
        <div className="reply-header">
            <h2>{keySplitted[1]}</h2>
            <small>{keySplitted[0]}</small>
            <br />
            <div>
                {reply[key]}
            </div>
        </div>
    )
}

MainReply.propTypes = {
    reply: PropTypes.object.isRequired
}

export default MainReply
