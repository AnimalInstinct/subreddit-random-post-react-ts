import { Dispatch as ReduxDispatch } from 'redux'
import * as posts from './posts'

export type Dispatch<TAction extends { type: string }> = (
  action: TAction
) => void

export interface RootState {
  posts: posts.PostsState
}

export interface MiddlewareAPI<
  S = RootState,
  A extends { type: string } = RootAction
> {
  dispatch: ReduxDispatch<A>
  getState(): S
}

export interface Middleware<
  S = RootState,
  A extends { type: string } = RootAction
> {
  (api: MiddlewareAPI<S, A>): (next: ReduxDispatch<A>) => (action: any) => any
}

export type Saga<
  S = RootState,
  A extends { type: string } = RootAction
> = Middleware<S, A>

export type RootMiddleware = IterableIterator<Saga>

export type RootAction = posts.PostsAction
