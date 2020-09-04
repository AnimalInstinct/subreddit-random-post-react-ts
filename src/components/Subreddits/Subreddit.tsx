import React from 'react'
import styles from './subreddits.module.css'
import { withRootState } from '../../store'
import useWindowDimensions from './hooks/useWindowDimensions'
import { SubredditAnimated } from './lib/animations'

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
    const window = useWindowDimensions()
    return (
      <SubredditAnimated
        onClick={() => clickHandler(subreddit)}
        className={styles.subreddit}
        distance={window.width}
      >
        <div className={styles.title}>{title}</div>
      </SubredditAnimated>
    )
  }
)
