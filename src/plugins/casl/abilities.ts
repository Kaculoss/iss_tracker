import { defineAbility } from '@casl/ability'
import { Actions, Subjects } from './ability'

type Inverted = true | false

interface UserAbility {
  action: Actions
  subject: Subjects
  inverted?: Inverted
  condition?: any
}

const defaultAbility: UserAbility[] = [
  {
    action: 'read',
    subject: 'Auth'
  }
]

const getDefaultAbilities = () => {
  return defaultAbility
}

const getNewAbilities = () => {
  const stringifiedUserAbilities = localStorage.getItem('userAbilities')

  const newAbility = stringifiedUserAbilities
    ? JSON.parse(stringifiedUserAbilities).map(function (a: any) {
        return { action: a.action, subject: a.subject }
      })
    : null

  const finalAbility = [...newAbility, ...defaultAbility] || defaultAbility

  return finalAbility
}

const initialAbility = defineAbility((can, cannot) => {
  defaultAbility.forEach(function (a: UserAbility) {
    if (a.inverted) {
      cannot(a.action, a.subject, a.condition ?? undefined)
    } else {
      can(a.action, a.subject, a.condition ?? undefined)
    }
  })
})

export type { Actions, Subjects, Inverted, UserAbility }
export { getDefaultAbilities, getNewAbilities, initialAbility as default }
