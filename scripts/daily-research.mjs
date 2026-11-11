
const required = (name) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
};

const SUPABASE_URL = required('SUPABASE_URL').replace(/\/+$/, '');
const SUPABASE_SECRET_KEY = required('SUPABASE_SECRET_KEY');
const SUPABASE_OWNER_ID = required('SUPABASE_OWNER_ID');
if (!/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(SUPABASE_OWNER_ID)) throw new Error('SUPABASE_OWNER_ID must be a valid UUID.');
const TAVILY_API_KEY = required('TAVILY_API_KEY');

const searches = [
  {
    query: 'Bulk buyers, importers, distributors and procurement RFQs for dehydrated onion flakes, onion granules, onion powder and dehydrated garlic from India worldwide.',
  },
  {
    query: 'Industrial food manufacturers and bulk importers sourcing dehydrated carrot, cabbage, tomato, beetroot, spinach and other vegetable flakes and powders.',
  },
  {
    query: 'International importers, distributors and food manufacturers sourcing bulk dried mango, banana, pineapple, apple and other dehydrated fruit ingredients.',
  },
  {
    query: 'Private label buyers, supermarket brands, wholesalers and distributors sourcing fruit snacks, vegetable crisps and value-added food snacks from India.',
  },
  {
    query: 'Bulk food ingredient buyers, seasoning manufacturers, soup manufacturers, spice blenders and ready-meal producers sourcing dehydrated vegetables and powders.',
  },
  {
    query: 'International importers, hospitality distributors and institutional procurement buyers sourcing Indian cotton terry towels, kitchen towels, table napkins and hotel linen.',
  },
];

function cleanText(value, maxLength) {
  return String(value ?? '')
    .replace(/\u0000/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function normalizeUrl(value) {
  try {
    const parsed = new URL(value);

    if (!['http:', 'https:'].includes(parsed.protocol)) return null;

    parsed.hash = '';

    for (const key of [...parsed.searchParams.keys()]) {
      if (/^(utm_|gclid$|fbclid$|mc_cid$|mc_eid$)/i.test(key)) {
        parsed.searchParams.delete(key);
      }
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

async function searchTavily(query) {
  const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TAVILY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(20000),
    body: JSON.stringify({
      query,
      search_depth: 'basic',
      max_results: 4,
      include_answer: false,
      include_raw_content: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Tavily search failed: HTTP ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data.results) ? data.results : [];
}

async function saveSources(rows) {
  if (!rows.length) return 0;

  const endpoint =
    `${SUPABASE_URL}/rest/v1/ceo_ai_research_sources?on_conflict=owner_id%2Curl`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SECRET_KEY,
      'Content-Type': 'application/json',
      Prefer: 'resolution=ignore-duplicates,return=representation',
    },
    body: JSON.stringify(rows),
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(
      `Supabase save failed: HTTP ${response.status}. ${detail.slice(0, 400)}`
    );
  }

  const inserted = await response.json();
  return Array.isArray(inserted) ? inserted.length : 0;
}

async function main() {
  console.log('Savita Global daily research started.');

  const ownerId = SUPABASE_OWNER_ID;
  console.log('Configured dashboard owner ID loaded.');

  const uniqueSources = new Map();
  let successfulSearches = 0;

  for (let index = 0; index < searches.length; index++) {
    const query = searches[index].query;

    try {
      const results = await searchTavily(query);
      successfulSearches++;

      for (const result of results) {
        const url = normalizeUrl(result.url);
        if (!url || uniqueSources.has(url)) continue;

        const domain = new URL(url).hostname.replace(/^www\./, '');

        uniqueSources.set(url, {
          owner_id: ownerId,
          agent: 'buyer_intelligence',
          query,
          title: cleanText(result.title || domain, 240),
          url,
          domain: cleanText(domain, 160),
          snippet: cleanText(result.content, 900) || null,
          relevance_score:
            result.score != null && Number.isFinite(Number(result.score))
              ? Number(result.score)
              : null,
        });
      }

      console.log(
        `Search ${index + 1}/${searches.length}: ${results.length} results.`
      );
    } catch (error) {
      console.error(
        `Search ${index + 1} failed:`,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  if (successfulSearches === 0) {
    throw new Error('All research searches failed. Nothing was saved.');
  }

  const rows = [...uniqueSources.values()];
  const insertedCount = await saveSources(rows);

  console.log('Daily research completed.');
  console.log(`Successful searches: ${successfulSearches}`);
  console.log(`Unique sources collected: ${rows.length}`);
  console.log(`New sources inserted: ${insertedCount}`);
  console.log('Existing URLs and verification statuses were preserved.');
}

main().catch((error) => {
  console.error('Daily research worker failed:', error.message);
  process.exitCode = 1;
});
