import type { DemoProfile } from "./types";

/** Data scientist & ML engineer: production models, competitions, applied ML writing. */
export const priya: DemoProfile = {
  user: {
    handle: "priya",
    name: "Priya Nair",
    avatarUrl: "https://randomuser.me/api/portraits/women/79.jpg",
    headline: "Data Scientist & ML Engineer · Forecasting, NLP, MLOps",
    bio: "I build machine learning systems that survive contact with production: demand forecasting, document understanding, and the pipelines that keep models honest. Kaggle Grandmaster and occasional teacher.",
    location: "Bengaluru, India",
    socialLinks: [
      { platform: "github", url: "https://github.com" },
      { platform: "kaggle", url: "https://kaggle.com" },
      { platform: "huggingface", url: "https://huggingface.co" },
      { platform: "linkedin", url: "https://linkedin.com" },
      { platform: "substack", url: "https://substack.com" },
    ],
  },
  settings: {
    templateId: "developer_terminal",
    colorPalette: "neon",
    primaryColor: "#2e1065",
    accentColor: "#c084fc",
    fontFamily: "mono",
    seoTitle: "Priya Nair — Data Scientist & ML Engineer",
    seoDescription: "Production ML, forecasting, and NLP work by Priya Nair.",
    seoKeywords: "data science, machine learning, MLOps, forecasting, NLP",
  },
  articles: [
    {
      title: "Your Forecast Is Wrong. Here's How to Know by How Much.",
      slug: "forecast-uncertainty",
      excerpt: "Quantile models and conformal prediction for forecasts that admit what they don't know.",
      content: `# Your Forecast Is Wrong. Here's How to Know by How Much.

Point forecasts hide risk. For a grocery chain's demand model we switched to **quantile gradient boosting with conformal calibration**.

## Results
- Prediction intervals hit their target coverage (90%) within **1.5 points**.
- Stock-outs dropped **18%** because planners trusted the upper bound.

The lesson: a calibrated "we're not sure" is worth more than a confident wrong number.`,
      coverImageUrl: null,
      tags: ["Forecasting", "Uncertainty", "Production ML"],
      isFeatured: true,
      isPublished: true,
    },
    {
      title: "The Boring MLOps Checklist That Saved Us",
      slug: "boring-mlops-checklist",
      excerpt: "Data contracts, shadow deployments, and drift alerts, in the order we wish we had added them.",
      content: `# The Boring MLOps Checklist That Saved Us

1. **Data contracts** on every upstream table.
2. **Shadow deploy** each new model for two weeks.
3. **Drift alerts** on inputs, not just accuracy.
4. A one-command **rollback**.`,
      coverImageUrl: null,
      tags: ["MLOps", "Engineering"],
      isFeatured: true,
      isPublished: true,
    },
  ],
  experiences: [
    {
      company: "Basketly",
      role: "Senior Data Scientist, Forecasting",
      location: "Bengaluru, India",
      employmentType: "Full-time",
      startDate: "2021-08",
      endDate: "Present",
      isCurrent: true,
      description: "Own demand forecasting for 2,300 stores and 40k SKUs. Built the feature store and the model monitoring stack.",
      skills: ["Python", "LightGBM", "PyTorch", "Airflow", "BigQuery"],
      companyUrl: "https://basketly.example.com",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      company: "DocuMind AI",
      role: "Machine Learning Engineer, NLP",
      location: "Remote",
      employmentType: "Full-time",
      startDate: "2019-01",
      endDate: "2021-07",
      isCurrent: false,
      description: "Shipped document-understanding models that extract fields from invoices and contracts at 96% accuracy.",
      skills: ["Transformers", "spaCy", "FastAPI", "Docker"],
      isFeatured: true,
      orderIndex: 1,
    },
  ],
  achievements: [
    {
      title: "Kaggle Competitions Grandmaster",
      issuer: "Kaggle",
      issueDate: "2023",
      description: "Five gold medals, including 1st place in a retail demand forecasting competition.",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      title: "Google Cloud Professional Machine Learning Engineer",
      issuer: "Google Cloud",
      issueDate: "2022",
      isFeatured: true,
      orderIndex: 1,
    },
  ],
  services: [
    {
      title: "ML Feasibility Audit",
      slug: "ml-feasibility-audit",
      shortDescription: "Find out in two weeks whether ML will actually move your metric.",
      pricingType: "fixed",
      price: "$4,000 / audit",
      deliverables: ["Data quality review", "Baseline model", "Go / no-go recommendation"],
      icon: "Cpu",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      title: "Applied ML Mentorship",
      slug: "applied-ml-mentorship",
      shortDescription: "1:1 sessions for data scientists moving from notebooks to production.",
      pricingType: "hourly",
      price: "$90 / hour",
      deliverables: ["Code review", "Career guidance", "System design practice"],
      icon: "Users",
      isFeatured: true,
      orderIndex: 1,
    },
  ],
  projects: [
    {
      title: "Store Demand Forecasting Platform",
      slug: "store-demand-forecasting",
      summary: "Probabilistic forecasts for 40k SKUs across 2,300 stores, retrained nightly.",
      role: "Tech Lead",
      status: "in_progress",
      timeline: "2022 – Present",
      techStack: ["LightGBM", "Conformal Prediction", "Airflow", "BigQuery"],
      highlights: ["18% fewer stock-outs", "$6M annual waste reduction"],
      isFeatured: true,
      orderIndex: 0,
    },
    {
      title: "tinyconformal",
      slug: "tinyconformal",
      summary: "A small Python library for conformal prediction intervals on any regressor.",
      role: "Author",
      status: "completed",
      timeline: "2023",
      repoUrl: "https://github.com/example/tinyconformal",
      techStack: ["Python", "NumPy", "scikit-learn"],
      highlights: ["1.1k GitHub stars", "Used in 3 university courses"],
      isFeatured: true,
      orderIndex: 1,
    },
  ],
  events: [
    {
      title: "PyData Global: Calibrated Forecasts in Practice",
      slug: "pydata-calibrated-forecasts",
      eventType: "Speaking",
      date: "Dec 4, 2026",
      location: "Virtual",
      description: "From point forecasts to trustworthy intervals with conformal prediction.",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      title: "Podcast: Data Science in Retail",
      slug: "podcast-data-science-retail",
      eventType: "Podcast",
      date: "Aug 2, 2026",
      location: "Online",
      description: "Conversation on forecasting, waste, and building trust with planners.",
      isFeatured: false,
      orderIndex: 1,
    },
  ],
};
