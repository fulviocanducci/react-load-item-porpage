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
    <div className={props.status==='Done.'?"alert alert-success":"alert alert-info"} role="alert">
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
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=' + page + '&limit=' + this.state.limit;
    this.setState({status:'Loading ...'}, () => {
      axios.get(url)
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
    return (      
      <div>
        {
          (this.state.data.results && this.state.data.results.length > 0) ? (    
            <div className="container"><br />
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
                  itemsCountPerPage={this.state.limit}
                  totalItemsCount={this.state.data.count}
                  pageRangeDisplayed={this.state.pageDisplay}
                  onChange={this.handlePageChange}
                />
              </div>
            </div>    
          ): 
          (
            <div>Carregando ...</div>
          )
        }
      </div>
      );
    }  
}

export default App;
