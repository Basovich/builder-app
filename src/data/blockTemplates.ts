import type { BlockTemplate } from '../types';

export const blockTemplates: BlockTemplate[] = [
  // ── Layout ──────────────────────────────────────────────────
  {
    id: 'tpl-header',
    type: 'header',
    category: 'Layout',
    label: 'Header',
    icon: '🧭',
    defaultProps: {
      logo: 'AVAG Modelle',
      navItems: ['Home', 'About', 'Services', 'Contact'],
      bgColor: '#ffffff',
      textColor: '#1e293b',
      sticky: false,
    },
  },
  {
    id: 'tpl-footer',
    type: 'footer',
    category: 'Layout',
    label: 'Footer',
    icon: '🔻',
    defaultProps: {
      logo: 'AVAG Modelle',
      copyright: '© 2026 AVAG Modelle. All rights reserved.',
      links: ['Privacy Policy', 'Terms of Service', 'Contact'],
      bgColor: '#1e293b',
      textColor: '#f1f5f9',
    },
  },

  // ── Sections ─────────────────────────────────────────────────
  {
    id: 'tpl-hero',
    type: 'hero',
    category: 'Sections',
    label: 'Hero',
    icon: '🚀',
    defaultProps: {
      title: 'Build Something Amazing',
      subtitle: 'Create stunning websites with our powerful drag-and-drop builder.',
      btnText: 'Get Started',
      btnColor: '#7c3aed',
      bgColor: '#0f172a',
      textColor: '#f1f5f9',
      bgImage: '',
    },
  },
  {
    id: 'tpl-cta',
    type: 'cta',
    category: 'Sections',
    label: 'Call to Action',
    icon: '📣',
    defaultProps: {
      headline: 'Ready to get started?',
      description: 'Join thousands of users building with our platform.',
      btnText: 'Start for Free',
      btnColor: '#7c3aed',
      bgColor: '#7c3aed',
      textColor: '#ffffff',
    },
  },
  {
    id: 'tpl-features',
    type: 'features',
    category: 'Sections',
    label: 'Features',
    icon: '⭐',
    defaultProps: {
      title: 'Why Choose Us',
      subtitle: 'Everything you need to build amazing products',
      bgColor: '#f8fafc',
      textColor: '#1e293b',
      features: [
        { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for maximum performance.' },
        { icon: '🎨', title: 'Beautiful Design', description: 'Stunning out-of-the-box templates.' },
        { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security built in.' },
        { icon: '📱', title: 'Responsive', description: 'Looks great on any device.' },
        { icon: '🔧', title: 'Customizable', description: 'Adapt every element to your brand.' },
        { icon: '💬', title: '24/7 Support', description: 'We\'re always here to help.' },
      ],
    },
  },
  {
    id: 'tpl-testimonials',
    type: 'testimonials',
    category: 'Sections',
    label: 'Testimonials',
    icon: '💬',
    defaultProps: {
      title: 'What Our Customers Say',
      bgColor: '#ffffff',
      textColor: '#1e293b',
      items: [
        { name: 'Alice Johnson', role: 'CEO, TechCorp', quote: 'This builder changed how we build websites. Absolutely amazing!', avatar: '' },
        { name: 'Bob Smith', role: 'Designer', quote: 'The drag and drop experience is incredibly intuitive and smooth.', avatar: '' },
        { name: 'Carol White', role: 'Marketing Lead', quote: 'We doubled our conversion rate after switching to this platform.', avatar: '' },
      ],
    },
  },
  {
    id: 'tpl-pricing',
    type: 'pricing',
    category: 'Sections',
    label: 'Pricing',
    icon: '💰',
    defaultProps: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the plan that works for you',
      bgColor: '#f8fafc',
      textColor: '#1e293b',
      accentColor: '#7c3aed',
      plans: [
        { name: 'Starter', price: '$0', period: '/month', features: ['5 pages', '1 GB storage', 'Basic templates', 'Email support'], highlighted: false },
        { name: 'Pro', price: '$29', period: '/month', features: ['Unlimited pages', '10 GB storage', 'Premium templates', 'Priority support', 'Custom domain'], highlighted: true },
        { name: 'Enterprise', price: '$99', period: '/month', features: ['Everything in Pro', 'Unlimited storage', 'Custom integrations', 'Dedicated manager', 'SLA guarantee'], highlighted: false },
      ],
    },
  },
  {
    id: 'tpl-contact',
    type: 'contact',
    category: 'Sections',
    label: 'Contact',
    icon: '📩',
    defaultProps: {
      title: 'Get In Touch',
      subtitle: 'We\'d love to hear from you.',
      btnText: 'Send Message',
      btnColor: '#7c3aed',
      bgColor: '#ffffff',
      textColor: '#1e293b',
      fields: ['Name', 'Email', 'Message'],
    },
  },

  // ── Media ────────────────────────────────────────────────────
  {
    id: 'tpl-gallery',
    type: 'gallery',
    category: 'Media',
    label: 'Gallery',
    icon: '🖼️',
    defaultProps: {
      title: 'Our Gallery',
      columns: '3',
      bgColor: '#ffffff',
      textColor: '#1e293b',
      images: [
        'https://picsum.photos/seed/g1/600/400',
        'https://picsum.photos/seed/g2/600/400',
        'https://picsum.photos/seed/g3/600/400',
        'https://picsum.photos/seed/g4/600/400',
        'https://picsum.photos/seed/g5/600/400',
        'https://picsum.photos/seed/g6/600/400',
      ],
    },
  },
  {
    id: 'tpl-slider',
    type: 'slider',
    category: 'Media',
    label: 'Slider',
    icon: '🎠',
    defaultProps: {
      bgColor: '#0f172a',
      textColor: '#ffffff',
      slides: [
        { title: 'Slide One', description: 'Beautiful and responsive.', image: 'https://picsum.photos/seed/s1/1200/500' },
        { title: 'Slide Two', description: 'Customize every detail.', image: 'https://picsum.photos/seed/s2/1200/500' },
        { title: 'Slide Three', description: 'Launch faster than ever.', image: 'https://picsum.photos/seed/s3/1200/500' },
      ],
    },
  },
];

export const categories: { name: string; icon: string }[] = [
  { name: 'Layout', icon: '📐' },
  { name: 'Sections', icon: '📄' },
  { name: 'Media', icon: '🎬' },
  { name: 'Commerce', icon: '🛒' },
];
