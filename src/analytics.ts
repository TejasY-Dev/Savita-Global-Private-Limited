const VISITOR_ID_KEY = 'savita_visitor_id';

function getVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }

  return visitorId;
}

export async function trackEvent(
  event_type: string,
  data: {
    page?: string;
    element?: string;
    product?: string;
    referrer?: string;
  } = {}
) {
  try {
    const visitor_id = getVisitorId();

    await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type,
        visitor_id,
        page: window.location.pathname,
        referrer: document.referrer || null,
        ...data,
      }),
    });
  } catch (error) {
    console.error('Analytics error:', error);
  }
}