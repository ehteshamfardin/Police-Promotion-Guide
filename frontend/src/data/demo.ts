// Realistic Bengali demo data for Police Promotion Academy (Phase 1 UI only).

export type Chapter = {
  id: string;
  title: string;
  lessons: number;
  questions: number;
  completed: boolean;
};

export type Subject = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string; // theme key name resolved in components
  questions: number;
  progress: number; // 0..1
  chapters: Chapter[];
};

export type MCQQuestion = {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  year?: string;
};

export type MockTest = {
  id: string;
  title: string;
  questions: number;
  durationMin: number;
  marks: number;
  difficulty: "সহজ" | "মাধ্যম" | "কঠিন";
  participants: number;
  isPremium: boolean;
  description: string;
};

export type Note = {
  id: string;
  title: string;
  category: string;
  readTime: number; // minutes
  author: string;
  excerpt: string;
  content: string[];
  bookmarked: boolean;
  date: string;
};

export type Paper = {
  id: string;
  year: number;
  title: string;
  questions: number;
  solved: boolean;
  sizeMb: number;
};

export type WrongAnswer = {
  id: string;
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  explanation: string;
  subject: string;
  date: string;
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  icon: string;
  type: "exam" | "test" | "note" | "system";
};

export type Plan = {
  id: string;
  title: string;
  price: number;
  period: string;
  perMonth: string;
  save?: string;
  popular?: boolean;
};

export const SUBJECTS: Subject[] = [
  {
    id: "police-regulation",
    title: "পুলিশ রেগুলেশন",
    subtitle: "পুলিশ বাহকের গঠন, নিয়মাবলী ও কর্তব্য",
    icon: "shield-check",
    color: "info",
    questions: 245,
    progress: 0.72,
    chapters: [
      { id: "pr-1", title: "পুলিশ রেগুলেশনের প্রাথমিক বিধান", lessons: 8, questions: 40, completed: true },
      { id: "pr-2", title: "থানা ব্যবস্থাপনা ও রেকর্ড", lessons: 10, questions: 55, completed: true },
      { id: "pr-3", title: "কর্মকর্তাদের ক্ষমতা ও দায়িত্ব", lessons: 12, questions: 68, completed: false },
      { id: "pr-4", title: "বাহকের শৃঙ্খলা ও আবেদন-নিবেদন", lessons: 6, questions: 42, completed: false },
    ],
  },
  {
    id: "penal-code",
    title: "দণ্ডবিধি, ১৮৬০",
    subtitle: "অপরাধ ও শাস্তির মৌলিক আইন",
    icon: "gavel",
    color: "brand",
    questions: 320,
    progress: 0.58,
    chapters: [
      { id: "pc-1", title: "ভূমিকা ও সাধারণ ব্যাখ্যা (ধারা ১–৫২)", lessons: 9, questions: 52, completed: true },
      { id: "pc-2", title: "দণ্ড ও অপরাধের সাধারণ ব্যতিক্রম", lessons: 11, questions: 60, completed: false },
      { id: "pc-3", title: "মানবদেহ সংক্রান্ত অপরাধ", lessons: 14, questions: 84, completed: false },
      { id: "pc-4", title: "সম্পত্তি সংক্রান্ত অপরাধ", lessons: 10, questions: 66, completed: false },
      { id: "pc-5", title: "মানহানিকর অপরাধ", lessons: 6, questions: 38, completed: false },
    ],
  },
  {
    id: "crpc",
    title: "ফৌজদারি কার্যবিধি",
    subtitle: "গ্রেপ্তার, তদন্ত ও বিচার প্রক্রিয়া",
    icon: "file-document-outline",
    color: "success",
    questions: 280,
    progress: 0.45,
    chapters: [
      { id: "cr-1", title: "আদালতের ক্ষমতাদি", lessons: 7, questions: 36, completed: true },
      { id: "cr-2", title: "গ্রেপ্তার ও জামিন", lessons: 12, questions: 70, completed: false },
      { id: "cr-3", title: "তদন্ত প্রক্রিয়া ও এফআইআর", lessons: 10, questions: 58, completed: false },
      { id: "cr-4", title: "অভিযোগ ও বিচার কার্যক্রম", lessons: 13, questions: 72, completed: false },
    ],
  },
  {
    id: "evidence-act",
    title: "সাক্ষ্য আইন, ১৮৭২",
    subtitle: "সাক্ষ্য, প্রমাণ ও প্রমাণ্যতা",
    icon: "scale-balance",
    color: "warning",
    questions: 190,
    progress: 0.31,
    chapters: [
      { id: "ev-1", title: "সাক্ষ্যের প্রাসঙ্গিকতা", lessons: 8, questions: 44, completed: false },
      { id: "ev-2", title: "মৌখিক ও দলিল সাক্ষ্য", lessons: 9, questions: 48, completed: false },
      { id: "ev-3", title: "সাক্ষীর পরীক্ষা ও ক্রস-এক্সামিনেশন", lessons: 7, questions: 40, completed: false },
      { id: "ev-4", title: "অনুমান ও বয়ান", lessons: 6, questions: 34, completed: false },
    ],
  },
  {
    id: "constitution",
    title: "বাংলাদেশ সংবিধান",
    subtitle: "মৌলিক অধিকার ও রাষ্ট্রীয় কাঠামো",
    icon: "book-open-variant",
    color: "info",
    questions: 210,
    progress: 0.66,
    chapters: [
      { id: "cn-1", title: "রাষ্ট্র ও মৌলিক নীতিমালা", lessons: 6, questions: 32, completed: true },
      { id: "cn-2", title: "মৌলিক অধিকার", lessons: 10, questions: 58, completed: true },
      { id: "cn-3", title: "নির্বাহী ও আইনসভা", lessons: 9, questions: 50, completed: false },
      { id: "cn-4", title: "বিচার বিভাগ ও সংশোধনী", lessons: 8, questions: 44, completed: false },
    ],
  },
  {
    id: "ethics-human-rights",
    title: "পুলিশ নৈতিকতা ও মানবাধিকার",
    subtitle: "কর্মকর্তার আচরণ ও নাগরিক অধিকার",
    icon: "account-check-outline",
    color: "success",
    questions: 120,
    progress: 0.2,
    chapters: [
      { id: "eh-1", title: "পুলিশ নৈতিকতার মূলনীতি", lessons: 6, questions: 30, completed: false },
      { id: "eh-2", title: "মানবাধিকার আইন ও পুলিশ", lessons: 8, questions: 42, completed: false },
      { id: "eh-3", title: "নারী ও শিশু সুরক্ষা", lessons: 7, questions: 36, completed: false },
    ],
  },
  {
    id: "administration",
    title: "প্রশাসনিক ব্যবস্থাপনা",
    subtitle: "নেতৃত্ব, কমান্ড ও সমন্বয়",
    icon: "account-tie",
    color: "brand",
    questions: 150,
    progress: 0.12,
    chapters: [
      { id: "ad-1", title: "প্রশাসনিক তত্ত্ব ও প্রয়োগ", lessons: 7, questions: 38, completed: false },
      { id: "ad-2", title: "নেতৃত্ব ও দল পরিচালনা", lessons: 8, questions: 40, completed: false },
      { id: "ad-3", title: "দুর্যোগ ব্যবস্থাপনা ও কমান্ড", lessons: 6, questions: 34, completed: false },
    ],
  },
  {
    id: "language",
    title: "বাংলা ও ইংরেজি",
    subtitle: "রিপোর্ট লেখা ও যোগাযোগ দক্ষতা",
    icon: "translate",
    color: "warning",
    questions: 90,
    progress: 0.05,
    chapters: [
      { id: "ln-1", title: "রিপোর্ট ও জিডি লেখার নিয়ম", lessons: 5, questions: 26, completed: false },
      { id: "ln-2", title: "ইংরেজি ব্যাকরণ ও অনুবাদ", lessons: 7, questions: 34, completed: false },
    ],
  },
];

