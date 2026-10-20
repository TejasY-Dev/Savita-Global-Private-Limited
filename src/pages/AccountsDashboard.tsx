import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import {
  Activity, AlertCircle, ArrowDownLeft, ArrowLeftRight, ArrowUpRight,
  Banknote, Bell, BookOpenCheck, CalendarDays, Check, CheckCircle2,
  ChevronDown, ClipboardCheck, Download, FileCheck2, FileText, Filter,
  LayoutDashboard, Leaf, LogOut, Menu, Package, Plus, RefreshCw, Search,
  Settings2, ShieldCheck, Shirt, ShoppingBag, Wallet, X, Landmark, Users,
} from 'lucide-react';
import { supabase } from '../supabase';

// Reuse Savita Global's existing Supabase client and environment variables.
const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);
import './accounts.css';

type Division = 'food' | 'textile' | 'shared';
type RecordStatus = 'draft' | 'verified' | 'needs_review';
type DocType = 'sale_invoice' | 'purchase_invoice' | 'expense_bill' | 'other';
type Role = 'owner' | 'accountant' | 'ca' | 'viewer';
type DocumentRow = {
  id: string; document_type: DocType; division: Division; document_number: string | null;
  document_date: string; due_date: string | null; counterparty_name: string;
  description: string; subtotal: number; tax_amount: number; total_amount: number;
  record_status: RecordStatus; created_at: string;
};
type CashRow = {
  id: string; entry_date: string; direction: 'in' | 'out'; entry_type: string;
  division: Division; category: string; counterparty_name: string | null;
  amount: number; account_type: 'bank' | 'cash'; payment_method: string;
  bank_reference: string | null; related_document_id: string | null;
  notes: string | null; record_status: RecordStatus;
};
type ProductRow = {
  id: string; sku: string; product_name: string; division: Division; unit: string;
  current_quantity: number; unit_cost: number; reorder_level: number;
};
type TaskRow = {
  id: string; title: string; category: string; due_date: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'ca_review';
  priority: 'low' | 'medium' | 'high'; notes: string | null;
};
type SettingsRow = { id: number; opening_bank_balance: number; opening_cash_balance: number; opening_balance_date: string | null };
type Page = 'overview' | 'transactions' | 'inventory' | 'compliance' | 'reports' | 'settings';
type ModalKind = 'document' | 'cash' | 'product' | 'movement' | 'task' | 'settings' | null;

const INR = new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
});
const money = (v: number | string | null | undefined) => INR.format(Number(v || 0));
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const dateText = (v?: string | null) => v
  ? new Date(`${v.slice(0, 10)}T00:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  : '—';
const divisionText = (v: Division) => v === 'food' ? 'Dehydrated foods' : v === 'textile' ? 'Towels & napkins' : 'Shared';
const docText = (v: DocType) => ({ sale_invoice: 'Sales invoice', purchase_invoice: 'Purchase invoice', expense_bill: 'Expense bill', other: 'Other document' }[v]);
const statusText = (v: RecordStatus) => v === 'verified' ? 'Verified' : v === 'needs_review' ? 'Needs review' : 'Draft';
const statusCss = (v: RecordStatus) => v === 'verified' ? 'verified' : v === 'needs_review' ? 'review' : 'draft';
const inMonth = (d: string) => { const now = new Date(); const start = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`; return d >= start && d <= today(); };

function downloadCsv(filename: string, rows: (string | number | null | undefined)[][]) {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a'); link.href = url; link.download = filename; link.click();
  URL.revokeObjectURL(url);
}
function amountLinked(docId: string, cash: CashRow[], direction: 'in' | 'out') {
  return cash.filter((c) => c.related_document_id === docId && c.direction === direction && c.record_status === 'verified')
    .reduce((sum, c) => sum + Number(c.amount), 0);
}

