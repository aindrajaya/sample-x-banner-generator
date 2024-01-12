import { HomeIcon } from '@heroicons/react/solid'

export const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
]
export const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}