export const MCQ_QUESTIONS: MCQQuestion[] = [
  {
    id: "q1",
    subject: "দণ্ডবিধি",
    question: "দণ্ডবিধির ৩০২ ধারা অনুযায়ী ইচ্ছাকৃত হত্যাকাণ্ডের শাস্তি কী?",
    options: [
      "দশ বছর পর্যন্ত কারাদণ্ড",
      "মৃত্যুদণ্ড অথবা যাবজ্জীবন কারাদণ্ড, এবং জরিমানা",
      "সাত বছর কারাদণ্ড মাত্র",
      "শুধু জরিমানা",
    ],
    correctIndex: 1,
    explanation:
      "দণ্ডবিধির ৩০২ ধারা অনুযায়ী ইচ্ছাকৃত হত্যাকাণ্ডের দোষী ব্যক্তিকে মৃত্যুদণ্ড অথবা যাবজ্জীবন কারাদণ্ড প্রদান করা হয়, এবং সাথে জরিমানাও করা যায়।",
  },
  {
    id: "q2",
    subject: "ফৌজদারি কার্যবিধি",
    question: "এফআইআর (প্রথম তথ্য রিপোর্ট) রেকর্ড করার বিধান ফৌজদারি কার্যবিধির কোন ধারায় আছে?",
    options: ["১৫১ ধারা", "১৫৪ ধারা", "১৬১ ধারা", "১৭৩ ধারা"],
    correctIndex: 1,
    explanation:
      "ফৌজদারি কার্যবিধির ১৫৪ ধারা অনুযায়ী আমলযোগ্য অপরাধ সংঘটিত হওয়ার তথ্য পেলে থানার ভারপ্রাপ্ত কর্মকর্তা প্রথম তথ্য রিপোর্ট (এফআইআর) রেকর্ড করবেন।",
  },
  {
    id: "q3",
    subject: "বাংলাদেশ সংবিধান",
    question: "বাংলাদেশ সংবিধানের কোন অনুচ্ছেদে আইনের দৃষ্টিতে সমতা নিশ্চিত করা হয়েছে?",
    options: ["২৭ নং অনুচ্ছেদ", "৩১ নং অনুচ্ছেদ", "৩৯ নং অনুচ্ছেদ", "১১ নং অনুচ্ছেদ"],
    correctIndex: 0,
    explanation:
      "সংবিধানের ২৭ নং অনুচ্ছেদ অনুযায়ী সকল নাগরিক আইনের দৃষ্টিতে সমান এবং আইনের সমান সুরক্ষার অধিকারী।",
  },
  {
    id: "q4",
    subject: "সাক্ষ্য আইন",
    question: "সাক্ষ্য আইন, ১৮৭২ অনুযায়ী সুস্থ মস্তিষ্ক সাক্ষী হওয়ার ন্যূনতম বয়সসীমা কত?",
    options: ["১৮ বছর", "১৪ বছর", "২১ বছর", "কোনো বয়সসীমা নেই"],
    correctIndex: 3,
    explanation:
      "সাক্ষ্য আইনের ১১৮ নং ধারা অনুযায়ী কোনো নির্দিষ্ট বয়সসীমা নেই; যে ব্যক্তি বিষয়টি বুঝতে ও যুক্তিসঙ্গতভাবে উত্তর দিতে সক্ষম, সে-ই সুস্থ মস্তিষ্ক সাক্ষী হতে পারে।",
  },
  {
    id: "q5",
    subject: "পুলিশ রেগুলেশন",
    question: "পুলিশ রেগুলেশন অনুযায়ী জেলা প্রশাসক কত দিন অন্তর প্রতিটি থানা পরিদর্শন করবেন?",
    options: ["প্রতি মাসে", "প্রতি তিন মাসে", "প্রতি ছয় মাসে", "বছরে একবার"],
    correctIndex: 1,
    explanation:
      "পুলিশ রেগুলেশনের বিধান অনুযায়ী জেলা প্রশাসক প্রতি তিন মাস অন্তর অন্তত একবার প্রতিটি থানা পরিদর্শন করবেন এবং রেকর্ড পরীক্ষা করবেন।",
  },
  {
    id: "q6",
    subject: "ফৌজদারি কার্যবিধি",
    question: "গ্রেপ্তারের সাধারণ বিধান ফৌজদারি কার্যবিধির কোন ধারায় বর্ণিত হয়েছে?",
    options: ["৪১ ধারায়", "৪৬ ধারায়", "৫৪ ধারায়", "১০৭ ধারায়"],
    correctIndex: 1,
    explanation:
      "ফৌজদারি কার্যবিধির ৪৬ ধারায় গ্রেপ্তার কীভাবে সম্পন্ন হয় তার সাধারণ বিধান বর্ণিত হয়েছে; ৪১ ধারায় কখন গ্রেপ্তার করা যাবে তা বলা হয়েছে।",
  },
  {
    id: "q7",
    subject: "দণ্ডবিধি",
    question: "দণ্ডবিধির কোন ধারায় 'সাধারণ উদ্দেশ্য' (Common Intention) সংক্রান্ত বিধান রয়েছে?",
    options: ["৩৩ ধারা", "৩৪ ধারা", "৩৯ ধারা", "৫২ ধারা"],
    correctIndex: 1,
    explanation:
      "দণ্ডবিধির ৩৪ ধারায় সাধারণ উদ্দেশ্যে একাধিক ব্যক্তির কর্মকাণ্ড সংক্রান্ত বিধান রয়েছে — 'এক জনের কৃত কর্ম, সকলের কৃত কর্ম' নীতি এখানে প্রযোজ্য হয়।",
  },
  {
    id: "q8",
    subject: "বাংলাদেশ সংবিধান",
    question: "সংবিধানের কোন অনুচ্ছেদে গ্রেপ্তার ও নজরবন্দির ক্ষেত্রে সুরক্ষার অধিকার নিশ্চিত করা হয়েছে?",
    options: ["৩১ নং অনুচ্ছেদ", "৩২ নং অনুচ্ছেদ", "৩৩ নং অনুচ্ছেদ", "৩৫ নং অনুচ্ছেদ"],
    correctIndex: 2,
    explanation:
      "সংবিধানের ৩৩ নং অনুচ্ছেদ অনুযায়ী গ্রেপ্তার ও নজরবন্দির ক্ষেত্রে সুরক্ষার অধিকার নিশ্চিত করা হয়েছে — যেমন ২৪ ঘণ্টার মধ্যে ম্যাজিস্ট্রেটের সামনে উপস্থাপন।",
  },
  {
    id: "q9",
    subject: "পুলিশ রেগুলেশন",
    question: "বাংলাদেশ পুলিশ বাহকের সর্বোচ্চ পদমর্যাদার কর্মকর্তা কে?",
    options: [
      "নিরাপত্তা সেবার মহাপরিচালক",
      "সিনিয়র সেক্রেটারি, স্বরাষ্ট্র মন্ত্রণালয়",
      "পুলিশ মহাপরিদর্শক (আইজিপি)",
      "ঢাকা রেঞ্জের ডিআইজি",
    ],
    correctIndex: 2,
    explanation:
      "পুলিশ বাহকের সর্বোচ্চ পদমর্যাদার কর্মকর্তা হলেন পুলিশ মহাপরিদর্শক (Inspector General of Police — IGP)।",
  },
  {
    id: "q10",
    subject: "দণ্ডবিধি",
    question: "'আগে থেকে বদ্ধমন' (Malice Aforethought) দণ্ডবিধির কোন ধারায় বর্ণিত হত্যাকাণ্ডের সংজ্ঞার অংশ?",
    options: ["২৯৯ ধারা", "৩০০ ধারা", "৩০১ ধারা", "৩০৪ ধারা"],
    correctIndex: 1,
    explanation:
      "দণ্ডবিধির ৩০০ ধারায় ইচ্ছাকৃত হত্যাকাণ্ডের সংজ্ঞা দেওয়া হয়েছে, যেখানে 'আগে থেকে বদ্ধমন' (malice aforethought) অন্তর্ভুক্ত; ২৯৯ ধারায় মানবহত্যার সাধারণ সংজ্ঞা রয়েছে।",
  },
];

