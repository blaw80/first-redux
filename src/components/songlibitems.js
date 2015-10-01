import React, { Component } from 'react'

class SongNodes extends Component{
  render(){
    return(
      <tr>
        <th>{this.props.trackinfo.songtitle}</th>
        <th>{this.props.trackinfo.artist}</th>
        <th><span onClick={(e) => this.handleInfoClick(e)}>i</span></th>
        <th><span onClick={(e) => this.handleAddClick(e)}>+</span></th>
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
    let initialData = this.props.library;
    let songnodes = initialData.map(node => (<SongNodes onAddClick={this.props.onAddClick} trackinfo={node} />));

    return (
        <div className='col-md-4'>
            <h2>browse content here:</h2>
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
