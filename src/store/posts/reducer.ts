import { PostsAction } from './action'
import { Post } from './types'
import { createReducer } from '../create'

export interface PostsState {
  posts: Post[]
}

const initState: PostsState = {
  posts: [],
}

const { handle, reducer } = createReducer<PostsAction, PostsState>(initState)

export { reducer }

handle('ADD_POST', state => {
  return state
})

handle('POST_ADDED', (state, action) => {
  const posts = [...state.posts, action.post] as Post[]
  return {
    ...state,
    posts: posts,
  }
})