export const MOCK_TESTS: MockTest[] = [
  {
    id: "mt-1",
    title: "প্রমোশন বোর্ড ফুল মডেল টেস্ট — ০১",
    questions: 100,
    durationMin: 60,
    marks: 100,
    difficulty: "মাধ্যম",
    participants: 1248,
    isPremium: false,
    description: "সমস্ত বিষয়ের ওপর পূর্ণাঙ্গ প্রমোশন বোর্ড স্ট্যান্ডার্ডের মক টেস্ট।",
  },
  {
    id: "mt-2",
    title: "দণ্ডবিধি স্পেশাল টেস্ট",
    questions: 50,
    durationMin: 30,
    marks: 50,
    difficulty: "কঠিন",
    participants: 863,
    isPremium: true,
    description: "দণ্ডবিধির গুরুত্বপূর্ণ ধারাসমূহের ওপর বিশেষভাবে সাজানো কঠিন প্রশ্ন।",
  },
  {
    id: "mt-3",
    title: "বাংলাদেশ সংবিধান মক টেস্ট",
    questions: 50,
    durationMin: 30,
    marks: 50,
    difficulty: "মাধ্যম",
    participants: 1021,
    isPremium: false,
    description: "মৌলিক অধিকার, রাষ্ট্রীয় কাঠামো ও সংশোধনীসমূহের ওপর প্রশ্ন।",
  },
  {
    id: "mt-4",
    title: "ফৌজদারি কার্যবিধি ও সাক্ষ্য আইন টেস্ট",
    questions: 75,
    durationMin: 45,
    marks: 75,
    difficulty: "কঠিন",
    participants: 542,
    isPremium: true,
    description: "তদন্ত, গ্রেপ্তার, জামিন ও সাক্ষ্য বিষয়ক সমন্বিত উচ্চতর মানের টেস্ট।",
  },
  {
    id: "mt-5",
    title: "মিক্সড কুইক টেস্ট",
    questions: 25,
    durationMin: 15,
    marks: 25,
    difficulty: "সহজ",
    participants: 2210,
    isPremium: false,
    description: "দৈনিক অনুশীলনের জন্য সংক্ষিপ্ত সময়ের সহজ মানের কুইক টেস্ট।",
  },
];

