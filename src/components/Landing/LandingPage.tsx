import React, { useState, useEffect, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Star,
  Zap,
  Brain,
  Mic,
  Video,
  TrendingUp,
  Users,
  Crown,
  Check,
  Menu,
  X,
  ChevronDown,
  Globe,
  Shield,
  Rocket,
  Target,
  Award,
  Heart,
  MessageCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { SpiralAnimation } from '../ui/spiral-animation';
import { AIChatWidget } from './AIChatWidget';

// Lazy load Spline component
const Spline = React.lazy(() => import('@splinetool/react-spline'));

// Spline Loading Component
const SplineLoader = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl border border-white/20">
    <div className="text-center">
      <motion.div
        className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="text-white/80 text-sm">Loading 3D Experience...</p>
    </div>
  </div>
);

// Spline Error Boundary Component
class SplineErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Spline component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-500/20 to-gray-600/20 backdrop-blur-md rounded-2xl border border-white/20">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-white/60" />
            </div>
            <p className="text-white/60 text-sm">3D Scene Unavailable</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Safe Spline Component Wrapper
const SafeSpline: React.FC<{ scene: string; className?: string }> = ({ scene, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    console.log('Spline scene loaded successfully:', scene);
    setIsLoaded(true);
  };

  const handleError = (error: any) => {
    console.error('Spline scene error:', error);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-gray-500/20 to-gray-600/20 backdrop-blur-md rounded-2xl border border-white/20 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-8 w-8 text-white/60" />
          </div>
          <p className="text-white/60 text-sm">3D Scene Unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <SplineErrorBoundary>
      <Suspense fallback={<SplineLoader />}>
        <Spline 
          scene={scene}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
        />
      </Suspense>
    </SplineErrorBoundary>
  );
};

