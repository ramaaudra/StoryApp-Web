export default class NotFoundPage {
  async render() {
    return `
      <section class="not-found-page">
        <div class="container">
          <div class="not-found-content">
            <h1 class="not-found-title">404</h1>
            <h2 class="not-found-subtitle">Page Not Found</h2>
            <p class="not-found-description">
              The page you are looking for might have been removed,
              had its name changed, or is temporarily unavailable.
            </p>
            <div class="not-found-actions">
              <a href="#/" class="btn btn-primary">Go to Homepage</a>
              <a href="#/offline" class="btn btn-outline">Offline Content</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // No specific actions needed after render
  }
}
