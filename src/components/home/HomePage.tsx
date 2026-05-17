import { useState, useMemo } from 'react'
import type { City } from '@/data/types'
import type { MeasureTextFn } from '@/lib/locationLabel'
import {
  computeHeaderLocationLabel,
  createCanvasMeasureText,
} from '@/lib/locationLabel'
import { DEFAULT_RADIUS_MILES } from '@/data/constants'
import { HeaderShell } from './HeaderShell'
import { MainContentShell } from './MainContentShell'
import { CategoryTabBar } from '@/components/CategoryTabBar'
import { LocationModal } from '@/components/location/LocationModal'
import { Footer } from '@/components/Footer'

const LOCATION_LABEL_MAX_WIDTH = 160

interface HomePageProps {
  measureTextOverride?: MeasureTextFn
}

export function HomePage({ measureTextOverride }: HomePageProps = {}) {
  const [selectedCities, setSelectedCities] = useState<City[]>([
    { id: 'city_boston', name: 'Boston' },
  ])
  const [radiusMiles, setRadiusMiles] = useState<number>(DEFAULT_RADIUS_MILES)
  const [hasEditedRadius, setHasEditedRadius] = useState<boolean>(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false)
  const [locationJustApplied, setLocationJustApplied] = useState<boolean>(false)
  const [headerSearchQuery, setHeaderSearchQuery] = useState<string>('')
  const [modalCityQuery, setModalCityQuery] = useState<string>('')
  const [activeTab, setActiveTab] = useState<string>('community')

  const handleSearchQueryChange = (query: string) => {
    setHeaderSearchQuery(query)
    if (query.length > 0) setActiveTab('all')
  }

  const clearSearch = () => setHeaderSearchQuery('')

  const canvasMeasureText = useMemo(() => createCanvasMeasureText(), [])
  const measureText = measureTextOverride ?? canvasMeasureText
  const locationLabel = useMemo(
    () =>
      computeHeaderLocationLabel(
        selectedCities,
        radiusMiles,
        hasEditedRadius,
        LOCATION_LABEL_MAX_WIDTH,
        measureText,
      ),
    [selectedCities, radiusMiles, hasEditedRadius, measureText],
  )

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-bg-page)', display: 'flex', flexDirection: 'column' }}
    >
      <div className="app-container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HeaderShell
          headerSearchQuery={headerSearchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          locationLabel={locationLabel}
          onLocationClick={() => setIsLocationModalOpen(true)}
          locationJustApplied={locationJustApplied}
          onLocationHighlightDismiss={() => setLocationJustApplied(false)}
        />

        <CategoryTabBar activeTab={activeTab} onTabChange={setActiveTab} />

        <div style={{ flex: 1 }}>
          <MainContentShell
            activeTab={activeTab}
            searchQuery={headerSearchQuery}
            onClearSearch={clearSearch}
          />
        </div>

        <Footer />
      </div>

      <LocationModal
        open={isLocationModalOpen}
        onOpenChange={setIsLocationModalOpen}
        selectedCities={selectedCities}
        setSelectedCities={setSelectedCities}
        radiusMiles={radiusMiles}
        setRadiusMiles={setRadiusMiles}
        hasEditedRadius={hasEditedRadius}
        setHasEditedRadius={setHasEditedRadius}
        modalCityQuery={modalCityQuery}
        setModalCityQuery={setModalCityQuery}
        onApply={() => setLocationJustApplied(true)}
      />
    </div>
  )
}