export const NOTE_CATEGORIES = ["সব", "আইন", "প্রশাসন", "পরামর্শ"];

export const NOTES: Note[] = [
  {
    id: "n1",
    title: "ধারা ৫৪ ও ৫৫: গ্রেপ্তারের বিধান ও পুলিশের ক্ষমতা",
    category: "আইন",
    readTime: 8,
    author: "অ্যাডভোকেট এ. করিম",
    excerpt: "কোন ক্ষেত্রে ওয়ারেন্ট ছাড়া গ্রেপ্তার করা যায় এবং গ্রেপ্তারকালীন নাগরিকের মৌলিক সুরক্ষা...",
    content: [
      "ফৌজদারি কার্যবিধির ৫৪ ধারা অনুযায়ী একটি তালিকাভুক্ত ক্ষেত্রে কোনো পুলিশ কর্মকর্তা ওয়ারেন্ট ছাড়াই কোনো ব্যক্তিকে গ্রেপ্তার করতে পারেন। এর মধ্যে রয়েছে — মারাত্মক অপরাধে অভিযুক্ত ব্যক্তি, অপরাধ সংঘটিত অবস্থায় প্রত্যক্ষ ব্যক্তি, ফেরার প্রবণতা থাকা অভিযুক্ত ব্যক্তি ইত্যাদি।",
      "৫৫ ধারা অনুযায়ী থানার ভারপ্রাপ্ত কর্মকর্তা (ওসি) নিজে বা তার নিচের কর্মকর্তাকে নির্দেশ দিয়ে অনুরূপ ক্ষেত্রে গ্রেপ্তারের ক্ষমতা প্রয়োগ করতে পারেন। তবে প্রতিটি ক্ষেত্রে গ্রেপ্তারের সুনির্দিষ্ট কারণ লিখিতভাবে জানানো বাধ্যতামূলক।",
      "সংবিধানের ৩৩ নং অনুচ্ছেদ অনুযায়ী গ্রেপ্তারকৃত ব্যক্তিকে গ্রেপ্তারের কারণ জানাতে হবে এবং ২৪ ঘণ্টার মধ্যে নিকটতম ম্যাজিস্ট্রেটের সামনে উপস্থাপন করতে হবে। এই অধিকার প্রত্যেক নাগরিকের জন্য মৌলিক।",
      "মনে রাখতে হবে — মহিলাদের সূর্যাসতের পর সূর্যোদয়ের পূর্ব পর্যন্ত গ্রেপ্তার করতে বিশেষ বিধান অনুসরণ করতে হয়, এবং গ্রেপ্তারকালীন সময়ে কোনো প্রকার অমানবিক আচরণ পুলিশ নৈতিকতার লঙ্ঘন ছাড়াও দণ্ডনীয় অপরাধ হতে পারে।",
    ],
    bookmarked: true,
    date: "২ জুন ২০২৬",
  },
  {
    id: "n2",
    title: "এফআইআর বনাম জিডি: প্রাথমিক পার্থক্যসমূহ",
    category: "প্রশাসন",
    readTime: 6,
    author: "এসপি (প্রশিক্ষণ) এস. রহমান",
    excerpt: "প্রথম তথ্য রিপোর্ট এবং সাধারণ ডায়েরির আইনগত স্বরূপ, ব্যবহার ও প্রমাণ হিসেবে মূল্য...",
    content: [
      "এফআইআর (প্রথম তথ্য রিপোর্ট) আমলযোগ্য অপরাধের তথ্য জানা মাত্রই ফৌজদারি কার্যবিধির ১৫৪ ধারা মোতাবেক রেকর্ড করা হয়। এটি তদন্তের সূচনা বিন্দু এবং একটি গুরুত্বপূর্ণ দলিল প্রমাণ।",
      "অন্যদিকে জিডি (সাধারণ ডায়েরি) থানার দৈনন্দিন গুরুত্বপূর্ণ ঘটনার স্থায়ী রেকর্ড — যেমন হারানো ব্যক্তি, স্থানান্তর, আবহাওয়া বা প্রশাসনিক সিদ্ধান্ত। জিডি ফৌজদারি কার্যবিধির ১৬৮ ধারার পরিপ্রেক্ষিতে রাখা হয়।",
      "প্রমাণের মূল্য: এফআইআর দেরিতে দাখিল হলে তা অভিযোগকারীর সুবিধাজনক ব্যাখ্যার দাবি দুর্বল করে। জিডি মূলত প্রশাসনিক রেকর্ড — তা এককভাবে অপরাধ প্রমাণে যথেষ্ট নয়, তবে সহায়ক প্রমাণ হিসেবে গৃহীত হয়।",
      "প্রমোশন পরীক্ষার জন্য মনে রাখুন: এফআইআর শুধু আমলযোগ্য অপরাধের ক্ষেত্রে, জিডি প্রতিটি থানার নিত্যদিনের কার্যক্রমের জন্য।",
    ],
    bookmarked: true,
    date: "২৮ মে ২০২৬",
  },
  {
    id: "n3",
    title: "প্রমোশন বোর্ড সাক্ষাত্কারের প্রস্তুতি নির্দেশিকা",
    category: "পরামর্শ",
    readTime: 10,
    author: "অতিরিক্ত এসপি এম. হাসান",
    excerpt: "সাক্ষাত্কার বোর্ডের সাধারণ প্রশ্নপত্র, উত্তর প্রদর্শনের কৌশল ও ভুল সাধারণ ধারণাসমূহ...",
    content: [
      "প্রমোশন বোর্ড মূলত তিনটি ক্ষেত্র মূল্যায়ন করে — বিষয়ভিত্তিক জ্ঞান (আইন ও রেগুলেশন), প্রশাসনিক সিদ্ধান্ত গ্রহণের ক্ষমতা, এবং বাহকের প্রতি দায়বদ্ধতার মনোভাব।",
      "প্রস্তুতির কৌশল: প্রতিটি প্রধান আইনের সূচনা তারিখ, সংশোধনী ও সর্বশেষ পরিবর্তন টীকাযুক্ত এক পাতার চার্টে তৈরি করুন। প্রতিদিন অন্তত ১০টি পূর্ববর্তী বছরের বোর্ড প্রশ্নের উত্তর মুখস্থ অনুশীলন করুন।",
      "সাক্ষাত্কারে পোশাক, ভাষার সৌজন্য এবং স্বচ্ছ চোখের যোগাযোগ বোর্ডের মনে আস্থা তৈরি করে। প্রশ্ন না বুঝলে ভুল উত্তর দেওয়ার চেয়ে বিনয়ের সাথে পুনরায় জানতে চাওয়া উত্তম।",
      "সাধারণ ভুল: আইনের ধারা মুখস্থ থাকলেও বাস্তব দৃষ্টান্তে প্রয়োগ করতে না পারা। প্রতিটি ধারার সাথে একটি বাস্তব থানা-স্তরের উদাহরণ যুক্ত করে প্রস্তুতি নিন।",
    ],
    bookmarked: false,
    date: "২৫ মে ২০২৬",
  },
  {
    id: "n4",
    title: "নিয়ম ৪৯৭: জামিন মঞ্জুরের নীতিমালা",
    category: "আইন",
    readTime: 7,
    author: "অ্যাডভোকেট সুফিয়া আক্তার",
    excerpt: "আমলযোগ্য ও অনামলযোগ্য অপরাধে জামিনের পার্থক্য এবং পুলিশ বাদীর ক্ষমতা...",
    content: [
      "ফৌজদারি কার্যবিধির ৪৯৭ ধারা অনামলযোগ্য অপরাধে জামিনের বিধান দেয়। আমলযোগ্য অপরাধে ৪৯৬ ধারায় পুলিশ সরাসরি জামিন প্রদান করতে পারে।",
      "অনামলযোগ্য ক্ষেত্রে জামিন মঞ্জুরের ক্ষমতা ম্যাজিস্ট্রেট বা আদালতের। পুলিশ কর্মকর্তা হিসেবে গ্রেপ্তারকৃত ব্যক্তিকে ২৪ ঘণ্টার মধ্যে উপযুক্ত কর্তৃপক্ষের কাছে উপস্থাপন করা বাধ্যতামূলক।",
      "জামিন প্রত্যাখ্যানের ক্ষেত্রে আদালতকে কারণ উল্লেখ করে লিখিত বক্তব্য দিতে হয়। বিশেষত মৃত্যুদণ্ডযোগ্য অপরাধে প্রমাণের ভিত্তিতে সিদ্ধান্ত নেওয়া হয়।",
    ],
    bookmarked: false,
    date: "২১ মে ২০২৬",
  },
  {
    id: "n5",
    title: "পুলিশ নৈতিকতা ও আচরণবিধি",
    category: "প্রশাসন",
    readTime: 9,
    author: "ডিআইজি (রিফ্লেক্ট) জে. চৌধুরী",
    excerpt: "পদমর্যাদা অনুযায়ী আচরণ, ঘুষ-দুর্নীতি প্রতিরোধ এবং জনগণের প্রতি দায়বদ্ধতার স্ট্যান্ডার্ড...",
    content: [
      "পুলিশ কর্মকর্তার আচরণবিধির মূল স্তম্ভ তিনটি — আনুগত্য, বস্তুনিষ্ঠতা ও জনগণের প্রতি দায়বদ্ধতা। প্রমোশন পরীক্ষায় প্রায়ই জিজ্ঞেস করা হয় কোন আচরণ কোন স্তম্ভের লঙ্ঘন।",
      "ঘুষ ও দুর্নীতি সংক্রান্ত অভিযোগ প্রাপ্তির পর ঊর্ধ্বতন কর্মকর্তার দায়িত্ব — অভিযোগ লিপিবদ্ধ করা, বিভাগীয় তদন্তের আদেশ দেওয়া এবং প্রয়োজনে কর্মকর্তাকে দায়িত্ব থেকে অব্যাহতি দেওয়া।",
      "জনগণের সাথে আচরণ: অভিযোগকারী নিরীহ হোক বা প্রভাবশালী — আইনের চোখে সবাই সমান (সংবিধানের ২৭ অনুচ্ছেদ)। ভাষার সৌজন্য ও শোনার সংস্কৃতি জন আস্থা তৈরির প্রথম পদক্ষেপ।",
    ],
    bookmarked: false,
    date: "১৮ মে ২০২৬",
  },
  {
    id: "n6",
    title: "গুলি ব্যবহারের আইনগত সীমা ও ক্রসফায়ার বিতর্ক",
    category: "আইন",
    readTime: 12,
    author: "অ্যাডভোকেট র. সানজিদা",
    excerpt: "কখন আত্মরক্ষায় প্রাণঘাতী বল ব্যবহার আইনত সমর্থিত এবং পরবর্তী প্রশাসনিক দায়িত্বসমূহ...",
    content: [
      "দণ্ডবিধির ৯৬ থেকে ১০৬ ধারা পর্যন্ত আত্মরক্ষার অধিকার বর্ণিত হয়েছে। প্রাণঘাতী আক্রমণের মুখে মৃত্যু থেকে রক্ষার জন্য প্রাণঘাতী বল প্রয়োগ আইনত সমর্থিত হতে পারে (দণ্ডবিধির ১০০ ধারা)।",
      "তবে আত্মরক্ষার অধিকার তখনই প্রযোজ্য যতক্ষণ পর্যন্ত বাস্তব ও তাৎক্ষণিক বিপদ থাকে। হুমকি ম্লান হওয়ার পরেও বল প্রয়োগ অপরাধ হিসেবে গণ্য হয়।",
      "প্রশাসনিক দায়িত্ব: গুলি ব্যবহারের ঘটনায় তাৎক্ষণিক রিপোর্ট প্রদান, ঘটনাস্থল সংরক্ষণ, প্রত্যক্ষদর্শীর বয়ান রেকর্ড এবং বিচ্ছিন্ন বিভাগীয় তদন্ত নিশ্চিত করা বাধ্যতামূলক।",
      "ম্যাগস্ট্রেসি জিজ্ঞাসাবাদ (১৭৪ ধারা) আবশ্যক — পুলিশ কর্মকর্তার কর্মকাণ্ড যেন আইনের সীমার মধ্যে ছিল তা দলিলভিত্তিক প্রমাণ করতে হয়।",
    ],
    bookmarked: false,
    date: "১২ মে ২০২৬",
  },
];

