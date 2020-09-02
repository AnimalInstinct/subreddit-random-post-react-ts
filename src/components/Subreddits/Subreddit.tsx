import React from 'react'
import styles from './subreddits.module.css'
import { withRootState } from '../../store'

type SubredditProps = {
  title: string
  subreddit: string
}

export const Subreddit: React.FunctionComponent<SubredditProps> = withRootState(
  () => ({}),
  ({ title, subreddit, dispatch }) => {
    const clickHandler = (subreddit: string) => {
      dispatch({ type: 'ADD_POST', subreddit })
    }
    return (
      <div onClick={() => clickHandler(subreddit)} className={styles.subreddit}>
        <div className={styles.title}>{title}</div>
      </div>
    )
  }
)
