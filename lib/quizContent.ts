export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

/**
 * Quiz questions per module slug.
 * Questions are assigned by the lesson's 0-based global position within the module
 * (currentIndex), NOT by position within a chapter — so each lesson shows a unique question.
 *
 * Lesson mapping (0-based index → question):
 *
 * why-invest-beyond-india (5 lessons):
 *   0: Ch1/L1 "More than just different stocks"
 *   1: Ch1/L2 "The correlation that hides in plain sight"
 *   2: Ch2/L1 "Why borders matter in your portfolio"
 *   3: Ch3/L1 "What India doesn't give you"
 *   4: Ch4/L1 "Your portfolio has a currency — do you know which one?"
 *
 * accessing-global-markets (7 lessons):
 *   0: Ch1/L1 "The system that tracks money leaving the country"
 *   1: Ch2/L1 "LRS in plain English"
 *   2: Ch3/L1 "How far does the limit actually stretch?"
 *   3: Ch4/L1 "Three ways to reach international markets"
 *   4: Ch5/L1 "The platforms worth your attention"
 *   5: Ch6/L1 "Getting your paperwork in order"
 *   6: Ch7/L1 "From bank account to brokerage — step by step"
 *
 * cross-border-money-movement (4 lessons):
 *   0: Ch1/L1 "SWIFT, correspondent banks..."
 *   1: Ch2/L1 "TCS explained"
 *   2: Ch3/L1 "Where your money goes before it goes anywhere"
 *   3: Ch4/L1 "When to send — and when to wait"
 *
 * understanding-us-stocks (5 lessons):
 *   0: Ch1/L1 "Shareholder rights across borders"
 *   1: Ch2/L1 "Two exchanges, thousands of stocks"
 *   2: Ch3/L1 "The index everyone references..."
 *   3: Ch4/L1 "Why most investors should start with ETFs"
 *   4: Ch5/L1 "What you actually keep after costs and tax"
 *
 * tax-compliance-global-investors (5 lessons):
 *   0: Ch1/L1 "The Indian tax treatment of foreign income"
 *   1: Ch2/L1 "Getting credit for what you already paid abroad"
 *   2: Ch3/L1 "The trap most investors don't see coming"
 *   3: Ch4/L1 "The foreign assets disclosure you cannot skip"
 *   4: Ch5/L1 "Turning losses into a tax planning tool"
 */
