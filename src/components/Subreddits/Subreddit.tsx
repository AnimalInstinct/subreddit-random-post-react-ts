import React from 'react'
import styles from './subreddits.module.css'

type SubredditProps = {
  title: string
}

export const Subreddit = (props: SubredditProps) => {
  const { title } = props
  return (
    <div className={styles.subreddit}>
      <div className={styles.title}>{title}</div>
    </div>
  )
}