export default function AccountsDashboard() {
  const [page, setPage] = useState<Page>('overview');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [cashRows, setCashRows] = useState<CashRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [settings, setSettings] = useState<SettingsRow>({ id: 1, opening_bank_balance: 0, opening_cash_balance: 0, opening_balance_date: null });
  const [modal, setModal] = useState<ModalKind>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);
  const [search, setSearch] = useState('');
  const [division, setDivision] = useState<'all' | Division>('all');
  const [docFilter, setDocFilter] = useState<'all' | DocType>('all');
  const [transactionTab, setTransactionTab] = useState<'documents' | 'cashbook'>('documents');
  const canEdit = role === 'owner' || role === 'accountant';
  const canEditTasks = canEdit || role === 'ca';

  const notify = useCallback((kind: 'success' | 'error', message: string) => {
    setNotice({ kind, message });
    window.setTimeout(() => setNotice((n) => n?.message === message ? null : n), 5500);
  }, []);

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured || !user || !role) return;
    setLoading(true);
    const results = await Promise.all([
      supabase.from('accounts_documents').select('*').order('document_date', { ascending: false }).limit(500),
      supabase.from('accounts_cash_entries').select('*').order('entry_date', { ascending: false }).limit(1000),
      supabase.from('accounts_inventory_items').select('*').order('product_name'),
      supabase.from('accounts_compliance_tasks').select('*').order('due_date', { ascending: true, nullsFirst: false }),
      supabase.from('accounts_company_settings').select('*').eq('id', 1).maybeSingle(),
    ]);
    const error = results.find((r) => r.error)?.error;
    if (error) notify('error', `Data could not be loaded: ${error.message}. Check the SQL setup and user permissions.`);
    setDocuments((results[0].data || []) as DocumentRow[]);
    setCashRows((results[1].data || []) as CashRow[]);
    setProducts((results[2].data || []) as ProductRow[]);
    setTasks((results[3].data || []) as TaskRow[]);
    if (results[4].data) setSettings(results[4].data as SettingsRow);
    setLoading(false);
  }, [user, role, notify]);

  const verifySession = useCallback(async (session: Session | null) => {
    setUser(session?.user || null);
    setRole(null);
    if (session?.user && isSupabaseConfigured) {
      const { data, error } = await supabase.from('accounts_members').select('role').eq('user_id', session.user.id).maybeSingle();
      if (error) notify('error', `Could not check workspace membership: ${error.message}`);
      if (data?.role) setRole(data.role as Role);
    }
    setAuthReady(true);
  }, [notify]);

  useEffect(() => {
    if (!isSupabaseConfigured) { setAuthReady(true); return; }
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => { if (mounted) void verifySession(data.session); });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) void verifySession(session);
    });
    return () => { mounted = false; data.subscription.unsubscribe(); };
  }, [verifySession]);
  useEffect(() => { void refresh(); }, [refresh]);

  const metrics = useMemo(() => {
    const goodDocs = documents.filter((d) => d.record_status === 'verified');
    const monthDocs = goodDocs.filter((d) => inMonth(d.document_date));
    const sales = monthDocs.filter((d) => d.document_type === 'sale_invoice').reduce((s, d) => s + Number(d.subtotal), 0);
    const purchases = monthDocs.filter((d) => d.document_type === 'purchase_invoice').reduce((s, d) => s + Number(d.subtotal), 0);
    const expenses = monthDocs.filter((d) => d.document_type === 'expense_bill').reduce((s, d) => s + Number(d.subtotal), 0);
    const bank = Number(settings.opening_bank_balance || 0) + cashRows.filter((c) => c.account_type === 'bank' && c.record_status === 'verified')
      .reduce((s, c) => s + (c.direction === 'in' ? Number(c.amount) : -Number(c.amount)), 0);
    const cash = Number(settings.opening_cash_balance || 0) + cashRows.filter((c) => c.account_type === 'cash' && c.record_status === 'verified')
      .reduce((s, c) => s + (c.direction === 'in' ? Number(c.amount) : -Number(c.amount)), 0);
    const salesDocs = goodDocs.filter((d) => d.document_type === 'sale_invoice');
    const bills = goodDocs.filter((d) => d.document_type === 'purchase_invoice' || d.document_type === 'expense_bill');
    const receivables = salesDocs.reduce((s, d) => s + Math.max(0, Number(d.total_amount) - amountLinked(d.id, cashRows, 'in')), 0);
    const payables = bills.reduce((s, d) => s + Math.max(0, Number(d.total_amount) - amountLinked(d.id, cashRows, 'out')), 0);
    const moneyIn = cashRows.filter((c) => inMonth(c.entry_date) && c.direction === 'in' && c.record_status === 'verified').reduce((s, c) => s + Number(c.amount), 0);
    const moneyOut = cashRows.filter((c) => inMonth(c.entry_date) && c.direction === 'out' && c.record_status === 'verified').reduce((s, c) => s + Number(c.amount), 0);
    const drafts = documents.filter((d) => d.record_status !== 'verified').length + cashRows.filter((c) => c.record_status !== 'verified').length;
    const lowStock = products.filter((p) => Number(p.current_quantity) <= Number(p.reorder_level));
    const openTasks = tasks.filter((t) => t.status !== 'completed');
    const overdue = openTasks.filter((t) => t.due_date && t.due_date < today());
    const months = Array.from({ length: 6 }, (_, idx) => {
      const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - (5 - idx));
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const value = goodDocs.filter((doc) => doc.document_type === 'sale_invoice' && doc.document_date.startsWith(key)).reduce((s, doc) => s + Number(doc.subtotal), 0);
      return { label: d.toLocaleDateString('en-IN', { month: 'short' }), value };
    });
    const maxSales = Math.max(1, ...months.map((m) => m.value));
    const activity: Array<{ id: string; date: string; name: string; detail: string; amount: number; direction: 'in' | 'out'; status: RecordStatus; kind: 'doc' | 'cash' }> = [
      ...documents.map((d) => ({ id: d.id, date: d.document_date, name: d.counterparty_name || docText(d.document_type), detail: docText(d.document_type), amount: Number(d.total_amount), direction: (d.document_type === 'sale_invoice' ? 'in' : 'out') as 'in' | 'out', status: d.record_status, kind: 'doc' as const })),
      ...cashRows.map((c) => ({ id: c.id, date: c.entry_date, name: c.counterparty_name || c.category, detail: c.category, amount: Number(c.amount), direction: c.direction, status: c.record_status, kind: 'cash' as const })),
    ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
    return { sales, purchases, expenses, bank, cash, receivables, payables, moneyIn, moneyOut, drafts, lowStock, openTasks, overdue, months: months.map((m) => ({ ...m, height: Math.max(4, m.value / maxSales * 100) })), activity };
  }, [documents, cashRows, products, tasks, settings]);

  const visibleDocs = documents.filter((d) => {
    const terms = `${d.counterparty_name} ${d.document_number || ''} ${d.description} ${docText(d.document_type)}`.toLowerCase();
    return terms.includes(search.toLowerCase()) && (division === 'all' || d.division === division) && (docFilter === 'all' || d.document_type === docFilter);
  });
  const visibleCash = cashRows.filter((c) => `${c.counterparty_name || ''} ${c.category} ${c.bank_reference || ''} ${c.notes || ''} ${c.entry_type}`.toLowerCase().includes(search.toLowerCase()) && (division === 'all' || c.division === division));
  const exports = {
    documents: () => downloadCsv('savita-accounts-documents.csv', [
      ['Date', 'Type', 'Division', 'Document no.', 'Counterparty', 'Description', 'Subtotal INR', 'Tax INR', 'Total INR', 'Status'],
      ...documents.map((d) => [d.document_date, docText(d.document_type), divisionText(d.division), d.document_number, d.counterparty_name, d.description, d.subtotal, d.tax_amount, d.total_amount, statusText(d.record_status)]),
    ]),
    cash: () => downloadCsv('savita-accounts-cashbook.csv', [
      ['Date', 'Direction', 'Account', 'Type', 'Division', 'Category', 'Counterparty', 'Amount INR', 'Method', 'Reference', 'Status'],
      ...cashRows.map((c) => [c.entry_date, c.direction, c.account_type, c.entry_type, divisionText(c.division), c.category, c.counterparty_name, c.amount, c.payment_method, c.bank_reference, statusText(c.record_status)]),
    ]),
  };
  const afterSave = async (message: string) => { setModal(null); notify('success', message); await refresh(); };
  const signOut = async () => { await supabase.auth.signOut(); window.location.assign('/admin-login'); };

  if (!isSupabaseConfigured) return <SetupScreen />;
  if (!authReady) return <div className="sa-loading"><span className="sa-spinner" /> Connecting to Savita Accounts…</div>;
  if (!user) return <LoginScreen />;
  if (!role) return <MembershipScreen email={user.email || ''} />;

  const titles: Record<Page, { title: string; sub: string }> = {
    overview: { title: 'Your company, at a glance.', sub: 'The financial pulse of Savita Global, all in one place.' },
    transactions: { title: 'Transactions & books', sub: 'Keep source documents and money movements aligned.' },
    inventory: { title: 'Inventory', sub: 'Monitor stock and indicative stock value by division.' },
    compliance: { title: 'CA & compliance', sub: 'Track obligations and questions for your Chartered Accountant.' },
    reports: { title: 'Reports & exports', sub: 'Download working registers for review and reconciliation.' },
    settings: { title: 'Accounting setup', sub: 'Opening balances and record controls for your company.' },
  };
  return (
    <div className="sa-shell">
      <aside className={`sa-sidebar ${mobileMenu ? 'open' : ''}`}>
        <div className="sa-brand">
          <div className="sa-brand-mark"><Leaf size={23} /></div>
          <div><div className="sa-brand-title">savita<span>accounts</span></div><small>SAVITA GLOBAL PRIVATE LIMITED</small></div>
          <button className="sa-icon-btn sa-mobile-close" onClick={() => setMobileMenu(false)}><X size={18} /></button>
        </div>
        <div className="sa-company-chip"><div className="sa-company-monogram">SG</div><div><strong>Savita Global Pvt. Ltd.</strong><small>India · FY 2026–27</small></div><ChevronDown size={15} /></div>
        <div className="sa-nav-label">WORKSPACE</div>
        <nav className="sa-nav">
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active={page === 'overview'} onClick={() => { setPage('overview'); setMobileMenu(false); }} />
          <NavItem icon={<ArrowLeftRight size={18} />} label="Transactions" badge={metrics.drafts || undefined} active={page === 'transactions'} onClick={() => { setPage('transactions'); setMobileMenu(false); }} />
          <NavItem icon={<Package size={18} />} label="Inventory" active={page === 'inventory'} onClick={() => { setPage('inventory'); setMobileMenu(false); }} />
          <NavItem icon={<ClipboardCheck size={18} />} label="CA & Compliance" badge={metrics.openTasks.length || undefined} active={page === 'compliance'} onClick={() => { setPage('compliance'); setMobileMenu(false); }} />
        </nav>
        <div className="sa-nav-label spaced">INSIGHTS</div>
        <nav className="sa-nav">
          <NavItem icon={<Activity size={18} />} label="Reports & exports" active={page === 'reports'} onClick={() => { setPage('reports'); setMobileMenu(false); }} />
          <NavItem icon={<Settings2 size={18} />} label="Accounting setup" active={page === 'settings'} onClick={() => { setPage('settings'); setMobileMenu(false); }} />
        </nav>
        <div className="sa-sidebar-bottom">
          <div className="sa-secure-note"><ShieldCheck size={16} /><span>Private company workspace<br /><b>Supabase access controls</b></span></div>
          <div className="sa-user-card">
            <div className="sa-avatar">{(user.email || 'S').slice(0, 1).toUpperCase()}</div>
            <div className="sa-user-info"><strong>{user.email || 'Signed-in user'}</strong><small>{role === 'ca' ? 'CA reviewer' : role[0].toUpperCase() + role.slice(1)}</small></div>
            <button className="sa-icon-btn" title="Sign out" onClick={() => void signOut()}><LogOut size={16} /></button>
          </div>
        </div>
      </aside>
      {mobileMenu && <button className="sa-scrim" onClick={() => setMobileMenu(false)} aria-label="Close navigation" />}
      <main className="sa-main">
        <header className="sa-topbar">
          <div className="sa-topbar-left">
            <button className="sa-icon-btn sa-menu-toggle" onClick={() => setMobileMenu(true)}><Menu size={19} /></button>
            <div className="sa-crumb">Savita Global <span>/</span> <b>{page === 'overview' ? 'Overview' : titles[page].title}</b></div>
          </div>
          <div className="sa-top-actions">
            <div className="sa-connected"><i /> Supabase connected</div>
            <button className="sa-icon-btn" title="Refresh data" onClick={() => void refresh()}><RefreshCw size={17} /></button>
            <button className="sa-icon-btn" title="Compliance tasks" onClick={() => setPage('compliance')}><Bell size={17} />{metrics.overdue.length > 0 && <em />}</button>
            <div className="sa-date"><CalendarDays size={15} />{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          </div>
        </header>
        <div className="sa-content">
          <div className="sa-page-heading">
            <div><div className="sa-eyebrow">FINANCE WORKSPACE <span>•</span> FY 2026–27</div><h1>{titles[page].title}</h1><p>{titles[page].sub}</p></div>
            <div className="sa-heading-actions">
              <button className="sa-btn secondary" onClick={exports.cash}><Download size={16} /> Export cashbook</button>
              {canEdit && <button className="sa-btn primary" onClick={() => setModal('document')}><Plus size={17} /> Add record</button>}
            </div>
          </div>
          {notice && <div className={`sa-notice ${notice.kind}`}><span>{notice.kind === 'success' ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}</span><p>{notice.message}</p><button onClick={() => setNotice(null)}><X size={15} /></button></div>}
          {loading && <div className="sa-refresh-note"><span className="sa-spinner small" /> Refreshing records…</div>}

          {page === 'overview' && <Overview
            metrics={metrics} documents={documents} cashRows={cashRows}
            onPage={setPage} onAddDocument={() => setModal('document')}
            onAddCash={() => setModal('cash')} onAddTask={() => setModal('task')} canEdit={canEdit} canEditTasks={canEditTasks}
          />}
          {page === 'transactions' && <Transactions
            documents={visibleDocs} cashRows={visibleCash} tab={transactionTab} setTab={setTransactionTab}
            search={search} setSearch={setSearch} division={division} setDivision={setDivision}
            docFilter={docFilter} setDocFilter={setDocFilter} canEdit={canEdit}
            onAddDocument={() => setModal('document')} onAddCash={() => setModal('cash')}
            exportDocuments={exports.documents} exportCash={exports.cash}
            onVerify={async (table: 'accounts_documents' | 'accounts_cash_entries', id: string, status: RecordStatus) => {
              if (!canEdit) return;
              const { error } = await supabase.from(table).update({ record_status: status }).eq('id', id);
              if (error) notify('error', error.message);
              else { notify('success', `Record marked ${statusText(status).toLowerCase()}.`); await refresh(); }
            }}
          />}
          {page === 'inventory' && <Inventory
            products={products} canEdit={canEdit}
            onAdd={() => setModal('product')} onMovement={() => setModal('movement')}
          />}
          {page === 'compliance' && <Compliance
            tasks={tasks} canEdit={canEditTasks} onAdd={() => setModal('task')}
            onStatus={async (id: string, status: TaskRow['status']) => {
              const { error } = await supabase.from('accounts_compliance_tasks').update({ status }).eq('id', id);
              if (error) notify('error', error.message); else { notify('success', 'Task status updated.'); await refresh(); }
            }}
          />}
          {page === 'reports' && <Reports documents={documents} cashRows={cashRows} products={products} tasks={tasks} metrics={metrics} exportDocuments={exports.documents} exportCash={exports.cash} />}
          {page === 'settings' && <Settings settings={settings} role={role} canEdit={canEdit} onEdit={() => setModal('settings')} />}
          <footer className="sa-footer"><span>Draft bookkeeping workspace · Not a statutory ledger</span><span><ShieldCheck size={14} /> Protected by Supabase Row Level Security</span></footer>
        </div>
      </main>
      {modal && <Modal title={modalTitle(modal)} onClose={() => setModal(null)}>
        <ModalBody kind={modal} documents={documents} products={products} settings={settings} busy={busy}
          setBusy={setBusy} onClose={() => setModal(null)} onSaved={afterSave} notify={notify} />
      </Modal>}
    </div>
  );
}

