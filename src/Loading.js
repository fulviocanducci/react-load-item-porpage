import React from 'react';

const Loading = ({ description }) =>
(
    <div className="container">
            <div className="alert alert-success">{typeof description === 'undefined'?'Loading ...':description}</div>
    </div>
)

export default Loading;