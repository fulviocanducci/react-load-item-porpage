import React from 'react';

const PokenRequestStatus = ({status}) => 
(
    <div className={status==='Done.'?"alert alert-success":"alert alert-info"} role="alert">
        {status}
    </div>
)

export default PokenRequestStatus;