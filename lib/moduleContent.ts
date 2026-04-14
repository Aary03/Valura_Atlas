/**
 * Static editorial content per module.
 * Keyed by slug so it can be imported server-side without a DB hit.
 */

export interface ModuleContent {
  about: string[];   // paragraphs
  skills: string[];  // learning outcomes
}

export const MODULE_CONTENT: Record<string, ModuleContent> = {
  "why-invest-beyond-india": {
    about: [
      "Most Indian investors hold 100% of their wealth in Indian rupees — in stocks, fixed deposits, real estate, or gold. That feels safe because it's familiar. But familiarity and safety are not the same thing. A single currency, a single regulatory environment, a single business cycle. If India has a bad decade, your entire portfolio feels it.",
      "This module starts by asking a simple question: why should geography determine your financial destiny? The US market has compounded at roughly 10% annually for over a century. European and Asian markets offer exposure to industries that barely exist in India. Global diversification is not about distrust in India's growth story — it's about not betting everything on one chapter of it.",
      "We'll walk through the data: what diversification actually does to portfolio volatility, how Indian investors have historically been underexposed to global growth, and why the window to correct that is now wider than ever before. By the end, you'll have a clear mental model for thinking about your portfolio as a global asset — not an Indian one with some international additions.",
    ],
    skills: [
      "Explain why geographic concentration is a hidden portfolio risk",
      "Compare Indian vs global market return profiles over 20+ years",
      "Articulate the case for international diversification to family or advisors",
      "Identify the key triggers that make global investing timely for Indian investors",
      "Understand how currency exposure works inside international holdings",
    ],
  },

  "accessing-global-markets": {
    about: [
      "Wanting to invest globally is one thing. Actually doing it, as an Indian resident, requires navigating a specific set of regulations, platforms, and structural choices. This module is your practical guide through all of it — from opening your first international brokerage account to understanding the different routes available under FEMA and the LRS framework.",
      "We cover the main access paths: direct investment through foreign brokers like Interactive Brokers, Indian platforms with international desk access like Vested or INDmoney, and the indirect route through international mutual funds and ETFs domiciled in India. Each path has different trade-offs in cost, liquidity, tax treatment, and regulatory overhead.",
      "You'll also understand how to evaluate a brokerage — what to look for in terms of security, commission structures, and currency conversion costs. By the end of this module, you'll be able to open an international account, fund it legally, and execute your first trade with confidence — not guesswork.",
    ],
    skills: [
      "Compare direct and indirect routes for investing in global markets from India",
      "Evaluate foreign brokerages across cost, security, and usability criteria",
      "Open and fund an international brokerage account under LRS guidelines",
      "Understand the role of Indian international mutual funds and feeder funds",
      "Navigate KYC and documentation requirements for cross-border accounts",
      "Execute a basic international equity order with correct order type",
    ],
  },

  "cross-border-money-movement": {
    about: [
      "The moment you decide to invest internationally, you face a practical constraint most people underestimate: moving money across borders is slow, expensive, and full of hidden friction. Wire transfers, forex conversion spreads, correspondent bank fees — they quietly erode returns before you've even bought a single share.",
      "This module demystifies the Liberalised Remittance Scheme (LRS) — the RBI's framework that allows Indian residents to remit up to $250,000 per financial year for permitted purposes including investment. You'll understand what's allowed, what requires documentation, and what crosses into regulatory grey zones that you should avoid.",
      "We also cover the practical mechanics: how to get the best forex conversion rates, which banks have better international wire infrastructure, how to time remittances around market conditions, and the record-keeping you'll need to do for tax compliance. Money movement is not glamorous, but getting it right is foundational to everything else.",
    ],
    skills: [
      "Understand LRS limits, permitted purposes, and annual reset rules",
      "Execute an international wire transfer with minimised conversion costs",
      "Compare forex rates across banks and money transfer platforms",
      "Identify documentation needed for LRS remittances and keep proper records",
      "Avoid common mistakes that trigger regulatory scrutiny or excess TCS",
    ],
  },

  "understanding-us-stocks": {
    about: [
      "The US equity market is the largest and most liquid in the world. It's home to companies like Apple, Nvidia, and Berkshire Hathaway — businesses with global revenues, deep moats, and decades of shareholder value creation. But understanding how to invest in it requires learning a new vocabulary, a new set of regulatory filings, and a different market structure from what Indian investors are used to.",
      "We start with the basics: how US markets are structured (NYSE vs Nasdaq), the indices that matter (S&P 500, Nasdaq 100, Dow Jones), and how to read the documents that publicly listed companies are required to file — 10-Ks, 10-Qs, 8-Ks. If you've only ever read Indian SEBI filings, this module bridges that gap clearly.",
      "From there, we move into building a US-focused portfolio. How do you choose between individual stocks and ETFs? What's the right allocation for a first-time US investor? How do you think about sector concentration when the S&P 500 is top-heavy with tech? This module answers those questions with frameworks you can actually apply — not theory that stays on the page.",
    ],
    skills: [
      "Navigate US market structure: exchanges, indices, and trading hours",
      "Read and interpret core SEC filings (10-K, 10-Q, 8-K)",
      "Evaluate individual US stocks using fundamental analysis frameworks",
      "Compare US-listed ETFs across expense ratios, holdings, and tracking error",
      "Build a starter US equity allocation suited to an Indian investor's profile",
    ],
  },

  "tax-compliance-global-investors": {
    about: [
      "For most Indian investors, the decision to go global comes with a quiet anxiety: what does the taxman think? The answer is more straightforward than you'd expect — but only if you know the rules. India has a clear, if layered, framework for taxing foreign income and assets, and the penalties for getting it wrong are significant enough to take seriously.",
      "This module covers the Double Taxation Avoidance Agreement (DTAA) between India and major investing destinations — the US, UK, and Singapore primarily. You'll understand how to claim treaty benefits, when withholding tax applies, and how to credit foreign taxes paid against your Indian tax liability. We also explain FEMA obligations that run parallel to income tax rules.",
      "The second half of the module is dedicated to annual compliance: Schedule FA (Foreign Assets) in your ITR, the PFIC trap that catches Indian investors in US mutual funds off-guard, and how to structure your record-keeping so that filing season is not a crisis. We also briefly cover what changes if you become a non-resident — a path many investors are considering.",
    ],
    skills: [
      "Apply DTAA provisions to avoid double taxation on foreign income",
      "Correctly disclose foreign assets in Schedule FA of your Indian ITR",
      "Understand how capital gains tax works differently for US vs Indian assets",
      "Identify when TDS/withholding tax applies and how to claim credit for it",
      "Maintain compliant records for both FEMA and Income Tax Act purposes",
    ],
  },
};
