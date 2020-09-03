import React from 'react'
import { Saga, RootAction, RootState, Dispatch } from './types'
import { createStore as createRedux, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { saveState } from './lib/localStorage'

type Act = { type: string }

type ExtractAction<U extends Act, T extends U['type']> = Extract<U, { type: T }>

export function createStore<TState, TAction extends Act>(
  name: string,
  init: TState
) {
  const { reducer, handle: reducerHandle } = createReducer<TAction, TState>(
    init
  )
  const { saga, handle: sagaHandle } = createSaga<TState, TAction>()
  const store = createRedux<TState, TAction, {}, {}>(
    reducer,
    composeWithDevTools({
      name: `apply(${window.location.hostname}) NRGSOFT-Test - ${name}`,
    })(applyMiddleware(saga))
  )

  function withState<TExtra = {}>(
    comp: React.FunctionComponent<
      TState & TExtra & { dispatch: Dispatch<TAction> }
    >
  ) {
    const mapper = (state: TState) => ({
      ...state,
      dispatch: store.dispatch,
    })
    const Child = connect<TState, TState, {}, TState>(mapper)(comp as any)

    return (props: TExtra) => (
      <Provider store={store}>
        <Child {...props} />
      </Provider>
    )
  }
  return {
    saga: sagaHandle,
    reducer: reducerHandle,
    dispatch: store.dispatch,
    withState,
    store,
  }
}

export function createReducer<TAction extends Act, TState>(
  initialState: TState
) {
  type TReturn = Partial<TState> | void
  const handlers = new Map<TAction['type'], any>()

  const handle = <TType extends TAction['type']>(
    type: TType,
    handler:
      | ((state: TState, action: ExtractAction<TAction, TType>) => TReturn)
      | TReturn
  ) => {
    const existing = handlers.get(type)
    if (existing) {
      throw new Error(
        `Unable to mount reducer handler ${type}: Handler Already exists`
      )
    }
    handlers.set(type, handler)
  }

  const reducer = function (
    state = initialState,
    action: TAction | any
  ): TState {
    const handler = handlers.get(action.type)
    if (!handler) return state
    if (typeof handler === 'function') {
      const nextState = handler(state, action) || state
      saveState(nextState)
      return { ...state, ...nextState }
    }
    return { ...state, ...handler }
  }
  return { handle, reducer }
}

export function createSaga<
  TState = RootState,
  TAction extends { type: string } = RootAction
>() {
  const handlers = new Map<TAction['type'], any>()
  const saga: Saga<TState, TAction> = ({
    dispatch,
    getState,
  }) => next => async (action: TAction) => {
    next(action)

    const handler = handlers.get(action.type)
    if (!handler) return
    if (handler.length === 3) {
      const state = getState()
      await handler(action, dispatch, state)
      return
    }
    await handler(action, dispatch)
  }

  const handle = <TType extends TAction['type']>(
    type: TType,
    handler: (
      action: ExtractAction<TAction, TType>,
      dispatch: Dispatch<TAction>,
      getState: TState
    ) => any
  ) => {
    handlers.set(type, handler)
  }
  return { handle, saga }
}
