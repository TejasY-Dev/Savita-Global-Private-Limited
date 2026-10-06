import { createClient } from '@supabase/supabase-js';
import supabase from './db-client.js';

const supabaseUrl = process.env.SUPABASE_URL;

const supabaseAuthKey =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is not defined');
}

if (!supabaseAuthKey) {
  throw new Error(
    'SUPABASE_PUBLISHABLE_KEY or SUPABASE_ANON_KEY is not defined'
  );
}

const supabaseAuth = createClient(
  supabaseUrl,
  supabaseAuthKey
);

const normalizeCountry = (country) => {
  if (!country) return '';

  const cleaned = country.trim();

  if (!cleaned) return '';

  return cleaned
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const authHeader = req.headers.authorization || '';

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Authentication required.',
      });
    }

    const accessToken = authHeader.slice(7);

    const {
      data: { user },
      error: authError,
    } = await supabaseAuth.auth.getUser(accessToken);

    if (authError || !user) {
      return res.status(401).json({
        error: 'Invalid or expired session.',
      });
    }

    const adminEmail =
      process.env.DASHBOARD_ADMIN_EMAIL?.trim().toLowerCase();

    if (
      !adminEmail ||
      !user.email ||
      user.email.toLowerCase() !== adminEmail
    ) {
      return res.status(403).json({
        error: 'You are not authorized to access the dashboard.',
      });
    }

    const { data: events, error: eventsError } = await supabase
      .from('website_events')
      .select(
        'id, event_type, visitor_id, page, element, product, referrer, created_at'
      )
      .order('id', { ascending: false })
      .limit(5000);

    if (eventsError) {
      throw eventsError;
    }

    const { data: enquiries, error: enquiriesError } = await supabase
      .from('enquiries')
      .select(
        'id, company, name, email, phone, country, product, incoterm, quantity, message, created_at'
      )
      .order('id', { ascending: false })
      .limit(200);

    if (enquiriesError) {
      throw enquiriesError;
    }

    const safeEvents = events || [];
    const safeEnquiries = enquiries || [];

    const visitorIds = new Set(
      safeEvents
        .map((event) => event.visitor_id)
        .filter(Boolean)
    );

    const totalVisitors = visitorIds.size;

    const enquiryVisitorIds = new Set(
      safeEvents
        .filter(
          (event) =>
            event.event_type === 'enquiry_submitted' &&
            event.visitor_id
        )
        .map((event) => event.visitor_id)
    );

    const conversionRate =
      totalVisitors > 0
        ? Number(
            (
              (enquiryVisitorIds.size / totalVisitors) *
              100
            ).toFixed(1)
          )
        : 0;

    const totalEnquiries = safeEnquiries.length;

    const phoneClicks = safeEvents.filter(
      (event) => event.event_type === 'phone_click'
    ).length;

    const emailClicks = safeEvents.filter(
      (event) => event.event_type === 'email_click'
    ).length;

    const enquiryStarted = safeEvents.filter(
      (event) => event.event_type === 'enquiry_started'
    ).length;

    const enquirySubmitted = safeEvents.filter(
      (event) => event.event_type === 'enquiry_submitted'
    ).length;

    const countryCounts = {};

    safeEnquiries.forEach((enquiry) => {
      const country = normalizeCountry(enquiry.country);

      if (!country) return;

      countryCounts[country] =
        (countryCounts[country] || 0) + 1;
    });

    const topCountries = Object.entries(countryCounts)
      .map(([country, count]) => ({
        country,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const productCounts = {};

    safeEnquiries.forEach((enquiry) => {
      const product = enquiry.product?.trim();

      if (!product) return;

      productCounts[product] =
        (productCounts[product] || 0) + 1;
    });

    const topProducts = Object.entries(productCounts)
      .map(([product, count]) => ({
        product,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const pageCounts = {};

    safeEvents
      .filter(
        (event) => event.event_type === 'page_view'
      )
      .forEach((event) => {
        const page = event.page?.trim();

        if (!page) return;

        pageCounts[page] =
          (pageCounts[page] || 0) + 1;
      });

    const topPages = Object.entries(pageCounts)
      .map(([page, count]) => ({
        page,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const recentEnquiries = safeEnquiries
      .slice(0, 10)
      .map((enquiry) => ({
        id: enquiry.id,
        company: enquiry.company,
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        country: normalizeCountry(enquiry.country),
        product: enquiry.product,
        incoterm: enquiry.incoterm,
        quantity: enquiry.quantity,
        message: enquiry.message,
        created_at: enquiry.created_at,
      }));

    return res.status(200).json({
      success: true,
      stats: {
        totalVisitors,
        totalEnquiries,
        conversionRate,
        phoneClicks,
        emailClicks,
        enquiryStarted,
        enquirySubmitted,
      },
      topCountries,
      topProducts,
      topPages,
      recentEnquiries,
    });
  } catch (error) {
    console.error('Dashboard API error:', error);

    return res.status(500).json({
      error: 'Unable to load dashboard data.',
    });
  }
}