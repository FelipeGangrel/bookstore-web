import { getSession } from 'next-auth/react'

import { getServerSession } from '@/libs/session'

export class FetchClient {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL
  private defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  private getSession = async () => {
    if (typeof window !== 'undefined') {
      return getSession()
    } else {
      return getServerSession()
    }
  }

  private async setAuthorization(): Promise<void> {
    const session = await this.getSession()

    if (session?.user?.jwt) {
      this.defaultOptions.headers = {
        ...this.defaultOptions.headers,
        Authorization: `Bearer ${session.user.jwt}`,
      }
    }
  }

  public setBaseUrl(url: string): this {
    this.baseUrl = url
    return this
  }

  public setOptions(options?: RequestInit): this {
    this.defaultOptions = {
      ...this.defaultOptions,
      ...options,
    }

    return this
  }

  public async fetch(url: string, options?: RequestInit): Promise<Response> {
    await this.setAuthorization()

    return fetch(`${this.baseUrl}${url}`, {
      ...this.defaultOptions,
      ...options,
    })
  }

  public async get(url: string): Promise<Response> {
    await this.setAuthorization()

    console.log('defaultOptions', this.defaultOptions)

    return fetch(`${this.baseUrl}${url}`, {
      ...this.defaultOptions,
      method: 'GET',
    })
  }

  public async post(url: string, body: any): Promise<Response> {
    await this.setAuthorization()

    return fetch(`${this.baseUrl}${url}`, {
      ...this.defaultOptions,
      method: 'POST',
      body: JSON.stringify(body),
      cache: 'no-cache',
    })
  }

  public async put(url: string, body: any): Promise<Response> {
    await this.setAuthorization()

    return fetch(`${this.baseUrl}${url}`, {
      ...this.defaultOptions,
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  public async delete(url: string): Promise<Response> {
    await this.setAuthorization()

    return fetch(`${this.baseUrl}${url}`, {
      ...this.defaultOptions,
      method: 'DELETE',
    })
  }
}
