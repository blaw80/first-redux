import { compose, createStore } from 'redux'
import { devTools, persistState } from 'redux-devtools'
import musicApp from './reducers'

const composeStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)

export default function configureStore(initialState) {
  const store = composeStore(musicApp, initialState)

  if (module.hot) {

    // Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = musicApp
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
