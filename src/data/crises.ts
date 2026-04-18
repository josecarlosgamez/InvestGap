import type { CrisisScenario } from '../types';

export const CRISIS_SCENARIOS: CrisisScenario[] = [
  // === 20TH CENTURY CRISES ===
  {
    key: 'great_depression_1929',
    nameES: 'Gran Depresión 1929–1932',
    nameEN: 'Great Depression 1929–1932',
    period: 'Sep 1929 – Jul 1932',
    century: '20th',
    recoveryYears: 25,
    keyLesson: {
      es: 'La diversificación con bonos gubernamentales de calidad es el único escudo real ante una depresión.',
      en: 'Diversification into quality government bonds is the only real shield in a depression.'
    },
    descriptionES: 'La peor crisis bursátil de la historia. ElDow Jones cayó un 89% en 34 meses. Quiebra masiva de bancos, deflación extrema y paro del 25%.',
    descriptionEN: 'The worst stock market crash in history. The Dow Jones fell 89% over 34 months. Mass bank failures, extreme deflation, 25% unemployment.',
    drawdowns: {
      equityUS: -89, equityEurope: -72, equityEM: -65, equityJapan: -60,
      equityTech: -89, equityFinancials: -92, equityEnergy: -70, equityHealthcare: -55, equitySmallCap: -90,
      fixedIncomeGov: 28, fixedIncomeCorpIG: -30, fixedIncomeCorpHY: -70, fixedIncomeInflationLinked: 30, fixedIncomeEM: -55, fixedIncomeShortDuration: 20,
      realEstate: -30, commodity: -62, gold: 69, cash: 25
    }
  },
  {
    key: 'oil_shock_stagflation_1973',
    nameES: 'Crisis del Petróleo y Estanflación 1973–1974',
    nameEN: 'Oil Shock & Stagflation 1973–1974',
    period: 'Ene 1973 – Oct 1974',
    century: '20th',
    recoveryYears: 3,
    keyLesson: {
      es: 'En stagflación, casi todo pierde. Las únicas coberturas son oro, materias primas y bonos vinculados a inflación.',
      en: 'In stagflation, almost everything loses. The only real hedges are gold, commodities, and inflation-linked bonds.'
    },
    descriptionES: 'El embargo de la OPEP cuadruplicó el precio del petróleo. La estanflación golpeó a todas las bolsas: el S&P 500 cayó un 48%.',
    descriptionEN: 'The OPEC embargo quadrupled oil prices. Stagflation hit all global stock markets: S&P 500 fell 48%.',
    drawdowns: {
      equityUS: -48, equityEurope: -52, equityEM: -42, equityJapan: -37,
      equityTech: -62, equityFinancials: -40, equityEnergy: 120, equityHealthcare: -28, equitySmallCap: -45,
      fixedIncomeGov: -15, fixedIncomeCorpIG: -20, fixedIncomeCorpHY: -28, fixedIncomeInflationLinked: 5, fixedIncomeEM: -25, fixedIncomeShortDuration: -5,
      realEstate: 5, commodity: 80, gold: 170, cash: -15
    }
  },
  {
    key: 'black_monday_1987',
    nameES: 'Lunes Negro 1987',
    nameEN: 'Black Monday 1987',
    period: 'Ago 1987 – Nov 1987',
    century: '20th',
    recoveryYears: 2,
    keyLesson: {
      es: 'No todo crash es económico. Black Monday fue un crash técnico. Los bonos gubernamentales se dispararon como refugio.',
      en: 'Not every crash is economic. Black Monday was a technical crash. Government bonds surged as a safe haven.'
    },
    descriptionES: 'El mayor crash de un solo día: el Dow Jones cayó un 22.6% el 19 de octubre. Sin embargo, no causó recesión y se recuperó en 2 años.',
    descriptionEN: 'The largest single-day crash: the Dow Jones fell 22.6% on October 19. However, it did not cause a recession and recovered in 2 years.',
    drawdowns: {
      equityUS: -33, equityEurope: -28, equityEM: -35, equityJapan: -15,
      equityTech: -35, equityFinancials: -38, equityEnergy: -20, equityHealthcare: -22, equitySmallCap: -30,
      fixedIncomeGov: 8, fixedIncomeCorpIG: -2, fixedIncomeCorpHY: -10, fixedIncomeInflationLinked: 5, fixedIncomeEM: -12, fixedIncomeShortDuration: 4,
      realEstate: -5, commodity: -8, gold: 8, cash: 4
    }
  },
  {
    key: 'asian_crisis_ltcm_1997',
    nameES: 'Crisis Asiática y Colapso LTCM 1997–1998',
    nameEN: 'Asian Financial Crisis & LTCM Collapse 1997–1998',
    period: 'Jul 1997 – Oct 1998',
    century: '20th',
    recoveryYears: 3,
    keyLesson: {
      es: 'Las crisis de mercados emergentes son devastadoras para EM pero tienen impacto limitado enEuropa/EEUU si no hay contagio sistémico.',
      en: 'Emerging market crises are devastating for EM but have limited impact on Europe/US without systemic contagion.'
    },
    descriptionES: 'La crisis del baht tailandés desencadenó una cascada por Asia. Tailandia -75%, Indonesia -88%. Rusia declaró default en 1998.',
    descriptionEN: 'The Thai baht crisis triggered a cascade across Asia. Thailand -75%, Indonesia -88%. Russia defaulted in 1998.',
    drawdowns: {
      equityUS: -19, equityEurope: -25, equityEM: -55, equityJapan: -30,
      equityTech: -18, equityFinancials: -28, equityEnergy: -42, equityHealthcare: -12, equitySmallCap: -25,
      fixedIncomeGov: 15, fixedIncomeCorpIG: -5, fixedIncomeCorpHY: -20, fixedIncomeInflationLinked: 8, fixedIncomeEM: -45, fixedIncomeShortDuration: 5,
      realEstate: -5, commodity: -32, gold: -15, cash: 5
    }
  },

  // === 21ST CENTURY CRISES ===
  {
    key: 'dotcom_2000_2002',
    nameES: 'Crisis Puntocom 2000–2002',
    nameEN: 'Dot-com Bust 2000–2002',
    period: 'Mar 2000 – Oct 2002',
    century: '21st',
    recoveryYears: 13,
    keyLesson: {
      es: 'Las burbujas de valoración sectoriales son devastadoras. Los bonos gubernamentales son el escudo.',
      en: 'Sectoral valuation bubbles are devastating. Government bonds are the shield.'
    },
    descriptionES: 'El NASDAQ cayó un 78%. Muchas empresas puntocom cayeron 90-100%. La bolsa tardó 13 años en recuperar.',
    descriptionEN: 'The NASDAQ fell 78%. Many dotcom companies fell 90-100%. The market took 13 years to recover.',
    drawdowns: {
      equityUS: -49, equityEurope: -55, equityEM: -31, equityJapan: -58,
      equityTech: -78, equityFinancials: -35, equityEnergy: -10, equityHealthcare: -20, equitySmallCap: -40,
      fixedIncomeGov: 30, fixedIncomeCorpIG: 10, fixedIncomeCorpHY: -25, fixedIncomeInflationLinked: 12, fixedIncomeEM: -12, fixedIncomeShortDuration: 15,
      realEstate: 10, commodity: -5, gold: 10, cash: 15
    }
  },
  {
    key: 'gfc_2008_2009',
    nameES: 'Crisis Financiera Global 2008–2009',
    nameEN: 'Global Financial Crisis 2008–2009',
    period: 'Oct 2007 – Mar 2009',
    century: '21st',
    recoveryYears: 5,
    keyLesson: {
      es: 'En una crisis sistémica, la correlación entre activos sube a 1. Los únicos refugios son deuda pública triple-A y cash.',
      en: 'In a systemic crisis, asset correlation spikes to 1. The only refuges are AAA government bonds and cash.'
    },
    descriptionES: 'La mayor crisis desde la Gran Depresión. El colapso de Lehman desencadenó pánico sistémico. Casi todo cayó simultáneamente.',
    descriptionEN: 'The largest crisis since the Great Depression. The collapse of Lehman triggered systemic panic. Almost everything fell simultaneously.',
    drawdowns: {
      equityUS: -56, equityEurope: -58, equityEM: -62, equityJapan: -56,
      equityTech: -52, equityFinancials: -78, equityEnergy: -52, equityHealthcare: -35, equitySmallCap: -60,
      fixedIncomeGov: 26, fixedIncomeCorpIG: -8, fixedIncomeCorpHY: -35, fixedIncomeInflationLinked: 5, fixedIncomeEM: -30, fixedIncomeShortDuration: 8,
      realEstate: -68, commodity: -46, gold: -28, cash: 3
    }
  },
  {
    key: 'eu_debt_2011_2012',
    nameES: 'Crisis de Deuda Soberana Europea 2011–2012',
    nameEN: 'European Sovereign Debt Crisis 2011–2012',
    period: 'Abr 2011 – Jun 2012',
    century: '21st',
    recoveryYears: 3,
    keyLesson: {
      es: 'La deuda soberana periférica europea es tan volátil como las acciones. Los Bunds alemanes son el refugio.',
      en: 'European peripheral sovereign debt is as volatile as equities. German Bunds are the safe haven.'
    },
    descriptionES: 'La crisis soberana de la eurozona: Grecia, España, Italia al borde del default. Las bolsas europeas cayeron un 28%.',
    descriptionEN: 'The eurozone sovereign debt crisis: Greece, Spain, Italy on the brink of default. European equities fell 28%.',
    drawdowns: {
      equityUS: -19, equityEurope: -28, equityEM: -23, equityJapan: -20,
      equityTech: -18, equityFinancials: -38, equityEnergy: -22, equityHealthcare: -10, equitySmallCap: -28,
      fixedIncomeGov: 12, fixedIncomeCorpIG: -6, fixedIncomeCorpHY: -12, fixedIncomeInflationLinked: 8, fixedIncomeEM: -18, fixedIncomeShortDuration: 3,
      realEstate: -20, commodity: -18, gold: 12, cash: 2
    }
  },
  {
    key: 'china_commodities_2015',
    nameES: 'Corrección China y Materias Primas 2015–2016',
    nameEN: 'China Slowdown & Commodity Crash 2015–2016',
    period: 'Abr 2015 – Feb 2016',
    century: '21st',
    recoveryYears: 1,
    keyLesson: {
      es: 'Las desaceleraciones de China golpean EM y materias primas. Los bonos gubernamentales funcionaron como refugio.',
      en: 'China slowdowns hit EM and commodities hard. Government bonds worked as safe haven.'
    },
    descriptionES: 'Desaceleración de China y colapso de materias primas. El petróleo cayó un 70%. Los mercados emergentes sufrieron.',
    descriptionEN: 'China slowdown and commodity collapse. Oil fell 70%. Emerging markets suffered.',
    drawdowns: {
      equityUS: -12, equityEurope: -20, equityEM: -30, equityJapan: -20,
      equityTech: -10, equityFinancials: -20, equityEnergy: -45, equityHealthcare: -8, equitySmallCap: -20,
      fixedIncomeGov: 5, fixedIncomeCorpIG: -2, fixedIncomeCorpHY: -15, fixedIncomeInflationLinked: 2, fixedIncomeEM: -15, fixedIncomeShortDuration: 2,
      realEstate: -5, commodity: -35, gold: 5, cash: 1
    }
  },
  {
    key: 'covid_2020',
    nameES: 'Crisis COVID-19 2020',
    nameEN: 'COVID-19 Crash 2020',
    period: 'Feb 19 – Mar 23 2020',
    century: '21st',
    recoveryYears: 1,
    keyLesson: {
      es: 'Los crashes por shocks exógenos pueden recuperarse muy rápido con respuesta masiva de política económica.',
      en: 'Crashes from exogenous shocks can recover very quickly with massive economic policy response.'
    },
    descriptionES: 'La caída más rápida de la historia: -34% en 33 días. La respuesta masiva (QE + transferencias) provocó la recuperación más rápida.',
    descriptionEN: 'The fastest crash in history: -34% in 33 days. Massive response (QE + transfers) drove the fastest recovery.',
    drawdowns: {
      equityUS: -34, equityEurope: -37, equityEM: -32, equityJapan: -31,
      equityTech: -28, equityFinancials: -45, equityEnergy: -55, equityHealthcare: -15, equitySmallCap: -40,
      fixedIncomeGov: 8, fixedIncomeCorpIG: -10, fixedIncomeCorpHY: -22, fixedIncomeInflationLinked: 3, fixedIncomeEM: -20, fixedIncomeShortDuration: 2,
      realEstate: -43, commodity: -35, gold: -8, cash: 0
    }
  },
  {
    key: 'rate_hike_2022',
    nameES: 'Mercado Bajista por Subida de Tipos 2022',
    nameEN: 'Rate Hike Bear Market 2022',
    period: 'Ene 2022 – Oct 2022',
    century: '21st',
    recoveryYears: 2,
    keyLesson: {
      es: 'La cartera 60/40 se rompe cuando tipos + inflación suben juntos. Los bonos cortos, energía y oro son los únicos refugios.',
      en: 'The 60/40 portfolio breaks when rates + inflation rise together. Short bonds, energy and gold are the only refuges.'
    },
    descriptionES: 'El año que rompió la cartera clásica 60/40. Por primera vez desde 1974, acciones Y bonos de larga duración cayeron al mismo tiempo.',
    descriptionEN: 'The year that broke the classic 60/40 portfolio. For the first time since 1974, both equities AND long-duration bonds fell simultaneously.',
    drawdowns: {
      equityUS: -25, equityEurope: -18, equityEM: -22, equityJapan: -12,
      equityTech: -33, equityFinancials: -12, equityEnergy: 65, equityHealthcare: -5, equitySmallCap: -22,
      fixedIncomeGov: -25, fixedIncomeCorpIG: -18, fixedIncomeCorpHY: -15, fixedIncomeInflationLinked: -10, fixedIncomeEM: -18, fixedIncomeShortDuration: -3,
      realEstate: -28, commodity: 25, gold: -2, cash: 2
    }
  }
];