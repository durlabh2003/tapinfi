export interface SubHeadingChild {
  id: string;
  title: string;
  contentType: 'paragraph' | 'list';
  content: string;
}

export interface SubHeading {
  id: string;
  title: string;
  contentType: 'paragraph' | 'list';
  content: string;
  subHeadings?: SubHeadingChild[];
}

export interface BlogSection {
  id: string;
  sectionNumber: number;
  primaryHeading: string;
  subheadings: SubHeading[];
  sectionImage?: string | null;
  imageCaption?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  preview_text: string;
  tags?: string;
  content?: string;
  cover_photo: string;
  status: string;
  created_at: string;
  sections?: BlogSection[];
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
}

/**
 * Smart Parser to guarantee raw Markdown text (e.g. ## 1. , ### 1.1, #### 1.1.1, ---)
 * is ALWAYS parsed into structured BlogSections and styled HTML elements.
 */
export function parseContentToSections(content?: string, existingSections?: BlogSection[]): BlogSection[] {
  if (Array.isArray(existingSections) && existingSections.length > 0) {
    return existingSections;
  }
  if (!content || !content.trim()) {
    return [];
  }

  // Split by markdown horizontal rule divider '---'
  const rawSections = content.split(/\n\s*---\s*\n/);
  const sections: BlogSection[] = [];

  rawSections.forEach((secStr, secIdx) => {
    const lines = secStr.split('\n');
    let primaryHeading = `Section ${secIdx + 1}`;
    let sectionImage: string | null = null;
    let imageCaption = '';
    const subheadings: SubHeading[] = [];
    let currentSub: SubHeading | null = null;
    let currentChild: SubHeadingChild | null = null;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      // Primary Heading (H2 or ##)
      if (trimmed.startsWith('## ')) {
        primaryHeading = trimmed.replace(/^##\s*/, '').replace(/^\d+\.\s*/, '');
      }
      // Image markdown format ![alt](url)
      else if (trimmed.startsWith('![')) {
        const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) {
          imageCaption = match[1];
          sectionImage = match[2];
        }
      }
      // Secondary Heading (H3 or ###)
      else if (trimmed.startsWith('### ')) {
        if (currentSub) {
          subheadings.push(currentSub);
        }
        const subTitle = trimmed.replace(/^###\s*/, '').replace(/^\d+(\.\d+)*\s*/, '');
        currentSub = {
          id: `sub_${secIdx}_${subheadings.length}_${Math.random().toString(36).substr(2, 4)}`,
          title: subTitle,
          contentType: 'paragraph',
          content: '',
          subHeadings: []
        };
        currentChild = null;
      }
      // Nested Sub-Heading (H4/H5 or #### / #####)
      else if (trimmed.startsWith('#### ') || trimmed.startsWith('##### ')) {
        const childTitle = trimmed.replace(/^#{4,5}\s*/, '').replace(/^\d+(\.\d+)*\s*/, '');
        currentChild = {
          id: `child_${secIdx}_${Math.random().toString(36).substr(2, 4)}`,
          title: childTitle,
          contentType: 'paragraph',
          content: ''
        };
        if (!currentSub) {
          currentSub = {
            id: `sub_${secIdx}_0_${Math.random().toString(36).substr(2, 4)}`,
            title: primaryHeading,
            contentType: 'paragraph',
            content: '',
            subHeadings: []
          };
        }
        if (!currentSub.subHeadings) currentSub.subHeadings = [];
        currentSub.subHeadings.push(currentChild);
      }
      // Bullet list item
      else if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const cleanBullet = trimmed.replace(/^[\s•\-\*]+/, '').trim();
        if (currentChild) {
          currentChild.contentType = 'list';
          currentChild.content = currentChild.content
            ? `${currentChild.content}\n• ${cleanBullet}`
            : `• ${cleanBullet}`;
        } else if (currentSub) {
          currentSub.contentType = 'list';
          currentSub.content = currentSub.content
            ? `${currentSub.content}\n• ${cleanBullet}`
            : `• ${cleanBullet}`;
        } else {
          currentSub = {
            id: `sub_${secIdx}_0_${Math.random().toString(36).substr(2, 4)}`,
            title: primaryHeading,
            contentType: 'list',
            content: `• ${cleanBullet}`,
            subHeadings: []
          };
        }
      }
      // Supportive text paragraph
      else {
        if (currentChild) {
          currentChild.content = currentChild.content
            ? `${currentChild.content}\n${trimmed}`
            : trimmed;
        } else if (currentSub) {
          currentSub.content = currentSub.content
            ? `${currentSub.content}\n${trimmed}`
            : trimmed;
        } else {
          currentSub = {
            id: `sub_${secIdx}_0_${Math.random().toString(36).substr(2, 4)}`,
            title: primaryHeading,
            contentType: 'paragraph',
            content: trimmed,
            subHeadings: []
          };
        }
      }
    });

    if (currentSub) {
      subheadings.push(currentSub);
    }

    sections.push({
      id: `sec_${secIdx + 1}`,
      sectionNumber: secIdx + 1,
      primaryHeading,
      sectionImage,
      imageCaption,
      subheadings: subheadings.length > 0 ? subheadings : [
        {
          id: `sub_${secIdx}_default`,
          title: primaryHeading,
          contentType: 'paragraph',
          content: secStr,
          subHeadings: []
        }
      ]
    });
  });

  return sections;
}

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'future-of-networking',
    title: 'The Future of Networking: Why NFC Business Cards are Replacing Paper',
    category: 'Technology',
    preview_text: 'Discover how NFC technology is transforming the way professionals exchange information and build connections in the modern world.',
    tags: 'nfc, technology, networking, smartcard',
    cover_photo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000',
    status: 'Published',
    created_at: '2026-06-10T12:00:00.000Z',
    meta_title: 'The Future of Networking: NFC Business Cards vs Paper | Tapinfi',
    meta_description: 'Discover how NFC technology is transforming traditional networking with instant digital contact sharing.',
    keywords: 'nfc card, digital networking, smart business card',
    sections: [
      {
        id: 'sec_mock1_1',
        sectionNumber: 1,
        primaryHeading: 'Zero Friction & Instant Sharing Mechanism',
        sectionImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800',
        imageCaption: 'Instant contact sharing with a single tap',
        subheadings: [
          {
            id: 'sub_mock1_1_1',
            title: 'No Manual Typing Required',
            contentType: 'paragraph',
            content: 'With traditional paper cards, your prospect has to manually type your phone number, email, and website. With a Tapinfi NFC card, a single contactless tap opens your profile instantly.',
            subHeadings: [
              {
                id: 'child_mock1_1_1_1',
                title: 'Compatibility Features',
                contentType: 'list',
                content: '• Works on iPhone XS & newer without extra apps\n• Supported on all modern Android devices\n• Fallback QR code printed on every physical card'
              }
            ]
          }
        ]
      },
      {
        id: 'sec_mock1_2',
        sectionNumber: 2,
        primaryHeading: '100% Sustainable & Eco-Friendly Impact',
        sectionImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
        imageCaption: 'Eliminating paper waste with reusable smart cards',
        subheadings: [
          {
            id: 'sub_mock1_2_1',
            title: 'Eliminating Paper Waste Forever',
            contentType: 'paragraph',
            content: 'Over 88% of paper business cards printed globally are discarded within a week. A single Tapinfi NFC card lasts a lifetime and prevents paper waste completely.',
            subHeadings: []
          }
        ]
      }
    ]
  },
  {
    id: 'sustainable-business-practices',
    title: 'Sustainable Business Practices: Going Paperless in 2026',
    category: 'Sustainability',
    preview_text: 'Learn how switching to digital business cards can significantly reduce your company\'s carbon footprint and support environmental initiatives.',
    tags: 'sustainability, eco-friendly, greenbusiness',
    cover_photo: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000',
    status: 'Published',
    created_at: '2026-06-12T09:30:00.000Z',
    meta_title: 'Sustainable Business Practices: Going Paperless | Tapinfi',
    meta_description: 'Learn how switching to digital business cards reduces carbon footprint.',
    keywords: 'green business, eco friendly card, sustainability',
    sections: [
      {
        id: 'sec_mock2_1',
        sectionNumber: 1,
        primaryHeading: 'The Environmental Cost of Paper Cards',
        sectionImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800',
        imageCaption: 'Protecting forests through digital choices',
        subheadings: [
          {
            id: 'sub_mock2_1_1',
            title: 'Protecting Forests & Natural Resources',
            contentType: 'paragraph',
            content: 'Millions of trees are cut down annually for disposable paper business cards. Switching to digital NFC profiles stops paper logging and decreases energy usage.',
            subHeadings: []
          }
        ]
      }
    ]
  }
];
