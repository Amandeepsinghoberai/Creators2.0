import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Target, Zap, Heart, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutPage() {
  const team = [
    {
      name: 'Amandeep Singh Oberai',
      role: 'Co-Founder & Developer',
      image: '/image.png',
      bio: 'Full-stack developer passionate about building tools for creators and leveraging AI for content innovation.'
    },
    {
      name: 'Sarthak Sharma',
      role: 'Co-Founder & Product Lead',
      image: '/image2.png',
      bio: 'Product enthusiast focused on user experience and empowering creators to reach their full potential.'
    }
  ];

  const values = [
    {
      icon: Users,
      title: 'Creator-First',
      description: 'Everything we build is designed with creators at the center, understanding their unique challenges and aspirations.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We push the boundaries of AI technology to create tools that were previously impossible.'
    },
    {
      icon: Heart,
      title: 'Authenticity',
      description: 'We believe in empowering creators to maintain their unique voice while scaling their impact.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Professional-grade creative tools should be accessible to creators worldwide, regardless of budget.'
    }
  ];

  const stats = [
    { number: '2025', label: 'Founded' },
    { number: '50K+', label: 'Active Creators' },
    { number: '25+', label: 'Team Members' },
    { number: '$10M', label: 'Series A Funding' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0c12] via-[#181b23] to-[#e3e3e3]">
      {/* Header */}
      <header className="relative z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white hover:text-purple-200 transition-colors w-fit"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {' '}CreatorCopilot
              </span>
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize content creation by putting the power of AI 
              in the hands of every creator, helping them build authentic connections with their audience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-purple-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-purple-200 mb-6 leading-relaxed">
                The creator economy is booming, but many talented individuals struggle with the technical 
                and creative barriers that prevent them from reaching their full potential. We believe 
                that everyone has a story worth telling and an audience waiting to hear it.
              </p>
              <p className="text-lg text-purple-200 leading-relaxed">
                CreatorCopilot was born from the vision of making professional-grade content creation 
                tools accessible to everyone, regardless of their technical background or budget. 
                We're not just building software; we're building the future of creative expression.
              </p>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Target className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">Vision</h3>
                    <p className="text-purple-200 text-sm">Empower every creator to build authentic connections</p>
                  </div>
                  <div className="text-center">
                    <Award className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">Excellence</h3>
                    <p className="text-purple-200 text-sm">Deliver cutting-edge AI tools with unmatched quality</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Values</h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              These core principles guide everything we do and every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <value.icon className="h-12 w-12 text-purple-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-purple-200 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Meet the Team</h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Our founders are passionate about empowering creators everywhere.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                className="flex flex-col items-center bg-gradient-to-r from-purple-900/30 to-purple-400/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 w-80 h-[420px] text-center shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-purple-400 mb-4 shadow-md"
                />
                <h3 className="text-2xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-purple-300 mb-3 font-medium">{member.role}</p>
                <p className="text-purple-100 text-base">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-12 border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-purple-200 mb-8">
              Whether you're a creator looking to transform your content or a talented individual 
              wanting to join our team, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Start Creating
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}