
/**
 * Tracking utility for monitoring user interactions in the wellness app
 * This implementation uses localStorage for basic analytics
 * In production, this could be connected to a proper analytics service
 */

type TrackingEvent = {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
};

// Storage key for analytics
const TRACKING_STORAGE_KEY = 'wellness_app_analytics';

/**
 * Track a user interaction
 * @param category Event category (e.g., 'form', 'share', 'generation')
 * @param action Action performed (e.g., 'submit', 'download', 'view')
 * @param label Optional label for additional context
 * @param value Optional numeric value for measurements
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  try {
    const event: TrackingEvent = {
      event: `${category}_${action}`,
      category,
      action,
      label,
      value,
      timestamp: Date.now()
    };

    // Log to console in development
    console.log('[ANALYTICS]', event);
    
    // Store in localStorage
    const currentEvents: TrackingEvent[] = getStoredEvents();
    currentEvents.push(event);
    
    // Limit stored events to prevent localStorage overflow
    if (currentEvents.length > 500) {
      currentEvents.splice(0, currentEvents.length - 500);
    }
    
    localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(currentEvents));
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

/**
 * Get stored tracking events
 */
export const getStoredEvents = (): TrackingEvent[] => {
  try {
    const stored = localStorage.getItem(TRACKING_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/**
 * Clear stored tracking data
 */
export const clearTrackingData = (): void => {
  localStorage.removeItem(TRACKING_STORAGE_KEY);
};

/**
 * Track form field changes
 */
export const trackFormField = (
  fieldName: string,
  value: string | boolean | string[]
): void => {
  // For privacy reasons, we don't track specific values, just that the field was changed
  trackEvent('form', 'field_change', fieldName);
};

/**
 * Track page view
 */
export const trackPageView = (pageName: string): void => {
  trackEvent('navigation', 'page_view', pageName);
};
