export interface BlogPost {
  id: string;
  title: string;
  category: string;
  preview_text: string;
  tags: string;
  content: string;
  cover_photo: string;
  status: string;
  created_at: string;
}

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'future-of-networking',
    title: 'The Future of Networking: Why NFC Business Cards are Replacing Paper',
    category: 'Technology',
    preview_text: 'Discover how NFC technology is transforming the way professionals exchange information and build connections in the modern world.',
    tags: 'nfc, technology, networking, smartcard',
    content: `In an increasingly digital world, the traditional paper business card is fast becoming a relic of the past. Enter the NFC (Near Field Communication) smart business card—a revolutionary networking tool that is changing how professionals connect, share, and build relationships.

    Here are the key reasons why NFC business cards are replacing paper:
    
    1. Zero Friction, Instant Sharing
    With a paper card, your contact has to manually type in your name, phone number, email, and social handles. With an NFC card, a simple tap against their smartphone instantly prompts them to save your contact file (.vcf) or opens your custom networking landing page.
    
    2. Completely Sustainable
    Billions of paper business cards are printed globally every year, and over 88% of them are thrown away within a week. NFC cards are a lifetime investment. You only need one card, eliminating paper waste entirely.
    
    3. Fully Dynamic and Editable
    Changed your phone number? Got a new job title? Launched a new website? With paper cards, you have to throw them away and reprint. With Tapinfi, you can update your digital profile details anytime through your web dashboard, and the changes are active instantly.
    
    The future of networking is digital, contactless, and sustainable. Make the switch to Tapinfi today!`,
    cover_photo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000',
    status: 'Published',
    created_at: '2026-06-10T12:00:00.000Z'
  },
  {
    id: 'sustainable-business-practices',
    title: 'Sustainable Business Practices: Going Paperless in 2026',
    category: 'Sustainability',
    preview_text: 'Learn how switching to digital business cards can significantly reduce your company\'s carbon footprint and support environmental initiatives.',
    tags: 'sustainability, eco-friendly, greenbusiness',
    content: `Sustainability is no longer just a corporate buzzword; it's a core requirement for modern businesses. As organizations look for ways to decrease their ecological footprint, one of the easiest and most impactful changes they can make is going paperless.

    While we often focus on digitizing documents, invoices, and contracts, one major source of paper waste often gets overlooked: the humble business card.
    
    Switching your team to NFC business cards like Tapinfi helps you:
    - Stop tree logging: One tree can only produce a few thousand paper cards, which are quickly discarded.
    - Reduce carbon emissions: Printing and shipping boxes of paper cards to employees globally creates a substantial carbon footprint.
    - Promote a green brand identity: Handing over a sleek digital card shows clients and partners that your company is committed to sustainable innovation.
    
    Join the green revolution and take your networking into the eco-friendly future.`,
    cover_photo: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000',
    status: 'Published',
    created_at: '2026-06-12T09:30:00.000Z'
  },
  {
    id: 'maximize-nfc-card',
    title: 'How to Maximize Your NFC Smart Card for Networking Success',
    category: 'Tips & Tricks',
    preview_text: 'A practical guide on setting up your digital business card profile to make a strong first impression on every client and partner.',
    tags: 'networking, career, tips, success',
    content: `Getting your Tapinfi NFC card is just the first step. To truly unlock its power, you need to optimize your digital profile. Think of your digital profile as your modern professional landing page—it should look sharp, load fast, and contain all your essential contact points.

    Here are a few tips to maximize your smart card:
    
    1. Upload a High-Quality Profile Photo
    A professional, well-lit headshot immediately builds trust and recognition. Ensure it fits perfectly within the profile image boundaries.
    
    2. Add Clear Call-to-Actions (CTAs)
    Use prominent buttons for your most important goals: "Save Contact", "Book a Call", "Visit Portfolio", or "View Pitch Deck".
    
    3. Keep Your Social Links Updated
    Ensure your LinkedIn, Twitter, and WhatsApp links are active. A dead link destroys a great first impression.
    
    4. Use a Customized Theme
    Choose a template or color scheme that reflects your industry. A tech founder might opt for a minimalist dark theme, while a designer might prefer a vibrant or creative layout.
    
    By presenting a polished, structured digital identity, you convert every tap into a potential business opportunity.`,
    cover_photo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000',
    status: 'Published',
    created_at: '2026-06-14T08:15:00.000Z'
  }
];
