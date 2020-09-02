import { RootMiddleware } from '..'
import { PostsAction } from './action'
import * as api from '../../api'
import { random } from 'lodash'

export function* saga(): RootMiddleware {
  yield ({ dispatch }) => next => async (action: PostsAction) => {
    next(action)
    switch (action.type) {
      case 'ADD_POST': {
        const {
          data: { dist, children },
        } = await api.getPosts(action.subreddit)
        const { data } = children[random(dist - 1)]
        const post = data
        post.liked = false
        return dispatch({ type: 'POST_ADDED', post })
      }
    }
  }
}
