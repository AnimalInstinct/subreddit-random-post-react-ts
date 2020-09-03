# Subreddit random post ReactJS\Redux\Saga\Typescript

App shows random post from Reddit API, used Redux and Saga for global state and side effects.

## Installation and running in dev mode

```bash
git clone git@github.com:AnimalInstinct/subreddit-random-post-react-ts.git
cd subreddit-random-post-react-ts
npm install
npm start
```

### Features

- Persistent state without dependencies
- Posts cached for 2 minutes, expired posts remove from persistentState
