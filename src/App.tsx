import React from 'react'

import { Subreddits } from './components/Subreddits'
import { Posts } from './components/Posts'

function App() {
  return (
    <div className="app">
      <Subreddits />
      <Posts />
    </div>
  )
}

export default App
