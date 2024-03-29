import {
  HomeIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DesktopSidebar = () => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4">
      <div className="flex h-16 shrink-0 items-center justify-center">
        <img
          className="h-8 w-auto"
          src="/pena.png"
          alt="Your Company"
        />
      </div>
      <nav className="mt-8">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
                  'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold'
                )}
              >
                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span className="sr-only">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default DesktopSidebar