function NavItem({ icon, label, badge, active, onClick }: { icon: ReactNode; label: string; badge?: number; active: boolean; onClick: () => void }) {
  return <button className={`sa-nav-item ${active ? 'active' : ''}`} onClick={onClick}>
    {icon}<span>{label}</span>{badge ? <em>{badge > 99 ? '99+' : badge}</em> : null}
  </button>;
}
function Metric({ label, value, note, icon, color }: { label: string; value: string; note: string; icon: ReactNode; color: string }) {
  return <section className="sa-metric"><div className="sa-metric-top"><span>{label}</span><div className={`sa-metric-icon ${color}`}>{icon}</div></div><strong>{value}</strong><p>{note}</p><div className="sa-metric-foot"><i /> Based on records currently entered</div></section>;
}
function DivisionBadge({ value }: { value: Division }) {
  return <span className={`sa-division ${value}`}>{value === 'food' ? <Leaf size={12} /> : value === 'textile' ? <Shirt size={12} /> : <ShoppingBag size={12} />}{value === 'food' ? 'Food' : value === 'textile' ? 'Textile' : 'Shared'}</span>;
}
function StatusBadge({ value }: { value: RecordStatus }) { return <span className={`sa-status ${statusCss(value)}`}><i />{statusText(value)}</span>; }
function Empty({ icon, title, text, action }: { icon: ReactNode; title: string; text: string; action?: ReactNode }) {
  return <div className="sa-empty"><div>{icon}</div><h3>{title}</h3><p>{text}</p>{action}</div>;
}
function Overview({ metrics, documents, cashRows, onPage, onAddDocument, onAddCash, onAddTask, canEdit, canEditTasks }: any) {
  const openInvoices = documents.filter((d: DocumentRow) => d.document_type === 'sale_invoice' && Number(d.total_amount) - amountLinked(d.id, cashRows, 'in') > 0).slice(0, 4);
  return <>
    <div className="sa-metric-grid">
      <Metric label="Bank balance" value={money(metrics.bank)} note={`Cash on hand ${money(metrics.cash)}`} icon={<Landmark size={19} />} color="blue" />
      <Metric label="Sales billed · MTD" value={money(metrics.sales)} note="Invoice subtotal before GST" icon={<Activity size={19} />} color="green" />
      <Metric label="Receivables" value={money(metrics.receivables)} note="Unpaid sales invoices" icon={<ArrowDownLeft size={19} />} color="violet" />
      <Metric label="Payables" value={money(metrics.payables)} note="Unpaid supplier and expense bills" icon={<ArrowUpRight size={19} />} color="orange" />
    </div>
    <div className="sa-two-column">
      <section className="sa-card sa-sales-card">
        <div className="sa-card-head"><div><h2>Sales performance</h2><p>Monthly invoice totals · subtotal before GST</p></div><button className="sa-text-btn" onClick={() => onPage('reports')}>Reports <ChevronDown size={13} /></button></div>
        <div className="sa-sales-big"><strong>{money(metrics.sales)}</strong><span>Current month</span></div>
        <div className="sa-chart">
          <div className="sa-chart-axis"><span>{money(Math.max(1, ...metrics.months.map((m: any) => m.value)))}</span><span>₹0</span></div>
          <div className="sa-chart-bars">{metrics.months.map((m: any, i: number) => <div className="sa-chart-col" key={`${m.label}-${i}`}><div className={`sa-chart-bar ${i === 5 ? 'current' : ''}`} style={{ height: `${m.height}%` }} title={`${m.label}: ${money(m.value)}`} /><span>{m.label}</span></div>)}</div>
        </div>
        <div className="sa-chart-caption"><span><i /> Sales invoiced</span><span>Only recorded invoices are included</span></div>
      </section>
      <section className="sa-card sa-flow-card">
        <div className="sa-card-head"><div><h2>Cash movement · MTD</h2><p>Recorded receipts and payments</p></div><div className="sa-pale-icon"><Wallet size={18} /></div></div>
        <div className="sa-flow-row"><div className="sa-flow-icon incoming"><ArrowDownLeft size={17} /></div><div><b>Money received</b><small>Bank + cash</small></div><strong className="positive">{money(metrics.moneyIn)}</strong></div>
        <div className="sa-flow-row"><div className="sa-flow-icon outgoing"><ArrowUpRight size={17} /></div><div><b>Money paid</b><small>Bank + cash</small></div><strong>{money(metrics.moneyOut)}</strong></div>
        <div className="sa-flow-total"><span>Net movement this month</span><b className={metrics.moneyIn - metrics.moneyOut >= 0 ? 'positive' : 'negative'}>{money(metrics.moneyIn - metrics.moneyOut)}</b></div>
        <button className="sa-btn secondary full" onClick={() => onPage('transactions')}>Open cashbook <ArrowLeftRight size={15} /></button>
      </section>
    </div>
    <div className="sa-two-column below">
      <section className="sa-card sa-activity-card">
        <div className="sa-card-head"><div><h2>Recent activity</h2><p>Latest documents and money movements</p></div><button className="sa-text-btn" onClick={() => onPage('transactions')}>All records <ChevronDown size={13} /></button></div>
        {metrics.activity.length ? <div className="sa-activity-list">{metrics.activity.map((row: any) => <div className="sa-activity-row" key={`${row.kind}-${row.id}`}>
          <div className={`sa-activity-symbol ${row.direction === 'in' ? 'green' : 'blue'}`}>{row.kind === 'doc' ? <FileText size={16} /> : row.direction === 'in' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}</div>
          <div className="sa-activity-label"><b>{row.name || 'Unspecified counterparty'}</b><small>{row.detail} · {dateText(row.date)}</small></div>
          <div className="sa-activity-amount"><b className={row.direction === 'in' ? 'positive' : ''}>{row.direction === 'in' ? '+' : '−'}{money(row.amount)}</b><small><StatusBadge value={row.status} /></small></div>
        </div>)}</div> : <Empty icon={<FileText size={22} />} title="Your ledger starts here" text="Add the first source document or a real money movement." action={canEdit ? <button className="sa-btn primary" onClick={onAddDocument}><Plus size={15} /> Add first record</button> : null} />}
      </section>
      <div className="sa-stack">
        <section className="sa-card sa-attention-card">
          <div className="sa-card-head"><div><h2>Needs attention</h2><p>Review before using reports</p></div><span className="sa-alert-count">{metrics.drafts + metrics.overdue.length + metrics.lowStock.length}</span></div>
          {metrics.drafts > 0 && <button className="sa-attention-row" onClick={() => onPage('transactions')}><span className="sa-attention-icon amber"><FileCheck2 size={16} /></span><span><b>{metrics.drafts} records unverified</b><small>Match with source documents</small></span><ChevronDown size={14} /></button>}
          {metrics.overdue.length > 0 && <button className="sa-attention-row" onClick={() => onPage('compliance')}><span className="sa-attention-icon red"><CalendarDays size={16} /></span><span><b>{metrics.overdue.length} tasks past their due date</b><small>Confirm applicability with CA</small></span><ChevronDown size={14} /></button>}
          {metrics.lowStock.length > 0 && <button className="sa-attention-row" onClick={() => onPage('inventory')}><span className="sa-attention-icon violet"><Package size={16} /></span><span><b>{metrics.lowStock.length} low-stock products</b><small>At or below reorder quantity</small></span><ChevronDown size={14} /></button>}
          {!metrics.drafts && !metrics.overdue.length && !metrics.lowStock.length && <p className="sa-all-clear"><CheckCircle2 size={16} /> No outstanding review flags in the current records.</p>}
        </section>
        <section className="sa-card sa-quick-card"><div className="sa-card-head"><div><h2>Quick actions</h2><p>Keep your books up to date</p></div></div>
          <div className="sa-quick-grid">
            <button disabled={!canEdit} onClick={onAddDocument}><span className="blue"><FileText size={17} /></span><b>New document</b><small>Invoice or expense</small></button>
            <button disabled={!canEdit} onClick={onAddCash}><span className="green"><Banknote size={17} /></span><b>Money movement</b><small>Receipt or payment</small></button>
            <button disabled={!canEditTasks} onClick={onAddTask}><span className="orange"><ClipboardCheck size={17} /></span><b>CA task</b><small>Reminder or question</small></button>
            <button onClick={() => onPage('reports')}><span className="violet"><Download size={17} /></span><b>Export reports</b><small>CSV for review</small></button>
          </div>
        </section>
      </div>
    </div>
    {openInvoices.length > 0 && <section className="sa-card sa-outstanding-card"><div className="sa-card-head"><div><h2>Outstanding customer invoices</h2><p>Based on invoices and linked customer receipts</p></div><button className="sa-text-btn" onClick={() => onPage('transactions')}>View all <ChevronDown size={13} /></button></div>
      <div className="sa-table-scroll"><table className="sa-table"><thead><tr><th>Customer</th><th>Invoice</th><th>Due date</th><th className="right">Outstanding</th></tr></thead><tbody>{openInvoices.map((d: DocumentRow) => <tr key={d.id}><td><b>{d.counterparty_name}</b><small>{divisionText(d.division)}</small></td><td>{d.document_number || '—'}</td><td>{dateText(d.due_date)}</td><td className="right"><b>{money(Math.max(0, Number(d.total_amount) - amountLinked(d.id, cashRows, 'in')))}</b></td></tr>)}</tbody></table></div>
    </section>}
  </>;
}

