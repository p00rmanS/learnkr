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
import { StoryList, StoryReader } from './pages/Stories';
import { Kids } from './pages/Kids';
import { Phrasebook } from './pages/Phrasebook';
import { Settings } from './pages/Settings';
import { ErrorBoundary } from './components/ErrorBoundary';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/learn', label: 'Road' },
  { to: '/stories', label: 'Stories' },
  { to: '/kids', label: 'Kids' },
  { to: '/hangul', label: 'Letters' },
  { to: '/phrases', label: 'Phrases' },
  { to: '/review', label: 'Review' },
];

const TITLES: [string, string][] = [
  ['/learn/', 'Lesson'],
  ['/learn', 'The road'],
  ['/stories', 'Stories'],
  ['/kids', 'Kids'],
  ['/hangul', 'Letters'],
  ['/syllables', 'Build a syllable'],
  ['/phrases', 'Phrasebook'],
  ['/review', 'Review'],
  ['/settings', 'Settings'],
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
    const hit = TITLES.find(([p]) => pathname.startsWith(p));
    document.title = `${hit ? hit[1] + ' · ' : ''}한글길 Hangeul-gil`;
  }, [pathname]);

  if (!ready) return <div className="splash"><span className="kr">한글길</span></div>;
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
          <NavLink to="/settings" className={({ isActive }) => `gear ${isActive ? 'on' : ''}`} aria-label="Settings" title="Settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" /></svg>
          </NavLink>
        </header>
      )}
      {inLesson ? (
        <ErrorBoundary key={pathname}><Routes><Route path="/learn/:id" element={<LessonPlayer />} /></Routes></ErrorBoundary>
      ) : (
        <main>
          <ErrorBoundary key={pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Path />} />
            <Route path="/stories" element={<StoryList />} />
            <Route path="/stories/:id" element={<StoryReader />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/hangul" element={<Letters />} />
            <Route path="/syllables" element={<Build />} />
            <Route path="/review" element={<Review />} />
            <Route path="/phrases" element={<Phrasebook />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Home />} />
          </Routes>
          </ErrorBoundary>
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
