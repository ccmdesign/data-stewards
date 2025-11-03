export interface NavigationItem {
  path: string
  label: string
}

export function useNavigation() {
  const router = useRouter()

  const formatLabel = (path: string) => {
    if (path === '/') {
      return 'Home'
    }

    const [segment] = path.split('/').filter(Boolean)
    return (segment || '')
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  }

  const items = computed<NavigationItem[]>(() => {
    const seen = new Set<string>()

    const routes = router
      .getRoutes()
      .filter(routeRecord => {
        if (!routeRecord.path) {
          return false
        }

        const segments = routeRecord.path.split('/').filter(Boolean)

        if (seen.has(routeRecord.path)) {
          return false
        }

        if (routeRecord.path !== '/' && segments.length > 1) {
          return false
        }

        if (segments.some(segment => segment.startsWith('_'))) {
          return false
        }

        if (routeRecord.path.includes(':') || routeRecord.path.includes('(')) {
          return false
        }

        const resolved = router.resolve(routeRecord.path)
        if (!resolved.matched.length) {
          return false
        }

        seen.add(routeRecord.path)
        return true
      })
      .map(routeRecord => ({
        path: routeRecord.path,
        label: formatLabel(routeRecord.path)
      }))
      .sort((a, b) => {
        if (a.path === '/') {
          return -1
        }
        if (b.path === '/') {
          return 1
        }
        if (a.path === '/contact') {
          return 1
        }
        if (b.path === '/contact') {
          return -1
        }
        return a.path.localeCompare(b.path)
      })

    return routes
  })

  return {
    items
  }
}
