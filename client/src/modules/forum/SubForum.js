import React from 'react'
import PropTypes from 'prop-types'
import DeepSubForum from './DeepSubForum';

const SubForum = ({content, setMessage}) => {
    
    let values = [];

    for(let value in content) {
        values.push(value);
    }
    
    return (
        <div className="subforum-entries">
            {values.map(e=>
                <>
                <div 
                    key={e}
                    className="subforum-entry">{e}
                </div>
                <DeepSubForum 
                    key={e}
                    content={content[e]}
                    setContent={setMessage}
                />
                <hr />
                </>
            )}
        </div>
    )
}

SubForum.propTypes = {
    content: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired
}

export default SubForum
