import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowDownToLine,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  Globe2,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquareText,
  MousePointerClick,
  Package,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
  Zap,
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
type CountryData = { country: string; count: number };
type ProductData = { product: string; count: number };
type PageData = { page: string; count: number };
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

const panel = 'rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]';
const numberFormat = (value: number | null | undefined) => Number(value || 0).toLocaleString('en-IN');

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [productFilter, setProductFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [showMessage, setShowMessage] = useState<number | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin-login');
        return;
      }
      const response = await fetch('/api/dashboard', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (response.status === 401) {
        await supabase.auth.signOut();
        navigate('/admin-login');
        return;
      }
      if (response.status === 403) {
        setError('Your account is not authorized to view this dashboard.');
        setData(null);
        return;
      }
      if (!response.ok) throw new Error(`Dashboard request failed (${response.status}).`);
      const result: DashboardData = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => { void loadDashboard(); }, [loadDashboard]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  const stats = data?.stats ?? initialStats;
  const enquiries = data?.recentEnquiries ?? [];
  const products = useMemo(
    () => [...new Set(enquiries.map((enquiry) => enquiry.product).filter(Boolean))].sort(),
    [enquiries],
  );
  const countries = useMemo(
    () => [...new Set(enquiries.map((enquiry) => enquiry.country).filter(Boolean))].sort(),
    [enquiries],
  );
  const filteredEnquiries = useMemo(() => {
    const query = search.trim().toLowerCase();
    return enquiries.filter((enquiry) => {
      const matchesSearch = !query || [
        enquiry.company, enquiry.name, enquiry.email, enquiry.phone, enquiry.country,
        enquiry.product, enquiry.message,
      ].some((value) => String(value ?? '').toLowerCase().includes(query));
      return matchesSearch
        && (productFilter === 'all' || enquiry.product === productFilter)
        && (countryFilter === 'all' || enquiry.country === countryFilter);
    });
  }, [enquiries, search, productFilter, countryFilter]);

  const exportCsv = () => {
    const columns: (keyof Enquiry)[] = [
      'created_at', 'company', 'name', 'email', 'phone', 'country',
      'product', 'incoterm', 'quantity', 'message',
    ];
    const escapeCsv = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const csv = [
      columns.join(','),
      ...filteredEnquiries.map((row) => columns.map((column) => escapeCsv(row[column])).join(',')),
    ].join('\r\n');
    const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `savita-global-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const statCards = [
    { label: 'Website visitors', value: stats.totalVisitors, note: 'Tracked website visits', icon: Users, gradient: 'from-blue-600 to-indigo-600', tag: 'AUDIENCE' },
    { label: 'B2B enquiries', value: stats.totalEnquiries, note: 'Buyer submissions received', icon: MessageSquareText, gradient: 'from-violet-600 to-fuchsia-600', tag: 'LEADS' },
    { label: 'Conversion rate', value: `${Number(stats.conversionRate || 0).toFixed(1)}%`, note: 'Visitors who enquire', icon: TrendingUp, gradient: 'from-cyan-600 to-blue-600', tag: 'CONVERSION' },
    { label: 'Phone clicks', value: stats.phoneClicks, note: 'Tracked call intent', icon: Phone, gradient: 'from-orange-500 to-rose-500', tag: 'CONTACT' },
    { label: 'Email clicks', value: stats.emailClicks, note: 'Tracked email intent', icon: Mail, gradient: 'from-emerald-600 to-teal-500', tag: 'CONTACT' },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-900">
      <div className="grid min-h-screen md:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="hidden flex-col bg-[#111827] px-5 py-6 text-white md:flex">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-lg shadow-blue-950/30">
              <Globe2 size={23} strokeWidth={2.3} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold tracking-wide">SAVITA GLOBAL</p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.19em] text-slate-400">Business suite</p>
            </div>
          </div>

          <div className="mt-10 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Workspace</div>
          <nav className="mt-3 space-y-1.5" aria-label="Dashboard navigation">
            <a href="#overview" className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-3.5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/20">
              <LayoutDashboard size={18} /> Overview <ArrowUpRight size={15} className="ml-auto opacity-80" />
            </a>
            <a href="#analytics" className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white">
              <BarChart3 size={18} /> Analytics
            </a>
            <a href="#enquiries" className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white">
              <MessageSquareText size={18} /> Buyer enquiries
              <span className="ml-auto rounded-md bg-fuchsia-500/20 px-2 py-0.5 text-[10px] font-bold text-fuchsia-200">{loading ? '…' : numberFormat(stats.totalEnquiries)}</span>
            </a>
          </nav>

          <div className="mt-9 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/15 via-violet-500/10 to-fuchsia-500/10 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-300"><Zap size={18} /></div>
            <p className="mt-3 text-sm font-bold">Export-ready workspace</p>
            <p className="mt-1.5 text-xs leading-5 text-slate-400">Keep track of buyer interest and follow up on new opportunities.</p>
            <a href="#enquiries" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white">Review enquiries <ArrowUpRight size={14} /></a>
          </div>

          <div className="mt-auto pt-8">
            <div className="mb-4 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-extrabold">SG</div>
                <div className="min-w-0"><p className="truncate text-xs font-bold">Savita Global</p><p className="mt-0.5 text-[10px] text-slate-400">Administrator</p></div>
                <ShieldCheck size={16} className="ml-auto shrink-0 text-emerald-400" />
              </div>
            </div>
            <button onClick={() => void signOut()} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-300">
              <LogOut size={17} /> Sign out
            </button>
            <p className="mt-5 px-2 text-[10px] leading-5 text-slate-600">© {new Date().getFullYear()} Savita Global Private Limited</p>
          </div>
        </aside>

        <main className="min-w-0 px-4 py-5 sm:px-6 lg:px-9 lg:py-8">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-5 flex items-center justify-between md:hidden">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white"><Globe2 size={21} /></div>
                <div><p className="text-sm font-extrabold">SAVITA GLOBAL</p><p className="text-[10px] uppercase tracking-widest text-slate-500">Business suite</p></div>
              </div>
              <button onClick={() => void signOut()} aria-label="Sign out" className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500"><LogOut size={17} /></button>
            </div>

            <header id="overview" className="mb-7 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-700 shadow-sm">
                  <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>
                  Business intelligence · Admin
                </div>
                <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Business overview<span className="text-blue-600">.</span></h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">Your export business, website activity and buyer enquiries—all in one place.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-500 shadow-sm"><Clock3 size={15} className="text-blue-600" /> Live dashboard data</div>
                <button onClick={() => void loadDashboard()} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                  <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> {loading ? 'Refreshing…' : 'Refresh data'}
                </button>
              </div>
            </header>

            {error && <div role="alert" className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800"><AlertCircle size={19} className="mt-0.5 shrink-0" /><div className="min-w-0 flex-1"><p className="font-bold">Could not load dashboard</p><p className="mt-1 text-sm">{error}</p></div><button aria-label="Dismiss error" onClick={() => setError('')} className="rounded-lg p-1 hover:bg-rose-100"><X size={16} /></button></div>}

            <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {statCards.map(({ label, value, icon: Icon, note, gradient, tag }) => (
                <article key={label} className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-lg shadow-slate-900/8 transition duration-200 hover:-translate-y-1 hover:shadow-xl`}>
                  <div className="absolute -right-7 -top-8 h-28 w-28 rounded-full border-[18px] border-white/10 transition duration-300 group-hover:scale-110" />
                  <div className="absolute -bottom-12 right-12 h-24 w-24 rounded-full bg-white/5" />
                  <div className="relative flex items-start justify-between gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-inner backdrop-blur-sm"><Icon size={21} /></div>
                    <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[9px] font-extrabold tracking-[0.13em] text-white/90">{tag}</span>
                  </div>
                  <p className="relative mt-5 text-sm font-semibold text-white/85">{label}</p>
                  <p className="relative mt-1 text-3xl font-black tracking-tight">{loading ? '—' : typeof value === 'number' ? numberFormat(value) : value}</p>
                  <div className="relative mt-3 flex items-center gap-1.5 text-[11px] font-medium text-white/75"><span className="h-1.5 w-1.5 rounded-full bg-white/80" />{note}</div>
                </article>
              ))}
            </section>

            <section className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
              <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#172554] via-[#312e81] to-[#6d28d9] p-6 text-white shadow-xl shadow-indigo-950/10 sm:p-7">
                <div className="absolute -right-14 -top-20 h-64 w-64 rounded-full border-[35px] border-white/5" />
                <div className="absolute bottom-0 right-28 h-36 w-36 rounded-full bg-fuchsia-400/10 blur-3xl" />
                <div className="relative flex items-start justify-between gap-4">
                  <div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-cyan-200">Lead journey</p><h2 className="mt-2 text-xl font-bold sm:text-2xl">Enquiry funnel</h2><p className="mt-1 max-w-md text-sm leading-6 text-indigo-100/75">Understand how many potential buyers start and complete an enquiry.</p></div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cyan-200"><Activity size={23} /></div>
                </div>
                <div className="relative mt-7 grid gap-4 sm:grid-cols-2">
                  <FunnelMetric label="Enquiries started" value={stats.enquiryStarted} loading={loading} icon={MousePointerClick} />
                  <FunnelMetric label="Enquiries submitted" value={stats.enquirySubmitted} loading={loading} icon={CheckCircle2} />
                </div>
                <div className="relative mt-6">
                  <div className="mb-2 flex items-center justify-between text-xs text-indigo-100/75"><span>Started-to-submitted completion</span><span className="font-bold text-white">{stats.enquiryStarted > 0 ? `${Math.min(100, Math.round((stats.enquirySubmitted / stats.enquiryStarted) * 100))}%` : '—'}</span></div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 transition-all duration-500" style={{ width: `${stats.enquiryStarted > 0 ? Math.min(100, (stats.enquirySubmitted / stats.enquiryStarted) * 100) : 0}%` }} /></div>
                </div>
                <p className="relative mt-3 text-[11px] leading-5 text-indigo-100/60">Calculated from recorded website events. Figures depend on the events currently tracked.</p>
              </article>

              <article className={`${panel} p-6 sm:p-7`}>
                <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-violet-600">Buyer engagement</p><h2 className="mt-2 text-xl font-bold text-slate-950">Contact activity</h2><p className="mt-1 text-sm leading-5 text-slate-500">Tracked actions that show contact intent.</p></div><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-pink-100 text-rose-600"><BarChart3 size={22} /></div></div>
                <div className="mt-7 space-y-6">
                  <EngagementRow label="Phone clicks" value={stats.phoneClicks} total={stats.phoneClicks + stats.emailClicks} icon={Phone} loading={loading} color="bg-gradient-to-r from-orange-400 to-rose-500" iconColor="text-orange-600 bg-orange-50" />
                  <EngagementRow label="Email clicks" value={stats.emailClicks} total={stats.phoneClicks + stats.emailClicks} icon={Mail} loading={loading} color="bg-gradient-to-r from-cyan-400 to-blue-600" iconColor="text-blue-600 bg-blue-50" />
                </div>
                <div className="mt-6 flex gap-2.5 rounded-xl bg-slate-50 p-3.5 text-[11px] leading-5 text-slate-500"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-slate-400" /><span>These are tracked website actions; they do not confirm a call or email was completed.</span></div>
              </article>
            </section>

            <section id="analytics" className="mt-8 scroll-mt-6">
              <div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-600">Insights</p><h2 className="mt-1 text-xl font-black tracking-tight text-slate-950">Know what buyers want</h2><p className="mt-1 text-sm text-slate-500">Rankings are based on information returned by your dashboard API.</p></div><div className="hidden items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-slate-500 shadow-sm sm:inline-flex"><Activity size={13} className="text-emerald-500" /> Data overview</div></div>
              <div className="grid gap-5 lg:grid-cols-3">
                <AnalyticsCard title="Top buyer countries" description="Countries associated with enquiries." icon={Globe2} loading={loading} empty={!data?.topCountries?.length} accent="from-blue-500 to-cyan-400">
                  <RankingList items={(data?.topCountries ?? []).map((item) => ({ label: item.country, count: item.count }))} gradient="from-blue-500 to-cyan-400" />
                </AnalyticsCard>
                <AnalyticsCard title="Product demand" description="Products buyers request most often." icon={Package} loading={loading} empty={!data?.topProducts?.length} accent="from-violet-500 to-fuchsia-400">
                  <RankingList items={(data?.topProducts ?? []).map((item) => ({ label: item.product, count: item.count }))} gradient="from-violet-500 to-fuchsia-400" />
                </AnalyticsCard>
                <AnalyticsCard title="Most viewed pages" description="Pages with the most recorded views." icon={Eye} loading={loading} empty={!data?.topPages?.length} accent="from-emerald-500 to-teal-400">
                  <RankingList items={(data?.topPages ?? []).map((item) => ({ label: item.page, count: item.count }))} gradient="from-emerald-500 to-teal-400" />
                </AnalyticsCard>
              </div>
            </section>

            <section id="enquiries" className={`${panel} mt-8 scroll-mt-6 overflow-hidden`}>
              <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 xl:flex-row xl:items-end xl:justify-between">
                <div><div className="flex flex-wrap items-center gap-2.5"><h2 className="text-xl font-black tracking-tight text-slate-950">Buyer enquiries</h2><span className="rounded-full bg-gradient-to-r from-violet-100 to-blue-100 px-2.5 py-1 text-xs font-extrabold text-violet-700">{loading ? '…' : numberFormat(filteredEnquiries.length)}</span></div><p className="mt-1.5 text-sm text-slate-500">Manage incoming buyer requests and follow up on potential export orders.</p></div>
                <button onClick={exportCsv} disabled={loading || filteredEnquiries.length === 0} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-600/15 transition hover:from-violet-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"><ArrowDownToLine size={16} /> Export CSV</button>
              </div>

              <div className="grid gap-3 border-b border-slate-100 bg-slate-50/80 p-4 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_220px_200px_auto] xl:p-5">
                <label className="relative block"><span className="sr-only">Search enquiries</span><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search company, contact, email…" className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100" /></label>
                <label className="relative block"><span className="sr-only">Filter by product</span><select value={productFilter} onChange={(event) => setProductFilter(event.target.value)} className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"><option value="all">All products</option>{products.map((product) => <option key={product} value={product}>{product}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /></label>
                <label className="relative block"><span className="sr-only">Filter by country</span><select value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)} className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"><option value="all">All countries</option>{countries.map((country) => <option key={country} value={country}>{country}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /></label>
                <button onClick={() => { setSearch(''); setProductFilter('all'); setCountryFilter('all'); }} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-violet-700">Clear filters</button>
              </div>

              {loading ? <div className="flex items-center justify-center gap-3 p-12 text-sm font-medium text-slate-500"><RefreshCw size={17} className="animate-spin text-violet-600" /> Loading buyer enquiries…</div> : filteredEnquiries.length === 0 ? <div className="p-12 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 text-violet-600"><MessageSquareText size={23} /></div><p className="mt-4 font-bold text-slate-800">{enquiries.length ? 'No enquiries match these filters' : 'No enquiries received yet'}</p><p className="mt-1 text-sm text-slate-500">{enquiries.length ? 'Try a different search or clear the filters.' : 'New website submissions will appear here when received.'}</p></div> : (
                <div className="overflow-x-auto"><table className="w-full min-w-[920px] text-left text-sm"><thead className="bg-slate-50/80 text-[10px] uppercase tracking-[0.13em] text-slate-400"><tr><th className="px-5 py-4 font-extrabold">Buyer / company</th><th className="px-5 py-4 font-extrabold">Contact</th><th className="px-5 py-4 font-extrabold">Product & terms</th><th className="px-5 py-4 font-extrabold">Quantity</th><th className="px-5 py-4 font-extrabold">Received</th><th className="px-5 py-4 font-extrabold">Message</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredEnquiries.map((enquiry) => <tr key={enquiry.id} className="align-top transition hover:bg-violet-50/40"><td className="px-5 py-4"><p className="font-bold text-slate-900">{enquiry.company || 'Company not provided'}</p><p className="mt-1 text-xs text-slate-500">{enquiry.name || 'Contact not provided'}</p><p className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-500"><Globe2 size={12} />{enquiry.country || 'Country not provided'}</p></td><td className="px-5 py-4"><a href={`mailto:${enquiry.email}`} className="inline-flex max-w-[220px] items-center gap-1.5 break-all text-xs font-semibold text-blue-700 hover:text-violet-700 hover:underline"><Mail size={13} className="shrink-0" />{enquiry.email}</a>{enquiry.phone && <a href={`tel:${enquiry.phone}`} className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-700"><Phone size={13} />{enquiry.phone}</a>}</td><td className="px-5 py-4"><p className="font-semibold text-slate-800">{enquiry.product || 'Not specified'}</p><span className="mt-1.5 inline-flex rounded-lg bg-gradient-to-r from-blue-50 to-violet-50 px-2.5 py-1 text-[10px] font-extrabold text-violet-700">{enquiry.incoterm || 'Terms not specified'}</span></td><td className="px-5 py-4 font-semibold text-slate-700">{enquiry.quantity || '—'}</td><td className="whitespace-nowrap px-5 py-4 text-xs font-medium text-slate-500">{formatDate(enquiry.created_at)}</td><td className="px-5 py-4"><button onClick={() => setShowMessage(showMessage === enquiry.id ? null : enquiry.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700">{showMessage === enquiry.id ? 'Hide' : 'View'} <ArrowUpRight size={13} /></button>{showMessage === enquiry.id && <div className="mt-2 max-w-[240px] whitespace-pre-wrap rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs leading-5 text-slate-600">{enquiry.message || 'No message provided.'}</div>}</td></tr>)}</tbody></table></div>
              )}
              <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-3.5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>Showing {loading ? '—' : numberFormat(filteredEnquiries.length)} of {numberFormat(enquiries.length)} loaded enquiries</span><span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-600" /> Connected to your dashboard API</span></div>
            </section>

            <footer className="flex flex-col gap-2 px-1 py-7 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Savita Global Private Limited</span><span className="font-medium">Quality from India. Trusted Worldwide.</span></footer>
          </div>
        </main>
      </div>
    </div>
  );
}

