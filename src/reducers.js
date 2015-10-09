import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions'

const playlist = handleActions({
  ADD_TRACK: (state, action) => ([
    ...state,
    {
      artist: action.payload.artist,
      title: action.payload.songtitle,
      url: action.payload.url,
      _id: action.payload._id,
      currentlyPlaying: false
    }
  ]),
  REMOVE_TRACK: (state, action) => state.filter((element, index) => element.key !== action.payload.key)
}, [])

const library = handleActions({
  LOAD_LIBRARY_STARTED: (state, action) => ({
    ...state,
    status: {
      songsLoaded: state.status.songsLoaded,
      message: 'Songs are loading...'
    }
  }),

  LOAD_LIBRARY_SUCCESS: (state, action) => ({
    status: {
      songsLoaded: action.payload.songs.length,
      message: 'Songs loaded successfully!'
    },
    songs: action.payload.songs
  }),

  LOAD_LIBRARY_FAIL: (state, action) => ({
    ...state,
    status: {
      songsLoaded: state.status.songsLoaded,
      message: action.payload.errorMessage
    }
  }),
}, {
  status: {
    songsLoaded: 0,
    message: 'Songs not yet requested!'
  },
  songs: []
})

const player = handleActions({
  PLAY_TRACK: (state, action) => ( {time: state.time, playing: action.payload,
                                    duration: state.duration}),
  UPDATE_TIME: (state, action) => ({playing: state.playing, time: action.payload.currentTime,
                                    duration: state.duration}),
  SET_DURATION: (state, action) => ({playing: state.playing, time: state.time,
                                    duration: action.payload}),
  TOGGLE_PLAY: (state, action) => ({time: state.time, duration: state.duration,
                                    playing: {...state.playing, currentlyPlaying: action.payload}})
}, { playing: {url: '', currentlyPlaying: false}, time: 0, duration: 1 } )

const musicApp = combineReducers({
  playlist,
  library,
  player
});

export default musicApp;
