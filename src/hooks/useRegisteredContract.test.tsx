// sum.test.js
import { expect, test } from 'vitest'

import { SubstrateDeployment, UseInkathonProvider, rococo, useRegisteredContract } from '@/index'
import { renderHook } from '@testing-library/react'
import abi from './basic_contract_caller.json'

const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  return [
    {
      contractId: 'Contract',
      networkId: rococo.network,
      abi: abi,
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

test('adds 1 + 2 to equal 3', () => {
  const { result } = renderHook(() => useRegisteredContract('Contract', rococo.network), {
    wrapper: AllTheProviders,
  })
  console.log({ result })
  expect(result.current).toBeDefined()
  expect(result.current.address).toBeDefined()
  expect(result.current.contract).toBeDefined()
})