function FunnelMetric({ label, value, loading, icon: Icon }: { label: string; value: number; loading: boolean; icon: typeof Activity }) {
  return <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm"><div className="flex items-center justify-between gap-3"><p className="text-3xl font-black tracking-tight">{loading ? '—' : numberFormat(value)}</p><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-200"><Icon size={18} /></span></div><p className="mt-1 text-xs font-medium text-indigo-100/75">{label}</p></div>;
}

function EngagementRow({ label, value, total, icon: Icon, loading, color, iconColor }: { label: string; value: number; total: number; icon: typeof Phone; loading: boolean; color: string; iconColor: string }) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;
  return <div><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2.5"><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconColor}`}><Icon size={17} /></span><span className="text-sm font-semibold text-slate-700">{label}</span></div><span className="text-sm font-black text-slate-950">{loading ? '—' : numberFormat(value)}</span></div><div className="ml-11 mt-2.5 h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${loading ? 0 : percent}%` }} /></div></div>;
}

function AnalyticsCard({ title, description, icon: Icon, children, loading, empty, accent }: { title: string; description: string; icon: typeof Globe2; children: ReactNode; loading: boolean; empty: boolean; accent: string }) {
  return <article className={`${panel} min-h-[280px] p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-6`}><div className="flex items-start gap-3"><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-md`}><Icon size={20} /></div><div className="min-w-0"><h3 className="font-extrabold text-slate-900">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></div></div><div className="mt-6">{loading ? <p className="text-sm text-slate-400">Loading analytics…</p> : empty ? <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-400">No data available yet.</p> : children}</div></article>;
}

function RankingList({ items, gradient }: { items: { label: string; count: number }[]; gradient: string }) {
  const max = Math.max(1, ...items.map((item) => Number(item.count) || 0));
  return <div className="space-y-4">{items.slice(0, 5).map((item, index) => <div key={`${item.label}-${index}`}><div className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-2.5"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[11px] font-extrabold text-slate-600">{index + 1}</span><span className="truncate text-sm font-semibold text-slate-700" title={item.label}>{item.label}</span></div><span className="text-sm font-black text-slate-900">{numberFormat(item.count)}</span></div><div className="ml-9 mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full bg-gradient-to-r ${gradient}`} style={{ width: `${Math.max(2, ((Number(item.count) || 0) / max) * 100)}%` }} /></div></div>)}</div>;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (!dateString || Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
