import { PostsAction } from './action'
import { Post } from './types'
import { createReducer } from '../create'
import { loadState, saveState } from '../lib/localStorage'

export interface PostsState {
  posts: Post[]
}

const persistedState = loadState()

// If cache older than 2 min remove post from state
function checkCache() {
  let posts: Post[] = persistedState.posts
  let passedPosts: Post[] = []
  posts.map(post => {
    let diff = (new Date(post.cached).getTime() - new Date().getTime()) / 1000
    const diffInMin = Math.abs(Math.round((diff /= 60)))
    if (diffInMin < 2) {
      passedPosts.push(post)
    }
    return null
  })
  saveState({ posts: passedPosts })
  return passedPosts
}

const initState: PostsState = {
  posts: persistedState ? checkCache() : [],
}

const { handle, reducer } = createReducer<PostsAction, PostsState>(initState)

export { reducer }

handle('ADD_POST', state => {
  return state
})

handle('POST_ADDED', (state, action) => {
  const oldState = { ...state }
  let posts = oldState.posts as Post[]
  const double = posts.find(item => item.title === action.post.title)
  if (!double) {
    const newPosts = [...state.posts, action.post]
    return {
      ...state,
      posts: newPosts,
    }
  } else {
    return state
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