export const PAPERS: Paper[] = [
  { id: "p2024", year: 2024, title: "সার্জেন্ট ও ইন্সপেক্টর প্রমোশন পরীক্ষা", questions: 100, solved: true, sizeMb: 4.2 },
  { id: "p2023", year: 2023, title: "উপ-পরিদর্শক (এসআই) প্রমোশন পরীক্ষা", questions: 100, solved: true, sizeMb: 3.8 },
  { id: "p2022", year: 2022, title: "সার্জেন্ট ও ইন্সপেক্টর প্রমোশন পরীক্ষা", questions: 90, solved: true, sizeMb: 3.5 },
  { id: "p2021", year: 2021, title: "উপ-পরিদর্শক (এসআই) প্রমোশন পরীক্ষা", questions: 90, solved: true, sizeMb: 3.1 },
  { id: "p2020", year: 2020, title: "সার্জেন্ট প্রমোশন পরীক্ষা", questions: 80, solved: false, sizeMb: 2.9 },
  { id: "p2019", year: 2019, title: "ইন্সপেক্টর প্রমোশন পরীক্ষা", questions: 80, solved: true, sizeMb: 2.7 },
  { id: "p2018", year: 2018, title: "উপ-পরিদর্শক (এসআই) প্রমোশন পরীক্ষা", questions: 75, solved: true, sizeMb: 2.5 },
  { id: "p2017", year: 2017, title: "সার্জেন্ট প্রমোশন পরীক্ষা", questions: 75, solved: false, sizeMb: 2.3 },
  { id: "p2016", year: 2016, title: "ইন্সপেক্টর প্রমোশন পরীক্ষা", questions: 70, solved: true, sizeMb: 2.1 },
  { id: "p2015", year: 2015, title: "উপ-পরিদর্শক (এসআই) প্রমোশন পরীক্ষা", questions: 70, solved: false, sizeMb: 2.0 },
];

