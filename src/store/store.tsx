import * as React from 'react'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { RootState, Dispatch, RootAction } from './types'
import { connect } from 'react-redux'
import * as h from 'history'

import * as posts from './posts'

const rootReducer = (history: h.History) =>
  combineReducers<RootState>({
    router: connectRouter(history),
    posts: posts.reducer,
  } as any)

export const history = h.createBrowserHistory()

function flatMap<TIn, TOut>(arr: TIn[], f: (i: TIn) => TOut[]): TOut[] {
  return arr.reduce((x: TOut[], y: TIn) => [...x, ...f(y)], [])
}

const asyncMiddlewares = flatMap([posts.saga()], it => Array.from(it))

export const store = createAppStore()

type Comp<T> =
  | React.ComponentType<T>
  | React.Component<T>
  | React.FunctionComponent<T>

export type StateMap<T = {}> = (
  state: RootState & { dispatch: Dispatch<RootAction> }
) => T

export function withRootState<T, TProps = {}>(
  map: StateMap<T>,
  comp: Comp<T & TProps & { dispatch: Dispatch<RootAction> }>
): React.FunctionComponent<TProps> {
  const Child = connect<T, RootState, TProps, RootState>(state => ({
    ...map({ ...state, dispatch: store.dispatch }),
    dispatch: store.dispatch,
  }))(comp as any)
  return (props: TProps) => <Child {...props} />
}

export function withDispatch<TProps = {}>(
  Comp: React.FunctionComponent<TProps>
): React.FunctionComponent<TProps & { dispatch: Dispatch<RootAction> }> {
  return (props: TProps) => <Comp {...props} dispatch={store.dispatch} />
}

function createAppStore() {
  const store = createStore<RootState, RootAction, {}, {}>(
    rootReducer(history),
    composeWithDevTools({
      name: `($(window.location.hostname)) Sabai - Application`,
    })(applyMiddleware(routerMiddleware(history), ...asyncMiddlewares))
  )
  return store
}
