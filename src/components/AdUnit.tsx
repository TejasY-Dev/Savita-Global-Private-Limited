import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

export default function AdUnit() {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error('AdSense initialization failed:', error);
    }
  }, []);

  return (
    <div className="my-8 w-full overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5261458301814298"
        data-ad-slot="4746740779"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}