export const WRONG_ANSWERS: WrongAnswer[] = [
  {
    id: "w1",
    question: "সাক্ষ্য আইন, ১৮৭২ অনুযায়ী সুস্থ মস্তিষ্ক সাক্ষী হওয়ার ন্যূনতম বয়সসীমা কত?",
    yourAnswer: "১৮ বছর",
    correctAnswer: "কোনো বয়সসীমা নেই",
    explanation:
      "সাক্ষ্য আইনের ১১৮ ধারা অনুযায়ী বয়স নয়, বোঝার ক্ষমতাই মূল শর্ত। যে কোনো বয়সের ব্যক্তি বিষয়টি বুঝে সঠিকভাবে বর্ণনা করতে পারলেই সুস্থ মস্তিষ্ক সাক্ষী হতে পারে।",
    subject: "সাক্ষ্য আইন",
    date: "আজ, ৯:২০ এএম",
  },
  {
    id: "w2",
    question: "গ্রেপ্তারের সাধারণ বিধান ফৌজদারি কার্যবিধির কোন ধারায় বর্ণিত হয়েছে?",
    yourAnswer: "৪১ ধারায়",
    correctAnswer: "৪৬ ধারায়",
    explanation:
      "৪১ ধারায় কখন গ্রেপ্তার করা যাবে তা বলা হয়েছে; কীভাবে গ্রেপ্তার সম্পন্ন হয় তার সাধারণ বিধান ৪৬ ধারায়।",
    subject: "ফৌজদারি কার্যবিধি",
    date: "গতকাল, ৭:৪৫ পিএম",
  },
  {
    id: "w3",
    question: "'আগে থেকে বদ্ধমন' (Malice Aforethought) দণ্ডবিধির কোন ধারায় বর্ণিত হত্যাকাণ্ডের সংজ্ঞার অংশ?",
    yourAnswer: "২৯৯ ধারা",
    correctAnswer: "৩০০ ধারা",
    explanation:
      "২৯৯ ধারায় মানবহত্যার সাধারণ সংজ্ঞা; ইচ্ছাকৃত হত্যাকাণ্ডের চারটি সুনির্দিষ্ট শর্তসহ 'আগে থেকে বদ্ধমন' ৩০০ ধারায় বর্ণিত।",
    subject: "দণ্ডবিধি",
    date: "১০ জুন, ৮:১০ পিএম",
  },
];

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "not1",
    title: "প্রমোশন পরীক্ষার তারিখ ঘোষণা",
    body: "২০২৬ সালের প্রমোশন বোর্ড পরীক্ষা ১৫ জুন অনুষ্ঠিত হবে। এন্ট্রি পাস ডাউনলোড করুন।",
    time: "১৫ মিনিট আগে",
    unread: true,
    icon: "calendar-clock",
    type: "exam",
  },
  {
    id: "not2",
    title: "নতুন মক টেস্ট যুক্ত হয়েছে",
    body: "'দণ্ডবিধি স্পেশাল টেস্ট' — ৫০টি নতুন প্রশ্ন নিয়ে কঠিন মানের টেস্ট এখন চালু।",
    time: "২ ঘণ্টা আগে",
    unread: true,
    icon: "clipboard-check-outline",
    type: "test",
  },
  {
    id: "not3",
    title: "স্ট্রিক অর্জন — ১২ দিন",
    body: "অভিনন্দন! আপনি পরপর ১২ দিন অনুশীলন করেছেন। পয়েন্ট বোনাস যুক্ত হয়েছে।",
    time: "আজ, ৮:০০ এএম",
    unread: false,
    icon: "fire",
    type: "system",
  },
  {
    id: "not4",
    title: "নতুন নোট প্রকাশিত",
    body: "'গুলি ব্যবহারের আইনগত সীমা' — নতুন মাস্টার নোটটি পড়ুন।",
    time: "গতকাল, ৪:৩০ পিএম",
    unread: false,
    icon: "notebook-outline",
    type: "note",
  },
  {
    id: "not5",
    title: "সাপ্তাহিক অ্যানালিটিক্স প্রস্তুত",
    body: "আপনার এই সপ্তাহের নৈর্ব্যক্তিক রিপোর্ট দেখুন — দুর্বল বিষয়ের তালিকা আপডেট হয়েছে।",
    time: "১২ জুন, ১০:০০ এএম",
    unread: false,
    icon: "chart-line",
    type: "system",
  },
];

