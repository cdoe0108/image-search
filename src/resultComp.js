import React, { Component } from 'react';
import './App.css';

export default class ResultComp extends Component {
     constructor(props){
         super(props);
     }
     showDetails = (data) => {
         alert(data.title,data.owner)
     }
      render() {
          return(
            <div>
                {
                (Object.keys(this.props.list).length > 0) ? 
                            this.props.list.map((res,i) => {
                                return (
                                    <div className="img-sec" key={i} onClick={(val) => this.showDetails(res)}>
                                        <img src={"https://farm"+res.farm+".staticflickr.com/"+res.server+"/"+res.id+"_"+res.secret+"_q.jpg"}/> 
                                        <span className="img-sec-title">{res.title.length > 0 ? res.title : "Not available"}</span>
                                    </div>
                                )
                }) : ""}
                <div className="clearfix"></div>
                <div className="see-more">
                    <input type="button" className="btn btn-lg btn-primary" onClick={this.props.moreClick} value="See More Results"/>
                </div>
            </div>
          )
      }
}
