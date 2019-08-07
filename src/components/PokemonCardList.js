import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonCardList = ({items}) => ( 
    <React.Fragment>
    {items.map((result, index) => (
        <PokemonCard key={index} name={result.name} url={result.url}></PokemonCard>
    ))}
    </React.Fragment>
)

export default PokemonCardList;