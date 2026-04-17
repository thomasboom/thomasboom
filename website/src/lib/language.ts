import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export type Language = 'en' | 'nl';

type Translations = {
  nav: {
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
    intro: string;
    userExperiences: string;
    middle: string;
    dailyLives: string;
    outro: string;
    openSource: string;
    and: string;
    freedom: string;
    ending: string;
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
      quotes: 'Quotes',
      work: 'Work',
      skills: 'Skills',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      role: 'Developer',
      basedIn: 'Based in The Netherlands',
      building: 'Building software to improve lives.',
    },
    sections: {
      work: '01 - SELECTED WORK',
      skills: '02 - SKILLS',
      about: '03 - ABOUT',
      contact: '04 - CONTACT',
    },
    about: {
      intro:
        "I'm a developer from The Netherlands who enjoys building useful applications. I focus on",
      userExperiences: 'user experiences',
      middle: ', and tools that genuinely help users in their',
      dailyLives: 'daily lives',
      outro: '. I care about a rich',
      openSource: 'open source ecosystem',
      and: 'and the',
      freedom: 'freedom',
      ending: 'to do what you want with the things you own.',
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
      quotes: 'Citaten',
      work: 'Werk',
      skills: 'Vaardigheden',
      about: 'Over',
      contact: 'Contact',
    },
    hero: {
      role: 'Ontwikkelaar',
      basedIn: 'Gebaseerd in Nederland',
      building: 'Software bouwen om levens te verbeteren.',
    },
    sections: {
      work: '01 - UITGELICHT WERK',
      skills: '02 - VAARDIGHEDEN',
      about: '03 - OVER',
      contact: '04 - CONTACT',
    },
    about: {
      intro:
        'Ik ben een ontwikkelaar uit Nederland die graag nuttige applicaties bouwt. Ik focus op',
      userExperiences: 'gebruikerservaringen',
      middle: 'en tools die gebruikers echt helpen in hun',
      dailyLives: 'dagelijks leven',
      outro: '. Ik geef om een rijk',
      openSource: 'open source-ecosysteem',
      and: 'en de',
      freedom: 'vrijheid',
      ending: 'om met je eigen apparaten te doen wat je wilt.',
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

const detectBrowserLanguage = (): Language => {
  if (!browser) return 'en';
  const browserLanguage = navigator.languages?.[0] ?? navigator.language;
  return browserLanguage.toLowerCase().startsWith('nl') ? 'nl' : 'en';
};

export const language = writable<Language>(detectBrowserLanguage());
export const t = derived(language, ($language) => translations[$language]);

if (browser) {
  language.subscribe((current) => {
    document.documentElement.lang = current;
  });
}
