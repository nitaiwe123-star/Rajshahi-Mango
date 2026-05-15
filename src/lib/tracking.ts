/**
 * Facebook Pixel / Google Analytics Tracking Helper
 * Usage: trackEvent('Purchase', { value: 1200, currency: 'BDT' })
 */

export const trackEvent = (eventName: string, params?: any) => {
  // In a real scenario, you would initialize FB Pixel in index.html
  // and call window.fbq('track', eventName, params) here.
  
  console.log(`[Tracking Event]: ${eventName}`, params);
  
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, params);
  }
};
