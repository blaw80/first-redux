import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions'
import initialLibraryRecords from './initialLibraryRecords'

const playlist = handleActions({
  ADD_TRACK: (state, action) => ([
    ...state,
    {
      artist: action.payload.artist,
      title: action.payload.songtitle,
      url: action.payload.url,
      _id: action.payload._id
    }
  ]),
  REMOVE_TRACK: (state, action) => state.filter((element, index) => element.key !== action.payload.key)
}, [])

const library = handleActions({
  LOAD_LIBRARY: (state, action) => state
}, initialLibraryRecords)

const player = handleActions({
  PLAY_TRACK: (state = {}, action) => ([
    ...state,
    {
      artist: action.payload.artist,
      title: action.payload.songtitle,
      url: action.payload.url,
    }
  ])
})

const musicApp = combineReducers({
  playlist,
  library,
  player
});

export default musicApp;
