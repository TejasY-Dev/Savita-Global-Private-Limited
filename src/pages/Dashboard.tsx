import { useEffect, useState } from 'react';
import {
  Users,
  MessageSquareText,
  TrendingUp,
  Phone,
  Mail,
  Globe2,
  Package,
  Eye,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

type DashboardStats = {
  totalVisitors: number;
  totalEnquiries: number;
  conversionRate: number;
  phoneClicks: number;
  emailClicks: number;
  enquiryStarted: number;
  enquirySubmitted: number;
};

type CountryData = {
  country: string;
  count: number;
};

type ProductData = {
  product: string;
  count: number;
};

type PageData = {
  page: string;
  count: number;
};

type Enquiry = {
  id: number;
  company: string;
  name: string;
  email: string;
  phone: string | null;
  country: string;
  product: string;
  incoterm: string;
  quantity: string | null;
  message: string;
  created_at: string;
};

type DashboardData = {
  success: boolean;
  stats: DashboardStats;
  topCountries: CountryData[];
  topProducts: ProductData[];
  topPages: PageData[];
  recentEnquiries: Enquiry[];
};

const initialStats: DashboardStats = {
  totalVisitors: 0,
  totalEnquiries: 0,
  conversionRate: 0,
  phoneClicks: 0,
  emailClicks: 0,
  enquiryStarted: 0,
  enquirySubmitted: 0,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError('');

      const {
  data: { session },
} = await supabase.auth.getSession();

if (!session) {
  navigate('/admin-login');
  return;
}

const response = await fetch('/api/dashboard', {
  headers: {
    Authorization: `Bearer ${session.access_token}`,
  },
});
if (response.status === 401) {
  await supabase.auth.signOut();
  navigate('/admin-login');
  return;
}

if (response.status === 403) {
  setError('You are not authorized to access the dashboard.');
  return;
}


      if (!response.ok) {
        throw new Error('Failed to load dashboard data.');
      }

      const result: DashboardData = await response.json();

      setData(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load dashboard data.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const stats = data?.stats || initialStats;

  const statCards = [
    {
      label: 'Total Visitors',
      value: stats.totalVisitors,
      icon: Users,
    },
    {
      label: 'B2B Enquiries',
      value: stats.totalEnquiries,
      icon: MessageSquareText,
    },
    {
      label: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
    },
    {
      label: 'Phone Clicks',
      value: stats.phoneClicks,
      icon: Phone,
    },
    {
      label: 'Email Clicks',
      value: stats.emailClicks,
      icon: Mail,
    },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-10 lg:py-14">

        {/* Header */}
        <div className="mb-10">
          <p className="leaf-divider mb-3">
            Savita Global
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <h1 className="font-display text-4xl lg:text-5xl font-semibold text-forest-deep">
                Lead Dashboard
              </h1>

              <p className="mt-3 text-ink/65 max-w-2xl">
                Monitor website visitors, B2B enquiries and customer
                engagement in one place.
              </p>
            </div>

            <button
              onClick={loadDashboard}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-forest text-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-forest-dark disabled:opacity-60 transition-colors"
            >
              <RefreshCw
                size={16}
                className={loading ? 'animate-spin' : ''}
              />
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 flex items-start gap-3 bg-terra/10 border border-terra/30 text-terra rounded-xl px-5 py-4">
            <AlertCircle
              size={20}
              className="shrink-0 mt-0.5"
            />

            <div>
              <p className="font-semibold">
                Dashboard could not be loaded.
              </p>

              <p className="text-sm mt-1">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="bg-cream border border-forest/10 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
                    <Icon
                      size={19}
                      className="text-forest"
                    />
                  </div>

                  <span className="text-2xl font-semibold text-forest-deep">
                    {loading ? '—' : stat.value}
                  </span>
                </div>

                <p className="mt-4 text-sm text-ink/60">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Engagement summary */}
        <div className="grid sm:grid-cols-2 gap-5 mt-8">
          <div className="bg-forest text-cream rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-saffron">
              Enquiry Funnel
            </p>

            <div className="grid grid-cols-2 gap-6 mt-5">
              <div>
                <p className="text-3xl font-semibold">
                  {loading ? '—' : stats.enquiryStarted}
                </p>

                <p className="text-sm text-cream/65 mt-1">
                  Enquiries Started
                </p>
              </div>

              <div>
                <p className="text-3xl font-semibold">
                  {loading ? '—' : stats.enquirySubmitted}
                </p>

                <p className="text-sm text-cream/65 mt-1">
                  Enquiries Submitted
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cream border border-forest/10 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-saffron-dark">
              Engagement
            </p>

            <div className="grid grid-cols-2 gap-6 mt-5">
              <div>
                <p className="text-3xl font-semibold text-forest-deep">
                  {loading ? '—' : stats.phoneClicks}
                </p>

                <p className="text-sm text-ink/60 mt-1">
                  Phone Clicks
                </p>
              </div>

              <div>
                <p className="text-3xl font-semibold text-forest-deep">
                  {loading ? '—' : stats.emailClicks}
                </p>

                <p className="text-sm text-ink/60 mt-1">
                  Email Clicks
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="grid lg:grid-cols-3 gap-5 mt-8">

          {/* Countries */}
          <AnalyticsCard
            title="Top Countries"
            description="Countries generating the most enquiries."
            icon={Globe2}
          >
            {loading ? (
              <LoadingText />
            ) : data?.topCountries.length ? (
              <RankingList
                items={data.topCountries.map((item) => ({
                  label: item.country,
                  count: item.count,
                }))}
              />
            ) : (
              <EmptyText />
            )}
          </AnalyticsCard>

          {/* Products */}
          <AnalyticsCard
            title="Top Products"
            description="Products receiving the most enquiry interest."
            icon={Package}
          >
            {loading ? (
              <LoadingText />
            ) : data?.topProducts.length ? (
              <RankingList
                items={data.topProducts.map((item) => ({
                  label: item.product,
                  count: item.count,
                }))}
              />
            ) : (
              <EmptyText />
            )}
          </AnalyticsCard>

          {/* Pages */}
          <AnalyticsCard
            title="Most Viewed Pages"
            description="Pages receiving the highest number of views."
            icon={Eye}
          >
            {loading ? (
              <LoadingText />
            ) : data?.topPages.length ? (
              <RankingList
                items={data.topPages.map((item) => ({
                  label: item.page,
                  count: item.count,
                }))}
              />
            ) : (
              <EmptyText />
            )}
          </AnalyticsCard>
        </div>

        {/* Recent enquiries */}
        <section className="mt-8 bg-cream border border-forest/10 rounded-2xl shadow-sm overflow-hidden">

          <div className="p-6 border-b border-forest/10">
            <h2 className="font-display text-xl font-semibold text-forest-deep">
              Recent B2B Enquiries
            </h2>

            <p className="mt-1 text-sm text-ink/60">
              Latest customer enquiries received through the website.
            </p>
          </div>

          {loading ? (
            <div className="p-8 text-center text-sm text-ink/40">
              Loading enquiries…
            </div>
          ) : data?.recentEnquiries.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-forest/10 text-left">
                    <th className="px-6 py-4 font-semibold text-ink/60">
                      Company
                    </th>

                    <th className="px-6 py-4 font-semibold text-ink/60">
                      Contact
                    </th>

                    <th className="px-6 py-4 font-semibold text-ink/60">
                      Country
                    </th>

                    <th className="px-6 py-4 font-semibold text-ink/60">
                      Product
                    </th>

                    <th className="px-6 py-4 font-semibold text-ink/60">
                      Quantity
                    </th>

                    <th className="px-6 py-4 font-semibold text-ink/60">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.recentEnquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="border-b border-forest/5 last:border-0 hover:bg-forest/[0.03]"
                    >
                      <td className="px-6 py-4 align-top">
                        <p className="font-semibold text-forest-deep">
                          {enquiry.company}
                        </p>

                        <p className="text-xs text-ink/50 mt-1">
                          {enquiry.message}
                        </p>
                      </td>

                      <td className="px-6 py-4 align-top">
                        <p className="font-medium">
                          {enquiry.name}
                        </p>

                        <a
                          href={`mailto:${enquiry.email}`}
                          className="text-xs text-forest hover:underline break-all"
                        >
                          {enquiry.email}
                        </a>

                        {enquiry.phone && (
                          <p className="text-xs text-ink/50 mt-1">
                            {enquiry.phone}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4 align-top">
                        {enquiry.country}
                      </td>

                      <td className="px-6 py-4 align-top">
                        {enquiry.product}
                      </td>

                      <td className="px-6 py-4 align-top">
                        {enquiry.quantity || '—'}
                      </td>

                      <td className="px-6 py-4 align-top whitespace-nowrap">
                        {formatDate(enquiry.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-ink/40">
              No enquiries found.
            </div>
          )}
        </section>

      </section>
    </main>
  );
}

function AnalyticsCard({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: typeof Globe2;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-cream border border-forest/10 rounded-2xl p-6 shadow-sm min-h-[280px]">
      <div className="w-11 h-11 rounded-xl bg-forest/10 flex items-center justify-center">
        <Icon
          size={20}
          className="text-forest"
        />
      </div>

      <h2 className="mt-5 font-display text-xl font-semibold text-forest-deep">
        {title}
      </h2>

      <p className="mt-2 text-sm text-ink/60 leading-relaxed">
        {description}
      </p>

      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}

function RankingList({
  items,
}: {
  items: {
    label: string;
    count: number;
  }[];
}) {
  return (
    <div className="space-y-3">
      {items.slice(0, 5).map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-6 h-6 rounded-full bg-forest/10 text-forest text-xs font-semibold flex items-center justify-center shrink-0">
              {index + 1}
            </span>

            <span className="text-sm text-ink truncate">
              {item.label}
            </span>
          </div>

          <span className="text-sm font-semibold text-forest-deep">
            {item.count}
          </span>
        </div>
      ))}
    </div>
  );
}

function LoadingText() {
  return (
    <p className="text-sm text-ink/40">
      Loading analytics…
    </p>
  );
}

function EmptyText() {
  return (
    <p className="text-sm text-ink/40">
      No data available yet.
    </p>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}