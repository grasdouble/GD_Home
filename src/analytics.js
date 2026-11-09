export function setupAnalytics(measurementId) {
  if (!measurementId || typeof window === 'undefined') return () => {};

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  const scriptId = 'google-analytics-script';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.append(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  function handleLinkClick(event) {
    const anchor = event.target.closest?.('a[href]');
    if (!anchor) return;

    const linkText = anchor.getAttribute('aria-label') || anchor.textContent.trim();
    window.gtag('event', 'link_click', {
      link_id: anchor.dataset.analyticsLink || linkText || anchor.href,
      link_text: linkText,
      link_url: anchor.href,
      link_domain: anchor.hostname,
      link_location: anchor.closest('header') ? 'header' : anchor.closest('footer') ? 'footer' : 'main',
    });
  }

  document.addEventListener('click', handleLinkClick);
  return () => document.removeEventListener('click', handleLinkClick);
}
