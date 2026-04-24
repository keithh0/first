import { Merchant, ServiceCategory } from '@/lib/models';

export const categoryLabel: Record<ServiceCategory, string> = {
  foot: 'Foot Therapy',
  thai: 'Thai Massage',
  oil: 'Aromatherapy Oil',
  deep_tissue: 'Deep Tissue',
  couples: 'Couples Session',
  spa: 'Spa Ritual'
};

export const demoMerchants: Merchant[] = [
  {
    id: 'm_luna',
    name: 'Luna Wellness Spa',
    area: 'Central',
    address: '18 Wellington Street, Central',
    description: 'Boutique city sanctuary with bespoke massage journeys and premium therapist matching.',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop',
    phone: '+852 2333 1001',
    services: [
      { id: 'l1', name: 'Luna Signature Oil', durationMinutes: 60, basePrice: 980, description: 'Signature aromatic flow to release urban fatigue.', category: 'oil' },
      { id: 'l2', name: 'Jet-Lag Deep Tissue', durationMinutes: 90, basePrice: 1380, description: 'Targeted pressure therapy for recovery and posture reset.', category: 'deep_tissue' },
      { id: 'l3', name: 'Royal Couples Escape', durationMinutes: 90, basePrice: 2480, description: 'Synchronized two-therapist suite experience.', category: 'couples' },
      { id: 'l4', name: 'Lunar Spa Ritual', durationMinutes: 120, basePrice: 1880, description: 'Full-body scrub, steam, and calming massage ritual.', category: 'spa' }
    ]
  },
  {
    id: 'm_harbour',
    name: 'Harbour Foot Atelier',
    area: 'Tsim Sha Tsui',
    address: '7 Canton Road, Tsim Sha Tsui',
    description: 'Contemporary foot and reflexology studio focusing on precision and recovery.',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop',
    phone: '+852 2333 1002',
    services: [
      { id: 'h1', name: 'Executive Reflexology', durationMinutes: 60, basePrice: 680, description: 'Pressure-point reflex therapy for stress relief.', category: 'foot' },
      { id: 'h2', name: 'Harbour Recovery Foot', durationMinutes: 90, basePrice: 980, description: 'Extended treatment with calf release and hot stones.', category: 'foot' },
      { id: 'h3', name: 'Thai Foot Stretch', durationMinutes: 60, basePrice: 760, description: 'Thai-inspired mobility and targeted lower-body release.', category: 'thai' }
    ]
  },
  {
    id: 'm_noir',
    name: 'Noir Thai Massage',
    area: 'Causeway Bay',
    address: '33 Lockhart Road, Causeway Bay',
    description: 'Dark-luxe Thai studio delivering disciplined bodywork and elegant hospitality.',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop',
    phone: '+852 2333 1003',
    services: [
      { id: 'n1', name: 'Traditional Thai Alignment', durationMinutes: 60, basePrice: 880, description: 'Classic assisted stretches for mobility and balance.', category: 'thai' },
      { id: 'n2', name: 'Noir Deep Reset', durationMinutes: 90, basePrice: 1320, description: 'Intensive tissue release ideal for active professionals.', category: 'deep_tissue' },
      { id: 'n3', name: 'Warm Oil Thai Fusion', durationMinutes: 90, basePrice: 1480, description: 'Thai acupressure blended with warm aromatic oil.', category: 'oil' },
      { id: 'n4', name: 'Couples Thai Harmony', durationMinutes: 90, basePrice: 2380, description: 'Two-person suite with synchronized Thai flow.', category: 'couples' }
    ]
  }
];
