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
  const posts = [...state.posts, action.post]
  return {
    ...state,
    posts,
  }
})

handle('DELETE_POST', (state, action) => {
  const posts = state.posts.filter(item => item.title !== action.title)
  return { ...state, posts }
})

handle('LIKE_POST', (state, action) => {
  const posts = state.posts.map(post => {
    if (post.title !== action.title) {
      return post
    }
    post.liked = !post.liked
    return {
      ...post,
      ...action,
    }
  })
  return { ...state, posts }
})
