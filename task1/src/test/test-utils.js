import { afterEach, expect, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

global.expect = expect
global.vi = vi

afterEach(() => {
  cleanup()
})