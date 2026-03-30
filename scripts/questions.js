const QUESTIONS_DATA = Object.freeze([
    {
        scenario: 'Encuentras un artículo titulado "URGENTE: Nuevo virus mortal se propaga por el agua" en un blog sin autor identificado, con anuncios invasivos y sin referencias.',
        source: 'Blog anónimo con clickbait',
        options: ['Confiable', 'No confiable'],
        correct: 1,
        explanation: 'Sin autor, sin fuentes, título sensacionalista y monetización agresiva son señales claras de poca credibilidad.',
        criteria: 'Credibilidad del autor',
    },
    {
        scenario: 'La OMS publica un informe en su sitio oficial con datos estadísticos, metodología detallada y revisión de expertos sobre una nueva vacuna.',
        source: 'Sitio oficial de la OMS',
        options: ['Confiable', 'No confiable'],
        correct: 0,
        explanation: 'Organización reconocida mundialmente, metodología transparente y revisión por pares garantizan alta confiabilidad.',
        criteria: 'Autoridad institucional',
    },
    {
        scenario: 'Un influencer de fitness recomienda un suplemento "milagroso" mostrando su propio antes y después. En la descripción tiene un enlace de afiliado.',
        source: 'Redes sociales - Influencer',
        options: ['Confiable', 'No confiable'],
        correct: 1,
        explanation: 'Conflicto de interés por ganancia económica. Evidencia anecdótica personal no es evidencia científica.',
        criteria: 'Sesgo comercial',
    },
    {
        scenario: 'Un periódico reconocido publica una investigación sobre corrupción citando documentos oficiales, testimonios grabados y con firma de tres periodistas.',
        source: 'Periódico con trayectoria',
        options: ['Confiable', 'No confiable'],
        correct: 0,
        explanation: 'Múltiples fuentes verificables, autores identificados y respaldo institucional de un medio con reputación.',
        criteria: 'Verificabilidad',
    },
    {
        scenario: 'Recibes un mensaje de WhatsApp reenviado muchas veces que dice "Comparte antes de que lo borren: el gobierno oculta la cura del cáncer".',
        source: 'Cadena de WhatsApp',
        options: ['Confiable', 'No confiable'],
        correct: 1,
        explanation: 'Mensajes virales sin autor ni fuente verificable. El lenguaje urgente y conspirativo es señal de desinformación.',
        criteria: 'Origen verificable',
    },
    {
        scenario: 'Una universidad pública su estudio revisado por pares en una revista indexada, con datos abiertos y metodología replicable.',
        source: 'Revista científica indexada',
        options: ['Confiable', 'No confiable'],
        correct: 0,
        explanation: 'Revisión por pares, datos abiertos y metodología replicable son los estándares más altos de confiabilidad.',
        criteria: 'Rigor metodológico',
    },
    {
        scenario: 'Un sitio web llamado "NoticiasVerdad24.com" creado hace 2 meses publica que una celebridad falleció, pero ningún otro medio lo reporta.',
        source: 'Sitio web reciente sin respaldo',
        options: ['Confiable', 'No confiable'],
        correct: 1,
        explanation: 'Dominio reciente, sin historial, información no corroborada por otras fuentes. Probable fake news.',
        criteria: 'Triangulación de fuentes',
    },
    {
        scenario: 'Un documental de una reconocida plataforma de streaming presenta ambos lados de un debate ambiental con expertos de universidades y datos verificados.',
        source: 'Documental con múltiples perspectivas',
        options: ['Confiable', 'No confiable'],
        correct: 0,
        explanation: 'Presenta múltiples perspectivas, consulta expertos y datos verificados. Muestra equilibrio informativo.',
        criteria: 'Amplitud de perspectivas',
    },
    {
        scenario: 'Una página de Facebook llamada "Médicos por la verdad" publica que las antenas 5G causan enfermedades, sin citar ningún estudio científico.',
        source: 'Página de Facebook sin respaldo científico',
        options: ['Confiable', 'No confiable'],
        correct: 1,
        explanation: 'Nombre engañoso que aparenta autoridad médica. Sin evidencia científica ni estudios que respalden las afirmaciones.',
        criteria: 'Falsa autoridad',
    },
    {
        scenario: 'El Banco Mundial publica datos económicos de 190 países con metodología explicada, actualizados trimestralmente y disponibles para descarga pública.',
        source: 'Base de datos del Banco Mundial',
        options: ['Confiable', 'No confiable'],
        correct: 0,
        explanation: 'Institución global con estándares rigurosos, transparencia metodológica y datos abiertos para verificación.',
        criteria: 'Transparencia de datos',
    },
    {
        scenario: 'El artículo de Wikipedia sobre "Cambio Climático" tiene miles de referencias a estudios revisados por pares y una pestaña de discusión con riguroso proceso de edición y moderadores activos.',
        source: 'Wikipedia con referencias verificadas',
        options: ['Confiable', 'No confiable'],
        correct: 0,
        explanation: 'Cuando Wikipedia cita estudios revisados por pares y tiene supervisión editorial activa, es una buena puerta de entrada verificable.',
        criteria: 'Calidad de referencias',
    },
    {
        scenario: 'Un médico famoso tuitea que "la dieta alcalina cura el cáncer". Tiene millones de seguidores pero no enlaza ningún ensayo clínico ni estudio publicado.',
        source: 'Médico influencer en redes sociales',
        options: ['Confiable', 'No confiable'],
        correct: 1,
        explanation: 'La popularidad no equivale a rigor científico. Sin evidencia clínica publicada, la afirmación no es confiable sin importar quién la haga.',
        criteria: 'Evidencia científica ausente',
    },
    {
        scenario: 'UNICEF publica su informe anual sobre pobreza infantil con datos de 100 países, metodología estadística detallada y acceso libre al conjunto de datos completo.',
        source: 'Informe anual de UNICEF',
        options: ['Confiable', 'No confiable'],
        correct: 0,
        explanation: 'Datos abiertos, metodología explícita y respaldo de organismo internacional reconocido son indicadores sólidos de confiabilidad.',
        criteria: 'Rigor institucional',
    },
    {
        scenario: 'Un video titulado "La verdad que te ocultan" tiene 2 millones de vistas, descripción vacía, no cita fuentes y el canal fue creado hace 3 semanas.',
        source: 'Canal de YouTube reciente sin fuentes',
        options: ['Confiable', 'No confiable'],
        correct: 1,
        explanation: 'Títulos conspiratorios, canal sin historial, sin fuentes citadas y sin autor identificable son señales claras de contenido no confiable.',
        criteria: 'Transparencia del origen',
    },
    {
        scenario: 'El DANE publica los resultados del censo nacional con fichas metodológicas completas, margen de error estadístico y comparativas históricas desde 1985.',
        source: 'DANE - Estadísticas nacionales oficiales',
        options: ['Confiable', 'No confiable'],
        correct: 0,
        explanation: 'Las agencias estadísticas gubernamentales con metodología pública y series históricas verificables son fuentes de alta confiabilidad.',
        criteria: 'Fuente oficial verificable',
    },
    {
        scenario: 'Una empresa farmacéutica emite un comunicado asegurando que su nuevo medicamento no tiene efectos secundarios, sin adjuntar ensayos clínicos independientes.',
        source: 'Comunicado de prensa corporativo',
        options: ['Confiable', 'No confiable'],
        correct: 1,
        explanation: 'Un comunicado propio tiene conflicto de interés directo. Sin validación independiente, las afirmaciones no son confiables.',
        criteria: 'Conflicto de interés directo',
    },
    {
        scenario: 'Una revisión sistemática publicada en The Lancet analiza 200 estudios sobre efectividad de vacunas con metodología PRISMA y declaración completa de fuentes de financiación.',
        source: 'Revista The Lancet - revisión sistemática',
        options: ['Confiable', 'No confiable'],
        correct: 0,
        explanation: 'Revisión sistemática con metodología estándar internacional (PRISMA) en una de las revistas médicas más prestigiosas del mundo.',
        criteria: 'Revisión sistemática',
    },
    {
        scenario: 'Recibes un email: "REENVÍA A TODOS: Científicos descubren que el bicarbonato cura la diabetes. ¡El gobierno lo censura!" Sin autor ni enlace a ninguna publicación.',
        source: 'Cadena de correo electrónico viral',
        options: ['Confiable', 'No confiable'],
        correct: 1,
        explanation: 'Lenguaje alarmista, llamado urgente a reenviar y ausencia total de fuentes son características típicas de la desinformación.',
        criteria: 'Lenguaje alarmista sin fuente',
    },
    {
        scenario: 'Una investigadora de Stanford presenta en un TED Talk los hallazgos de su estudio publicado en Nature, con datos abiertos y metodología reproducible disponibles en línea.',
        source: 'TED Talk respaldado por publicación en Nature',
        options: ['Confiable', 'No confiable'],
        correct: 0,
        explanation: 'Credenciales verificables, estudio en revista indexada y datos accesibles para replicación son garantías sólidas de confiabilidad.',
        criteria: 'Respaldo en publicación científica',
    },
    {
        scenario: 'Un usuario anónimo en Reddit afirma tener "información privilegiada" sobre una crisis financiera inminente, pero no puede revelar su identidad ni aportar documentos.',
        source: 'Usuario anónimo en Reddit',
        options: ['Confiable', 'No confiable'],
        correct: 1,
        explanation: 'El anonimato combinado con la imposibilidad de verificar la identidad o aportar evidencia hace que esta información sea completamente no confiable.',
        criteria: 'Anonimato sin evidencia',
    },
]);

const createQuestionBank = (data) => {
    const shuffle = (arr) => {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    return Object.freeze({
        getShuffled: () => shuffle(data),
        getSubset: (n) => shuffle(data).slice(0, n),
        getTotal: () => data.length,
    });
};

const questionBank = createQuestionBank(QUESTIONS_DATA);
