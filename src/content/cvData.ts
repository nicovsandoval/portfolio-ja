export interface PersonalInfo {
  name: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
}

export interface Skill {
  name: string;
  category: 'data' | 'tools' | 'methods' | 'soft';
}

export interface ExperienceRole {
  company: string;
  location: string;
  title: {
    es: string;
    en: string;
  };
  period: {
    es: string;
    en: string;
  };
  achievements: {
    es: string[];
    en: string[];
  };
}

export interface Education {
  institution: string;
  location: string;
  program: {
    es: string;
    en: string;
  };
  period: string;
}

export interface Course {
  name: {
    es: string;
    en: string;
  };
  date: string;
}

export const personalInfo: PersonalInfo = {
  name: 'Julio César Álvarez Gallo',
  location: 'Medellín, Colombia',
  email: 'jcalvarezg7@gmail.com',
  phone: '+57 3114349546',
  linkedin: 'https://www.linkedin.com/in/julalvar/',
};

export const skills: Skill[] = [
  { name: 'Excel', category: 'data' },
  { name: 'Power BI', category: 'data' },
  { name: 'SQL', category: 'data' },
  { name: 'Python', category: 'data' },
  { name: 'Power Apps', category: 'tools' },
  { name: 'Scrum', category: 'methods' },
  { name: 'Credit Risk Analysis', category: 'methods' },
  { name: 'Financial Planning', category: 'methods' },
  { name: 'Communication', category: 'soft' },
  { name: 'Teamwork', category: 'soft' },
  { name: 'Critical Thinking', category: 'soft' },
];

export const experience: ExperienceRole[] = [
  {
    company: 'Bancolombia',
    location: 'Medellín',
    title: {
      es: 'Analista Funcional – Riesgo de Crédito',
      en: 'Functional Analyst – Credit Risk',
    },
    period: {
      es: 'Ago 2023 – Ene 2025',
      en: 'Aug 2023 – Jan 2025',
    },
    achievements: {
      es: [
        'Refiné y automaticé modelos de evaluación de riesgo con SQL y Power BI, reduciendo en 5% el tiempo de procesamiento para clientes Pyme.',
        'Desarrollé dashboards de Power BI adoptados por más de 30 usuarios internos, mejorando la visibilidad de KPIs estratégicos.',
        'Implementé extracción y limpieza de datos en Python, disminuyendo en 20% el tiempo de preparación de reportes mensuales.',
        'Coordiné iniciativas de transformación digital con metodologías ágiles, aumentando en 12% la eficiencia operativa en flujos de riesgo.',
        'Documenté procesos y manuales, acelerando en 30% la capacitación de nuevos analistas.',
        'Lideré integración de datos financieros y de riesgo, elevando en 18% la precisión de reportes estratégicos.',
      ],
      en: [
        'Refined and automated credit risk evaluation models with SQL and Power BI, reducing processing time by 5% for SME clients.',
        'Designed Power BI dashboards adopted by 30+ internal users, improving visibility of strategic KPIs.',
        'Implemented Python-based data extraction and cleaning, cutting monthly report preparation time by 20%.',
        'Coordinated digital transformation initiatives with agile teams, increasing operational efficiency by 12% in risk workflows.',
        'Documented procedures and created training manuals, improving onboarding speed for new analysts by 30%.',
        'Led financial and risk data integration initiatives, increasing strategic report accuracy by 18%.',
      ],
    },
  },
  {
    company: 'Bancolombia',
    location: 'Medellín',
    title: {
      es: 'Practicante – EVC Corporativo',
      en: 'Corporate EVC Intern',
    },
    period: {
      es: 'Ene 2023 – Jul 2023',
      en: 'Jan 2023 – Jul 2023',
    },
    achievements: {
      es: [
        'Optimicé el ciclo de crédito usando el Interpretador de Políticas de Riesgo, reduciendo reprocesos en 15%.',
        'Gestioné Renovaciones Automáticas, disminuyendo en 2 minutos por operación el tiempo de respuesta en casos escalados.',
        'Apoyé la creación de indicadores financieros en Excel y Power BI, utilizados por 4 áreas para fortalecer la toma de decisiones.',
        'Colaboré en integración de análisis BI, incrementando en 10% la precisión de informes.',
      ],
      en: [
        'Optimized the credit cycle using the Credit Risk Policy Interpreter, reducing reprocessing by 15%.',
        'Managed Automatic Renewals, cutting response time by 2 minutes per operation for escalated requests.',
        'Supported development of financial indicators in Excel and Power BI, used by 4 departments to strengthen decision-making.',
        'Collaborated on BI analytics integration, boosting report accuracy by 10%.',
      ],
    },
  },
];

export const education: Education = {
  institution: 'Universidad Pontificia Bolivariana',
  location: 'Medellín',
  program: {
    es: 'Administración de Empresas',
    en: "Bachelor's Degree in Business Administration",
  },
  period: '2019 – 2023',
};

export const courses: Course[] = [
  {
    name: {
      es: 'Gestión Financiera – Rentabilidad',
      en: 'Financial Management – Profitability',
    },
    date: '2024-10',
  },
  {
    name: {
      es: 'Excel TOTAL – De Cero a Avanzado (Udemy)',
      en: 'Excel TOTAL – From Beginner to Advanced (Udemy)',
    },
    date: '2025-01',
  },
  {
    name: {
      es: 'SQL TOTAL – De Cero a Avanzado (Udemy)',
      en: 'SQL TOTAL – Master Databases from 0 to Advanced (Udemy)',
    },
    date: '2025-08',
  },
];
