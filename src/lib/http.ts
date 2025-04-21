import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { HTTPError, RaybotError } from '@/types/error'
import axios, { isAxiosError } from 'axios'
import { useNProgress } from './nprogress'

export type RaybotHTTPClient = AxiosInstance

const nprogress = useNProgress()

/**
 * Create a HTTP client with a base URL
 * @param raybotAPIURL - The base URL of the API
 * @returns Raybot HTTP client
 */
export function createRaybotHTTPClient(raybotAPIURL: string): RaybotHTTPClient {
  const instance = axios.create({
    baseURL: `${raybotAPIURL}/api/v1`,
    timeout: 20000,
    headers: { 'Content-Type': 'application/json' },
  })

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (!config.doNotShowLoading) {
        nprogress.start()
      }

      return config
    },
    (err) => {
      nprogress.done()
      return Promise.reject(err)
    },
  )

  instance.interceptors.response.use(
    (response) => {
      nprogress.done()
      return Promise.resolve(response.data)
    },
    (error) => {
      nprogress.done()

      if (isAxiosError(error) && error.response && error.response.data) {
        const { status } = error.response
        const { message, code, details } = error.response.data

        if (status >= 400 && status < 500) {
          return Promise.reject(new RaybotError(message, status, code, details))
        }

        return Promise.reject(new HTTPError(message || 'Unexpected error', status))
      }

      return Promise.reject(error)
    },
  )

  return instance
}
