import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { LandingPage } from './pages/LandingPage'
import { WorldMapPage } from './pages/WorldMapPage'
import { RegionPage } from './pages/RegionPage'
import { EncounterPage } from './pages/EncounterPage'
import { QuestDetailPage } from './pages/QuestDetailPage'
import { CardLibraryPage } from './pages/CardLibraryPage'
import { ProfilePage } from './pages/ProfilePage'
import { JournalPage } from './pages/JournalPage'
import { useGameState } from './state/GameStateProvider'
import { useAchievementWatcher } from './hooks/useAchievementWatcher'

function App() {
  useAchievementWatcher()
  const navigate = useNavigate()
  const { state, reset } = useGameState()

  const handleReset = () => {
    if (window.confirm('Reset all progress? You will lose XP, unlocks, and completed quests.')) {
      reset()
      navigate('/')
    }
  }

  return (
    <div className="br-root">
      <header className="br-header">
        <div className="br-header-title">
          <span className="br-logo-mark">⚙︎</span>
          <div>
            <div className="br-title-main">Beltway Realms</div>
            <div className="br-title-sub">
              A parchment chart of the Northern Virginia / D.C. realms
            </div>
          </div>
        </div>
        <div className="br-header-right">
          <div className="br-status-bar">
            <span className="br-status-xp">{state.xp} XP</span>
            <span className="br-status-quests">
              {state.completedQuestIds.length} quests
            </span>
          </div>
          <nav className="br-nav">
            <NavLink to="/" end className="br-nav-link">
              Intro
            </NavLink>
            <NavLink to="/map" className="br-nav-link">
              World Map
            </NavLink>
            <NavLink to="/cards" className="br-nav-link">
              Cards
            </NavLink>
            <NavLink to="/journal" className="br-nav-link">
              Journal
            </NavLink>
            <NavLink to="/profile" className="br-nav-link">
              Profile
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="br-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<WorldMapPage />} />
          <Route path="/region/:regionId" element={<RegionPage />} />
          <Route
            path="/encounter/:regionId/:questId"
            element={<EncounterPage />}
          />
          <Route path="/quest/:questId" element={<QuestDetailPage />} />
          <Route path="/cards" element={<CardLibraryPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      <footer className="br-footer">
        <span>Local-only MVP. No accounts, no servers.</span>
        <span className="br-footer-dot">•</span>
        <span title="Build identifier">v2</span>
        <span className="br-footer-dot">•</span>
        <span>Built for quick reskinning and iteration.</span>
        <span className="br-footer-dot">•</span>
        <button
          type="button"
          className="br-footer-reset"
          onClick={handleReset}
          title="Reset progress and start over"
        >
          Reset progress
        </button>
      </footer>
    </div>
  )
}

export default App
