import React, { Component } from 'react';
import './App.css';

import SearchResultStore from './searchResultStore';
import ResultComp from './resultComp';

export default class SearchComp extends Component {
    constructor(props){
      super(props);
      this.itemClick = this.itemClick.bind(this)
    }
    state = {
        query: '',
        pageNo: 0,
        searchResult : [],
        paginatedData : []
      }
     localData = [];
     isLocal = false;
     isClicked = false;
    
      componentWillMount() {
        this.timer = null;
        if(localStorage.searchquery)
        {
          this.localData = JSON.parse(localStorage.searchquery)
        }
      }

     
      handleInputChange = (e) => {
        clearTimeout(this.timer);
        if(localStorage.searchquery && (JSON.parse(localStorage.searchquery).length > 0)){
          this.isLocal = true;
        }
        this.setState({
          query: this.search.value
        })
        this.timer = setTimeout(this.triggerChange, 2000);
      }

      handleKeyDown = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          this.triggerChange();
        }
      }

      itemClick = (str) => {
        this.setState({
          query: str
        })
        this.isLocal = false;
        this.isClicked = true;
        SearchResultStore.getResult(str, this.dataReceived);
      }

      triggerChange = () => {
        if(!this.isClicked && (this.state.query.length > 0)){
          if(localStorage.searchquery && (JSON.parse(localStorage.searchquery).indexOf(this.state.query) < 0)){
            this.localData.push(this.state.query)
          }
          localStorage.setItem("searchquery",JSON.stringify(this.localData))
          SearchResultStore.getResult(this.state.query, this.dataReceived);
        }
      }

      dataReceived = (data) => {
        this.setState({
          searchResult : data,
          paginatedData : [],
          pageNo: 0
        })
        this.isClicked = false;
        this.paginateData(this.state.pageNo,8,this.state.searchResult)
      }
     
      paginateData = (pageNum,pageSize,data) => {
        let arr = [];
        for(let i=pageNum;i<(pageSize+pageNum);i++){
          arr.push(data[i])
        }
        data.splice(pageNum,pageSize)
        this.setState({
          searchResult : data,
          paginatedData : this.state.paginatedData.concat(arr),
          pageNo: this.state.pageNo + 1
        })
      }

      getMoreData = () => {
        this.paginateData(this.state.pageNo,8,this.state.searchResult)
      }

      render() {
        return (
          <form>
            <input
              className="form-control"
              placeholder="Search for..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
              onKeyDown={this.handleKeyDown}
            />
            {
              this.isLocal ? 
              <ul className="local-result">
                {
                  JSON.parse(localStorage.searchquery).map(function(val,i){
                    return(<li key={i} onClick={(str) => this.itemClick(val)}>{val}</li>)
                  },this)
                }
              </ul>
              : ""
            }
            {
                (Object.keys(this.state.searchResult).length > 0) ? <ResultComp list={this.state.paginatedData} moreClick={this.getMoreData}/> : ''
            }
          </form>
        )
      }
}