function Transactions({ documents, cashRows, tab, setTab, search, setSearch, division, setDivision, docFilter, setDocFilter, canEdit, onAddDocument, onAddCash, exportDocuments, exportCash, onVerify }: any) {
  return <section className="sa-card sa-table-card">
    <div className="sa-tabs"><button className={tab === 'documents' ? 'active' : ''} onClick={() => setTab('documents')}>Documents <span>{documents.length}</span></button><button className={tab === 'cashbook' ? 'active' : ''} onClick={() => setTab('cashbook')}>Cashbook <span>{cashRows.length}</span></button></div>
    <div className="sa-table-toolbar">
      <label className="sa-search"><Search size={16} /><input placeholder="Search counterparty, invoice or reference…" value={search} onChange={(e) => setSearch(e.target.value)} /></label>
      <label className="sa-filter"><Filter size={14} /><select value={division} onChange={(e) => setDivision(e.target.value)}><option value="all">All divisions</option><option value="food">Dehydrated foods</option><option value="textile">Towels & napkins</option><option value="shared">Shared</option></select></label>
      {tab === 'documents' && <select className="sa-select" value={docFilter} onChange={(e) => setDocFilter(e.target.value)}><option value="all">All document types</option><option value="sale_invoice">Sales invoices</option><option value="purchase_invoice">Purchase invoices</option><option value="expense_bill">Expense bills</option><option value="other">Other</option></select>}
      <div className="sa-toolbar-buttons"><button className="sa-btn secondary" onClick={tab === 'documents' ? exportDocuments : exportCash}><Download size={15} /> CSV</button>{canEdit && <button className="sa-btn primary" onClick={tab === 'documents' ? onAddDocument : onAddCash}><Plus size={15} /> Add {tab === 'documents' ? 'document' : 'movement'}</button>}</div>
    </div>
    <div className="sa-table-scroll">
      {tab === 'documents' ? <table className="sa-table"><thead><tr><th>Date</th><th>Document</th><th>Counterparty</th><th>Division</th><th className="right">Total</th><th>Verification</th></tr></thead><tbody>
        {documents.map((d: DocumentRow) => <tr key={d.id}><td>{dateText(d.document_date)}</td><td><b>{d.document_number || docText(d.document_type)}</b><small>{docText(d.document_type)}</small></td><td><b>{d.counterparty_name}</b><small>{d.description}</small></td><td><DivisionBadge value={d.division} /></td><td className="right"><b>{money(d.total_amount)}</b><small>Tax {money(d.tax_amount)}</small></td><td><button disabled={!canEdit} className={`sa-verify-button ${statusCss(d.record_status)}`} onClick={() => onVerify('accounts_documents', d.id, d.record_status === 'verified' ? 'draft' : 'verified')} title="Toggle draft / verified"><StatusBadge value={d.record_status} />{canEdit && <ChevronDown size={12} />}</button></td></tr>)}
      </tbody></table> : <table className="sa-table"><thead><tr><th>Date</th><th>Movement</th><th>Counterparty / category</th><th>Account</th><th>Method / reference</th><th className="right">Amount</th><th>Status</th></tr></thead><tbody>
        {cashRows.map((c: CashRow) => <tr key={c.id}><td>{dateText(c.entry_date)}</td><td><span className={`sa-money-direction ${c.direction}`}>{c.direction === 'in' ? <ArrowDownLeft size={12} /> : <ArrowUpRight size={12} />}{c.direction === 'in' ? 'Money in' : 'Money out'}</span><small>{c.entry_type.replaceAll('_', ' ')}</small></td><td><b>{c.counterparty_name || c.category}</b><small>{divisionText(c.division)}</small></td><td>{c.account_type === 'bank' ? 'Bank' : 'Cash'}</td><td>{c.payment_method}<small>{c.bank_reference || 'No reference'}</small></td><td className="right"><b className={c.direction === 'in' ? 'positive' : ''}>{c.direction === 'in' ? '+' : '−'}{money(c.amount)}</b></td><td><button disabled={!canEdit} className={`sa-verify-button ${statusCss(c.record_status)}`} onClick={() => onVerify('accounts_cash_entries', c.id, c.record_status === 'verified' ? 'draft' : 'verified')}><StatusBadge value={c.record_status} />{canEdit && <ChevronDown size={12} />}</button></td></tr>)}
      </tbody></table>}
      {tab === 'documents' && documents.length === 0 && <Empty icon={<FileText size={22} />} title="No documents found" text="Add sales, purchase, or expense documents supported by actual invoices." action={canEdit ? <button className="sa-btn primary" onClick={onAddDocument}><Plus size={15} /> Add document</button> : null} />}
      {tab === 'cashbook' && cashRows.length === 0 && <Empty icon={<Banknote size={22} />} title="Cashbook is empty" text="Record real receipts and payments. Link to documents whenever possible." action={canEdit ? <button className="sa-btn primary" onClick={onAddCash}><Plus size={15} /> Add movement</button> : null} />}
    </div>
    <div className="sa-table-foot"><span>Showing {tab === 'documents' ? documents.length : cashRows.length} records</span><span><ShieldCheck size={14} /> Draft records are not verified accounting entries</span></div>
  </section>;
}
function Inventory({ products, canEdit, onAdd, onMovement }: any) {
  const [filter, setFilter] = useState<'all' | Division>('all');
  const rows = products.filter((p: ProductRow) => filter === 'all' || p.division === filter);
  const value = rows.reduce((sum: number, p: ProductRow) => sum + Number(p.current_quantity) * Number(p.unit_cost), 0);
  const low = rows.filter((p: ProductRow) => Number(p.current_quantity) <= Number(p.reorder_level));
  return <>
    <div className="sa-metric-grid inventory-metrics">
      <Metric label="Products tracked" value={String(rows.length)} note="Active products in this view" icon={<Package size={19} />} color="blue" />
      <Metric label="Approx. stock value" value={money(value)} note="Quantity × recorded unit cost" icon={<Banknote size={19} />} color="green" />
      <Metric label="Reorder alerts" value={String(low.length)} note="At or below reorder quantity" icon={<AlertCircle size={19} />} color="orange" />
      <Metric label="Divisions" value={filter === 'all' ? 'Food + textile' : 'One selected'} note="Shared costs can be separated" icon={<ShoppingBag size={19} />} color="violet" />
    </div>
    <section className="sa-card sa-table-card">
      <div className="sa-section-head"><div><h2>Stock register</h2><p>Quantity is updated from recorded stock movements.</p></div><div className="sa-toolbar-buttons"><select className="sa-select" value={filter} onChange={(e) => setFilter(e.target.value)}><option value="all">All divisions</option><option value="food">Dehydrated foods</option><option value="textile">Towels & napkins</option><option value="shared">Shared</option></select>{canEdit && <><button className="sa-btn secondary" onClick={onMovement}><ArrowLeftRight size={15} /> Stock movement</button><button className="sa-btn primary" onClick={onAdd}><Plus size={15} /> Add product</button></>}</div></div>
      <div className="sa-table-scroll"><table className="sa-table"><thead><tr><th>Product</th><th>Division</th><th>On hand</th><th>Reorder at</th><th className="right">Unit cost</th><th className="right">Stock value</th><th>Stock status</th></tr></thead><tbody>
        {rows.map((p: ProductRow) => { const isLow = Number(p.current_quantity) <= Number(p.reorder_level); return <tr key={p.id}><td><b>{p.product_name}</b><small>SKU: {p.sku} · {p.unit}</small></td><td><DivisionBadge value={p.division} /></td><td><b>{Number(p.current_quantity).toLocaleString('en-IN', { maximumFractionDigits: 3 })} {p.unit}</b></td><td>{Number(p.reorder_level).toLocaleString('en-IN')} {p.unit}</td><td className="right">{money(p.unit_cost)}</td><td className="right"><b>{money(Number(p.current_quantity) * Number(p.unit_cost))}</b></td><td><span className={`sa-stock ${isLow ? 'low' : 'ok'}`}><i />{isLow ? 'Reorder' : 'In stock'}</span></td></tr>; })}
      </tbody></table>{rows.length === 0 && <Empty icon={<Package size={22} />} title="No products in this view" text="Add a product and enter actual opening stock, with food and textile items separated." action={canEdit ? <button className="sa-btn primary" onClick={onAdd}><Plus size={15} /> Add product</button> : null} />}</div>
      <div className="sa-table-foot"><span>Approximate value only; not a formal inventory valuation.</span><span>Keep physical counts and source bills.</span></div>
    </section>
  </>;
}

