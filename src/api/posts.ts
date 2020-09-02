import http from './http'

export async function getPosts(subreddit: string): Promise<any> {
  console.log(subreddit)
  const { data } = await http.get(`https://www.reddit.com/r/${subreddit}.json`)
  return data
}