export function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/app/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  const features = [
    {
      icon: Brain,
      title: 'AI Content Generation',
      description: 'Create engaging scripts, captions, and ideas with advanced AI technology that understands your brand voice',
      gradient: 'from-gray-400 via-white to-gray-300',
      delay: 0.1
    },
    {
      icon: Mic,
      title: 'Professional Voiceovers',
      description: 'Transform text into studio-quality voiceovers with realistic AI voices in multiple languages',
      gradient: 'from-gray-500 via-white to-gray-400',
      delay: 0.2
    },
    {
      icon: Video,
      title: 'AI Video Creation',
      description: 'Generate professional videos with AI avatars, custom backgrounds, and automatic subtitles',
      gradient: 'from-gray-600 via-white to-gray-500',
      delay: 0.3
    },
    {
      icon: TrendingUp,
      title: 'Trend Analysis',
      description: 'Stay ahead with real-time trending topics and content opportunities powered by AI insights',
      gradient: 'from-gray-700 via-white to-gray-600',
      delay: 0.4
    },
    {
      icon: Users,
      title: 'Brand Partnerships',
      description: 'Connect with premium brands and monetize your content through our exclusive marketplace',
      gradient: 'from-gray-800 via-white to-gray-700',
      delay: 0.5
    },
    {
      icon: Target,
      title: 'Analytics & Insights',
      description: 'Track performance, understand your audience, and optimize your content strategy with detailed analytics',
      gradient: 'from-gray-900 via-white to-gray-800',
      delay: 0.6
    }
  ];

  const stats = [
    { number: '100K+', label: 'Active Creators', icon: Users },
    { number: '10M+', label: 'Content Generated', icon: Brain },
    { number: '1K+', label: 'Brand Partners', icon: Crown },
    { number: '99.9%', label: 'Uptime', icon: Shield }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Lifestyle Creator',
      content: 'CreatorCopilot transformed my content strategy completely. I went from 10K to 500K followers in just 8 months using their AI tools!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      followers: '500K',
      platform: 'Instagram'
    },
    {
      name: 'Mike Chen',
      role: 'Tech Reviewer',
      content: 'The AI-generated scripts are incredibly natural and engaging. My audience retention increased by 400% since I started using CreatorCopilot.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      followers: '2.1M',
      platform: 'YouTube'
    },
    {
      name: 'Emma Davis',
      role: 'Fitness Influencer',
      content: 'The voiceover and video features are game-changers. Professional quality content without the studio costs or technical complexity.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      followers: '750K',
      platform: 'TikTok'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for new creators',
      features: ['5 AI generations/month', '2 voiceover minutes', 'Basic templates', 'Community support'],
      cta: 'Get Started Free',
      popular: false,
      gradient: 'from-gray-400 to-gray-600'
    },
    {
      name: 'Creator',
      price: '$29',
      description: 'For serious content creators',
      features: ['Unlimited AI content', '60 voiceover minutes', 'AI video creation', 'Premium templates', 'Priority support', 'Brand partnerships'],
      cta: 'Start Free Trial',
      popular: true,
      gradient: 'from-white to-gray-300'
    },
    {
      name: 'Pro',
      price: '$99',
      description: 'For teams and agencies',
      features: ['Everything in Creator', 'Unlimited everything', 'White-label solutions', 'API access', 'Dedicated manager', 'Custom integrations'],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-gray-300 to-gray-500'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-900 to-white"></div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <motion.header 
          className="relative z-50 bg-white/5 backdrop-blur-md border-b border-white/10"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="p-2 bg-gradient-to-r from-white to-gray-300 rounded-xl shadow-lg"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-8 w-8 text-black" />
                </motion.div>
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  CreatorCopilot
                </Link>
              </motion.div>

              {/* Made by bolt.new sticker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0">
                <a 
                  href="https://bolt.new" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 bg-gradient-to-r from-white to-gray-300 text-black text-xs px-3 py-1 rounded-b-lg shadow-md hover:from-gray-100 hover:to-gray-200 transition-all"
                >
                  <Zap className="h-3 w-3" />
                  <span>Made by bolt.new</span>
                </a>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-white/80 hover:text-white transition-colors font-medium">Features</a>
                <a href="#pricing" className="text-white/80 hover:text-white transition-colors font-medium">Pricing</a>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors font-medium">About</Link>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors font-medium">Contact</Link>
              </nav>

              <div className="hidden md:flex items-center space-x-4">
                {!isAuthenticated && (
                  <motion.button
                    onClick={handleSignIn}
                    className="text-white/80 hover:text-white transition-colors font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.button>
                )}
                <motion.button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-white to-gray-300 text-black px-6 py-3 rounded-full hover:from-gray-100 hover:to-gray-200 transition-all shadow-lg hover:shadow-xl font-semibold"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#features" className="block text-white/80 hover:text-white transition-colors font-medium">Features</a>
                <a href="#pricing" className="block text-white/80 hover:text-white transition-colors font-medium">Pricing</a>
                <Link to="/about" className="block text-white/80 hover:text-white transition-colors font-medium">About</Link>
                <Link to="/contact" className="block text-white/80 hover:text-white transition-colors font-medium">Contact</Link>
                <div className="pt-4 space-y-3">
                  {!isAuthenticated && (
                    <button
                      onClick={handleSignIn}
                      className="block w-full text-left text-white/80 hover:text-white transition-colors font-medium"
                    >
                      Sign In
                    </button>
                  )}
                  <button
                    onClick={handleGetStarted}
                    className="block w-full bg-gradient-to-r from-white to-gray-300 text-black px-6 py-3 rounded-full hover:from-gray-100 hover:to-gray-200 transition-all font-semibold"
                  >
                    {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.header>

        {/* Hero Section */}
        <section className="relative pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-center lg:text-left"
              >
                <motion.div 
                  className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                  <span className="text-white font-medium">AI-Powered Content Creation Platform</span>
                </motion.div>

                <motion.h1 
                  className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  Create Content That
                  <motion.span 
                    className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    Captivates & Converts
                  </motion.span>
                </motion.h1>

                <motion.p 
                  className="text-xl text-gray-200 mb-10 max-w-4xl mx-auto lg:mx-0 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  Transform your creative process with our comprehensive AI-powered platform. Generate scripts, create voiceovers, 
                  produce videos, discover trends, and connect with brands - all in one revolutionary workspace designed for modern creators.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <motion.button
                    onClick={handleGetStarted}
                    className="bg-gradient-to-r from-white to-gray-300 text-black px-8 py-4 rounded-full text-lg font-semibold hover:from-gray-100 hover:to-gray-200 transition-all shadow-2xl hover:shadow-white/25 flex items-center space-x-2"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{isAuthenticated ? 'Go to Dashboard' : 'Start Creating Free'}</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                  className="flex flex-col items-center lg:items-start"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-gray-200 text-sm mb-2">Discover More</span>
                  <ChevronDown className="h-6 w-6 text-gray-300" />
                </motion.div>
              </motion.div>

              {/* Right 3D Spline Scene */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative h-[600px] lg:h-[700px] rounded-2xl overflow-hidden ml-4 lg:ml-8"
                style={{ 
                  transform: 'translateX(20px)',
                  width: 'calc(100% + 40px)',
                  marginRight: '-20px'
                }}
              >
                <SafeSpline 
                  scene="https://prod.spline.design/f3eZokxGZiqDydOn/scene.splinecode"
                  className="w-full h-full rounded-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-full border border-white/20 mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="h-8 w-8 text-purple-300" />
                  </motion.div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-purple-200 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20"
                whileHover={{ scale: 1.05 }}
              >
                <Rocket className="h-5 w-5 text-cyan-400" />
                <span className="text-white font-medium">Powerful Features</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Everything You Need to
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Dominate Your Niche
                </span>
              </h2>
              <p className="text-xl text-purple-200 max-w-4xl mx-auto leading-relaxed">
                Our comprehensive suite of AI-powered tools helps you create, optimize, and monetize your content 
                like never before. Join the future of content creation today.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <motion.div 
                    className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 mb-6 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-purple-200 leading-relaxed group-hover:text-white transition-colors">
                    {feature.description}
                  </p>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Spline 3D Showcase Section */}
        <section className="relative py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: 3D Spline Scene */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative h-[500px] rounded-2xl overflow-hidden"
              >
                <SafeSpline 
                  scene="https://prod.spline.design/bnMPTJ7gd0k0pKh1/scene.splinecode"
                  className="w-full h-full rounded-2xl"
                />
              </motion.div>

              {/* Right: Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <motion.div
                  className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Globe className="h-5 w-5 text-cyan-400" />
                  </motion.div>
                  <span className="text-white font-medium">3D Interactive Experience</span>
                </motion.div>
                
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Experience the Future of
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Content Creation
                  </span>
                </h2>
                <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                  Immerse yourself in our revolutionary 3D workspace where creativity meets technology. 
                  Explore features, visualize your content strategy, and discover new possibilities in an 
                  interactive environment designed for the next generation of creators.
                </p>

                <div className="space-y-4 mb-8">
                  <motion.div 
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-purple-200">Interactive 3D workspace navigation</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-purple-200">Real-time content preview and editing</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-purple-200">Immersive analytics and insights</span>
                  </motion.div>
                </div>

                <motion.button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-2xl hover:shadow-cyan-500/25 flex items-center space-x-2 mx-auto lg:mx-0"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explore in 3D</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="h-5 w-5 text-pink-400" />
                <span className="text-white font-medium">Success Stories</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Loved by
                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {' '}Creators Worldwide
                </span>
              </h2>
              <p className="text-xl text-purple-200 max-w-4xl mx-auto leading-relaxed">
                Join thousands of creators who have transformed their content strategy and grown their audience 
                exponentially with CreatorCopilot's AI-powered tools.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center mb-6">
                    <motion.img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 border-2 border-purple-400"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <div className="text-white font-semibold text-lg">{testimonial.name}</div>
                      <div className="text-purple-200 text-sm">{testimonial.role}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full">
                          {testimonial.followers}
                        </span>
                        <span className="text-xs text-purple-300">{testimonial.platform}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-purple-200 leading-relaxed mb-6 group-hover:text-white transition-colors">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star className="h-5 w-5 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20"
                whileHover={{ scale: 1.05 }}
              >
                <Crown className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-medium">Simple Pricing</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Choose Your
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  {' '}Creative Journey
                </span>
              </h2>
              <p className="text-xl text-purple-200 max-w-4xl mx-auto leading-relaxed">
                Start free and scale as you grow. Every plan includes our core AI features with no hidden fees or surprises.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  className={`relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all ${
                    plan.popular ? 'ring-2 ring-purple-400 scale-105' : ''
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  {plan.popular && (
                    <motion.div 
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>Most Popular</span>
                      </div>
                    </motion.div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-purple-200 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      {plan.price !== 'Free' && (
                        <span className="text-purple-200 ml-2">/month</span>
                      )}
                    </div>

                    {plan.popular ? (
                      <Link
                        to="/app/upgrade"
                        className="w-full py-3 px-6 rounded-xl font-semibold transition-all bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg flex items-center justify-center"
                      >
                        {plan.cta}
                      </Link>
                    ) : (
                      <motion.button
                        className="w-full py-3 px-6 rounded-xl font-semibold transition-all bg-white/10 text-white hover:bg-white/20 border border-white/20"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGetStarted}
                      >
                        {plan.cta}
                      </motion.button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-purple-200">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              className="relative bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 backdrop-blur-md rounded-3xl p-12 border border-white/20 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Background Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              <motion.div 
                className="relative z-10"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-6 py-3 mb-8"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Award className="h-5 w-5 text-white" />
                  <span className="text-white font-medium">Join the Revolution</span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Ready to Transform Your
                  <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    Content Creation?
                  </span>
                </h2>

                <p className="text-xl text-purple-200 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Join over 100,000 creators who are already using CreatorCopilot to create content that captivates, 
                  engages, and converts. Start your free trial today and experience the future of content creation.
                </p>

                <motion.button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-5 rounded-full text-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-2xl hover:shadow-purple-500/25 inline-flex items-center space-x-3"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{isAuthenticated ? 'Go to Dashboard' : 'Start Your Free Trial'}</span>
                  <ArrowRight className="h-6 w-6" />
                </motion.button>

                <p className="text-purple-300 text-sm mt-6">
                  No credit card required • 14-day free trial • Cancel anytime
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section: Creative Partner (the one with three icons and descriptions) */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-white">
              We're not just another AI tool. We're your creative partner, designed specifically for content creators.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <span className="mx-auto mb-8 block w-fit">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 inline-flex items-center justify-center">
                    <Crown className="h-16 w-16 text-white" />
                  </span>
                </span>
                <p className="text-lg font-semibold text-white">
                  Our AI models are specifically trained on high-performing content, ensuring professional results every time.
                </p>
              </div>
              <div>
                <span className="mx-auto mb-8 block w-fit">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 inline-flex items-center justify-center">
                    <Zap className="h-16 w-16 text-white" />
                  </span>
                </span>
                <p className="text-lg font-semibold text-white">
                  Generate content in seconds, not hours. Our optimized infrastructure ensures rapid response times.
                </p>
              </div>
              <div>
                <span className="mx-auto mb-8 block w-fit">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 inline-flex items-center justify-center">
                    <Star className="h-16 w-16 text-white" />
                  </span>
                </span>
                <p className="text-lg font-semibold text-white">
                  Built by creators, for creators. Every feature is designed to solve real content creation challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative bg-black/20 backdrop-blur-md border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <motion.div 
                    className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles className="h-6 w-6 text-white" />
                  </motion.div>
                  <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    CreatorCopilot
                  </span>
                </div>
                <p className="text-purple-200 mb-6 max-w-md leading-relaxed">
                  Empowering creators worldwide with AI-powered tools to create, optimize, and monetize their content. 
                  Join the future of content creation today.
                </p>
                <div className="flex space-x-4">
                  {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social, index) => (
                    <motion.div 
                      key={social}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Globe className="h-5 w-5 text-purple-300" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-6">Product</h3>
                <ul className="space-y-3">
                  {['Features', 'Pricing', 'API', 'Integrations', 'Changelog'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-purple-200 hover:text-white transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-6">Company</h3>
                <ul className="space-y-3">
                  {['About', 'Contact', 'Careers', 'Blog', 'Press'].map((item) => (
                    <li key={item}>
                      <Link 
                        to={item === 'About' ? '/about' : item === 'Contact' ? '/contact' : '#'} 
                        className="text-purple-200 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-purple-200 text-sm">
                © 2024 CreatorCopilot. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <a key={item} href="#" className="text-purple-200 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                ))}
              </div>
              
              {/* Made by bolt.new sticker in footer */}
              <div className="mt-4 md:mt-0">
                <a 
                  href="https://bolt.new" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <Zap className="h-3 w-3" />
                  <span>Made by bolt.new</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* AI Chat Widget */}
      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: isChatOpen 
            ? "0 0 0 0 rgba(139, 92, 246, 0.7)" 
            : ["0 0 0 0 rgba(139, 92, 246, 0.7)", "0 0 0 20px rgba(139, 92, 246, 0)", "0 0 0 0 rgba(139, 92, 246, 0.7)"]
        }}
        transition={{ 
          duration: isChatOpen ? 0.3 : 2,
          repeat: isChatOpen ? 0 : Infinity
        }}
      >
        <MessageCircle className="h-8 w-8" />
      </motion.button>

      <AIChatWidget isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
}