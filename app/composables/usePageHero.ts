import type { ButtonProps } from '#ui/types'

export interface PageHeroData {
  title?: string
  subtitle?: string
  description?: string
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
