import { ADD_TRACK } from './actiontypes.js';
import { REMOVE_TRACK } from './actiontypes.js';
import { LOAD_LIBRARY } from './actiontypes.js';
//action creators

export function addTrack(trackinfo){
  return {type: ADD_TRACK,
          trackinfo };
}

export function removeTrack(trackinfo){
  return {type: REMOVE_TRACK,
          trackinfo };
}

export function loadLibrary(filters){
  return {type: LOAD_LIBRARY,
          filters };
}
