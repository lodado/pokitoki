import React from 'react'

export type logParams = string | Record<string, string>

export type ReactEventHandlers = {
  [K in keyof React.DOMAttributes<HTMLElement>]: K extends `on${infer _}` ? K : never
}
