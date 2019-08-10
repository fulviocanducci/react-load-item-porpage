import React, { Component } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';

import url from './Utils';
import Loading from './Loading';

import PokemonCardList from './components/PokemonCardList';
import PokenRequestStatus from './components/PokenRequestStatus';

class App extends Component {

  constructor() {
    super();
    this.state = { 
      activePage: 1, 
      data: {count: 0, next: '', previous: '', results:[]},
      status: 'Done.',
      counterPerPage: 6,
      limit: 6,
      pageDisplay: 3
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {    
    this.setState({activePage: pageNumber}, () => {
      this.loadItems(pageNumber);
    });
    return true;
  }

  async loadItems(page) {
    const { limit } = this.state;    
    this.setState({status:'Loading ...'}, () => {
      axios.get(url.api(page, limit))
        .then(response => {        
          this.setState({data: response.data}, () => {
            this.setState({status:'Done.'});
          });        
        });
    });    
  }

  async componentDidMount(){
    setTimeout(() => this.loadItems(this.state.activePage) , 2500);
  }

  render() {
    const {results, count} = this.state.data;
    const {status, limit, activePage, pageDisplay} = this.state;
    return (      
      <div>        
        {
          (results && results.length > 0) ? (    
            <div className="container">
              <div className="row">
                <PokemonCardList items={results} />
              </div>
              <div>
                <PokenRequestStatus status={status} />
              </div>
              <div className="text-center">
                <Pagination activePage={activePage} itemsCountPerPage={limit} totalItemsCount={count} pageRangeDisplayed={pageDisplay} onChange={this.handlePageChange}/>
              </div>
            </div>    
          ): 
          (
            <Loading description="Carregando ..."></Loading>
          )
        }
      </div>
      );
    }  
}

export default App;