export const PLANS: Plan[] = [
  { id: "monthly", title: "মাসিক", price: 199, period: "১ মাস", perMonth: "১৯৯ টাকা/মাস" },
  { id: "quarterly", title: "ত্রৈমাসিক", price: 499, period: "৩ মাস", perMonth: "১৬৬ টাকা/মাস", save: "১৬% সাশ্রয়", popular: true },
  { id: "yearly", title: "বার্ষিক", price: 1499, period: "১২ মাস", perMonth: "১২৫ টাকা/মাস", save: "৩৭% সাশ্রয়" },
];

export const PREMIUM_FEATURES = [
  "আনলিমিটেড ভিআইপি মক টেস্ট",
  "১০ বছরের সমাধানসহ প্রশ্ন ব্যাংক",
  "মাস্টার নোটস ও কেস সামারি",
  "এআই প্রশ্ন জেনারেটর (আনলিমিটেড)",
  "বিস্তারিত প্রোগ্রেস অ্যানালিটিক্স",
  "বিজ্ঞাপনমুক্ত অভিজ্ঞতা",
];

export const PAYMENT_METHODS = [
  { id: "bkash", label: "বিকাশ", icon: "cellphone" },
  { id: "nagad", label: "নগদ", icon: "wallet" },
  { id: "rocket", label: "রকেট", icon: "cash" },
  { id: "card", label: "কার্ড", icon: "credit-card-outline" },
];

