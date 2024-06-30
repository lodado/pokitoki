/* eslint-disable turbo/no-undeclared-env-vars */
const config = {
  // @ts-ignore
  serverUrl: process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000',
}

class Logger {
  info(msg: string) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      type: 'application/json',
    }
    const blob = new Blob([JSON.stringify({ time: Date.now(), msg })], headers)
    navigator.sendBeacon(`${config.serverUrl}/api/log`, blob)
  }
}

const logger = new Logger()

export { logger }
