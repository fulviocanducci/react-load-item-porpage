import React, { Component } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';

const PokemonCard = (props) => {
  return (    
      <div className="col-sm-6 col-md-6">
        <div className="thumbnail">          
          <div className="caption">
            <h3>{props.name}</h3>            
          </div>
        </div>
      </div>    
  );
};

const PokenRequestStatus = (props) => {
  return (
    <div className={props.status==='done'?"alert alert-success":"alert alert-info"} role="alert">
      {props.status}
    </div>
  );
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      activePage: 1,      
      data: {
        count: 0,
        next: '',
        previous: '',
        results:[]
      },
      status: 'ready',
      counterPerPage: 6   
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  handlePageChange(pageNumber) {    
    this.setState({activePage: pageNumber}, () => {
      this.loadItems(pageNumber);
    });
    return true;
  }
  loadItems(page) {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=' + page + '&limit=6';
    this.setState({status:'load'}, () => {
      axios.get(url)
        .then(response => {        
          this.setState({data: response.data}, () => {
            this.setState({status:'done'});
          });        
        });
    });    
  }
  async componentDidMount(){
    this.loadItems(this.state.activePage);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.data.results.map((result,index) => (
            <PokemonCard key={index} name={result.name}></PokemonCard>
          ))}          
        </div>
        <div>
          <PokenRequestStatus status={this.state.status}></PokenRequestStatus>
        </div>
        <div className="text-center">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={6}
            totalItemsCount={this.state.data.count}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }  
}

export default App;
