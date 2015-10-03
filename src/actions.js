import { createAction } from 'redux-actions'
import $ from 'jquery'

export const addTrack = createAction('ADD_TRACK')
export const removeTrack = createAction('REMOVE_TRACK')
export const loadLibrary = createAction('LOAD_LIBRARY')

export const playTrack = createAction('PLAY_TRACK')


// this is some stuff i haven't got working yet:

let ajaxHelper =  $.getJSON( "http://mixtape.press/play/tracklist")
.done( json =>  {
  console.log( "JSON Data loaded");

  let dispatch = dispatch;
/* dispatch succcess action */
// dispatch(loadSongsSuccess(json))
})
.fail( ( jqxhr, textStatus, error ) => {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
    /* dispatch failure action */
});

export const loadSongs = createAction('LOAD_SONGS', param => ( ajaxHelper ) )


function logSuccess(){ console.log('data loaded sucessfuly') }

const loadSongsFailure = createAction('LOAD_SONGS_SUCCESS', () => logSuccess )
const loadSongsSuccess = createAction('LOAD_SONGS_FAILURE')
