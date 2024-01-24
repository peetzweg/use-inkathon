// sum.test.js
import { expect, test } from 'vitest'

import { renderHook } from '@testing-library/react'

import { SubstrateDeployment, UseInkathonProvider, rococo, useInkathon } from '@/index'

const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  return [
    {
      contractId: 'Contract',
      networkId: rococo.network,
      abi: {},
      address: '5EnufwqqxnkWT6hc1LgjYWQGUsqQCtcr5192K2HuQJtRJgCi',
    },
  ]
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <UseInkathonProvider appName="Unit Test" defaultChain={rococo} deployments={getDeployments()}>
      {children}
    </UseInkathonProvider>
  )
}

test('useInkathon()', async () => {
  // const { result } = renderHook(() => useRegisteredContract('Contract'), {
  //   wrapper: () =>
  //     createElement(
  //       UseInkathonProvider,
  //       { appName: 'Unit Test', defaultChain: rococo, deployments: getDeployments() },
  //       [],
  //     ),
  // })
  const { result, rerender } = renderHook(() => useInkathon(), {
    wrapper: AllTheProviders,
  })
  console.log({ result })

  expect(result.current.isInitialized).toBe(false)
  expect(result.current.connect).toBeDefined()
  await result.current.connect!()
  rerender()
  expect(result.current.isInitialized).toBe(true)
  // expect(result.current.activeChain).toBeDefined()
  // expect(result.current.deployments).toBeDefined()
})
