import { afterEach, beforeEach, expect, it } from 'vitest';
import { setupAnalytics } from './analytics.js';

beforeEach(() => {
  delete window.gtag;
  delete window.dataLayer;
  document.getElementById('google-analytics-script')?.remove();
  document.body.innerHTML = '';
});

afterEach(() => {
  delete window.gtag;
  delete window.dataLayer;
  document.getElementById('google-analytics-script')?.remove();
});

it('does not load Analytics or register tracking without a Measurement ID', () => {
  setupAnalytics('');

  expect(document.getElementById('google-analytics-script')).toBeNull();
  expect(window.gtag).toBeUndefined();
});

it('loads GA4 and reports clicks with a stable ID and link details', () => {
  const stopAnalytics = setupAnalytics('G-TEST123');
  const anchor = document.createElement('a');
  anchor.href = 'https://github.com/grasdouble/Kitia';
  anchor.dataset.analyticsLink = 'kitia_repository';
  anchor.addEventListener('click', (event) => event.preventDefault());
  anchor.innerHTML = '<span>View repository</span>';
  document.body.append(anchor);

  anchor.querySelector('span').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

  expect(document.getElementById('google-analytics-script').src).toContain('id=G-TEST123');
  const event = window.dataLayer.find(([type, name]) => type === 'event' && name === 'link_click');
  expect(event[2]).toMatchObject({
    link_id: 'kitia_repository',
    link_text: 'View repository',
    link_url: 'https://github.com/grasdouble/Kitia',
    link_domain: 'github.com',
    link_location: 'main',
  });

  stopAnalytics();
  const eventCount = window.dataLayer.filter(([type, name]) => type === 'event' && name === 'link_click').length;
  anchor.querySelector('span').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  expect(window.dataLayer.filter(([type, name]) => type === 'event' && name === 'link_click')).toHaveLength(eventCount);
});
