import React from 'react'
import { withRootState } from '../../store'
import { Post } from './Post'
import style from './posts.module.css'

export const Posts = withRootState(
  ({ posts }) => ({
    posts: posts.posts,
  }),
  ({ dispatch, posts }) => {
    return posts.length > 0 ? (
      <div className={style.posts}>
        {posts.map(post => (
          <Post
            permalink={post.permalink}
            key={post.title}
            title={post.title}
            liked={post.liked}
          />
        ))}
      </div>
    ) : null
  }
)
