import { createClient } from '@supabase/supabase-js';
import supabase from './db-client.js';

const supabaseUrl = process.env.SUPABASE_URL;

const supabaseAuthKey =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

const dashboardAdminEmail =
  process.env.DASHBOARD_ADMIN_EMAIL?.trim().toLowerCase();

if (!supabaseUrl) {
  throw new Error('Missing SUPABASE_URL environment variable');
}

if (!supabaseAuthKey) {
  throw new Error('Missing Supabase authentication key');
}

const supabaseAuth = createClient(
  supabaseUrl,
  supabaseAuthKey
);

const products = [
  'Dehydrated Vegetables',
  'Dehydrated Fruits',
  'Value-Added Snacks',
  'Bulk Food Ingredients',
  'Export Supply Services',
  'Towels & Napkins',
  'Other / Mixed',
];

const incoterms = [
  'FOB',
  'CFR',
  'CIF',
  'DDP',
  'EXW',
  'Not sure yet',
];

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isValidName(name) {
  return /^[A-Za-zÀ-ÿ\s.'-]+$/.test(name);
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    // ============================================
    // POST — Create new enquiry
    // Public endpoint for website visitors
    // ============================================

    if (req.method === 'POST') {
      const body = req.body || {};

      const company = clean(body.company);
      const name = clean(body.name);
      const email = clean(body.email).toLowerCase();
      const phone = clean(body.phone);
      const country = clean(body.country);
      const product = clean(body.product);
      const incoterm = clean(body.incoterm);
      const quantity = clean(body.quantity);
      const message = clean(body.message);

      const errors = {};

      // Company
      if (!company) {
        errors.company = 'Company name is required.';
      } else if (company.length < 2) {
        errors.company = 'Please enter a valid company name.';
      } else if (company.length > 150) {
        errors.company = 'Company name is too long.';
      }

      // Name
      if (!name) {
        errors.name = 'Your name is required.';
      } else if (name.length < 2) {
        errors.name = 'Please enter your full name.';
      } else if (name.length > 100) {
        errors.name = 'Name is too long.';
      } else if (!isValidName(name)) {
        errors.name = 'Please enter a valid name.';
      }

      // Email
      if (!email) {
        errors.email = 'Email address is required.';
      } else if (email.length > 254) {
        errors.email = 'Email address is too long.';
      } else if (!isValidEmail(email)) {
        errors.email = 'Please enter a valid email address.';
      }

      // Phone — optional
      if (phone && !isValidPhone(phone)) {
        errors.phone =
          'Please enter a valid phone or WhatsApp number.';
      }

      // Country
      if (!country) {
        errors.country = 'Destination country is required.';
      } else if (country.length < 2) {
        errors.country = 'Please enter a valid country.';
      } else if (country.length > 100) {
        errors.country = 'Country name is too long.';
      }

      // Product
      if (!products.includes(product)) {
        errors.product =
          'Please select a valid product division.';
      }

      // Incoterm
      if (!incoterms.includes(incoterm)) {
        errors.incoterm =
          'Please select a valid incoterm.';
      }

      // Quantity — optional
      if (quantity && quantity.length > 100) {
        errors.quantity =
          'Quantity information is too long.';
      }

      // Message
      if (!message) {
        errors.message =
          'Please tell us about your requirement.';
      } else if (message.length < 20) {
        errors.message =
          'Please provide at least 20 characters about your requirement.';
      } else if (message.length > 5000) {
        errors.message =
          'Message is too long. Please keep it below 5000 characters.';
      }

      // Return validation errors
      if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          error: 'Please correct the highlighted fields.',
          fields: errors,
        });
      }

      // Insert validated enquiry
      const { data, error } = await supabase
        .from('enquiries')
        .insert({
          company,
          name,
          email,
          phone: phone || null,
          country,
          product,
          incoterm,
          quantity: quantity || null,
          message,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return res.status(201).json(data);
    }

    // ============================================
    // GET — Retrieve enquiries
    // ADMIN ONLY
    // ============================================

    if (req.method === 'GET') {
      const authHeader = req.headers.authorization || '';

      // No Authorization header
      if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          error: 'Authentication required.',
        });
      }

      const accessToken = authHeader
        .slice(7)
        .trim();

      // Empty token
      if (!accessToken) {
        return res.status(401).json({
          error: 'Authentication required.',
        });
      }

      // Verify Supabase session
      const {
        data: { user },
        error: authError,
      } = await supabaseAuth.auth.getUser(accessToken);

      if (authError || !user) {
        return res.status(401).json({
          error: 'Invalid or expired session.',
        });
      }

      // Verify admin email
      if (
        !dashboardAdminEmail ||
        user.email?.trim().toLowerCase() !==
          dashboardAdminEmail
      ) {
        return res.status(403).json({
          error: 'Access denied.',
        });
      }

      // Fetch enquiries only after authentication
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('id', { ascending: false })
        .limit(200);

      if (error) {
        throw error;
      }

      return res.status(200).json(data);
    }

    // ============================================
    // Unsupported method
    // ============================================

    return res.status(405).json({
      error: 'Method not allowed',
    });

  } catch (err) {
    console.error('API error:', err);

    return res.status(500).json({
      error: 'Unable to process the enquiry right now.',
    });
  }
}