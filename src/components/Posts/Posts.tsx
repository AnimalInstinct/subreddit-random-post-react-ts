import React from 'react'
import { withRootState } from '../../store'

export const Posts = withRootState(
  ({ posts }) => ({
    posts: posts.posts,
  }),
  ({ dispatch, posts }) => {
    return (
      <div className="posts">
        {posts.map(post => (
          <div className="post">{post.title}</div>
        ))}
      </div>
    )
  }
)
