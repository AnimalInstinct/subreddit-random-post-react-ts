import styled, { keyframes } from 'styled-components'

export const animation = (distance: number) => keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(${distance}px);
  }
  100% {
    transform: translateX(0);
  }
`

export const SubredditAnimated = styled('div')<{ distance: number }>`
  animation: ${({ distance }) => animation(distance - 160)} 8s linear 0s
    infinite;
  &:hover {
    animation-play-state: paused;
  }
  transition: all 0.25s linear;
`
