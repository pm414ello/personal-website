// All the words on the site live here. Change this file to change the site;
// you don't need to touch the layout code.

export const content = {
  name: 'Meet Patel',
  title: 'Problem Solver',
  photo: '/headshot.jpg', // the file lives in public/
  resume: '/Meet_Patel_Resume.pdf', // the file lives in public/; replace it to update
  tagline:
    'Building lasting solutions for messy problems across healthcare, pharma, medtech and finance.',

  // Wrap words in **double stars** to show them in gold, or ++double pluses++ for blue.
  about: [
    'Every project comes down to the ++proper proportions of process, product and people++.\nWhether it’s a broken workflow, an outdated tool or thin bandwidth, **I help find this balance**.',
    'Solution Delivery Manager at TurningPoint Healthcare Solutions. Before that: UnitedHealthcare, Fannie Mae, NYU Langone, Turnberry Solutions, Johnson & Johnson. Different industries, same approach: clear requirements, a tangible delivery plan and adoption that lasts.',
    'Off the Clock: Basketball, Running, Statistical Sports Analysis, Architecture, Interior Design and Cultural Cuisines.',
  ],

  // Shown as big-number cards in the "Highlights" section.
  highlights: [
    {
      stat: '$130M+',
      label: 'In MSK Care Savings',
      summary: 'Requirements and solution designs at TurningPoint Healthcare Solutions.',
    },
    {
      stat: '1,700+',
      label: 'Projects in View',
      summary: 'C-suite dashboards across 24+ portfolios at NYU Langone Health.',
    },
    {
      stat: '90%',
      label: 'Faster Processes',
      summary: 'Merged 56 siloed data sources into one connection for an F50 pharma client.',
    },
    {
      stat: '75+',
      label: 'Cloud Systems Integrated',
      summary: 'Salesforce, SAP and Genesys moved into Azure during a global divestiture.',
    },
    {
      stat: '20',
      label: 'Health Plans Served',
      summary: 'Primary liaison for provider survey programs at UnitedHealthcare.',
    },
    {
      stat: '$14M',
      label: 'Loan Program Tracked',
      summary: 'Executive Power BI reporting for a multi-year Fannie Mae program.',
    },
  ],

  // "What I do" cards.
  expertise: [
    {
      name: 'Data Democratization & Strategy',
      summary: 'Put trusted data in everyone’s hands: one shared data layer, a central resource hub, and dashboards people actually use. I bridge business and IT.',
    },
    {
      name: 'Program & Project Delivery',
      summary: 'Clear goals, real timelines, cross-functional teams, and risks handled before they become delays.',
    },
    {
      name: 'Process Automation & AI',
      summary: 'Replace manual back-and-forth with workflows and AI agents that run on their own.',
    },
    {
      name: 'Change Management & Communication',
      summary: 'New tools and ways of working that people actually adopt: training, rollout plans, standard docs, team hubs and updates anyone can follow.',
    },
  ],

  // "Selected work" case studies. Click a card to see its slide (files in public/work/).
  caseStudies: [
    {
      title: 'Supply Chain Common Data Layer',
      summary: 'Built one Azure data layer so supply chain teams stop re-pulling the same data for every analytics project.',
      client: 'Johnson & Johnson (via Turnberry Solutions)',
      problem: 'Supply chain data was spread across 170+ apps. Every analytics project paid to pull it again.',
      did: 'Led data democratization as main point of contact for moving 115 apps and 3,755 tables into one Azure data layer, with a central resource hub for every team. Kept regional and global teams aligned through turnover and scope changes.',
      result: 'One source of truth, heading to 230+ apps and 23,500 tables, refreshed near real time.',
      tags: ['Azure', 'Data Ingestion', 'Stakeholder Management'],
      slide: { src: '/work/cdl-architecture.png', alt: 'CDL reference architecture', caption: 'How the common data layer is built: raw data comes in from source systems, gets cleaned into one shared model, and is served to analytics and AI use cases.' },
    },
    {
      title: 'Federal Accounts Audit Remediation',
      summary: 'Cleared a federal audit backlog with a repeatable process to diagnose, route and verify every flagged account.',
      client: 'Comcast (via Turnberry Solutions)',
      problem: 'An audit flagged 5,200+ federal accounts. Only a third were fixed.',
      did: 'Led a junior analyst team through a decision-tree process to diagnose, route and verify every account.',
      result: 'Every account diagnosed and routed in 8 weeks. Our team remediated 1,894 of them directly.',
      tags: ['Compliance', 'Process Design', 'Team Leadership'],
      slide: { src: '/work/remediation-progress.png', alt: 'Weekly remediation progress chart', caption: 'Week-by-week progress of the remediation sprint: accounts diagnosed and remediated, building to every account being cleared.' },
    },
    {
      title: 'Delivery Reliability Failure-Mode Automation',
      summary: 'Gave every late delivery a root cause with a weekly process that tags misses automatically before Monday morning.',
      client: 'Ethicon',
      problem: 'Late deliveries were tracked, but nobody could say why.',
      did: 'Built a weekly process that tags every miss with its root cause, plus a monthly review across four regions.',
      result: 'Root causes visible by product and region. The supporting tool saved 30+ hours a week.',
      tags: ['Supply Chain', 'Automation', 'Reporting'],
      slide: { src: '/work/failure-modes.png', alt: 'Failure-mode hierarchy for late deliveries', caption: 'Every late delivery enters at the top. Each layer of automated logic tags more of them, so only a small set is left for a manual call.' },
    },
    {
      title: 'PMO Toolkit',
      summary: 'A reusable kit of roadmaps, trackers, status reports and a risk register, so every program reports the same way.',
      client: 'Reusable Templates',
      problem: "Every program built its own status deck, so leaders couldn't compare them.",
      did: 'Created one kit: roadmaps, timelines, stage-gate trackers, status reports and a risk register.',
      result: 'Faster reporting, and one format for every program.',
      tags: ['PMO', 'Executive Reporting', 'Templates'],
      slide: { src: '/work/pmo-stage-gates.png', alt: 'Stage-gate tracker template with item status across four stages', caption: 'The stage-gate tracker from the kit: every item across planning, development, validation and implementation, with its status and a roll-up count for each stage.' },
    },
    {
      title: 'Meetings to Smartsheet Agent',
      summary: 'A Copilot Studio build guide for an agent that turns client meetings into approved RAAIDD log and project plan updates.',
      client: 'Copilot Studio Guide',
      problem: 'Decisions, risks and actions from meetings were logged by hand, late or not at all.',
      did: 'Designed the agent end to end: what it reads, four skills, routing rules for each sheet, an approval step and a daily sweep.',
      result: 'A step-by-step guide ready to build, with a Jira roadmap and a companion agent that emails meeting minutes.',
      tags: ['Copilot Studio', 'AI Agents', 'MCP'],
      slide: { src: '/work/copilot-agent.png', alt: 'Agent flow from gathering meeting sources to logging approved updates', caption: 'The agent’s flow and routing rules: each meeting item goes to the RAAIDD log, the project plan, both, or OneNote, and nothing is written until I approve.' },
    },
    {
      title: 'The Two-Flex Board',
      summary: 'A fantasy football draft tool for a 12-team, two-flex league, built with Claude.',
      client: 'Side Project - Fantasy Football',
      problem: 'Draft-day rankings, ADP and strategy lived in separate places, so picks came down to gut feel.',
      did: 'Built one board with my own tiers next to ADP, seven position-timing rules, and live tracking of every pick.',
      result: 'One screen that shows who is a value, who is overpriced and what to take next.',
      tags: ['Claude', 'Data Analysis', 'Product Design'],
      slide: { src: '/work/draft-board.png', alt: 'The Two-Flex Board draft tool with tiers, ADP gaps and draft rules', caption: 'The board during a draft: my tiers next to ADP, the gap that flags values and reaches, and the seven rules that guide each pick.' },
    },
  ],

  // "References". Short excerpts from written feedback.
  testimonials: [
    {
      quote:
        'Meet and the team did a great job coordinating with our health plan… it was just a great partnership.',
      who: 'Director of Network Programs, Health Plan Partner',
      org: 'UnitedHealthcare',
    },
    {
      quote:
        'Meet has come in and hit the ground running on our survey process and brought much needed structure. He is organized and efficient.',
      who: 'Senior Manager',
      org: 'UnitedHealthcare',
    },
    {
      quote:
        'He stepped into a highly demanding and high-profile program—one of the most critical within the organization—and quickly began contributing meaningful value.',
      who: 'Director',
      org: 'Fannie Mae',
    },
    {
      quote:
        'Engaging with stakeholders with a sense of urgency and attention to detail that made the execution of disposition plans as easy as possible.',
      who: 'Supply Chain Technology Lead',
      org: 'Johnson & Johnson / Kenvue',
    },
    {
      quote:
        "Meet is a great asset to the team and has worked on several critical and impactful projects… He was able to deal with a lot of ambiguity across these various projects and handle 'white space.'",
      who: 'Data & AI Leader',
      org: 'Johnson & Johnson',
    },
    {
      quote:
        'Having now had experience on both the Business and IT side in J&J, Meet has built a great amount of knowledge of analytics.',
      who: 'Lead, Technical Product Architect',
      org: 'Johnson & Johnson',
    },
  ],

  // Shown LinkedIn-style. Dates are "YYYY-MM"; end: null means "Present".
  // logo: a file in public/logos/. If it is missing, a colored initials badge shows instead.
  // url: where clicking the logo goes (company site).
  experience: [
    {
      role: 'Solution Delivery Manager',
      org: 'TurningPoint Healthcare Solutions',
      location: 'Lake Mary, FL (Remote)',
      start: '2026-06',
      end: null,
      logo: '/logos/turningpoint.png',
      url: 'https://www.turningpoint-healthcare.com/',
      color: '#0b6e99',
      bullets: [
        "Translate client needs into internal requirements and solution designs, saving +$130M for musculoskeletal (MSK) care treatments",
        "Coordinate implementation activities across technology and provider relations, owning timelines, dependencies, and risk escalation",
        "Author solution documentation, contract requirement reviews, and stakeholder status reporting",
      ],
    },
    {
      role: 'Provider Ops & Capabilities Consultant',
      org: 'UnitedHealthcare Community & State',
      location: 'Minnetonka, MN (Remote)',
      start: '2025-05',
      end: '2026-05',
      logo: '/logos/unitedhealthcare.svg',
      url: 'https://www.uhc.com/communityplan',
      color: '#002677',
      bullets: [
        "Owned end-to-end provider survey execution (methodology, fielding, reporting), serving as primary liaison for 20 Health Plans",
        "Oversaw survey vendor selection, SLA adherence, and financials, including budget tracking and cross-plan cost allocation",
        "Published market and cohort-level insights to leadership forums, informing portfolio investment, RFP support, and market strategies",
        "Established SharePoint knowledge base and operational playbook standardizing enterprise governance",
      ],
    },
    {
      role: 'Finance Transformation Program Manager',
      org: 'Fannie Mae',
      location: 'Reston, VA (Remote)',
      start: '2025-03',
      end: '2025-05',
      logo: '/logos/fanniemae.png',
      url: 'https://www.fanniemae.com/',
      color: '#05357e',
      bullets: [
        "Designed executive presentations and Power BI dashboards for a multi-year, $14M loan program",
        "Built data-driven trackers for timeline, status, and financial impacts, reducing decision-making delays by 30%",
      ],
    },
    {
      role: 'Senior EPMO Analyst',
      org: 'NYU Langone Health',
      location: 'New York, NY (Remote)',
      start: '2023-11',
      end: '2025-03',
      logo: '/logos/nyulangone.svg',
      url: 'https://nyulangone.org/',
      color: '#57068c',
      bullets: [
        "Developed C-suite dashboards and real-time status reports covering 1,700+ projects across 24+ portfolios",
        "Drove ClickUp PPM rollout through template migration, workflow design, and user training, cutting manual effort by 20%",
      ],
    },
    {
      role: 'Digital Strategy Consultant',
      org: 'Turnberry Solutions',
      location: 'Minneapolis, MN (Remote)',
      start: '2021-02',
      end: '2023-10',
      logo: '/logos/turnberry.png',
      url: 'https://www.turnberrysolutions.com/',
      color: '#1f4e79',
      bullets: [
        "Client facing roles: Business Analyst, Product Analyst, Product Owner, Product Manager",
        "Directed data disposition and IT architecture for $6M+ global digital apps during F50 Pharma/MD client's consumer divestiture",
        "Governed data democratization and integration of 75+ cloud systems (Salesforce, SAP, Genesys) into an Azure common data layer, curating a central resource hub for every team",
        "Automated enterprise workflows by consolidating 56 siloed data sources into a single connection, reducing process times by 90% and saving 40+ labor hours monthly",
        "Led junior analyst team through audit remediation of 5,000+ government accounts in an 11-week sprint, ensuring federal compliance for F30 telecom client",
      ],
    },
    {
      role: 'Senior Graduate Supply Chain Co-Op',
      org: 'Johnson & Johnson',
      location: 'New Brunswick, NJ',
      start: '2019-12',
      end: '2020-12',
      logo: '/logos/jnj.png',
      url: 'https://www.jnj.com/',
      color: '#c8102e',
      bullets: [
        "Deployed STEM repository via SDLC, saving 30+ labor hours weekly and accelerating OTIF-D failure-mode automation",
        "Produced 10+ recurring reports and metrics for the Faster Forward strategy program",
        "Planned and created C&CD Alumni database, providing visibility on 50,000+ employees",
      ],
    },
    {
      role: 'Account Executive',
      org: 'mrsubs (Krishna Lila LLC)',
      location: 'South Plainfield, NJ',
      start: '2017-06',
      end: '2019-06',
      logo: '/logos/mrsubs.webp',
      url: 'https://www.mrsubs.com/',
      color: '#2e7d32',
      bullets: [
        "Partnered with food delivery services (Grubhub, DoorDash, Uber Eats), generating $350K annual revenue growth",
        "Streamlined production via value stream mapping, reducing make time 7% in 8 months",
      ],
    },
  ],

  education: [
    'M.S. Supply Chain Analytics, Rutgers Business School (2020)',
    'B.S. Supply Chain Management, Rutgers Business School (2019)',
  ],

  skills: [
    'Power BI',
    'Tableau',
    'SQL',
    'Power Automate',
    'Alteryx',
    'UiPath',
    'Celonis',
    'Azure DevOps',
    'JIRA',
    'Smartsheet',
    'Agile (SAFe / SDLC)',
    'Claude',
    'Copilot agents',
  ],

  certifications: [
    'Professional Scrum Master I',
    'Lean Six Sigma Yellow Belt',
    'Product Management Foundations',
    'UX Design Fundamentals',
  ],

  contact: {
    blurb: 'Open to conversations about healthcare technology, delivery and AI. Email or LinkedIn is best.',
    email: 'meetnpatel14@gmail.com',
    linkedin: 'https://www.linkedin.com/in/meetnpatel14/',
  },
}
