'use client'

import { HydrationBoundary, DehydratedState } from '@tanstack/react-query'

interface Props {
  children: React.ReactNode
  state: DehydratedState
}

export default function HydrateClient({ children, state }: Props) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>
}
