import { Post } from './types'

export type AddPost = {
  type: 'ADD_POST'
  subreddit: string
}

export type PostAdded = {
  type: 'POST_ADDED'
  post: Post
}

export type DeletePost = {
  type: 'DELETE_POST'
  title: string
}

export type LikePost = {
  type: 'LIKE_POST'
  title: string
}

export type PostsAction = AddPost | PostAdded | DeletePost | LikePost
