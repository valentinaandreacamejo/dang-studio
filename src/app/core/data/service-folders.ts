export interface ServiceFolder {
  id: string;
  label: string;
  meta: string;
  title: string;
  description: string;
  deliverables: string[];
  stat: string;
}

/** Cartelle del desktop nella hero: ognuna apre una finestra con l'anteprima del servizio. */
export const SERVICE_FOLDERS: ServiceFolder[] = [
  {
    id: 'viral-reels',
    label: '[01_VIRAL_REELS]',
    meta: '12 items · modified today',
    title: 'Short-form that hooks in 0.8 seconds.',
    description:
      'Reels and TikToks built for the scroll: native editing, real creators, zero corporate cringe.',
    deliverables: ['Concept & scripting', 'Creator casting & UGC', 'Native edit for TikTok / Reels', 'Daily trend monitoring'],
    stat: '+10M organic views',
  },
  {
    id: 'brand-identity',
    label: '[02_BRAND_IDENTITY]',
    meta: '8 items · modified yesterday',
    title: 'Brands with a personality, not just a palette.',
    description:
      'Naming, tone of voice and visual systems designed to live on a feed first and on a business card second.',
    deliverables: ['Naming & tone of voice', 'Visual identity system', 'Social kit & templates', 'A brand book people actually read'],
    stat: 'Feed-first identity',
  },
  {
    id: 'meme-culture',
    label: '[03_MEME_CULTURE]',
    meta: '404 items · modified 2 min ago',
    title: 'We speak internet. Fluently.',
    description:
      'Trend-jacking, community management and real-time content that makes your brand part of the joke, not the punchline.',
    deliverables: ['Real-time trend-jacking', 'Meme pages & community', 'Reactive content ops', 'Creator partnerships'],
    stat: 'Trend-to-post < 2h',
  },
];
