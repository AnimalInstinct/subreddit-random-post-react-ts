import React from 'react'
import style from './posts.module.css'
import { ReactComponent as TrashIcon } from './img/bin.svg'
import { ReactComponent as HeartIcon } from './img/heart.svg'
import { withRootState } from '../../store'

type PostProps = {
  title: string
  liked: boolean
}

export const Post: React.FunctionComponent<PostProps> = withRootState(
  ({ posts }) => ({ posts: posts.posts }),
  ({ title, liked, dispatch }) => {
    const deleteHandler = (title: string) => {
      dispatch({ type: 'DELETE_POST', title })
    }

    const likeHandler = (title: string) => {
      dispatch({ type: 'LIKE_POST', title })
    }
    return (
      <div className={style.post}>
        <div className={style.controls}>
          <div className={style.icon}>
            <TrashIcon
              onClick={ev => deleteHandler(title)}
              width="100%"
              height="100%"
            />
          </div>
          <div className={style.icon}>
            <HeartIcon
              onClick={ev => likeHandler(title)}
              width="100%"
              height="100%"
              fill={liked ? 'red' : 'grey'}
            />
          </div>
        </div>
        <div className={style.title}>{title}</div>
      </div>
    )
  }
)
