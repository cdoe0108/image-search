import React, { Component } from 'react';
import './App.css';

import SearchResultStore from './searchResultStore';
import ResultComp from './resultComp';

export default class SearchComp extends Component {
    state = {
        query: '',
        pageNo: 0,
        searchResult : [],
        paginatedData : []
      }
    
      componentWillMount() {
        this.timer = null;
      }

     
      handleInputChange = (e) => {
        clearTimeout(this.timer);
        this.setState({
          query: this.search.value
        })
        this.timer = setTimeout(this.triggerChange, 3000);
      }

      handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.triggerChange();
        }
      }

      triggerChange = () => {
        SearchResultStore.getResult(this.state.query, this.dataReceived);
      }

      dataReceived = (data) => {
        this.paginateData(this.state.pageNo,8,data)
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
                (Object.keys(this.state.searchResult).length > 0) ? <ResultComp list={this.state.paginatedData} moreClick={this.getMoreData}/> : ''
            }
          </form>
        )
      }
}
