import React, { Fragment } from 'react'
import './App.css'

import { Subreddits } from './components/Subreddits'
import { Posts } from './components/Posts'

function App() {
  return (
    <Fragment>
      <Subreddits />
      <Posts />
    </Fragment>
  )
}

export default App
