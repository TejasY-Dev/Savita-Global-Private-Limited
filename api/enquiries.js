import supabase from './db-client.js';

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
    // --------------------------------
    // POST — Create new enquiry
    // --------------------------------
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
        errors.product = 'Please select a valid product division.';
      }

      // Incoterm
      if (!incoterms.includes(incoterm)) {
        errors.incoterm = 'Please select a valid incoterm.';
      }

      // Quantity — optional
      if (quantity && quantity.length > 100) {
        errors.quantity = 'Quantity information is too long.';
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

      // Return all validation errors together
      if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          error: 'Please correct the highlighted fields.',
          fields: errors,
        });
      }

      // --------------------------------
      // Insert validated enquiry
      // --------------------------------
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

    // --------------------------------
    // GET — Retrieve enquiries
    // --------------------------------
    if (req.method === 'GET') {
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

    // --------------------------------
    // Unsupported method
    // --------------------------------
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