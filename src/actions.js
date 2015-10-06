import { createAction } from 'redux-actions'
import LibraryClient from './data-access/LibraryClient'

export const addTrack = createAction('ADD_TRACK')
export const removeTrack = createAction('REMOVE_TRACK')

export const playTrack = createAction('PLAY_TRACK')
export const updateTime = createAction('UPDATE_TIME')
export const togglePlay = createAction('TOGGLE_PLAY')

export function loadLibrary() {
  return (dispatch, getState) => {
    dispatch(loadLibraryStarted())
    LibraryClient.Create().loadSongsFrom('http://mixtape.press/play/tracklist',
                                          songs => dispatch(loadLibrarySucceeded({ songs })),
                                          errorMessage => dispatch(loadLibraryFailed({ errorMessage })))
  }
}

export const loadLibraryStarted = createAction('LOAD_LIBRARY_STARTED')
export const loadLibrarySucceeded = createAction('LOAD_LIBRARY_SUCCESS')
export const loadLibraryFailed = createAction('LOAD_LIBRARY_FAIL')