export const FREE_FEATURES = [
  "দৈনিক ৩০টি এমসিকিউ অনুশীলন",
  "বেসিক মক টেস্ট (১টি)",
  "নির্বাচিত নোটস",
  "মৌলিক প্রোগ্রেস ট্র্যাকিং",
];

export const OFFICER = {
  name: "রফিকুল ইসলাম",
  rank: "উপ-পরিদর্শক (এসআই)",
  unit: "ঢাকা মেট্রোপলিটন পুলিশ",
  station: "তেজগাঁও থানা",
  serviceId: "SI-4782",
  streakDays: 12,
  points: 8450,
  testsTaken: 23,
  examDate: "১৫ জুন ২০২৬",
  examCountdownDays: 2,
};

export const AI_SUGGESTED_PROMPTS = [
  "ধারা ৩০২ এর বিধান কী?",
  "এফআইআর কখন রেকর্ড করতে হয়?",
  "গ্রেপ্তারের নিয়ম সহজভাবে ব্যাখ্যা করুন",
  "জামিনের ধরনসমূহ কী কী?",
];

export const AI_FAKE_REPLY =
  "এটি এআই স্টাডি অ্যাসিস্ট্যান্টের ডেমো প্রিভিউ। পূর্ণাঙ্গ এআই সহকারী প্রিমিয়াম সংস্করণে যুক্ত হবে — যেখানে আইনের যেকোনো ধারা, রেগুলেশন ও বাস্তব দৃষ্টান্ত ব্যাখ্যা করে উত্তর পাওয়া যাবে।";

export const WEEKLY_ANALYTICS = [
  { day: "শনি", accuracy: 68, questions: 24 },
  { day: "রবি", accuracy: 74, questions: 30 },
  { day: "সোম", accuracy: 71, questions: 26 },
  { day: "মঙ্গল", accuracy: 80, questions: 35 },
  { day: "বুধ", accuracy: 77, questions: 28 },
  { day: "বৃহঃ", accuracy: 85, questions: 40 },
  { day: "শুক্র", accuracy: 82, questions: 22 },
];

export const SUBJECT_ACCURACY = [
  { subject: "পুলিশ রেগুলেশন", pct: 82 },
  { subject: "বাংলাদেশ সংবিধান", pct: 76 },
  { subject: "দণ্ডবিধি", pct: 64 },
  { subject: "ফৌজদারি কার্যবিধি", pct: 58 },
  { subject: "সাক্ষ্য আইন", pct: 41 },
];

export const BANK_YEARS = ["সব", "২০২৪", "২০২৩", "২০২২", "২০২১", "২০২০"];

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// Convert western digits to Bengali numerals.
export function bn(n: number | string): string {
  return String(n).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

// MM:SS countdown/elapsed display in Bengali numerals.
export function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${bn(String(m).padStart(2, "0"))}:${bn(String(s).padStart(2, "0"))}`;
}