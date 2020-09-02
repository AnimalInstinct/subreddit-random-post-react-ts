import React from 'react'
import { Subreddit } from './Subreddit'
import styles from './subreddits.module.css'
import { withRootState } from '../../store'

export const Subreddits = withRootState(
  ({ posts }) => ({
    posts: posts.posts,
  }),
  ({ dispatch, posts }) => {
    const clickHandler = (subreddit: string) => {
      dispatch({ type: 'ADD_POST', subreddit })
    }
    return (
      <div className={styles.subreddits}>
        <div onClick={() => clickHandler('frontend')}>
          <Subreddit title={'Frontend'} />
        </div>
        <div onClick={() => clickHandler('frontend')}>
          <Subreddit title={'ReactJs'} />
        </div>
        <div onClick={() => clickHandler('frontend')}>
          <Subreddit title={'VueJs'} />
        </div>
        <div onClick={() => clickHandler('frontend')}>
          <Subreddit title={'Angular'} />
        </div>
      </div>
    )
  }
)
