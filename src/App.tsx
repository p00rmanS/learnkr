import { useEffect, useState } from 'react';
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';
import { db } from './lib/db';
import { useAppStore } from './store';
import { Home } from './pages/Home';
import { Path } from './pages/Path';
import { LessonPlayer } from './pages/LessonPlayer';
import { Letters } from './pages/Letters';
import { Build } from './pages/Build';
import { Review } from './pages/Review';

const NAV = [
  { to: '/', label: 'Today', ko: '오늘', end: true },
  { to: '/learn', label: 'Road', ko: '길' },
  { to: '/hangul', label: 'Letters', ko: '글자' },
  { to: '/syllables', label: 'Build', ko: '만들기' },
  { to: '/review', label: 'Review', ko: '복습' },
];

function Shell() {
  const setProgress = useAppStore((s) => s.setProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await db.progress.toCollection().first();
        if (saved) setProgress(saved);
        else {
          const base = useAppStore.getState().progress;
          const id = await db.progress.add(base);
          setProgress({ ...base, id });
        }
      } catch (e) {
        console.error('Failed to load progress', e);
      } finally {
        setReady(true);
      }
    })();
  }, [setProgress]);

  if (!ready) return null;

  return (
    <div className="shell">
      <aside className="rail">
        <NavLink to="/" className="brand">
          한글길
          <small>Hangeul-gil</small>
        </NavLink>
        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'on' : '')}>
              {n.label}
              <span>{n.ko}</span>
            </NavLink>
          ))}
        </nav>
        <p className="rail-foot">Progress is saved on this device only.</p>
      </aside>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Path />} />
          <Route path="/learn/:id" element={<LessonPlayer />} />
          <Route path="/hangul" element={<Letters />} />
          <Route path="/syllables" element={<Build />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
