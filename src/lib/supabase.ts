import { createClient } from '@supabase/supabase-js';

// Get Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Configuration Check:');
console.log('- URL:', supabaseUrl);
console.log('- URL length:', supabaseUrl?.length || 0);
console.log('- Key provided:', !!supabaseAnonKey);
console.log('- Key length:', supabaseAnonKey?.length || 0);

// More robust validation for real Supabase configuration
const hasValidSupabaseConfig = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.length > 20 && // Real Supabase URLs are longer
  supabaseAnonKey.length > 50 && // Real anon keys are longer
  supabaseUrl.includes('supabase.co') &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseAnonKey.includes('placeholder') &&
  !supabaseUrl.includes('your_project_url') &&
  !supabaseAnonKey.includes('your_anon_key');

console.log('- Valid config:', hasValidSupabaseConfig);

if (!hasValidSupabaseConfig) {
  console.error('❌ Supabase configuration missing or invalid. Please check your .env file:');
  console.error('- VITE_SUPABASE_URL should be your project URL (e.g., https://your-project.supabase.co)');
  console.error('- VITE_SUPABASE_ANON_KEY should be your anon/public key');
  console.error('- Make sure the .env file is in the root directory');
  console.error('- Restart the development server after adding environment variables');
  throw new Error('Supabase configuration is missing or invalid. Please check your environment variables.');
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
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

// Test the connection
console.log('✅ Supabase client created successfully');

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('❌ Supabase connection test failed:', error.message);
  } else {
    console.log('✅ Supabase connection test successful');
    console.log('- Session exists:', !!data.session);
  }
}).catch((error) => {
  console.error('❌ Supabase connection error:', error);
});

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