function Compliance({ tasks, canEdit, onAdd, onStatus }: any) {
  const [filter, setFilter] = useState('open');
  const shown = tasks.filter((t: TaskRow) => filter === 'all' || (filter === 'open' ? t.status !== 'completed' : t.status === filter));
  const categories: Record<string, string> = { gst: 'GST', tds: 'TDS', income_tax: 'Income tax', mca: 'MCA / ROC', bank: 'Banking', other: 'Other' };
  return <>
    <div className="sa-compliance-banner"><div className="sa-compliance-symbol"><BookOpenCheck size={23} /></div><div><b>Work with your CA, not around them.</b><p>Track obligations and questions here. Enter due dates only after verifying current applicability and deadlines with your CA.</p></div><span>CA REVIEW</span></div>
    <section className="sa-card sa-table-card"><div className="sa-section-head"><div><h2>Compliance tracker</h2><p>{tasks.filter((t: TaskRow) => t.status !== 'completed').length} open item(s) · {tasks.filter((t: TaskRow) => t.status === 'ca_review').length} awaiting CA review</p></div><div className="sa-toolbar-buttons"><select className="sa-select" value={filter} onChange={(e) => setFilter(e.target.value)}><option value="open">Open items</option><option value="all">All tasks</option><option value="ca_review">CA review</option><option value="completed">Completed</option></select>{canEdit && <button className="sa-btn primary" onClick={onAdd}><Plus size={15} /> Add task</button>}</div></div>
      <div className="sa-table-scroll"><table className="sa-table"><thead><tr><th>Task</th><th>Area</th><th>Due date</th><th>Priority</th><th>Status</th><th>Update</th></tr></thead><tbody>{shown.map((t: TaskRow) => <tr key={t.id}><td><b>{t.title}</b><small>{t.notes || 'No notes added'}</small></td><td><span className="sa-task-category">{categories[t.category] || t.category}</span></td><td>{t.due_date ? <span className={t.due_date < today() && t.status !== 'completed' ? 'sa-overdue' : ''}>{dateText(t.due_date)}</span> : <span className="sa-muted">Not set</span>}</td><td><span className={`sa-priority ${t.priority}`}>{t.priority}</span></td><td><span className={`sa-task-status ${t.status}`}>{t.status.replace('_', ' ')}</span></td><td>{canEdit ? <select className="sa-inline-select" value={t.status} onChange={(e) => onStatus(t.id, e.target.value)}><option value="pending">Pending</option><option value="in_progress">In progress</option><option value="ca_review">CA review</option><option value="completed">Completed</option></select> : <span className="sa-muted">View only</span>}</td></tr>)}</tbody></table>{shown.length === 0 && <Empty icon={<ClipboardCheck size={22} />} title="No tasks in this view" text="Create a reminder or CA question. Confirm statutory due dates before entering them." action={canEdit ? <button className="sa-btn primary" onClick={onAdd}><Plus size={15} /> Add task</button> : null} />}</div>
      <div className="sa-table-foot"><span>No tax rates or legal deadlines are auto-assumed.</span><span>Verify items with your CA or official portal.</span></div>
    </section>
  </>;
}

