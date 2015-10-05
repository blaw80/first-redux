
export default class LibraryClient {

  loadSongsFrom(url, successCallback, errorCallback) {

    fetch(url).then(r => r.json())
      .then(data => successCallback(data))
      .catch(e => errorCallback("Loading error"))
  }

  static Create() {
    return new LibraryClient()
  }
}
