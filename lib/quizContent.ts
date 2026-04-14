export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

/** Quiz questions per module slug. Each lesson shows one question based on its 0-based position. */
export const QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
  "why-invest-beyond-india": [
    {
      question: "What is the primary risk of holding 100% of your portfolio in Indian assets?",
      options: [
        "You miss out on currency appreciation",
        "Your portfolio is fully exposed to a single economic cycle and regulatory environment",
        "Indian markets are more volatile than global markets",
        "RBI doesn't allow this level of domestic concentration",
      ],
      correctIndex: 1,
      explanation: "Concentrating wealth in one country exposes your entire portfolio to that country's business cycle, policy risk, and currency — regardless of how strong the underlying assets are.",
    },
    {
      question: "Historically, what has the US equity market delivered annually over a century?",
      options: ["Around 5%", "Around 8%", "Around 10%", "Around 15%"],
      correctIndex: 2,
      explanation: "The US market has compounded at roughly 10% annually over 100+ years, making it one of the most consistent long-term wealth creators in history.",
    },
    {
      question: "Global diversification is best described as:",
      options: [
        "Distrust in India's economic potential",
        "A hedge against a bad global economy",
        "Spreading risk across multiple economic cycles and currencies",
        "Investing only in developed markets",
      ],
      correctIndex: 2,
      explanation: "Diversification is about not betting everything on one chapter of any story — including India's. It spreads risk across geographies, currencies, and business cycles.",
    },
    {
      question: "Which concept describes the tendency of investors to overweight domestic assets?",
      options: ["Recency bias", "Home bias", "Anchoring", "Loss aversion"],
      correctIndex: 1,
      explanation: "Home bias is a well-documented behavioral finance phenomenon where investors disproportionately hold assets from their home country, often resulting in under-diversification.",
    },
  ],

  "accessing-global-markets": [
    {
      question: "Which of the following is a direct route for an Indian resident to invest in US stocks?",
      options: [
        "Buying units of a domestic equity mutual fund",
        "Opening an account with a foreign broker like Interactive Brokers",
        "Purchasing gold ETFs listed on NSE",
        "Investing through an NPS tier-II account",
      ],
      correctIndex: 1,
      explanation: "Foreign brokers like Interactive Brokers allow Indian residents to directly hold international securities. This is a direct route, as opposed to feeder funds or international mutual funds.",
    },
    {
      question: "What does LRS stand for in the context of international investing?",
      options: [
        "Linked Remittance Scheme",
        "Liberalised Remittance Scheme",
        "Licensed Remittance System",
        "Local Remittance Standard",
      ],
      correctIndex: 1,
      explanation: "The Liberalised Remittance Scheme (LRS) is the RBI framework allowing Indian residents to remit up to $250,000 per financial year for permitted purposes including overseas investment.",
    },
    {
      question: "Which factor should you NOT primarily evaluate a foreign brokerage on?",
      options: [
        "Regulatory oversight and SIPC coverage",
        "Currency conversion costs",
        "The brokerage's founding year",
        "Commission structure for international trades",
      ],
      correctIndex: 2,
      explanation: "A brokerage's age is far less important than its regulatory standing, SIPC coverage (US brokers), cost structure, and how well it handles currency conversion for Indian investors.",
    },
    {
      question: "International mutual funds domiciled in India offer which key advantage?",
      options: [
        "No currency conversion costs at all",
        "Simplified tax treatment under Indian income tax law",
        "Higher returns than direct US stock investment",
        "Exemption from LRS limits",
      ],
      correctIndex: 1,
      explanation: "India-domiciled international funds simplify compliance — they're taxed like Indian debt funds (post-2023 rules) and don't require foreign asset reporting in Schedule FA.",
    },
    {
      question: "What is the maximum amount an Indian resident can remit overseas per financial year under LRS?",
      options: ["$100,000", "$150,000", "$200,000", "$250,000"],
      correctIndex: 3,
      explanation: "The LRS limit is currently $250,000 per financial year per individual. It resets on April 1 each year and applies to all LRS transactions combined, not per purpose.",
    },
    {
      question: "Which document is most commonly required when opening an international brokerage account?",
      options: [
        "Form 15CA and 15CB",
        "Passport, PAN card, and bank statement",
        "SEBI registration certificate",
        "RBI approval letter",
      ],
      correctIndex: 1,
      explanation: "Most foreign brokers require a valid passport (identity), PAN (Indian tax ID), and recent bank statements (proof of address/funds). Form 15CA/CB is for tax withholding, not account opening.",
    },
    {
      question: "A 'feeder fund' in the context of international investing is:",
      options: [
        "A fund that invests only in emerging markets",
        "An Indian mutual fund that invests in a foreign master fund",
        "A fund that charges performance fees",
        "A fund backed by the Government of India",
      ],
      correctIndex: 1,
      explanation: "A feeder fund is an Indian mutual fund whose primary purpose is to invest in a foreign (usually US or global) master fund — giving Indian investors indirect access to international markets.",
    },
  ],

  "cross-border-money-movement": [
    {
      question: "What hidden cost most significantly erodes returns when moving money internationally?",
      options: [
        "SWIFT message fees",
        "The forex conversion spread charged by banks",
        "RBI processing charges",
        "Brokerage account opening fees",
      ],
      correctIndex: 1,
      explanation: "Forex conversion spreads can cost 1–3% per transaction. On large remittances, this silently erodes returns before you've even invested the money.",
    },
    {
      question: "Under LRS, which of these is NOT a permitted purpose for remittance?",
      options: [
        "Investing in foreign equity",
        "Funding a foreign education",
        "Transferring money to fund a foreign business you own",
        "Purchasing foreign real estate for commercial leasing without RBI approval",
      ],
      correctIndex: 3,
      explanation: "While LRS permits several categories, commercial real estate acquisitions overseas typically require RBI approval beyond standard LRS provisions. Always verify with a FEMA consultant for edge cases.",
    },
    {
      question: "TCS (Tax Collected at Source) on LRS remittances is:",
      options: [
        "A final tax — you cannot claim it back",
        "Collectable at source but creditable against your income tax liability",
        "Charged only on remittances above $500,000",
        "Applicable only to educational remittances",
      ],
      correctIndex: 1,
      explanation: "TCS on LRS is not a final tax. It's collected at source by the bank and can be credited against your total income tax liability or claimed as a refund when filing your ITR.",
    },
    {
      question: "What is the most reliable way to get a better forex conversion rate than your bank's standard rate?",
      options: [
        "Convert on Sundays when banks are closed",
        "Use a dedicated money transfer platform and compare rates in real-time",
        "Ask your relationship manager nicely",
        "Convert in cash at the airport",
      ],
      correctIndex: 1,
      explanation: "Platforms like Wise, Instarem, or bank forex desks often offer tighter spreads than retail banking rates. Always compare in real-time before executing a large remittance.",
    },
  ],

  "understanding-us-stocks": [
    {
      question: "The S&P 500 index tracks:",
      options: [
        "The 500 largest companies listed on the NYSE only",
        "500 leading publicly traded US companies selected by a committee",
        "The top 500 global companies by market cap",
        "All US companies with revenue above $1 billion",
      ],
      correctIndex: 1,
      explanation: "The S&P 500 is a committee-selected index of 500 leading US publicly traded companies across all major industries. It includes NYSE and Nasdaq listed companies.",
    },
    {
      question: "A company's 10-K filing is best described as:",
      options: [
        "A quarterly earnings summary",
        "A press release about a major corporate event",
        "A comprehensive annual report filed with the SEC",
        "An analyst report published by Wall Street banks",
      ],
      correctIndex: 2,
      explanation: "The 10-K is a comprehensive annual report that US public companies must file with the SEC. It includes audited financials, business description, risk factors, and management's discussion — far more detailed than an Indian annual report.",
    },
    {
      question: "What does expense ratio represent in the context of an ETF?",
      options: [
        "The fee charged per trade execution",
        "The annual cost of fund management as a percentage of assets",
        "The fund's tracking error vs its benchmark",
        "The ratio of US stocks to international stocks",
      ],
      correctIndex: 1,
      explanation: "Expense ratio is the annual management fee charged by an ETF, expressed as a percentage of your investment. For index ETFs, this is typically 0.03–0.20% — far lower than actively managed funds.",
    },
    {
      question: "When the S&P 500 is described as 'top-heavy with tech,' it means:",
      options: [
        "The index has too many technology companies listed",
        "A small number of large tech companies represent a disproportionate share of the index's weight",
        "Tech stocks in the S&P 500 are overpriced",
        "The index committee has set a tech sector cap",
      ],
      correctIndex: 1,
      explanation: "Because the S&P 500 is market-cap weighted, companies like Apple, Microsoft, and Nvidia each represent 5–7% of the entire index. This concentration means your 'diversified' S&P 500 investment has significant tech exposure.",
    },
    {
      question: "An 8-K filing is submitted when:",
      options: [
        "A company files its annual report",
        "A company reports quarterly earnings",
        "A material corporate event occurs that investors should know about immediately",
        "A new CFO updates their financial projections",
      ],
      correctIndex: 2,
      explanation: "8-K filings are triggered by material events — CEO changes, acquisitions, earnings misses, legal proceedings. They must be filed within 4 business days of the triggering event.",
    },
  ],

  "tax-compliance-global-investors": [
    {
      question: "What does DTAA stand for, and what is its primary purpose?",
      options: [
        "Direct Tax Avoidance Agreement — to legally minimize taxes",
        "Double Taxation Avoidance Agreement — to prevent the same income from being taxed in two countries",
        "Domestic Tax Adjustment Act — for Indian resident investors only",
        "Deferred Tax Accounting Agreement — for corporate entities",
      ],
      correctIndex: 1,
      explanation: "DTAA (Double Taxation Avoidance Agreement) is a treaty between two countries ensuring the same income isn't taxed twice. India has DTAAs with the US, UK, Singapore, and 90+ other countries.",
    },
    {
      question: "Schedule FA in your Indian ITR is used to:",
      options: [
        "Claim foreign tax credits",
        "Report foreign assets held at any point during the financial year",
        "Declare income from foreign employment",
        "Calculate capital gains on international ETFs",
      ],
      correctIndex: 1,
      explanation: "Schedule FA (Foreign Assets) is a mandatory disclosure in the Indian ITR for residents holding any foreign financial asset — stocks, accounts, ETFs — at any point during the year. Non-disclosure can attract significant penalties.",
    },
    {
      question: "What is the PFIC trap that Indian investors in US mutual funds must be aware of?",
      options: [
        "US mutual funds charge higher fees to foreign investors",
        "US mutual funds are classified as Passive Foreign Investment Companies under US tax law, creating punitive tax treatment for US tax purposes",
        "Indian investors cannot repatriate gains from US mutual funds",
        "US mutual funds don't disclose their holdings to Indian tax authorities",
      ],
      correctIndex: 1,
      explanation: "PFIC (Passive Foreign Investment Company) rules under US tax code apply to foreign investors in US-registered mutual funds. For Indian investors, this mainly matters if you hold a US visa or Green Card — but it's worth understanding the exposure.",
    },
    {
      question: "Withholding tax on US dividends for Indian residents is typically:",
      options: ["0%", "10%", "25%", "30%"],
      correctIndex: 2,
      explanation: "The US withholds 25% tax on dividends paid to Indian residents (under the India-US DTAA). You can claim credit for this 25% against your Indian tax liability when filing your ITR.",
    },
    {
      question: "Under FEMA, an Indian resident's overseas investment obligation is primarily:",
      options: [
        "To repatriate all foreign investment income within 30 days",
        "To obtain RBI permission before each overseas investment",
        "To comply with LRS limits and report overseas assets in their annual ITR",
        "To maintain a minimum bank balance in India equivalent to overseas investments",
      ],
      correctIndex: 2,
      explanation: "For most Indian resident investors, FEMA compliance means staying within LRS limits for remittances and accurately disclosing foreign assets and income in the annual ITR. No per-investment RBI permission is needed under LRS.",
    },
  ],
};
