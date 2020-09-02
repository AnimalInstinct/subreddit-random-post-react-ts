import React from 'react'
import { Subreddit } from './Subreddit'
import { withRootState } from '../../store'
import styles from './subreddits.module.scss'

export const Subreddits = withRootState(
  ({ posts }) => ({
    posts: posts.posts,
  }),
  () => {
    return (
      <div className={styles.subreddits}>
        <Subreddit subreddit={'frontend'} title={'Frontend'} />
        <Subreddit subreddit={'reactjs'} title={'ReactJs'} />
        <Subreddit subreddit={'vuejs'} title={'VueJs'} />
        <Subreddit subreddit={'angular'} title={'Angular'} />
      </div>
    )
  }
)
