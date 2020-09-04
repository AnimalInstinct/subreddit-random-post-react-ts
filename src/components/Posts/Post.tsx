import React from 'react'
import style from './posts.module.css'
import { ReactComponent as TrashIcon } from './img/bin.svg'
import { ReactComponent as HeartIcon } from './img/heart.svg'
import { ReactComponent as FrontendIcon } from './img/frontend.svg'
import { ReactComponent as AngularIcon } from './img/angular.svg'
import { ReactComponent as ReactIcon } from './img/react.svg'
import { ReactComponent as VueIcon } from './img/vuejs.svg'
import { withRootState } from '../../store'

type PostProps = {
  title: string
  liked: boolean
  permalink: string
  subreddit: string
}

export const Post: React.FunctionComponent<PostProps> = withRootState(
  ({ posts }) => ({ posts: posts.posts }),
  ({ subreddit, title, liked, permalink, dispatch }) => {
    const deleteHandler = (title: string) => {
      dispatch({ type: 'DELETE_POST', title })
    }

    const likeHandler = (title: string) => {
      dispatch({ type: 'LIKE_POST', title })
    }

    const icon = () => {
      switch (subreddit) {
        case 'Frontend':
          return <FrontendIcon width="100%" height="100%" />
        case 'reactjs':
          return <ReactIcon width="100%" height="100%" />
        case 'vuejs':
          return <VueIcon width="100%" height="100%" />
        case 'angular':
          return <AngularIcon width="100%" height="100%" />
        default:
          break
      }
    }
    return (
      <div className={style.post}>
        <div className={style.controls}>
          <div className={style.icon}>{icon()}</div>
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
        <div
          onClick={() =>
            window.open(`https://reddit.com/${permalink}`, '_blank')
          }
          className={style.title}
        >
          {title}
        </div>
      </div>
    )
  }
)
