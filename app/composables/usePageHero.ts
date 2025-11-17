import type { ButtonProps } from '#ui/types'

export interface HeroStat {
  value: string
  label: string
}

export interface PageHeroData {
  title?: string
  subtitle?: string
  description?: string
  badge?: string
  stats?: HeroStat[]
  links?: ButtonProps[]
  showHero?: boolean
}

const pageHeroData = ref<PageHeroData | null>(null)

export function usePageHero() {
  const setPageHero = (data: PageHeroData) => {
    pageHeroData.value = data
  }

  const clearPageHero = () => {
    pageHeroData.value = null
  }

  return {
    heroData: readonly(pageHeroData),
    setPageHero,
    clearPageHero
  }
}
