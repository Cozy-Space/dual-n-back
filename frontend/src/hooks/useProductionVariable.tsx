export function isProduction() {
  console.log('import.meta.env.PROD', import.meta.env.PROD)
  return import.meta.env.PROD
}
export function isDev() {
  return import.meta.env.DEV
}
