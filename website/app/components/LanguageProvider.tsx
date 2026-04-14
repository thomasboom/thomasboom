'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type Language = 'en' | 'nl';

type Translations = {
  nav: {
    blog: string;
    quotes: string;
    work: string;
    skills: string;
    about: string;
    contact: string;
  };
  hero: {
    role: string;
    basedIn: string;
    building: string;
  };
  sections: {
    work: string;
    skills: string;
    about: string;
    contact: string;
  };
  about: {
    textStart: string;
    textMiddle: string;
    textEnd: string;
    focus: string;
    help: string;
  };
  work: {
    contributedTo: string;
    yam: string;
    ipcar: string;
    supgit: string;
    airun: string;
    bijbelquiz: string;
  };
  skills: {
    mobile: string;
    web: string;
    android: string;
    backend: string;
    language: string;
  };
  quote: {
    title: string;
    titleAccent: string;
    loading: string;
    upvote: string;
    downvote: string;
    dateLocale: string;
  };
  links: {
    basedIn: string;
    backHome: string;
  };
  footer: {
    country: string;
  };
};

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      blog: 'Blog',
      quotes: 'Quotes',
      work: 'Work',
      skills: 'Skills',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      role: 'Developer',
      basedIn: 'Based in The Netherlands',
      building: 'Building mobile apps & web tools',
    },
    sections: {
      work: '01 - SELECTED WORK',
      skills: '02 - SKILLS',
      about: '03 - ABOUT',
      contact: '04 - CONTACT',
    },
    about: {
      textStart:
        'Developer from The Netherlands who enjoys building useful applications.',
      textMiddle: 'Focus on',
      textEnd: 'and tools that genuinely',
      focus: 'user experiences',
      help: 'help',
    },
    work: {
      contributedTo: 'Contributed to',
      yam: 'A fast, open and customizable launcher for Android',
      ipcar:
        'A remote-controlled robot that gives children with disabilities a real presence in the classroom, from home',
      supgit:
        "A simplified Git CLI for beginners who don't want to leave the terminal",
      airun:
        'Forgot that you have dozens of AI CLIs installed? Find the one you need before executing your prompt',
      bijbelquiz: 'Test your Bible knowledge with engaging quizzes.',
    },
    skills: {
      mobile: 'Mobile development',
      web: 'Web development',
      android: 'Android development',
      backend: 'Backend & database',
      language: 'Programming language',
    },
    quote: {
      title: 'Quote',
      titleAccent: ' of the Day',
      loading: 'Loading quote of the day...',
      upvote: 'Upvote',
      downvote: 'Downvote',
      dateLocale: 'en-US',
    },
    links: {
      basedIn: 'Based in The Netherlands',
      backHome: 'Back to home',
    },
    footer: {
      country: 'The Netherlands',
    },
  },
  nl: {
    nav: {
      blog: 'Blog',
      quotes: 'Citaten',
      work: 'Werk',
      skills: 'Vaardigheden',
      about: 'Over',
      contact: 'Contact',
    },
    hero: {
      role: 'Ontwikkelaar',
      basedIn: 'Gebaseerd in Nederland',
      building: 'Bouwt mobiele apps en webtools',
    },
    sections: {
      work: '01 - UITGELICHT WERK',
      skills: '02 - VAARDIGHEDEN',
      about: '03 - OVER',
      contact: '04 - CONTACT',
    },
    about: {
      textStart:
        'Ontwikkelaar uit Nederland die graag nuttige applicaties bouwt.',
      textMiddle: 'Focus op',
      textEnd: 'en tools die mensen echt',
      focus: 'gebruikerservaringen',
      help: 'helpen',
    },
    work: {
      contributedTo: 'Bijgedragen aan',
      yam: 'Een snelle, open en aanpasbare launcher voor Android',
      ipcar:
        'Een op afstand bestuurbare robot die kinderen met een beperking echte aanwezigheid in de klas geeft, vanuit huis',
      supgit:
        'Een vereenvoudigde Git CLI voor beginners die de terminal niet willen verlaten',
      airun:
        'Vergeten welke van je AI CLIs je nodig hebt? Vind de juiste voordat je je prompt uitvoert',
      bijbelquiz: 'Test je Bijbelkennis met interactieve quizzen.',
    },
    skills: {
      mobile: 'Mobiele ontwikkeling',
      web: 'Webontwikkeling',
      android: 'Android-ontwikkeling',
      backend: 'Backend en database',
      language: 'Programmeertaal',
    },
    quote: {
      title: 'Citaat',
      titleAccent: ' van de dag',
      loading: 'Citaat van de dag laden...',
      upvote: 'Omhoog stemmen',
      downvote: 'Omlaag stemmen',
      dateLocale: 'nl-NL',
    },
    links: {
      basedIn: 'Gebaseerd in Nederland',
      backHome: 'Terug naar home',
    },
    footer: {
      country: 'Nederland',
    },
  },
};

type LanguageContextValue = {
  language: Language;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';

  const browserLanguage = navigator.languages?.[0] ?? navigator.language;
  return browserLanguage.toLowerCase().startsWith('nl') ? 'nl' : 'en';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language] = useState<Language>(() => detectBrowserLanguage());

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      t: translations[language],
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
