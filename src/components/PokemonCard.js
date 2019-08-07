import React from 'react';

const PokemonCard = ({name, url}) => (  
  <div className="col-sm-6 col-md-6">
    <div className="thumbnail">          
      <div className="caption">
        <h3>{name}</h3> 
        <p>{url}</p>           
      </div>
    </div>
  </div>
)

export default PokemonCard;