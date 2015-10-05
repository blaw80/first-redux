import React, { Component, PropTypes } from 'react'

export default class StatusBar extends Component {
  static propTypes = {
    libraryStatus: PropTypes.object
  }

  render() {
    return (
      <div>
        <div>
          Number of loaded songs: {this.props.libraryStatus.songsLoaded}
          <br />
          <span>{this.props.libraryStatus.message}</span>
        </div>
      </div>
    )
  }
}
