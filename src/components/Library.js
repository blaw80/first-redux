import React, { Component } from 'react'

class Song extends Component{
  render(){
    return(
      <tr>
        <th>{this.props.trackinfo.songtitle}</th>
        <th>{this.props.trackinfo.artist}</th>
        <th><span className="infobutton fa fa-info-circle fa-lg" onClick={(e) => this.handleInfoClick(e)}>
        </span></th>
        <th><span className="addtoplaylist fa fa-plus-circle fa-lg" onClick={(e) => this.handleAddClick(e)}></span></th>
    </tr>
    );
  }
  handleInfoClick(e){
    alert(this.props.trackinfo.url);
  }
  handleAddClick(e){
    this.props.onAddClick(this.props.trackinfo);
    }
}

export default class Library extends Component {
  render(){
    let initialData = this.props.songs;
    let songnodes = initialData.map((node, index) => <Song key={index} onAddClick={this.props.onAddClick} trackinfo={node} />);

    return (
        <div className='col-md-4'>
            <h4>music library</h4>
            <table className='table'>
            <thead>
              <tr><td>Song</td><td>Artist</td><td>info</td><td>add</td></tr>
            </thead>
            <tbody>
              {songnodes}
            </tbody>
            </table>
        </div>
      );
  }
}
