import librarySongs from '../mocks/librarySongs'

export default class LibraryClient {

  // Just a silly method that randomly succeeds or fails loading mock data
  // 'url' makes no difference here
  loadSongsFrom(url, successCallback, errorCallback) {

    // Timeout is used to mimic server response delay
    setTimeout(() => {

      if (generateRandomNumber() > 5) {
        console.log('Luck!')
        successCallback(librarySongs)
      } else {
        console.log('No luck!')
        errorCallback('Error loading songs!')
      }
    }, 2000)
  }

  static Create() {
    return new LibraryClient()
  }
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 10)
}
