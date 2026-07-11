export type InteractionType = 'inspect'

export type InspectableConfig = {
  displayName: string
  interactionType: InteractionType
  interactionPrompt: string
  historyGeneratorId: string
  panelTitle: string
}
