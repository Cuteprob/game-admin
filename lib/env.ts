export function getEnvVariable(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue
  if (!value) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error(`Missing required environment variable: ${key}`)
    }
    return defaultValue || ''
  }
  return value
} 