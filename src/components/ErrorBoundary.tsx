import { Component, type ErrorInfo, type ReactNode } from 'react';

interface State {
  error: Error | null;
}

/** Keeps a bug in one screen from turning the whole app into a blank page. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Screen crashed', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="crash">
        <div className="crash-ko kr">앗!</div>
        <h1 className="h-page">Something broke on this screen.</h1>
        <p className="lede">Your progress is safe: it is saved on this device. Reload the page, or go back home.</p>
        <div className="row" style={{ marginTop: 28, justifyContent: 'center' }}>
          <button type="button" className="btn" onClick={() => window.location.reload()}>Reload</button>
          <a className="btn ghost" href="#/" onClick={() => this.setState({ error: null })}>Go home</a>
        </div>
      </div>
    );
  }
}
