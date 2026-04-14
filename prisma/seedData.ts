// ─── Full lesson content for featured lessons ────────────

const M1_C1_L1 = `Ask most people what diversification means and they'll say: "don't put all your eggs in one basket." Fair enough. But when you press further, most Indian investors interpret this as owning fifteen stocks instead of two or three. That feels more diversified. In a narrow sense, it is.

The problem: if all fifteen stocks are Indian companies, listed on the NSE or BSE, priced in rupees, and subject to the same RBI monetary policy, the same SEBI regulations, and the same election cycle — they are not as uncorrelated as you think. In a genuine market crisis, like March 2020 or the 2008 meltdown, every one of those fifteen stocks will fall. Some more than others, but all in the same direction.

> True diversification isn't about the number of stocks you own. It's about owning assets that don't react to the same triggers at the same time.

This is the concept of **correlation**. Two assets are highly correlated if they tend to move together. Indian equities, as a group, are highly correlated — they share the same macroeconomic environment. When the rupee weakens, when oil prices spike, when domestic interest rates climb, they all feel it.

Now compare that to adding a US technology company to your portfolio. Its performance is driven by different inputs: Fed rate decisions, US consumer spending, global software demand. Or a European pharmaceutical firm, shaped by clinical trial results, EU regulatory approvals, and the euro exchange rate. These assets move to different rhythms.

The goal isn't to find assets that always rise while your Indian stocks fall — that doesn't exist. The goal is to own assets that don't all fall at the same moment, for the same reason. When one part of your portfolio absorbs a shock, another part holds steady — or even rises.

This is what true diversification gives you: resilience built into the structure of your portfolio, not just its size.`;

const M2_C1_L1 = `When you tell someone you're sending money abroad to invest, you often get a raised eyebrow. Isn't that restricted? Can you actually do that? Won't the government come after you?

The short answer: no, no, and no. India has a well-designed, entirely legal framework for this. It's called the **Liberalised Remittance Scheme**, or \`LRS\`. The Reserve Bank of India created it specifically to make cross-border money movement for residents straightforward — not an obstacle course.

> The LRS isn't a loophole. It's the official, documented path. Using it correctly isn't just legal — it's exactly how the system is designed to work.

Here's how to think about it: every country tracks money crossing its borders. This is normal, not suspicious. The \`LRS\` is the mechanism through which that tracking happens for Indian individuals. When you send money abroad through your bank, the bank files LRS documentation on your behalf. You don't fill forms at customs or apply for special permission. The bank handles the compliance infrastructure.

What LRS establishes is a limit — currently **$250,000 per individual per financial year**. This covers everything: travel money, overseas education fees, gifts to family abroad, and investments in foreign stocks, ETFs, bonds, and real estate. The limit resets every April 1st.

For most investors putting ₹5–25 lakhs abroad per year, this ceiling is nowhere close to a constraint. Even ₹25 lakhs is roughly $30,000 at current exchange rates. You would need to remit very aggressively, consistently, for years, before the $250,000 limit becomes relevant.

One thing worth knowing upfront: **TCS** (Tax Collected at Source) applies to LRS remittances above ₹7 lakhs in a financial year. This is not a permanent extra tax — it's a pre-collection mechanism credited against your income tax liability when you file your ITR. We'll cover this in detail later. For now: the framework exists, it's robust, and it's designed to be used by exactly the kind of investor you're becoming.`;

// ─── Short lesson content helpers ────────────────────────

const shortLesson = (topic: string, para1: string, para2: string) =>
  `${para1}\n\n${para2}`;

// ─── Seed data structure ──────────────────────────────────

export interface LessonDef {
  title: string;
  content: string;
  readTime: number;
  order: number;
}

export interface ChapterDef {
  title: string;
  order: number;
  lessons: LessonDef[];
}

export interface ModuleDef {
  slug: string;
  title: string;
  description: string;
  outcomes: string[];
  level: string;
  chapters: number;
  duration: string;
  order: number;
  chapterData: ChapterDef[];
}

