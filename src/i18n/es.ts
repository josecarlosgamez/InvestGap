export default {
  translation: {
    app: { title: 'FondoScope', tagline: 'Descubre los huecos de tu cartera' },
    steps: { questionnaire: 'Perfil', portfolio: 'Cartera', analysis: 'Análisis', suggestions: 'Sugerencias' },
    questionnaire: {
      q1: '¿Cuándo necesitarás usar principalmente este dinero?',
      q1a1: 'En menos de 3 años', q1a2: 'En 3–5 años', q1a3: 'En 5–10 años', q1a4: 'En 10–20 años', q1a5: 'En más de 20 años',
      q2: 'Si tu cartera cae un 25% en 3 meses, ¿qué harías?',
      q2a1: 'Vendería todo inmediatamente', q2a2: 'Vendería una parte', q2a3: 'Noaría nada, esperaría', q2a4: 'Compraría un poco más', q2a5: 'Compraría mucho más, es una oportunidad',
      q3: '¿Cuál es tu objetivo principal?',
      q3a1: 'Fondo de emergencia', q3a2: 'Comprar una vivienda', q3a3: 'Jubilación', q3a4: 'Creación de patrimonio a largo plazo',
      q4: '¿Necesitarás retirar dinero regularmente?',
      q4a1: 'Sí', q4a2: 'No',
      q5: '¿Cuál es tu rango de edad?',
      q5a1: 'Menos de 30 años', q5a2: '30–45 años', q5a3: '45–55 años', q5a4: '55–65 años', q5a5: 'Más de 65 años',
      q6: '¿Cómo describirías tu conocimiento sobre inversión?',
      q6a1: 'Principiante — sé poco', q6a2: 'Intermedio — entiendo fondos y ETFs', q6a3: 'Avanzado — conozco bien los mercados',
      next: 'Siguiente', back: 'Atrás', submit: 'Ver perfil'
    },
    profiles: {
      conservative: 'Conservador', moderate_conservative: 'Conservador moderado', moderate: 'Moderado', moderate_aggressive: 'Moderado agresivo', aggressive: 'Agresivo',
      conservative_desc: 'Priorizas la estabilidad sobre el crecimiento. Aceptas rendimientos menores para evitar pérdidas.',
      moderate_conservative_desc: 'Buscas un equilibrio entre seguridad y crecimiento. Aceptas volatilidad moderada.',
      moderate_desc: 'Aceptas volatilidad por potencial de crecimiento. Equilibrio entre riesgo y rendimiento.',
      moderate_aggressive_desc: 'Buscas maximize crecimiento a largo plazo. Aceptas fluctuaciones significativas.',
      aggressive_desc: 'Máximo potencial de crecimiento. Aceptas caídas importantes sin preocuparte.'
    },
    portfolio: {
      title: 'Construye tu cartera', search: 'Buscar fondo por nombre...', add: 'Añadir', remove: 'Eliminar',
      total: 'Total', remaining: 'faltan', analyze: 'Analizar cartera',
      warning: 'El total debe ser 100%', warning_exists: 'Este fondo ya está en tu cartera'
    },
    analysis: {
      breakdown: 'Composición', stressTest: 'Stress Test', disclaimer: 'Simulación basada en datos históricos. No es una predicción.',
      assetClass: 'Clase de activo', geography: 'Geografía', sector: 'Sector', metrics: 'Métricas',
      srri: 'SRRI', ter: 'TER medio', infProt: 'Prot.inflación', currHedg: 'Cobertura div.', weight: 'Peso', drawdown: 'Caída', contribution: 'Contribución'
    },
    gaps: {
      title: 'Huecos detectados', critical: 'Crítico', moderate: 'Moderado', minor: 'Menor'
    },
    suggestions: {
      title: 'Fondos sugeridos', disclaimer: 'Estas sugerencias son educativas, no asesoramiento financiero.', moreInfo: 'Más info',
      addresses: 'Cubre', suggested: 'Peso sugerido'
    },
    common: { next: 'Siguiente', prev: 'Atrás' }
  }
};