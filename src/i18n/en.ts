export default {
  translation: {
    app: { title: 'FondoScope', tagline: 'Discover the gaps in your portfolio' },
    steps: { questionnaire: 'Profile', portfolio: 'Portfolio', analysis: 'Analysis', suggestions: 'Suggestions' },
    questionnaire: {
      q1: 'When will you mainly need this money?',
      q1a1: 'In less than 3 years', q1a2: 'In 3–5 years', q1a3: 'In 5–10 years', q1a4: 'In 10–20 years', q1a5: 'In more than 20 years',
      q2: 'If your portfolio drops 25% in 3 months, what would you do?',
      q2a1: 'Sell everything immediately', q2a2: 'Sell a portion', q2a3: 'Do nothing, wait', q2a4: 'Buy a little more', q2a5: 'Buy much more, it\'s an opportunity',
      q3: 'What is your primary goal?',
      q3a1: 'Emergency fund', q3a2: 'Buy a home', q3a3: 'Retirement', q3a4: 'Long-term wealth building',
      q4: 'Will you need to withdraw money regularly?',
      q4a1: 'Yes', q4a2: 'No',
      q5: 'What is your age range?',
      q5a1: 'Under 30', q5a2: '30–45', q5a3: '45–55', q5a4: '55–65', q5a5: 'Over 65',
      q6: 'How would you describe your investment knowledge?',
      q6a1: 'Beginner — I know little', q6a2: 'Intermediate — I understand funds & ETFs', q6a3: 'Advanced — I know markets well',
      next: 'Next', back: 'Back', submit: 'View profile'
    },
    profiles: {
      conservative: 'Conservative', moderate_conservative: 'Moderate Conservative', moderate: 'Moderate', moderate_aggressive: 'Moderate Aggressive', aggressive: 'Aggressive',
      conservative_desc: 'You prioritize stability over growth. You accept lower returns to avoid losses.',
      moderate_conservative_desc: 'You seek a balance between safety and growth. You accept moderate volatility.',
      moderate_desc: 'You accept volatility for growth potential. Balance between risk and return.',
      moderate_aggressive_desc: 'You seek maximum long-term growth. You accept significant fluctuations.',
      aggressive_desc: 'Maximum growth potential. You accept significant drops without worry.'
    },
    portfolio: {
      title: 'Build your portfolio', search: 'Search fund by name...', add: 'Add', remove: 'Remove',
      total: 'Total', remaining: 'remaining', analyze: 'Analyze portfolio',
      warning: 'Total must be 100%', warning_exists: 'This fund is already in your portfolio'
    },
    analysis: {
      breakdown: 'Breakdown', stressTest: 'Stress Test', disclaimer: 'Simulation based on historical data. Not a prediction.',
      assetClass: 'Asset Class', geography: 'Geography', sector: 'Sector', metrics: 'Metrics',
      srri: 'SRRI', ter: 'Avg TER', infProt: 'Inflation protection', currHedg: 'Currency hedge', weight: 'Weight', drawdown: 'Drawdown', contribution: 'Contribution'
    },
    gaps: {
      title: 'Detected gaps', critical: 'Critical', moderate: 'Moderate', minor: 'Minor'
    },
    suggestions: {
      title: 'Suggested funds', disclaimer: 'These suggestions are educational, not financial advice.', moreInfo: 'More info',
      addresses: 'Addresses', suggested: 'Suggested weight'
    },
    common: { next: 'Next', prev: 'Back' }
  }
};