export const QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {

  // ── Module 1: Why Invest Beyond India (5 lessons) ─────────
  "why-invest-beyond-india": [
    {
      // Lesson 0 — "More than just different stocks"
      question: "Owning 10 Indian stocks instead of 1 is NOT genuine diversification because:",
      options: [
        "Indian stocks are too expensive to diversify properly",
        "All 10 are exposed to the same economy, currency, and regulatory environment",
        "SEBI limits individual stock holdings to 5",
        "Returns in India are lower than global markets",
      ],
      correctIndex: 1,
      explanation: "True diversification requires exposure to different economic cycles and currencies. Owning 10 NSE-listed stocks in rupees still leaves you 100% exposed to India's economy — you've only added tickers, not genuine risk separation.",
    },
    {
      // Lesson 1 — "The correlation that hides in plain sight"
      question: "What does a correlation of +0.90 between two assets indicate?",
      options: [
        "They are both highly profitable investments",
        "They move almost identically — providing little diversification benefit",
        "One asset returns 90% of what the other does",
        "They are positively correlated only in bull markets",
      ],
      correctIndex: 1,
      explanation: "A correlation close to +1 means the two assets rise and fall together. Adding a second Indian equity fund to your portfolio when correlation is 0.90 barely reduces risk — you're paying two expense ratios for one effective exposure.",
    },
    {
      // Lesson 2 — "Why borders matter in your portfolio"
      question: "Geographic diversification works primarily because different economies:",
      options: [
        "Always have opposite stock market movements",
        "Have different growth drivers, currencies, and business cycles",
        "Are required by FEMA to be represented in every portfolio",
        "Offer higher returns than domestic markets",
      ],
      correctIndex: 1,
      explanation: "Economies run on different fuel cycles — the US on consumer spending and tech, Europe on industrial exports, emerging markets on commodities. When India slows, the US tech sector may continue compounding. Geographic spread captures this independence.",
    },
    {
      // Lesson 3 — "What India doesn't give you"
      question: "Which sector is significantly under-represented in India's listed markets compared to global ones?",
      options: [
        "Financial services and banking",
        "FMCG and consumer staples",
        "Semiconductors, AI hardware, and biotech",
        "Infrastructure and construction",
      ],
      correctIndex: 2,
      explanation: "India's listed universe excels in financials, IT services, FMCG, and infrastructure. But companies like Nvidia (AI chips), ASML (lithography), and Novo Nordisk (GLP-1 drugs) are only accessible through global markets — you cannot own them via NSE.",
    },
    {
      // Lesson 4 — "Your portfolio has a currency — do you know which one?"
      question: "How has the Indian rupee trended against the US dollar over the long term?",
      options: [
        "It has remained broadly stable around ₹50 per dollar",
        "It has appreciated steadily as India's economy grew",
        "It has gradually depreciated — from ~₹45 in 2000 to over ₹83 today",
        "It has been pegged to the dollar since 2010",
      ],
      correctIndex: 2,
      explanation: "The rupee has structurally depreciated against the dollar over decades. This means dollar-denominated US investments gain an additional tailwind in rupee terms — even if the underlying asset price doesn't change.",
    },
  ],

  // ── Module 2: Accessing Global Markets (7 lessons) ────────
  "accessing-global-markets": [
    {
      // Lesson 0 — "The system that tracks money leaving the country"
      question: "The Liberalised Remittance Scheme (LRS) was designed to:",
      options: [
        "Restrict Indians from investing abroad by taxing every remittance",
        "Provide a transparent, legal framework for Indian residents to send money overseas",
        "Replace the SWIFT system for cross-border transfers",
        "Allow only NRIs to invest in foreign markets",
      ],
      correctIndex: 1,
      explanation: "LRS is the RBI's framework that allows Indian residents to remit up to $250,000 per financial year for permitted purposes — including overseas investment. It legitimises and tracks cross-border money movement without requiring per-transaction RBI approval.",
    },
    {
      // Lesson 1 — "LRS in plain English"
      question: "The $250,000 LRS limit applies:",
      options: [
        "Per purpose category — so you can remit $250K for investments AND another $250K for education",
        "As a single aggregate limit across ALL LRS purposes combined per financial year",
        "Per transaction — you can do multiple transactions of $250K each",
        "Only to investments in the US; other countries have separate limits",
      ],
      correctIndex: 1,
      explanation: "The LRS limit is one aggregate ceiling — not per-purpose. If you remit $100K for education, only $150K remains for investments that year. The limit resets every April 1st.",
    },
    {
      // Lesson 2 — "How far does the limit actually stretch?"
      question: "TCS (Tax Collected at Source) on LRS remittances above ₹7 lakhs is best described as:",
      options: [
        "A permanent additional tax that increases your total tax liability",
        "A penalty for remitting more than the allowed limit",
        "An advance collection that you can credit against your income tax or claim as a refund",
        "A charge only applicable to educational remittances",
      ],
      correctIndex: 2,
      explanation: "TCS is not a final or extra tax — it's collected at source by your bank and credited to your PAN. When you file your ITR, this TCS is offset against your income tax liability. Any excess is refunded. The main burden is the short-term cash flow drag.",
    },
    {
      // Lesson 3 — "Three ways to reach international markets"
      question: "Which route gives an Indian investor the most direct ownership and lowest transaction cost for US stocks?",
      options: [
        "Buying an India-domiciled international mutual fund",
        "Opening an account directly with a foreign broker like Interactive Brokers",
        "Using an Indian platform like INDmoney or Vested",
        "Buying global ETFs listed on NSE",
      ],
      correctIndex: 1,
      explanation: "Direct foreign brokers give you actual ownership of US securities at near-zero commissions. Indian platforms add a convenience layer but at slightly higher cost. India-domiciled funds require no LRS but give you units, not direct share ownership.",
    },
    {
      // Lesson 4 — "The platforms worth your attention"
      question: "Interactive Brokers (IBKR) is particularly suitable for Indian investors who:",
      options: [
        "Are investing less than ₹1 lakh and want a simple mobile experience",
        "Need fractional shares and an INR-denominated interface",
        "Want institutional-grade access to global markets with low commissions and SIPC coverage",
        "Prefer to avoid the W-8BEN form entirely",
      ],
      correctIndex: 2,
      explanation: "IBKR offers direct access to 150+ markets, SIPC coverage up to $500K, and some of the lowest commission structures available. It suits investors who want full control and are comfortable with a more sophisticated platform.",
    },
    {
      // Lesson 5 — "Getting your paperwork in order"
      question: "The W-8BEN form, required by US brokers, is used to:",
      options: [
        "Prove your Indian citizenship to the RBI",
        "Authorise LRS remittances from your Indian bank",
        "Certify you are a non-US person, securing the reduced 25% dividend withholding rate under the India-US DTAA",
        "Register your brokerage account with SEBI",
      ],
      correctIndex: 2,
      explanation: "The W-8BEN certifies you're a non-US investor, entitling you to the India-US DTAA's 25% dividend withholding rate instead of the default 30%. It takes two minutes to fill and needs renewal every three years.",
    },
    {
      // Lesson 6 — "From bank account to brokerage — step by step"
      question: "When making your first LRS remittance to a foreign broker, what does your Indian bank primarily verify?",
      options: [
        "Whether the foreign broker is registered with SEBI",
        "That the purpose matches a permitted LRS category and that you haven't exceeded your annual limit",
        "The creditworthiness of the foreign brokerage firm",
        "That you have no existing investments in India",
      ],
      correctIndex: 1,
      explanation: "Your bank acts as the LRS gatekeeper — it confirms the purpose is permitted (e.g. overseas investment), checks your cumulative LRS usage, collects TCS if applicable, and files the remittance with RBI. It does not evaluate the broker's quality.",
    },
  ],

  // ── Module 3: Cross-Border Money Movement (4 lessons) ─────
  "cross-border-money-movement": [
    {
      // Lesson 0 — "SWIFT, correspondent banks, and why your money takes 3 days"
      question: "Why do international bank transfers typically take 2–5 business days to arrive?",
      options: [
        "RBI mandates a holding period for all overseas transfers",
        "Each transfer passes through a chain of correspondent banks, each with their own processing windows",
        "SWIFT encrypts messages slowly to ensure security",
        "Banks intentionally delay transfers to earn overnight interest",
      ],
      correctIndex: 1,
      explanation: "Most international transfers travel through correspondent banks — intermediaries that hold accounts with each other globally. Each hop in the chain adds processing time and potentially fees, explaining why a simple wire can take several days.",
    },
    {
      // Lesson 1 — "TCS explained: not a tax, but a prepayment"
      question: "TCS of 20% is levied on LRS remittances above ₹7 lakhs per year. This money is:",
      options: [
        "Lost permanently — it funds the government's foreign reserve pool",
        "Refundable only if your employer requests it",
        "Credited to your PAN and adjustable against your total income tax when you file your ITR",
        "Paid directly to the foreign country you are remitting to",
      ],
      correctIndex: 2,
      explanation: "TCS is a prepayment mechanism, not an extra tax. The collected amount is reflected against your PAN. When filing your ITR, it reduces your net tax payable. If your total tax liability is lower than the TCS collected, you get a refund.",
    },
    {
      // Lesson 2 — "Where your money goes before it goes anywhere"
      question: "The forex 'spread' charged during currency conversion refers to:",
      options: [
        "A fixed government levy on all currency exchanges",
        "The gap between the mid-market exchange rate and the rate your bank actually offers you",
        "The time delay between ordering and receiving foreign currency",
        "The minimum amount you must convert in a single transaction",
      ],
      correctIndex: 1,
      explanation: "The spread is the difference between the real (mid-market) rate and what your bank charges. A 1.5% spread on ₹20 lakhs costs ₹30,000 before you've even invested. Comparing rates across platforms before large remittances can meaningfully improve your net returns.",
    },
    {
      // Lesson 3 — "When to send — and when to wait"
      question: "When timing a large international remittance, which factor is most within an investor's control?",
      options: [
        "Predicting the USD/INR exchange rate movement accurately",
        "Avoiding the TCS altogether by splitting remittances across family members",
        "Comparing real-time forex rates across banks and transfer platforms before executing",
        "Timing the transfer to coincide with US Federal Reserve announcements",
      ],
      correctIndex: 2,
      explanation: "While you cannot predict exchange rate movements reliably, you can always compare rates across platforms in real-time. Even a 0.5% improvement on a ₹20 lakh remittance saves ₹10,000. This is the one lever fully in your hands.",
    },
  ],

  // ── Module 4: Understanding US Stocks (5 lessons) ─────────
  "understanding-us-stocks": [
    {
      // Lesson 0 — "Shareholder rights across borders"
      question: "As an Indian investor owning US stocks through a foreign broker, which right do you typically NOT automatically receive?",
      options: [
        "The right to receive dividends",
        "The right to vote at company AGMs on operational matters",
        "The right to sell your shares at any time during market hours",
        "The right to receive your proportional share of assets in a bankruptcy",
      ],
      correctIndex: 1,
      explanation: "While Indian investors do receive dividends and can trade freely, voting rights at US company AGMs are typically not passed through to investors who hold via custodian or feeder structures. Direct account holders at brokers like IBKR may receive proxy voting rights.",
    },
    {
      // Lesson 1 — "Two exchanges, thousands of stocks"
      question: "What is the primary difference between the NYSE and Nasdaq?",
      options: [
        "NYSE only lists US companies; Nasdaq lists global companies",
        "Nasdaq uses a dealer/market-maker model while NYSE originated as an auction-based exchange",
        "Only large-cap stocks trade on NYSE; Nasdaq is exclusively for small-caps",
        "NYSE operates 24 hours; Nasdaq has regular 9:30am–4pm hours only",
      ],
      correctIndex: 1,
      explanation: "NYSE started as an auction exchange (specialists matching buyers and sellers on a floor) while Nasdaq was born as an electronic dealer-based market. Today both are largely electronic, but their origin and listing requirements differ — Nasdaq tends to attract more tech-heavy listings.",
    },
    {
      // Lesson 2 — "The index everyone references but few understand deeply"
      question: "Because the S&P 500 is market-cap weighted, what is the practical implication for investors?",
      options: [
        "Each of the 500 companies contributes exactly 0.2% to the index",
        "A small number of giant companies (like Apple and Microsoft) represent a disproportionately large share of the index",
        "Smaller companies in the index are excluded from returns calculations",
        "The index automatically rebalances daily to maintain equal weights",
      ],
      correctIndex: 1,
      explanation: "Market-cap weighting means the biggest companies by market value dominate the index. Apple, Microsoft, Nvidia and a few others each represent 5–7% of the S&P 500, so your 'diversified' index fund actually has heavy exposure to a handful of US mega-cap tech names.",
    },
    {
      // Lesson 3 — "Why most investors should start with ETFs"
      question: "A broad market ETF like VOO (tracking the S&P 500) is preferred over individual stocks for a beginner because:",
      options: [
        "ETFs are guaranteed to deliver positive returns every year",
        "ETFs avoid all taxes on capital gains",
        "A single ETF purchase provides instant diversification across hundreds of companies at a low expense ratio",
        "ETFs have no currency risk for Indian investors",
      ],
      correctIndex: 2,
      explanation: "One ETF share gives you proportional exposure to all 500 companies in the S&P 500. Expense ratios for index ETFs like VOO are as low as 0.03%. This combination of instant diversification and minimal cost makes them ideal for investors building their first global allocation.",
    },
    {
      // Lesson 4 — "What you actually keep after costs and tax"
      question: "US dividends received by Indian investors are subject to a 25% withholding tax at source. You can:",
      options: [
        "Do nothing — it is a final tax and cannot be recovered",
        "Claim the 25% as a foreign tax credit against your Indian income tax liability when filing your ITR",
        "Receive a full refund from the IRS if you file a US tax return",
        "Avoid it by holding stocks through an Indian mutual fund",
      ],
      correctIndex: 1,
      explanation: "Under the India-US DTAA, the 25% US withholding tax is creditable against your Indian income tax. Include the foreign dividend income in your ITR and claim the credit for taxes paid abroad — so you're not taxed twice on the same income.",
    },
  ],

  // ── Module 5: Tax & Compliance for Global Investors (5 lessons)
  "tax-compliance-global-investors": [
    {
      // Lesson 0 — "The Indian tax treatment of foreign income"
      question: "How are capital gains from selling US stocks taxed for an Indian resident?",
      options: [
        "They are exempt as they were earned outside India",
        "They are taxed in the US only — India has no claim on foreign gains",
        "They are included in Indian taxable income and taxed per India's capital gains rules, with credit for foreign taxes paid",
        "They are taxed at a flat 10% regardless of holding period",
      ],
      correctIndex: 2,
      explanation: "Indian residents are taxed on their global income. Gains from US stocks are included in your Indian ITR. If taxes were paid abroad (e.g. US withholding on dividends), you can claim a DTAA-based foreign tax credit to avoid double taxation.",
    },
    {
      // Lesson 1 — "Getting credit for what you already paid abroad"
      question: "What is the purpose of the Double Taxation Avoidance Agreement (DTAA) between India and the US?",
      options: [
        "To allow Indian investors to completely avoid paying tax on US income",
        "To ensure the same income is not taxed in full in both India and the US",
        "To set a uniform tax rate of 15% for all cross-border investments",
        "To exempt dividend income from US withholding tax for Indian investors",
      ],
      correctIndex: 1,
      explanation: "The India-US DTAA prevents double taxation by allowing the tax paid in one country to be credited against the tax owed in the other. Indian investors pay 25% US withholding on dividends, then claim that as a credit in their Indian ITR.",
    },
    {
      // Lesson 2 — "The trap most investors don't see coming"
      question: "Why are US-domiciled mutual funds (like a Vanguard fund registered in the US) problematic for Indian investors?",
      options: [
        "They charge higher management fees to foreign investors",
        "They cannot be redeemed from India",
        "They are classified as PFICs under US tax law, potentially creating complex punitive tax issues for investors with US tax obligations",
        "They are banned under FEMA for Indian residents",
      ],
      correctIndex: 2,
      explanation: "PFIC (Passive Foreign Investment Company) rules under the US tax code can create punitive tax treatment for US taxpayers holding foreign funds. While this mainly affects those with US visas or Green Cards, it's important to understand before investing in US-registered funds.",
    },
    {
      // Lesson 3 — "The foreign assets disclosure you cannot skip"
      question: "Schedule FA in your Indian Income Tax Return must be filed if you:",
      options: [
        "Earned more than ₹10 lakhs from foreign investments in the financial year",
        "Held any foreign financial asset (stocks, accounts, ETFs) at any point during the financial year",
        "Remitted more than $50,000 under LRS during the year",
        "Have a foreign bank account with a balance above $10,000",
      ],
      correctIndex: 1,
      explanation: "Schedule FA (Foreign Assets) disclosure is mandatory for any Indian resident who held foreign financial assets at any point during the financial year — regardless of the amount. Non-disclosure attracts penalties up to ₹10 lakh under the Black Money Act.",
    },
    {
      // Lesson 4 — "Turning losses into a tax planning tool"
      question: "Tax-loss harvesting in a global portfolio means:",
      options: [
        "Selling losing investments to permanently reduce your tax liability to zero",
        "Moving all investments to tax-haven countries",
        "Strategically selling positions at a loss to offset capital gains and reduce your net taxable income",
        "Deferring tax payments on gains until you repatriate money to India",
      ],
      correctIndex: 2,
      explanation: "Tax-loss harvesting involves selling an underperforming position to book a capital loss, which can offset capital gains elsewhere in your portfolio. Across geographies, losses in US stocks can offset gains from Indian equity sales, reducing your overall tax bill.",
    },
  ],
};
