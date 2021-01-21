import React from 'react'
import PropTypes from 'prop-types'

const DeepSubForum = ({content, setContent}) => {
    
    let values = [];

    for(let value in content) {
        values.push(value);
    }
    
    const handleClick = (key)=>{
        setContent(content[key]);
    }

    return (
        <div className="subforum-entries">
            {values.map(e=>
                <>
                <a 
                    key={e}
                    onClick={()=>handleClick(e)}
                    className="subforum-entry">{e}
                </a>
                <hr />
                </>
            )}
        </div>
    )
}

DeepSubForum.propTypes = {
    content: PropTypes.object.isRequired
}

export default DeepSubForum;