function Reports({ documents, cashRows, products, tasks, metrics, exportDocuments, exportCash }: any) {
  const exportInventory = () => downloadCsv('savita-inventory.csv', [
    ['SKU', 'Product', 'Division', 'Unit', 'On hand', 'Unit cost INR', 'Stock value INR', 'Reorder level'],
    ...products.map((p: ProductRow) => [p.sku, p.product_name, divisionText(p.division), p.unit, p.current_quantity, p.unit_cost, Number(p.current_quantity) * Number(p.unit_cost), p.reorder_level]),
  ]);
  const exportTasks = () => downloadCsv('savita-ca-tasks.csv', [
    ['Task', 'Category', 'Due date', 'Priority', 'Status', 'Notes'],
    ...tasks.map((t: TaskRow) => [t.title, t.category, t.due_date, t.priority, t.status, t.notes]),
  ]);
  return <>
    <div className="sa-report-grid">
      <ReportCard icon={<FileText size={21} />} title="Document register" text="Sales invoices, purchase bills and expense documents, including tax fields and status." count={`${documents.length} records`} onClick={exportDocuments} />
      <ReportCard icon={<Banknote size={21} />} title="Cashbook" text="Receipts and payments with account type, method and bank-reference fields." count={`${cashRows.length} movements`} onClick={exportCash} />
      <ReportCard icon={<Package size={21} />} title="Inventory summary" text="Stock quantities, reorder levels and approximate stock value by division." count={`${products.length} products`} onClick={exportInventory} />
      <ReportCard icon={<ClipboardCheck size={21} />} title="CA task checklist" text="Export tasks, notes, deadlines and review status for your Chartered Accountant." count={`${tasks.filter((t: TaskRow) => t.status !== 'completed').length} open tasks`} onClick={exportTasks} />
    </div>
    <section className="sa-card sa-report-summary"><div className="sa-card-head"><div><h2>Current-month snapshot</h2><p>Working figures only · current calendar month</p></div><span className="sa-estimate-tag">NOT FINAL ACCOUNTS</span></div>
      <div className="sa-summary-grid"><Summary label="Sales billed · subtotal" value={money(metrics.sales)} /><Summary label="Purchase bills · subtotal" value={money(metrics.purchases)} /><Summary label="Expense bills · subtotal" value={money(metrics.expenses)} /><Summary label="Indicative difference" value={money(metrics.sales - metrics.purchases - metrics.expenses)} highlight /></div>
      <div className="sa-warning"><AlertCircle size={16} /><p>This difference is not statutory profit. It does not adjust inventory / cost of goods sold, accruals, depreciation, interest, tax, credit notes, or other period-end entries. Your CA should prepare final financial statements.</p></div>
    </section>
  </>;
}
function ReportCard({ icon, title, text, count, onClick }: any) { return <section className="sa-card sa-report-card"><div className="sa-report-icon">{icon}</div><h2>{title}</h2><p>{text}</p><div><span>{count}</span><button className="sa-btn secondary" onClick={onClick}><Download size={15} /> Export CSV</button></div></section>; }
function Summary({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) { return <div className={`sa-summary-item ${highlight ? 'highlight' : ''}`}><span>{label}</span><b>{value}</b></div>; }

function Settings({ settings, role, canEdit, onEdit }: any) {
  return <div className="sa-settings-grid">
    <section className="sa-card sa-settings-card"><div className="sa-card-head"><div><h2>Opening balances</h2><p>Use verified records as your starting point.</p></div><button className="sa-btn primary" disabled={!canEdit} onClick={onEdit}><Settings2 size={15} /> Edit balances</button></div>
      <div className="sa-setting-line"><div><b>Opening bank balance</b><small>As at the balance date</small></div><strong>{money(settings.opening_bank_balance)}</strong></div>
      <div className="sa-setting-line"><div><b>Opening cash on hand</b><small>Physical cash, not bank balance</small></div><strong>{money(settings.opening_cash_balance)}</strong></div>
      <div className="sa-setting-line"><div><b>Opening balance date</b><small>Align with the first imported movement</small></div><strong>{dateText(settings.opening_balance_date)}</strong></div>
      <div className="sa-warning"><AlertCircle size={16} /><p>Do not enter today's bank balance as opening balance if you also enter historical movements. That would double-count the activity.</p></div>
    </section>
    <section className="sa-card sa-settings-card"><div className="sa-card-head"><div><h2>Access & record controls</h2><p>Supabase-authenticated workspace</p></div><ShieldCheck size={21} className="sa-green" /></div>
      <div className="sa-role-current"><div className="sa-avatar">{role === 'ca' ? 'C' : 'S'}</div><div><b>Current signed-in user</b><small>Role: {role}</small></div><span>Active</span></div>
      <div className="sa-role-list"><p><b>Owner</b><span>Manage finance data, setup and member access.</span></p><p><b>Accountant</b><span>Create or update accounts, stock and tasks.</span></p><p><b>CA reviewer</b><span>Review records and manage the compliance checklist.</span></p><p><b>Viewer</b><span>Read-only access to company accounts.</span></p></div>
      <div className="sa-warning"><ShieldCheck size={16} /><p>Database policies enforce access. A frontend publishable/anon key is not a password; never use a service-role secret in browser code.</p></div>
    </section>
  </div>;
}
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', key); document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [onClose]);
  return <div className="sa-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="sa-modal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="sa-modal-head"><div><span className="sa-eyebrow">SAVITA ACCOUNTS</span><h2>{title}</h2></div><button className="sa-icon-btn" onClick={onClose}><X size={18} /></button></div>
      {children}
    </div>
  </div>;
}
function modalTitle(kind: ModalKind) {
  const titles: Record<Exclude<ModalKind, null>, string> = {
    document: 'Add financial document', cash: 'Record money movement', product: 'Add inventory product',
    movement: 'Record stock movement', task: 'Add CA / compliance task', settings: 'Set opening balances',
  };
  return kind ? titles[kind] : '';
}
function ModalBody({ kind, documents, products, settings, busy, setBusy, onClose, onSaved, notify }: any) {
  const [f, setF] = useState<any>({
    document_type: 'sale_invoice', division: 'food', document_date: today(), due_date: '',
    document_number: '', counterparty_name: '', description: '', subtotal: '', tax_amount: '0',
    entry_date: today(), direction: 'out', entry_type: 'supplier_payment', category: '', amount: '',
    account_type: 'bank', payment_method: 'bank_transfer', bank_reference: '',
    related_document_id: '', notes: '', sku: '', product_name: '', unit: 'kg',
    opening_quantity: '0', unit_cost: '', reorder_level: '0', inventory_item_id: '',
    movement_type: 'purchase', quantity: '', priority: 'medium', title: '',
    category_task: 'gst', task_status: 'pending', task_due_date: '',
    opening_bank_balance: String(settings.opening_bank_balance || 0),
    opening_cash_balance: String(settings.opening_cash_balance || 0),
    opening_balance_date: settings.opening_balance_date || today(),
  });
  const change = (key: string, value: string) => setF((old: any) => ({ ...old, [key]: value }));
  const field = (key: string, label: string, placeholder = '', type = 'text', required = false, hint?: string) => (
    <label className="sa-field" key={key}><span>{label}{required && <i> *</i>}</span>
      <input type={type} placeholder={placeholder} value={f[key] ?? ''} required={required}
        min={type === 'number' ? 0 : undefined} step={type === 'number' ? '0.01' : undefined}
        onChange={(e) => change(key, e.target.value)} />
      {hint && <small>{hint}</small>}
    </label>
  );
  const selectField = (key: string, label: string, options: [string, string][]) => (
    <label className="sa-field" key={key}><span>{label} *</span><select required value={f[key]} onChange={(e) => change(key, e.target.value)}>
      {options.map(([value, text]) => <option value={value} key={value}>{text}</option>)}
    </select></label>
  );
  const textarea = (key: string, label: string, placeholder = '') => (
    <label className="sa-field full" key={key}><span>{label}</span><textarea rows={3} placeholder={placeholder} value={f[key] ?? ''} onChange={(e) => change(key, e.target.value)} /></label>
  );
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true);
    try {
      if (kind === 'document') {
        const subtotal = Number(f.subtotal); const tax = Number(f.tax_amount || 0);
        if (!Number.isFinite(subtotal) || subtotal < 0 || !Number.isFinite(tax) || tax < 0) throw new Error('Enter valid non-negative subtotal and tax amounts.');
        const { error } = await supabase.from('accounts_documents').insert({
          document_type: f.document_type, division: f.division,
          document_number: f.document_number.trim() || null, document_date: f.document_date,
          due_date: f.due_date || null, counterparty_name: f.counterparty_name.trim(),
          description: f.description.trim(), subtotal, tax_amount: tax, record_status: 'draft',
        });
        if (error) throw error;
        await onSaved('Document saved as a draft. Check it against the source invoice before reporting.');
      } else if (kind === 'cash') {
        const amount = Number(f.amount);
        if (!Number.isFinite(amount) || amount <= 0) throw new Error('Amount must be greater than zero.');
        const { error } = await supabase.from('accounts_cash_entries').insert({
          entry_date: f.entry_date, direction: f.direction, entry_type: f.entry_type,
          division: f.division, category: f.category.trim(), counterparty_name: f.counterparty_name.trim() || null,
          amount, account_type: f.account_type, payment_method: f.payment_method,
          bank_reference: f.bank_reference.trim() || null, related_document_id: f.related_document_id || null,
          notes: f.notes.trim() || null, record_status: 'draft',
        });
        if (error) throw error;
        await onSaved('Money movement saved as a draft. Match it with bank or receipt evidence.');
      } else if (kind === 'product') {
        const qty = Number(f.opening_quantity || 0); const cost = Number(f.unit_cost || 0); const reorder = Number(f.reorder_level || 0);
        if (!f.sku.trim() || !f.product_name.trim()) throw new Error('SKU and product name are required.');
        if (qty < 0 || cost < 0 || reorder < 0) throw new Error('Quantity, cost and reorder level cannot be negative.');
        const { error } = await supabase.rpc('create_accounts_inventory_item', {
          p_sku: f.sku.trim(), p_product_name: f.product_name.trim(), p_division: f.division,
          p_unit: f.unit, p_opening_quantity: qty, p_unit_cost: cost,
          p_reorder_level: reorder, p_notes: 'Opening stock',
        });
        if (error) throw error;
        await onSaved('Product and opening-stock movement saved.');
      } else if (kind === 'movement') {
        const qty = Number(f.quantity);
        if (!f.inventory_item_id || !Number.isFinite(qty) || qty <= 0) throw new Error('Choose a product and enter a quantity greater than zero.');
        const { error } = await supabase.from('accounts_inventory_movements').insert({
          inventory_item_id: f.inventory_item_id, movement_date: f.entry_date,
          movement_type: f.movement_type, quantity: qty, unit_cost: Number(f.unit_cost || 0),
          reference: f.bank_reference.trim() || null, notes: f.notes.trim() || null,
          record_status: 'draft',
        });
        if (error) throw error;
        await onSaved('Stock movement recorded. Review the quantity against source evidence.');
      } else if (kind === 'task') {
        if (!f.title.trim()) throw new Error('Task title is required.');
        const { error } = await supabase.from('accounts_compliance_tasks').insert({
          title: f.title.trim(), category: f.category_task, due_date: f.task_due_date || null,
          status: f.task_status, priority: f.priority, notes: f.notes.trim() || null,
        });
        if (error) throw error;
        await onSaved('CA / compliance task saved. Confirm any due date with your CA.');
      } else if (kind === 'settings') {
        const { error } = await supabase.from('accounts_company_settings').upsert({
          id: 1, opening_bank_balance: Number(f.opening_bank_balance || 0),
          opening_cash_balance: Number(f.opening_cash_balance || 0),
          opening_balance_date: f.opening_balance_date || null, updated_at: new Date().toISOString(),
        });
        if (error) throw error;
        await onSaved('Opening balances saved. Check for possible double-counting of historical transactions.');
      }
    } catch (error: any) {
      notify('error', error?.message || 'Unable to save record.');
    } finally { setBusy(false); }
  };
  return <form className="sa-modal-form" onSubmit={submit}>
    {kind === 'document' && <>
      <p className="sa-form-intro">Capture what the source document says. GST treatment remains subject to your CA’s review.</p>
      <div className="sa-form-grid">
        {selectField('document_type', 'Document type', [['sale_invoice', 'Sales invoice'], ['purchase_invoice', 'Purchase invoice'], ['expense_bill', 'Expense bill'], ['other', 'Other document']])}
        {selectField('division', 'Business division', [['food', 'Dehydrated foods'], ['textile', 'Towels & napkins'], ['shared', 'Shared / company-wide']])}
        {field('document_number', 'Invoice / document number', 'e.g. SG/26-27/001')}
        {field('document_date', 'Document date', '', 'date', true)}
        {field('due_date', 'Due date', '', 'date')}
        {field('counterparty_name', 'Customer / supplier', 'Legal name on invoice', 'text', true)}
        {field('subtotal', 'Subtotal (₹)', '0.00', 'number', true, 'Before GST / other tax.')}
        {field('tax_amount', 'Tax amount (₹)', '0.00', 'number', true, 'Enter the amount actually shown; do not guess a rate.')}
        {field('description', 'Description / items', 'Product, service or reason', 'text', true)}
      </div>
      <div className="sa-form-notice"><AlertCircle size={16} /> Creates a draft record only. It does not issue a GST invoice or file a return.</div>
    </>}
    {kind === 'cash' && <>
      <p className="sa-form-intro">Record a real receipt or payment. Customer advances, director contributions and loans must not be labelled as sales revenue.</p>
      <div className="sa-form-grid">
        {field('entry_date', 'Transaction date', '', 'date', true)}
        {selectField('direction', 'Money flow', [['in', 'Money received'], ['out', 'Money paid']])}
        {selectField('entry_type', 'Accounting nature', [['customer_receipt', 'Customer receipt'], ['customer_advance', 'Customer advance'], ['supplier_payment', 'Supplier payment'], ['expense_payment', 'Expense payment'], ['director_contribution', 'Director contribution'], ['loan_received', 'Loan received'], ['loan_repayment', 'Loan repayment'], ['asset_purchase', 'Asset purchase'], ['supplier_refund', 'Supplier refund'], ['other_receipt', 'Other receipt'], ['other_payment', 'Other payment'], ['bank_transfer', 'Bank transfer']])}
        {selectField('division', 'Business division', [['food', 'Dehydrated foods'], ['textile', 'Towels & napkins'], ['shared', 'Shared / company-wide']])}
        {field('amount', 'Amount (₹)', '0.00', 'number', true)}
        {selectField('account_type', 'Account', [['bank', 'Bank account'], ['cash', 'Cash on hand']])}
        {selectField('payment_method', 'Payment method', [['bank_transfer', 'Bank transfer / NEFT / RTGS'], ['upi', 'UPI'], ['cash', 'Cash'], ['cheque', 'Cheque'], ['card', 'Card'], ['other', 'Other']])}
        {field('counterparty_name', 'Customer / supplier / director', 'Name of other party')}
        {field('category', 'Category / purpose', 'E.g. director capital, freight, packaging', 'text', true)}
        <label className="sa-field"><span>Link to document (optional)</span><select value={f.related_document_id} onChange={(e) => change('related_document_id', e.target.value)}><option value="">No linked document</option>{documents.map((d: DocumentRow) => <option key={d.id} value={d.id}>{d.document_number || docText(d.document_type)} · {d.counterparty_name} · {money(d.total_amount)}</option>)}</select><small>Link customer receipts to sales invoices and supplier payments to the relevant bill.</small></label>
        {field('bank_reference', 'Bank reference / UTR', 'Reference from statement')}
        {textarea('notes', 'Notes', 'Receipt, bank statement details, or CA question')}
      </div>
      <div className="sa-form-notice"><AlertCircle size={16} /> Verify amount, counterparty and payment direction against evidence before marking as verified.</div>
    </>}
    {kind === 'product' && <>
      <p className="sa-form-intro">Create a product and opening-stock entry. Use actual opening quantities and supplier-supported costs.</p>
      <div className="sa-form-grid">
        {field('sku', 'SKU / product code', 'e.g. ONION-FLK-001', 'text', true)}
        {field('product_name', 'Product name', 'Red onion flakes / bath towel', 'text', true)}
        {selectField('division', 'Division', [['food', 'Dehydrated foods'], ['textile', 'Towels & napkins'], ['shared', 'Shared / company-wide']])}
        {selectField('unit', 'Stock unit', [['kg', 'Kilogram (kg)'], ['g', 'Gram (g)'], ['piece', 'Piece'], ['pack', 'Pack'], ['carton', 'Carton'], ['bag', 'Bag'], ['dozen', 'Dozen'], ['meter', 'Meter']])}
        {field('opening_quantity', 'Opening stock quantity', '0', 'number', true)}
        {field('unit_cost', 'Approx. unit cost (₹)', '0.00', 'number', true)}
        {field('reorder_level', 'Reorder alert quantity', '0', 'number', true)}
      </div>
    </>}
    {kind === 'movement' && <>
      <p className="sa-form-intro">Record stock additions or reductions. A stock movement adjusts current quantity; keep the source invoice or count reference.</p>
      <div className="sa-form-grid">
        <label className="sa-field full"><span>Product *</span><select required value={f.inventory_item_id} onChange={(e) => change('inventory_item_id', e.target.value)}><option value="">Choose a product</option>{products.map((p: ProductRow) => <option key={p.id} value={p.id}>{p.product_name} · Current {p.current_quantity} {p.unit}</option>)}</select></label>
        {field('entry_date', 'Movement date', '', 'date', true)}
        {selectField('movement_type', 'Movement type', [['purchase', 'Stock received / purchase'], ['sale', 'Stock issued / sold'], ['adjustment_in', 'Positive adjustment'], ['adjustment_out', 'Negative adjustment']])}
        {field('quantity', 'Quantity', '0', 'number', true)}
        {field('unit_cost', 'Unit cost (₹)', '0.00', 'number')}
        {field('bank_reference', 'Invoice / stock reference', 'Reference number')}
        {textarea('notes', 'Notes', 'Reason for adjustment or movement')}
      </div>
    </>}
    {kind === 'task' && <>
      <p className="sa-form-intro">Create a CA reminder, question or compliance tracker item. Statutory dates should be confirmed, not inferred.</p>
      <div className="sa-form-grid">
        {field('title', 'Task title', 'E.g. Confirm GST registration status', 'text', true)}
        {selectField('category_task', 'Compliance area', [['gst', 'GST'], ['tds', 'TDS'], ['income_tax', 'Income tax'], ['mca', 'MCA / ROC'], ['bank', 'Banking'], ['other', 'Other / CA question']])}
        {field('task_due_date', 'CA-confirmed due date', '', 'date')}
        {selectField('priority', 'Priority', [['low', 'Low'], ['medium', 'Medium'], ['high', 'High']])}
        {selectField('task_status', 'Initial status', [['pending', 'Pending'], ['in_progress', 'In progress'], ['ca_review', 'Awaiting CA review'], ['completed', 'Completed']])}
        {textarea('notes', 'Notes / question for CA', 'Applicability, support document or official reference…')}
      </div>
    </>}
    {kind === 'settings' && <>
      <p className="sa-form-intro">Enter balances immediately before the first transaction you plan to record, using a bank statement and physical cash count.</p>
      <div className="sa-form-grid">
        {field('opening_balance_date', 'Opening balance date', '', 'date', true)}
        {field('opening_bank_balance', 'Opening bank balance (₹)', '0.00', 'number', true)}
        {field('opening_cash_balance', 'Opening cash on hand (₹)', '0.00', 'number', true)}
      </div>
      <div className="sa-form-notice"><AlertCircle size={16} /> If you import prior transactions, set the opening balance before the first imported movement to avoid double-counting.</div>
    </>}
    <div className="sa-modal-actions"><button type="button" className="sa-btn secondary" onClick={onClose} disabled={busy}>Cancel</button><button type="submit" className="sa-btn primary" disabled={busy}>{busy ? <><span className="sa-spinner tiny" /> Saving…</> : <><Check size={16} /> Save record</>}</button></div>
  </form>;
}
function SetupScreen() {
  return <div className="sa-access-screen"><div className="sa-access-card"><div className="sa-brand-mark large"><Leaf size={28} /></div><h1>Connect Savita Accounts</h1><p>Add your Supabase project URL and a publishable / anon key to the Vite environment file. Never use a service-role secret in browser code.</p><pre>{'VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key'}</pre><p className="sa-muted">Restart Vite after changing environment variables.</p></div></div>;
}
function LoginScreen() {
  return <div className="sa-access-screen"><div className="sa-access-card"><div className="sa-brand-mark large"><ShieldCheck size={28} /></div><h1>Sign in to Savita Accounts</h1><p>This company finance workspace requires your existing Supabase Auth session.</p><a className="sa-btn primary sa-access-link" href="/admin-login">Continue to company sign-in <ArrowUpRight size={16} /></a><p className="sa-muted">Never share passwords, OTPs, bank PINs or one-time codes.</p></div></div>;
}
function MembershipScreen({ email }: { email: string }) {
  return <div className="sa-access-screen"><div className="sa-access-card"><div className="sa-brand-mark large"><Users size={28} /></div><h1>Access needs to be enabled</h1><p>You are signed in as <b>{email}</b>, but this user is not enrolled in Savita Accounts.</p><p>Run the membership insert SQL from the setup guide in the Supabase SQL Editor, assigning the correct role. No accounting records were changed.</p><a className="sa-btn secondary sa-access-link" href="/admin-login">Return to sign-in <ArrowUpRight size={16} /></a></div></div>;
}
