import { createClient } from '@supabase/supabase-js';

// Get Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Configuration Check:');
console.log('- URL:', supabaseUrl);
console.log('- Key provided:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'creator-copilot@1.0.0'
    }
  }
});

console.log('✅ Supabase client created successfully');

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  niche?: string;
  bio?: string;
  social_links?: any;
  follower_count?: number;
  is_pro: boolean;
  created_at: string;
  updated_at: string;
};

export type Campaign = {
  id: string;
  brand_id: string;
  title: string;
  description: string;
  budget: number;
  niche: string;
  requirements: string[];
  status: 'active' | 'paused' | 'completed';
  applications_count: number;
  created_at: string;
  updated_at: string;
  brand: Profile;
};

export type CampaignApplication = {
  id: string;
  campaign_id: string;
  creator_id: string;
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
  campaign: Campaign;
  creator: Profile;
};

export type GeneratedContent = {
  id: string;
  user_id: string;
  type: 'script' | 'caption' | 'hashtags' | 'ideas';
  title: string;
  content: string;
  niche?: string;
  platform?: string;
  created_at: string;
};

export type Voiceover = {
  id: string;
  user_id: string;
  title: string;
  script: string;
  voice_id: string;
  audio_url?: string;
  status: 'generating' | 'completed' | 'failed';
  created_at: string;
};