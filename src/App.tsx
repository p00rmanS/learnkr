import { useEffect, useState } from 'react';
import { HashRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { db } from './lib/db';
import { getCardsDue } from './lib/srs';
import { useAppStore } from './store';
import { Home } from './pages/Home';
import { Path } from './pages/Path';
import { LessonPlayer } from './pages/LessonPlayer';
import { Letters } from './pages/Letters';
import { Build } from './pages/Build';
import { Review } from './pages/Review';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/learn', label: 'Road' },
  { to: '/hangul', label: 'Letters' },
  { to: '/syllables', label: 'Build' },
  { to: '/review', label: 'Review' },
];

function Shell() {
  const setProgress = useAppStore((s) => s.setProgress);
  const completed = useAppStore((s) => s.progress.completedLessons.length);
  const [ready, setReady] = useState(false);
  const [due, setDue] = useState(0);
  const { pathname } = useLocation();

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

  useEffect(() => {
    db.reviewCards.toArray().then((c) => setDue(getCardsDue(c).length)).catch(() => setDue(0));
  }, [completed, pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!ready) return null;
  const inLesson = pathname.startsWith('/learn/');

  return (
    <>
      {!inLesson && (
        <header className="topbar">
          <NavLink to="/" className="logo"><i />한글길</NavLink>
          <nav aria-label="Main">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'on' : '')}>
                {n.label}
                {n.to === '/review' && due > 0 && <span className="badge">{due > 99 ? '99+' : due}</span>}
              </NavLink>
            ))}
          </nav>
        </header>
      )}
      {inLesson ? (
        <Routes><Route path="/learn/:id" element={<LessonPlayer />} /></Routes>
      ) : (
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Path />} />
            <Route path="/hangul" element={<Letters />} />
            <Route path="/syllables" element={<Build />} />
            <Route path="/review" element={<Review />} />
          </Routes>
        </main>
      )}
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
