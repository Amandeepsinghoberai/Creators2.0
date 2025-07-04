import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { User, Camera, Save, Instagram, Youtube, Twitter, Linkedin, BookText as TikTok, Globe, Users, Crown, Edit3, Upload } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';

interface ProfileFormData {
  full_name: string;
  niche: string;
  bio: string;
  follower_count: number;
  social_links: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
    linkedin?: string;
    tiktok?: string;
    website?: string;
  };
}

export function ProfilePage() {
  const { profile, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar_url || '');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>({
    defaultValues: {
      full_name: profile?.full_name || '',
      niche: profile?.niche || '',
      bio: profile?.bio || '',
      follower_count: profile?.follower_count || 0,
      social_links: profile?.social_links || {},
    }
  });

  const niches = [
    'Fitness', 'Business', 'Lifestyle', 'Technology', 'Food', 
    'Travel', 'Fashion', 'Education', 'Entertainment', 'Health',
    'Gaming', 'Music', 'Art', 'Photography', 'Sports'
  ];

  const socialPlatforms = [
    { key: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { key: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-500' },
    { key: 'twitter', label: 'Twitter', icon: Twitter, color: 'text-blue-400' },
    { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
    { key: 'tiktok', label: 'TikTok', icon: TikTok, color: 'text-black' },
    { key: 'website', label: 'Website', icon: Globe, color: 'text-gray-600' },
  ];

  const staticAvatars = [
    '/ava2.jpg',
    '/ava3.jpg',
    '/ava4.jpg',
    '/ava5.jpg',
  ];

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      await updateProfile({
        full_name: data.full_name,
        niche: data.niche,
        bio: data.bio,
        follower_count: data.follower_count,
        social_links: data.social_links,
      });
      
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Get subscription badge color and text
  const getSubscriptionBadge = () => {
    if (!profile) return null;
    
    if (profile.subscription_tier === 'studio') {
      return {
        text: 'Studio Member',
        bgColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        textColor: 'text-white'
      };
    } else if (profile.subscription_tier === 'pro') {
      return {
        text: 'Pro Member',
        bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
        textColor: 'text-white'
      };
    } else {
      return {
        text: 'Free Plan',
        bgColor: 'bg-gray-200',
        textColor: 'text-gray-700'
      };
    }
  };

  const subscriptionBadge = getSubscriptionBadge();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Handle static avatar selection
  const handleStaticAvatar = async (url: string) => {
    setAvatarPreview(url);
    await updateProfile({ avatar_url: url });
    toast.success('Avatar updated!');
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white relative overflow-hidden"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-10 w-10 text-white" />
                  )}
                </div>
                <motion.label 
                  className="absolute -bottom-1 -right-1 p-2 bg-white text-primary-600 rounded-full shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Camera className="h-4 w-4" />
                </motion.label>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold">{profile?.full_name || 'Your Name'}</h1>
                <p className="text-primary-100">{profile?.niche || 'Select your niche'}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{profile?.follower_count?.toLocaleString() || '0'} followers</span>
                </div>
              </div>
            </div>
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit3 className="h-4 w-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </motion.button>
          </div>
          
          {/* Subscription Badge */}
          {subscriptionBadge && (
            <motion.div 
              className={`inline-flex items-center space-x-2 ${subscriptionBadge.bgColor} ${subscriptionBadge.textColor} px-4 py-2 rounded-full backdrop-blur-sm`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {profile?.subscription_tier !== 'free' && (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Crown className="h-4 w-4" />
                </motion.div>
              )}
              <span className="font-medium">{subscriptionBadge.text}</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {isEditing ? (
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          variants={itemVariants}
          layout
        >
          {/* Avatar/Photo selection UI */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Choose a Cartoon Avatar</label>
            <div className="flex items-center space-x-4 mb-2">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-100">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-8 w-8 text-gray-400" />
                )}
              </div>
            </div>
            <div className="mt-2">
              <div className="flex space-x-2">
                {staticAvatars.map((url) => (
                  <button
                    key={url}
                    type="button"
                    className={`w-12 h-12 rounded-full border-2 ${avatarPreview === url ? 'border-primary-500' : 'border-gray-200'} overflow-hidden focus:outline-none`}
                    onClick={() => handleStaticAvatar(url)}
                  >
                    <img src={url} alt="Avatar" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  {...register('full_name', { required: 'Name is required' })}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
                {errors.full_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niche
                </label>
                <select
                  {...register('niche')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                >
                  <option value="">Select your niche</option>
                  {niches.map((niche) => (
                    <option key={niche.toLowerCase()} value={niche.toLowerCase()}>
                      {niche}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div variants={itemVariants} className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  {...register('bio')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Tell us about yourself and your content..."
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follower Count
                </label>
                <input
                  {...register('follower_count', { valueAsNumber: true })}
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialPlatforms.map((platform) => (
                  <motion.div 
                    key={platform.key}
                    className="flex items-center space-x-3"
                    variants={itemVariants}
                  >
                    <platform.icon className={`h-5 w-5 ${platform.color}`} />
                    <input
                      {...register(`social_links.${platform.key}` as any)}
                      type="url"
                      placeholder={`Your ${platform.label} URL`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="flex space-x-4"
              variants={itemVariants}
            >
              <motion.button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>Save Changes</span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={itemVariants}
        >
          {/* Profile Info */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
            <p className="text-gray-600 mb-6">
              {profile?.bio || 'No bio added yet. Click "Edit Profile" to add your bio.'}
            </p>
            
            <h4 className="text-md font-semibold text-gray-900 mb-3">Social Media</h4>
            <div className="grid grid-cols-2 gap-3">
              {socialPlatforms.map((platform) => {
                const url = profile?.social_links?.[platform.key];
                return (
                  <motion.div
                    key={platform.key}
                    className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                      url ? 'bg-gray-50 hover:bg-gray-100 cursor-pointer' : 'bg-gray-50 opacity-50'
                    }`}
                    whileHover={url ? { scale: 1.02 } : {}}
                    onClick={() => url && window.open(url, '_blank')}
                  >
                    <platform.icon className={`h-4 w-4 ${platform.color}`} />
                    <span className="text-sm text-gray-700">
                      {url ? platform.label : `Add ${platform.label}`}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Profile Completion</span>
                  <span className="font-semibold text-primary-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription</h3>
              <div className="text-center">
                {profile?.subscription_tier === 'studio' ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="space-y-2"
                  >
                    <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-2">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                    <p className="font-semibold text-xl text-blue-600">Studio Member</p>
                    <p className="text-sm text-gray-600">Unlimited access to all features</p>
                    <div className="mt-2 p-2 bg-blue-50 rounded-lg text-blue-700 text-sm">
                      <p>All premium features unlocked</p>
                    </div>
                  </motion.div>
                ) : profile?.subscription_tier === 'pro' ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="space-y-2"
                  >
                    <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-2">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                    <p className="font-semibold text-xl text-purple-600">Pro Member</p>
                    <p className="text-sm text-gray-600">Advanced features unlocked</p>
                    <div className="mt-2 p-2 bg-purple-50 rounded-lg text-purple-700 text-sm">
                      <p>Pro features unlocked</p>
                    </div>
                  </motion.div>
                ) : (
                  <div>
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="font-semibold text-gray-600">Free Plan</p>
                    <motion.button 
                      className="mt-2 bg-gradient-to-r from-accent-500 to-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-accent-600 hover:to-primary-600 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/app/upgrade')}
                    >
                      Upgrade to Pro
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}