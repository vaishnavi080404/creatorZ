-- ==============================================================================
-- CreatorZ — Supabase Complete Schema & Initial Data Seed
-- ==============================================================================
-- Run this complete SQL script in your Supabase Dashboard:
-- Supabase Dashboard -> SQL Editor -> "+ New query" -> Paste & Click "Run"
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES TABLE (Core Users & Role Management)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('creator', 'brand', 'admin')),
    name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookup by email and role
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ------------------------------------------------------------------------------
-- 2. CREATOR PROFILES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.creator_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    handle TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    tier TEXT DEFAULT 'Rising' CHECK (tier IN ('Rising', 'Alpha', 'Master')),
    bio TEXT,
    sample_reel_url TEXT,
    on_time_rate NUMERIC DEFAULT 95.0,
    pitches_count INT DEFAULT 0,
    starting_rate INT DEFAULT 15000,
    location TEXT DEFAULT 'India',
    languages TEXT[] DEFAULT ARRAY['English', 'Hindi'],
    gstin TEXT,
    pan TEXT,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_creator_category ON public.creator_profiles(category);
CREATE INDEX IF NOT EXISTS idx_creator_tier ON public.creator_profiles(tier);

-- ------------------------------------------------------------------------------
-- 3. BRAND PROFILES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.brand_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    company_name TEXT NOT NULL,
    company_type TEXT DEFAULT 'D2C Brand',
    category TEXT NOT NULL,
    website TEXT,
    gstin TEXT,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. OPEN BRIEFS TABLE (Brand Campaigns)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.briefs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    budget TEXT NOT NULL,
    budget_numeric INT,
    deliverables TEXT NOT NULL,
    escrow_funded BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'under_review', 'in_progress', 'completed', 'cancelled')),
    deadline TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_briefs_category ON public.briefs(category);
CREATE INDEX IF NOT EXISTS idx_briefs_status ON public.briefs(status);

-- ------------------------------------------------------------------------------
-- 5. CREATIVE PITCHES TABLE (Creator Concept Submissions)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pitches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brief_id UUID REFERENCES public.briefs(id) ON DELETE CASCADE NOT NULL,
    creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    concept_title TEXT,
    concept_note TEXT NOT NULL,
    video_reel_url TEXT,
    quote_amount INT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'shortlisted', 'hired', 'rejected')),
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pitches_brief ON public.pitches(brief_id);
CREATE INDEX IF NOT EXISTS idx_pitches_creator ON public.pitches(creator_id);

-- ------------------------------------------------------------------------------
-- 6. IMMUTABLE AUDIT LOGS TABLE (Admin Oversight)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action TEXT NOT NULL,
    actor TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    details TEXT NOT NULL,
    severity TEXT DEFAULT 'info' CHECK (severity IN ('info', 'success', 'warning', 'danger')),
    ip_address TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_category ON public.audit_logs(category);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON public.audit_logs(timestamp DESC);

-- ------------------------------------------------------------------------------
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pitches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active briefs and creator profiles (Marketplace discovery)
CREATE POLICY "Public Read Access on Briefs" ON public.briefs FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Creator Profiles" ON public.creator_profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Brand Profiles" ON public.brand_profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Profiles" ON public.profiles FOR SELECT USING (true);

-- Authenticated/Full access policies for application operations
CREATE POLICY "Allow All Operations on Profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Operations on Creator Profiles" ON public.creator_profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Operations on Brand Profiles" ON public.brand_profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Operations on Briefs" ON public.briefs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Operations on Pitches" ON public.pitches FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Operations on Audit Logs" ON public.audit_logs FOR ALL USING (true) WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 8. INITIAL SEED DATA
-- ------------------------------------------------------------------------------

-- 8.1 Seed Admin Account
INSERT INTO public.profiles (id, email, role, name)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin@creatorz.internal', 'admin', 'Ops Director')
ON CONFLICT (email) DO NOTHING;

-- 8.2 Seed Sample Brand
INSERT INTO public.profiles (id, email, role, name)
VALUES 
  ('00000000-0000-0000-0000-000000000002', 'marketing@beastlife.in', 'brand', 'BeastLife Nutrition')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.brand_profiles (user_id, company_name, company_type, category, website, gstin, verified)
VALUES 
  ('00000000-0000-0000-0000-000000000002', 'BeastLife Nutrition', 'D2C FMCG Enterprise', 'Fitness & Beverages', 'https://beastlife.in', '27AAACB2212P1ZA', true)
ON CONFLICT (user_id) DO NOTHING;

-- 8.3 Seed Sample Creator
INSERT INTO public.profiles (id, email, role, name)
VALUES 
  ('00000000-0000-0000-0000-000000000003', 'aanya@creatorz.io', 'creator', 'Aanya Verma')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.creator_profiles (user_id, handle, category, tier, bio, sample_reel_url, on_time_rate, pitches_count, starting_rate, verified)
VALUES 
  ('00000000-0000-0000-0000-000000000003', '@aanya_visuals', 'Beauty & Cosmetics', 'Alpha', 'Cinematic beauty teardowns, ingredient breakdowns, and aesthetic UGC.', 'https://assets.mixkit.co/videos/preview/mixkit-woman-recording-a-makeup-tutorial-video-41313-large.mp4', 99.0, 42, 25000, true)
ON CONFLICT (user_id) DO NOTHING;

-- 8.4 Seed Sample Brief
INSERT INTO public.briefs (id, brand_id, title, description, category, budget, budget_numeric, deliverables, escrow_funded, status)
VALUES 
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000002', 'Iso-Whey Hydration Short-Form Blitz', 'Looking for high-energy fitness creators to pitch concepts for our new instant cold electrolyte whey.', 'Fitness & Beverages', '₹1,80,000', 180000, '3 Concept Reels + Whitelisting', true, 'open')
ON CONFLICT (id) DO NOTHING;

-- 8.5 Seed Initial Audit Log
INSERT INTO public.audit_logs (action, actor, category, details, severity)
VALUES 
  ('SYSTEM_INIT', 'system_provisioner', 'security', 'CreatorZ Supabase database schema initialized successfully.', 'success');

-- ==============================================================================
-- 9. STORAGE BUCKET SETUP (Run in Supabase Storage UI)
-- ==============================================================================
-- In your Supabase Dashboard:
-- 1. Go to "Storage" -> "New bucket"
-- 2. Create bucket: "pitch-reels" (Set to Public)
-- 3. Create bucket: "avatars" (Set to Public)
-- ==============================================================================
