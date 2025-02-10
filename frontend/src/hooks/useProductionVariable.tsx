export function isProduction() {
  return import.meta.env.PROD
}
export function isDev() {
  return import.meta.env.DEV
}