export const SEED_MODULES: ModuleDef[] = [
  // ── Module 1 ─────────────────────────────────────────────
  {
    slug: "why-invest-beyond-india",
    title: "Why Invest Beyond India",
    description:
      "India's equity markets have grown enormously over the past decade, and Nifty returns have been genuinely impressive. But there's a subtle trap in that success: it makes it easy to believe that India is enough. This module challenges that assumption — not by being pessimistic about India, but by being honest about what any single market can and cannot give you.\n\nWe start with the mechanics of diversification — what it actually means beyond the cliché of 'don't put all your eggs in one basket.' You'll learn why owning fifteen Indian stocks is not the same as being diversified, and why the correlation between those stocks matters far more than how many you hold. From there, we move into geography: why access to different economies, different currencies, and different business cycles changes the risk profile of your entire portfolio.\n\nBy the end, you'll have a clear framework for thinking about global exposure — not as a speculative bet, but as a structural decision about how your wealth is built. This isn't theory. It's the foundation everything else in this atlas rests on.",
    outcomes: [
      "Explain why geographic concentration is a hidden portfolio risk",
      "Understand the concept of correlation and why it drives true diversification",
      "Articulate the case for international investing to family or advisors",
      "Identify the key asset classes available outside Indian markets",
      "Understand how currency exposure works inside international holdings",
    ],
    level: "Beginner",
    chapters: 4,
    duration: "31 min",
    order: 1,
    chapterData: [
      {
        title: "What diversification really means",
        order: 1,
        lessons: [
          { title: "More than just different stocks", content: M1_C1_L1, readTime: 4, order: 1 },
          {
            title: "The correlation that hides in plain sight",
            content: shortLesson(
              "correlation",
              "Correlation is a number between -1 and +1 that describes how two assets move relative to each other. A correlation of +1 means they move in lockstep. A correlation of -1 means when one rises, the other falls. Most Indian equity funds have a correlation above 0.85 with each other — meaning they behave almost identically in a downturn.",
              "The practical implication: adding a second Indian mutual fund to your portfolio adds very little diversification. You're paying two expense ratios for one effective exposure. True diversification requires finding assets with lower correlations — and the most reliable way to achieve this is geographic separation. Different economies, different currencies, different growth drivers."
            ),
            readTime: 2,
            order: 2,
          },
        ],
      },
      {
        title: "Geographic diversification as a portfolio concept",
        order: 2,
        lessons: [
          {
            title: "Why borders matter in your portfolio",
            content: shortLesson(
              "geo-div",
              "Think of the world's economies as engines running on different fuel cycles. The US economy runs on consumer spending and technology investment. The European economy runs on industrial exports and services. Emerging markets run on commodities and manufacturing. When oil prices spike, they don't hurt all of these equally — some economies benefit, others suffer.",
              "This is the fundamental logic of geographic diversification: you're not just buying different companies, you're buying exposure to different economic machines. When India's economy slows — whether because of a drought, a political transition, or a global risk-off event — the US technology sector may continue compounding. Your portfolio feels the Indian slowdown less because it doesn't depend entirely on Indian growth."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
      {
        title: "Access to innovative themes beyond Indian markets",
        order: 3,
        lessons: [
          {
            title: "What India doesn't give you",
            content: shortLesson(
              "innovation",
              "Nvidia, the world's most valuable semiconductor company, is not listed in India. Neither is Amazon, Novo Nordisk (the weight-loss drug giant), ASML (the only company that makes extreme ultraviolet lithography machines), or Tesla. The world's most important companies across AI, biotech, defence technology, and energy transition are primarily listed on US and European exchanges.",
              "This is not a critique of Indian markets — it's a structural fact. India's listed universe is excellent for financial services, IT services, FMCG, and infrastructure. But if you want exposure to AI chips, GLP-1 drugs, next-generation defence systems, or space technology, you need to go outside India. Limiting yourself to the NSE means opting out of some of the most significant wealth-creation themes of the next decade."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
      {
        title: "Currency diversification is essential",
        order: 4,
        lessons: [
          {
            title: "Your portfolio has a currency — do you know which one?",
            content: shortLesson(
              "currency",
              "Every investor has a home currency. For most Indian investors, that's the rupee. And the rupee, over the long term, has depreciated against the US dollar. In 2000, one dollar bought roughly 45 rupees. Today it buys over 83. That's not a crisis — it's a slow, structural drift. But it means that if all your wealth is in rupees, you're holding a currency that gradually loses purchasing power against the world's reserve currency.",
              "When you invest in US stocks, you automatically gain dollar exposure. If the rupee falls 5% against the dollar in a year, your US investment is worth 5% more in rupee terms — even if the underlying stock didn't move. This currency effect can be a meaningful tailwind over a decade. It's not the primary reason to invest globally, but it's a real additional benefit that Indian investors often overlook."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
    ],
  },

  // ── Module 2 ─────────────────────────────────────────────
  {
    slug: "accessing-global-markets",
    title: "Accessing Global Markets",
    description:
      "Wanting to invest globally is one thing. Actually doing it, as an Indian resident, requires navigating a specific set of regulations, platforms, and structural choices. The good news: the framework is clearer than most people think, and the options are more accessible than ever. This module is your practical guide through all of it.\n\nWe start with the regulatory foundation — the Liberalised Remittance Scheme (LRS), how it works, and what it permits. From there, we walk through the actual access paths: direct investment through foreign brokers like Interactive Brokers, Indian platforms with international desks like Vested or INDmoney, and the indirect route through international mutual funds and ETFs domiciled in India. Each path has different trade-offs in cost, liquidity, tax treatment, and compliance overhead.\n\nBy the end of this module, you'll be able to open an international account, fund it legally, and execute your first trade with confidence — not guesswork. We've spoken to investors at every stage of this journey. The biggest barrier is always the unknown. This module removes it.",
    outcomes: [
      "Compare direct and indirect routes for investing in global markets from India",
      "Understand LRS: what it allows, its limits, and how banks process it",
      "Evaluate foreign brokerages across cost, security, and usability",
      "Open and fund an international brokerage account correctly",
      "Navigate KYC and documentation requirements for cross-border accounts",
      "Execute a basic international equity order with the right order type",
    ],
    level: "Beginner",
    chapters: 7,
    duration: "1.8 hrs",
    order: 2,
    chapterData: [
      {
        title: "The regulatory foundation for investing abroad",
        order: 1,
        lessons: [
          { title: "The system that tracks money leaving the country", content: M2_C1_L1, readTime: 4, order: 1 },
        ],
      },
      {
        title: "What is LRS and how does it work",
        order: 2,
        lessons: [
          {
            title: "LRS in plain English",
            content: shortLesson(
              "lrs",
              "The LRS has three moving parts worth understanding. First: the limit. $250,000 per individual per financial year, across all LRS purposes combined. Second: the permitted categories. Investment in foreign equities, bonds, ETFs, and real estate all qualify. So does overseas travel, education, and maintenance of close relatives abroad. Third: the bank's role. Your bank is the gatekeeper. They verify your purpose, collect the TCS where applicable, and file the LRS return with the RBI.",
              "One common misconception: the LRS limit is per purpose. It's not — it's a single aggregate limit. If you send $100,000 for your child's education, you have $150,000 left for investments that year. Another misconception: the limit resets monthly. It resets annually, on April 1st. Plan your remittances accordingly if you expect to approach the ceiling."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
      {
        title: "The $250,000 annual limit explained",
        order: 3,
        lessons: [
          {
            title: "How far does the limit actually stretch?",
            content: shortLesson(
              "limit",
              "At today's exchange rates, $250,000 is approximately ₹2.1 crore. For most Indian investors — even affluent ones — this is far more than they would move in a year. The practical constraint for most people isn't the $250,000 ceiling. It's the TCS threshold at ₹7 lakhs, which triggers a 20% tax collection at source on the excess. This TCS isn't a lost cost — you get it back as a credit against your income tax — but it creates a short-term cash flow drag.",
              "If you're investing ₹5–20 lakhs abroad per year, you'll hit the TCS threshold but stay well within the LRS limit. The smart move: plan your remittances to minimise the TCS impact relative to your expected tax refund timeline. Some investors prefer to remit in tranches across two financial years to stay under the ₹7 lakh threshold — though this only makes sense if you're investing amounts near that boundary."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
      {
        title: "Which route should you use: broker vs platform",
        order: 4,
        lessons: [
          {
            title: "Three ways to reach international markets",
            content: shortLesson(
              "routes",
              "There are three main routes for Indian investors. Route 1: Direct foreign broker. You open an account with a firm like Interactive Brokers or Schwab International, remit money via LRS, and trade directly on US markets. You get full control, the lowest transaction costs, and direct ownership of securities. The trade-off: more documentation, direct responsibility for tax compliance, and a slightly steeper learning curve.",
              "Route 2: Indian platform with international desk. Apps like Vested, INDmoney, or Groww's international offering let you invest in US stocks from within an Indian interface. They handle the LRS remittance infrastructure and simplify the experience. Trade-off: slightly higher costs and indirect ownership through a custodian structure. Route 3: International mutual funds in India. Fund houses like Motilal Oswal, Mirae, and Franklin offer India-domiciled funds that invest in global indices. No LRS needed, no foreign account — but returns are in rupees and post-2023 tax rules treat gains as debt fund gains."
            ),
            readTime: 3,
            order: 1,
          },
        ],
      },
      {
        title: "Comparing your options: ViewTrade, IBKR, and others",
        order: 5,
        lessons: [
          {
            title: "The platforms worth your attention",
            content: shortLesson(
              "platforms",
              "Interactive Brokers (IBKR) is the institutional-grade choice. Low commissions, direct market access, SIPC coverage up to $500,000, and access to equities, ETFs, options, and bonds across 150+ markets. The onboarding is thorough but manageable. For investors who want full control and are comfortable with a desktop-oriented interface, IBKR is hard to beat. The minimum account balance to avoid inactivity fees has been removed — making it accessible even for smaller starting balances.",
              "Vested and INDmoney are the friendliest for Indian investors new to international markets. Both offer fractional shares (so you can buy $50 of Amazon without needing the full share price), INR-denominated interfaces, and integrated LRS remittance flows. Costs are slightly higher than direct brokers. Custody is typically through DriveWealth (Vested) or similar US-registered custodians. For most beginners, starting here and migrating to IBKR later as portfolio size grows is a reasonable path."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
      {
        title: "KYC and onboarding for global accounts",
        order: 6,
        lessons: [
          {
            title: "Getting your paperwork in order",
            content: shortLesson(
              "kyc",
              "Opening a foreign brokerage account requires roughly the same documents as opening a domestic demat account — with a few additions. Standard requirements: valid passport (primary ID for international accounts), PAN card (Indian tax identification), recent bank statement (3–6 months, showing your address and account activity), and a selfie or video KYC step. Some brokers also request a utility bill or Aadhaar as secondary address proof.",
              "The W-8BEN form is specific to US brokers. It's a one-page IRS form that certifies you are a non-US person, entitling you to the reduced 25% dividend withholding rate under the India-US DTAA (versus the default 30%). Every US broker will ask you to fill this — it takes two minutes and saves you 5% on every dividend received. Keep a copy; it typically needs to be renewed every 3 years."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
      {
        title: "Making your first international transfer",
        order: 7,
        lessons: [
          {
            title: "From bank account to brokerage — step by step",
            content: shortLesson(
              "transfer",
              "The mechanics of funding a foreign brokerage account are simpler than most people expect. You initiate a wire transfer from your Indian bank account to your foreign brokerage's designated bank account. Your Indian bank will ask for the purpose (investment under LRS), the recipient's bank details (provided by your broker), and will collect TCS if applicable. SWIFT transfers typically take 2–5 business days to settle.",
              "Key things to get right: use the exact beneficiary name and account number your broker specifies (errors cause costly return wires). Specify the currency correctly — most US brokers want USD, not INR. Keep the bank's transaction receipt; you'll need it for your ITR Schedule FA disclosure. For your first transfer, doing a small test amount (say ₹50,000) before moving larger sums is sensible risk management."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
    ],
  },

  // ── Module 3 ─────────────────────────────────────────────
  {
    slug: "cross-border-money-movement",
    title: "Cross-Border Money Movement",
    description:
      "The moment you decide to invest internationally, you face a constraint most people underestimate: moving money across borders is slow, expensive, and full of hidden friction. Wire transfer fees, forex conversion spreads, correspondent bank charges — they quietly erode returns before you've bought a single share. This module exists so you understand exactly what happens to your money between your Indian bank and your foreign brokerage.\n\nWe start with the mechanics: SWIFT, correspondent banks, and why a ₹10 lakh wire can shrink by ₹15,000–25,000 in fees and conversion costs before it arrives. From there, we move into TCS — what it is, when it applies, how to credit it, and how to plan around it. Then we cover forex: how rates are set, where banks make their margin, and how to get meaningfully better rates with simple comparison tools.\n\nBy the end, you'll approach every international transfer as a deliberate act — not a black box you hand off to your bank relationship manager and hope for the best.",
    outcomes: [
      "Understand SWIFT, correspondent banks, and why transfers take 2–5 days",
      "Calculate TCS liability on LRS remittances and plan credit recovery",
      "Compare forex rates across banks and money transfer platforms",
      "Execute transfers with minimised conversion costs",
      "Maintain compliant records for both FEMA and Income Tax Act purposes",
    ],
    level: "Beginner",
    chapters: 4,
    duration: "40 min",
    order: 3,
    chapterData: [
      {
        title: "How money actually moves across borders",
        order: 1,
        lessons: [
          {
            title: "SWIFT, correspondent banks, and why your money takes 3 days",
            content: shortLesson(
              "swift",
              "When you send a wire transfer internationally, your money doesn't actually travel. What travels is a message — a SWIFT message — between banks. SWIFT (Society for Worldwide Interbank Financial Telecommunication) is the messaging network that banks use to instruct each other to move funds. Your Indian bank sends a message to its correspondent bank in the US, which sends a message to your broker's bank, which credits your brokerage account.",
              "The reason transfers take 2–5 business days: each bank in this chain processes the message in batch cycles, performs AML (anti-money laundering) checks, and may hold funds overnight. Each intermediary bank also takes a small cut — typically $10–30 — which is why the amount that arrives is often slightly less than what you sent. Understanding this helps you account for transfer costs accurately when planning remittances."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
      {
        title: "TCS on LRS remittances — what you owe",
        order: 2,
        lessons: [
          {
            title: "TCS explained: not a tax, but a prepayment",
            content: shortLesson(
              "tcs",
              "Tax Collected at Source (TCS) on LRS remittances was expanded in 2023. The current rule: for remittances above ₹7 lakhs in a financial year (across all LRS purposes), your bank collects 20% TCS on the amount exceeding ₹7 lakhs. So if you remit ₹20 lakhs in a year, TCS applies to ₹13 lakhs — that's ₹2.6 lakhs collected upfront by your bank and deposited with the Income Tax Department on your behalf.",
              "The critical thing to understand: TCS is not a final tax. It's a prepayment of income tax. When you file your ITR, TCS paid is credited against your total tax liability. If your marginal tax rate is 30% and TCS collected was ₹2.6 lakhs, that ₹2.6 lakhs reduces what you owe — or generates a refund if you've overpaid. The practical implication: TCS creates a temporary cash flow drag, not a permanent cost."
            ),
            readTime: 3,
            order: 1,
          },
        ],
      },
      {
        title: "Currency conversion costs and how to minimize them",
        order: 3,
        lessons: [
          {
            title: "Where your money goes before it goes anywhere",
            content: shortLesson(
              "forex",
              "When your Indian bank converts rupees to dollars for your LRS wire, it does so at a rate it sets — not the interbank 'mid-market' rate you see on Google or XE.com. The bank keeps the spread between what it pays to acquire dollars and what it charges you. This spread typically ranges from 0.5% to 2.5% depending on the bank, the amount, and your relationship with the bank. On ₹20 lakhs, a 1.5% spread is ₹30,000 gone before your money leaves India.",
              "The practical solution: compare rates before sending. Your own bank's forex desk, a competing bank, and a dedicated money transfer platform like Wise (Transferwise) or Instarem can give you sharply different rates on the same day. On larger remittances, even a 0.5% improvement is meaningful. Always check the all-in cost — some platforms advertise low conversion rates but charge fixed fees that make them expensive on smaller amounts."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
      {
        title: "Timing your remittances strategically",
        order: 4,
        lessons: [
          {
            title: "When to send — and when to wait",
            content: shortLesson(
              "timing",
              "The rupee's exchange rate against the dollar fluctuates daily. A 1–2% move in the INR/USD rate over a month is completely normal. For large remittances, this movement matters. If you're sending ₹50 lakhs and the rate moves 2% in your favour, that's ₹1 lakh in additional dollars received. This is not a reason to try to time the forex market — that's a fool's errand. But it is a reason to be aware of the rate environment.",
              "Two practical strategies: first, use rate alerts (Google Finance, XE, or your money transfer app) to notify you when the rate crosses a threshold you're comfortable with. Second, split large remittances across 2–4 transfers over a few months — this averages out your conversion rate and reduces the risk of converting everything at the worst possible moment. Neither strategy requires market prediction. Both reduce unnecessary forex risk."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
    ],
  },

  // ── Module 4 ─────────────────────────────────────────────
  {
    slug: "understanding-us-stocks",
    title: "Understanding US Stocks",
    description:
      "The US equity market is the largest and most liquid in the world, home to companies whose products you likely use every day and whose financial filings are public, detailed, and legally binding. But understanding how to invest in it requires learning a new vocabulary, a new set of regulatory filings, and a different market structure from what Indian investors are used to.\n\nWe start with the basics: how US markets are structured, how the major indices work and what they actually represent, and how to read the documents that every publicly listed US company must file with the SEC. If you've only ever read DRHP filings or BSE announcements, this module bridges that gap clearly and without unnecessary jargon.\n\nFrom there, we move into the most practical question for a first-time US investor: individual stocks or ETFs? You'll learn how to evaluate both, what makes the S&P 500 a brilliant default position for most investors, and how to think about costs and taxes as an Indian investor specifically. By the end, you'll have a framework for building your first US allocation — not just an understanding of how the market works.",
    outcomes: [
      "Navigate US market structure: exchanges, indices, and trading hours",
      "Read and interpret core SEC filings: 10-K, 10-Q, and 8-K",
      "Evaluate individual US stocks using fundamental analysis frameworks",
      "Compare US-listed ETFs across expense ratios, holdings, and tracking error",
      "Build a starter US equity allocation suited to an Indian investor's risk profile",
    ],
    level: "Beginner",
    chapters: 5,
    duration: "1.5 hrs",
    order: 4,
    chapterData: [
      {
        title: "What it means to own a US stock",
        order: 1,
        lessons: [
          {
            title: "Shareholder rights across borders",
            content: shortLesson(
              "ownership",
              "When you buy a US stock as an Indian investor, you become a part-owner of that company — with the same economic rights as any American shareholder. You receive dividends (subject to withholding tax), you can vote on shareholder resolutions, and your ownership is recorded with the Depository Trust Company (DTC), the US equivalent of India's CDSL or NSDL. Your broker holds shares in your name in a custodian account.",
              "What you don't get: automatic protection under SEBI. US-listed companies are regulated by the SEC (Securities and Exchange Commission) and must comply with US GAAP accounting standards. In practice, US regulatory standards for public companies are rigorous — quarterly earnings, detailed annual reports, and mandatory disclosure of material events. As a foreign investor, you benefit from this infrastructure without needing to navigate it directly."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
      {
        title: "How US markets work: NYSE, Nasdaq, indices",
        order: 2,
        lessons: [
          {
            title: "Two exchanges, thousands of stocks",
            content: shortLesson(
              "exchanges",
              "The US has two primary stock exchanges: the NYSE (New York Stock Exchange) and the Nasdaq. The NYSE is the older, more traditional exchange — home to financial giants like JPMorgan, Goldman Sachs, and many industrial companies. The Nasdaq is where technology companies tend to list: Apple, Microsoft, Amazon, Nvidia, and Meta are all Nasdaq-listed. The difference matters less than people think for investors — both exchanges offer the same liquidity and regulatory protections.",
              "US markets are open from 9:30 AM to 4:00 PM Eastern Time, which translates to 7:00 PM to 1:30 AM India Standard Time. This means Indian investors trading US stocks do so at night — a practicality worth acknowledging. Pre-market (4:00–9:30 AM ET) and after-hours (4:00–8:00 PM ET) trading is available through most brokers but with much lower liquidity and wider spreads. For most investors, sticking to regular trading hours is the right call."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
      {
        title: "S&P 500 — what it really represents",
        order: 3,
        lessons: [
          {
            title: "The index everyone references but few understand deeply",
            content: shortLesson(
              "sp500",
              "The S&P 500 is a market-capitalisation-weighted index of 500 leading US companies selected by a committee at S&P Global. 'Market-cap weighted' means larger companies have more influence on the index's movements. Apple, Microsoft, and Nvidia each represent roughly 6–7% of the entire index. This means the S&P 500 is not equally diversified across 500 companies — it's heavily concentrated in its top 10 holdings, which collectively represent about 35% of the index.",
              "This isn't necessarily a problem. The largest companies are large because they've earned it. But it does mean that investing in an S&P 500 ETF gives you significant technology sector exposure — whether or not that's what you intended. The index's historical track record is exceptional: approximately 10% annualised returns over the past century, through wars, recessions, and financial crises. For most Indian investors building international exposure, an S&P 500 ETF is the most rational starting point."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
      {
        title: "ETFs vs individual stocks for beginners",
        order: 4,
        lessons: [
          {
            title: "Why most investors should start with ETFs",
            content: shortLesson(
              "etfs",
              "An ETF (Exchange-Traded Fund) is a basket of securities that trades on an exchange like a single stock. An S&P 500 ETF like VOO or IVV gives you exposure to all 500 companies in the index with a single purchase, an expense ratio under 0.05%, and daily liquidity. For most Indian investors beginning their international investment journey, this is the appropriate starting point — not individual stock picking.",
              "Individual US stocks make sense when you have a genuine informational advantage or a long-term conviction about a specific company. Most investors don't have that advantage against professional analysts who follow a company full-time. The research barrier is also real: understanding a US company's competitive position, regulatory environment, and accounting requires effort. ETFs give you broad exposure without requiring you to be right about any individual company's future."
            ),
            readTime: 2,
            order: 1,
          },
        ],
      },
      {
        title: "Costs and taxes on US investments for Indians",
        order: 5,
        lessons: [
          {
            title: "What you actually keep after costs and tax",
            content: shortLesson(
              "costs",
              "The all-in cost of US investing for an Indian investor has three components. First: brokerage commissions. Most US brokers now offer commission-free stock and ETF trades, so this is increasingly negligible. Second: forex conversion costs (covered in Module 3). Third: taxes — and this is where Indian investors need to pay attention. US dividends are subject to 25% withholding tax (under the India-US DTAA). Capital gains on US stocks are taxed in India as per your slab rate if held under 24 months, and at 12.5% if held over 24 months (post-2024 budget rules).",
              "The tax drag on dividends is real. A 25% withholding means a 4% dividend yield becomes a 3% after-tax yield before Indian taxes apply. This is one reason many long-term investors prefer growth-oriented ETFs (like QQQ tracking the Nasdaq 100) over dividend-heavy ETFs — you defer tax until you sell, rather than paying it on every distribution. We cover the full tax framework in Module 5."
            ),
            readTime: 3,
            order: 1,
          },
        ],
      },
    ],
  },

  // ── Module 5 ─────────────────────────────────────────────
  {
    slug: "tax-compliance-global-investors",
    title: "Tax & Compliance for Global Investors",
    description:
      "For most Indian investors, the decision to invest globally comes with a quiet anxiety: what does the taxman think? The answer is more straightforward than most people fear — but only if you know the rules. India has a clear, if layered, framework for taxing foreign income and assets, and the penalties for getting it wrong are significant enough to take seriously.\n\nThis module covers the Double Taxation Avoidance Agreement (DTAA) between India and major investing destinations — the US, UK, and Singapore primarily. You'll learn how to claim treaty benefits, when withholding tax applies, and how to credit foreign taxes paid against your Indian tax liability. We also explain the FEMA obligations that run alongside income tax rules, and the PFIC trap that catches Indian investors in US mutual funds by surprise.\n\nThe second half of the module is entirely practical: Schedule FA (Foreign Assets) in your ITR, how to structure your record-keeping so that filing season is manageable, and how to think about tax-loss harvesting across geographies. Tax compliance is not the most exciting topic. But getting it right is what separates investors who compound wealth for decades from those who face notices, penalties, and regrets.",
    outcomes: [
      "Apply DTAA provisions to avoid double taxation on foreign income",
      "Correctly disclose foreign assets and income in Schedule FA of your ITR",
      "Understand capital gains tax treatment for US assets held by Indian residents",
      "Identify when TDS/withholding tax applies and how to claim credit for it",
      "Recognise the PFIC trap and why Indian investors should avoid US mutual funds",
      "Maintain compliant records for both FEMA and Income Tax Act purposes",
    ],
    level: "Intermediate",
    chapters: 5,
    duration: "1.5 hrs",
    order: 5,
    chapterData: [
      {
        title: "How global investment income is taxed in India",
        order: 1,
        lessons: [
          {
            title: "The Indian tax treatment of foreign income",
            content: shortLesson(
              "foreign-income-tax",
              "India taxes its residents on their **worldwide income** — not just income earned in India. This means dividends from US stocks, capital gains from selling ETFs on a foreign exchange, and interest from foreign bonds are all taxable in India. The rate depends on the type of income and how long you held the asset. Capital gains on listed US stocks held over 24 months are taxed at 12.5% (long-term). Gains on assets held under 24 months are taxed at your applicable slab rate.",
              "The reporting obligation is equally important. Foreign income must be disclosed in your ITR even if tax is withheld at source in the foreign country. The Indian income tax system relies on self-reporting for foreign assets — there's no automatic information exchange that catches domestic investors who 'forget' to report. However, India participates in the Common Reporting Standard (CRS), which means foreign financial institutions share account information with the Indian tax authorities. Not reporting is not safe."
            ),
            readTime: 3,
            order: 1,
          },
        ],
      },
      {
        title: "DTAA — how to avoid double taxation",
        order: 2,
        lessons: [
          {
            title: "Getting credit for what you already paid abroad",
            content: shortLesson(
              "dtaa",
              "The India-US DTAA (Double Taxation Avoidance Agreement) is a treaty that determines which country has the right to tax specific types of income, and at what rate. For Indian investors in US stocks, the most relevant provision: the US withholds 25% on dividends paid to Indian residents (instead of the default 30%). This reduced rate applies automatically when you submit the W-8BEN form to your US broker.",
              "The credit mechanism: whatever tax the US withholds on dividends, you can claim as a Foreign Tax Credit (FTC) when filing your Indian ITR. If your Indian tax on that dividend income would have been 30%, and the US already withheld 25%, you only owe the remaining 5% to India. The FTC is claimed in Schedule TR (Tax Relief) of your ITR, supported by the broker's tax statement. Keep your annual broker statement — it itemises dividends received and tax withheld, which is exactly what your CA needs."
            ),
            readTime: 3,
            order: 1,
          },
        ],
      },
      {
        title: "PFIC rules and why US mutual funds are complicated",
        order: 3,
        lessons: [
          {
            title: "The trap most investors don't see coming",
            content: shortLesson(
              "pfic",
              "PFIC stands for Passive Foreign Investment Company. Under US tax law, a PFIC is a foreign entity that earns primarily passive income (like dividends, interest, or capital gains). The relevant implication for Indian investors: if you're a US taxpayer (holding a Green Card or US visa that triggers US tax residency), investing in Indian mutual funds or ETFs means owning PFICs — with extremely punitive US tax treatment on gains.",
              "For pure Indian residents who are not US tax persons, PFIC rules don't directly apply to your Indian investments. However, the reverse PFIC trap catches many investors: Indian investors who buy US-registered mutual funds (not ETFs) through a platform may inadvertently trigger PFIC-like complexities under Indian interpretation. The safer path: buy US ETFs (like VOO, QQQ, or SCHB) rather than US-registered mutual funds. ETFs are pass-through structures that avoid this complexity entirely."
            ),
            readTime: 3,
            order: 1,
          },
        ],
      },
      {
        title: "Filing Schedule FA in your ITR",
        order: 4,
        lessons: [
          {
            title: "The foreign assets disclosure you cannot skip",
            content: shortLesson(
              "schedule-fa",
              "Schedule FA (Foreign Assets) is a mandatory disclosure in the Indian Income Tax Return for any resident who holds foreign financial assets at any point during the financial year. This includes foreign brokerage accounts, foreign bank accounts, interests in foreign companies, and foreign real estate. The penalty for non-disclosure is severe — up to ₹10 lakhs per year of non-disclosure under the Black Money Act.",
              "What you need to fill Schedule FA: the name of the institution holding the asset, the country, the account number or reference, the peak balance during the year, and the income earned. Most of this comes directly from your broker's annual statement. The reporting period is the calendar year (January–December) for foreign assets, which differs from India's April–March financial year — a common source of confusion. Your CA will need your broker statement for the full calendar year ending December 31st."
            ),
            readTime: 3,
            order: 1,
          },
        ],
      },
      {
        title: "Tax-loss harvesting across geographies",
        order: 5,
        lessons: [
          {
            title: "Turning losses into a tax planning tool",
            content: shortLesson(
              "tlh",
              "Tax-loss harvesting is the practice of selling investments that are showing a loss to realise those losses for tax purposes, then immediately buying a similar (but not identical) investment to maintain your market exposure. In India, capital losses can be set off against capital gains — short-term losses against both short and long-term gains, long-term losses only against long-term gains. Unused losses can be carried forward for 8 years.",
              "For investors with both Indian and international portfolios, cross-geography harvesting creates additional opportunities. If your Indian mid-cap fund is down 15% while your US ETF is up, selling the Indian fund crystallises a loss you can offset against gains elsewhere — without necessarily changing your long-term portfolio strategy (just buy a similar Indian mid-cap fund after 30 days to avoid wash-sale-like issues). The key discipline: harvest losses systematically at year-end, not reactively during market panic."
            ),
            readTime: 3,
            order: 1,
          },
        ],
      },
    ],
  },
];
