/** Developer Mode is available in development builds only. */
export const DEVELOPER_MODE_AVAILABLE = import.meta.env.DEV

export type DeveloperToolFlags = {
  hud: boolean
  helpers: boolean
  labels: boolean
}

export const ALL_DEVELOPER_TOOLS_ON: DeveloperToolFlags = {
  hud: true,
  helpers: true,
  labels: true,
}

export const ALL_DEVELOPER_TOOLS_OFF: DeveloperToolFlags = {
  hud: false,
  helpers: false,
  labels: false,
}
