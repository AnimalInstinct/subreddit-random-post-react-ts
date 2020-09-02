import { Post } from './types'

export type AddPost = {
  type: 'ADD_POST'
  subreddit: string
}

export type PostAdded = {
  type: 'POST_ADDED'
  post: Post
}

export type PostsAction = AddPost | PostAdded
