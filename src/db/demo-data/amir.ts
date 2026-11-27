import type { DemoProfile } from "./types";

/** Cardiologist: clinical profile, publications, patient education, consultations. */
export const amir: DemoProfile = {
  user: {
    handle: "amir",
    name: "Dr. Amir Rahman",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    headline: "Consultant Cardiologist · Heart Failure & Preventive Cardiology",
    bio: "Board-certified cardiologist with 15 years of experience in heart failure care, cardiac imaging, and prevention. I believe patients make the best decisions when they understand their hearts, so I write and speak about cardiovascular health in plain language.",
    location: "Boston, MA",
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com" },
      { platform: "googlescholar", url: "https://scholar.google.com" },
      { platform: "researchgate", url: "https://researchgate.net" },
      { platform: "orcid", url: "https://orcid.org" },
      { platform: "youtube", url: "https://youtube.com" },
      { platform: "email", url: "clinic@example.com" },
    ],
  },
  settings: {
    templateId: "simple_professional",
    colorPalette: "ocean",
    primaryColor: "#0c4a6e",
    accentColor: "#22d3ee",
    fontFamily: "serif",
    seoTitle: "Dr. Amir Rahman — Consultant Cardiologist",
    seoDescription: "Clinical expertise, research, and patient education from cardiologist Dr. Amir Rahman.",
    seoKeywords: "cardiologist, heart failure, preventive cardiology, Boston",
  },
  articles: [
    {
      title: "Understanding Your Blood Pressure Numbers",
      slug: "understanding-blood-pressure",
      excerpt: "A plain-language guide to what systolic and diastolic readings mean and when to talk to your doctor.",
      content: `# Understanding Your Blood Pressure Numbers

Blood pressure is written as two numbers, like **120/80 mmHg**.

- The **top number (systolic)** is the pressure when your heart beats.
- The **bottom number (diastolic)** is the pressure between beats.

## Measuring at home
Sit quietly for five minutes, keep your arm supported at heart level, and take two readings a minute apart. Bring a week of readings to your appointment.

*This article is general education, not medical advice. Please discuss your own readings with your clinician.*`,
      coverImageUrl: null,
      tags: ["Patient Education", "Hypertension"],
      isFeatured: true,
      isPublished: true,
    },
    {
      title: "What Remote Monitoring Changed in Heart Failure Care",
      slug: "remote-monitoring-heart-failure",
      excerpt: "Three years of a remote monitoring program, and what it taught our team about early intervention.",
      content: `# What Remote Monitoring Changed in Heart Failure Care

Our clinic enrolled **620 patients** in a remote monitoring program using connected scales and blood pressure cuffs.

## Results
- 30-day readmissions fell by **22%**.
- Nurses intervened a median of **4 days earlier** when fluid started to build.
- Patients reported feeling "less alone" between visits.`,
      coverImageUrl: null,
      tags: ["Heart Failure", "Digital Health", "Research"],
      isFeatured: true,
      isPublished: true,
    },
  ],
  education: [
    {
      institution: "Rivergate University",
      degree: "PhD",
      fieldOfStudy: "Computational Biology",
      location: "Geneva, Switzerland",
      startDate: "2014-09",
      endDate: "2019-03",
      isCurrent: false,
      grade: "Magna Cum Laude",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      institution: "Rivergate University",
      degree: "MSc",
      fieldOfStudy: "Bioinformatics",
      location: "Geneva, Switzerland",
      startDate: "2012-09",
      endDate: "2014-06",
      isCurrent: false,
      grade: null,
      isFeatured: true,
      orderIndex: 1,
    },
  ],
  experiences: [
    {
      company: "Harbor General Hospital",
      role: "Consultant Cardiologist & Director, Heart Failure Program",
      location: "Boston, MA",
      employmentType: "Full-time",
      startDate: "2017-07",
      endDate: "Present",
      isCurrent: true,
      description: "Lead a multidisciplinary heart failure program of 14 clinicians. Established the hospital's remote monitoring service and a cardio-oncology clinic.",
      skills: ["Heart Failure", "Echocardiography", "Cardiac MRI", "Clinical Leadership"],
      companyUrl: "https://harborgeneral.example.com",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      company: "Northshore University Medical Center",
      role: "Cardiology Fellow",
      location: "Chicago, IL",
      employmentType: "Full-time",
      startDate: "2013-07",
      endDate: "2017-06",
      isCurrent: false,
      description: "Fellowship in cardiovascular disease with advanced training in cardiac imaging. Chief fellow in final year.",
      skills: ["Cardiac Imaging", "Interventional Basics", "Clinical Research"],
      isFeatured: true,
      orderIndex: 1,
    },
    {
      company: "Lakeside Medical School",
      role: "Assistant Professor of Medicine",
      location: "Boston, MA",
      employmentType: "Part-time",
      startDate: "2018-09",
      endDate: "Present",
      isCurrent: true,
      description: "Teach cardiovascular physiology and mentor residents in clinical research.",
      skills: ["Medical Education", "Mentorship"],
      isFeatured: false,
      orderIndex: 2,
    },
  ],
  achievements: [
    {
      title: "Board Certification, Cardiovascular Disease",
      issuer: "American Board of Internal Medicine",
      issueDate: "2017",
      description: "Certified in cardiovascular disease, with maintenance of certification current.",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      title: "Fellow of the American College of Cardiology (FACC)",
      issuer: "American College of Cardiology",
      issueDate: "2020",
      description: "Recognized for clinical excellence and contributions to cardiovascular care.",
      isFeatured: true,
      orderIndex: 1,
    },
    {
      title: "Hospital Teaching Award",
      issuer: "Harbor General Hospital",
      issueDate: "2023",
      description: "Voted by internal medicine residents for outstanding clinical teaching.",
      isFeatured: false,
      orderIndex: 2,
    },
  ],
  services: [
    {
      title: "Cardiology Consultation",
      slug: "cardiology-consultation",
      shortDescription: "In-person or telehealth consultation for new or ongoing heart concerns.",
      fullDescription: "A full review of your history, current medications, and prior tests, with a clear plan we agree on together. Referrals and most insurance plans accepted.",
      pricingType: "quote",
      price: "Insurance accepted",
      deliverables: ["60-minute consultation", "Written care plan", "Follow-up coordination with your GP"],
      icon: "HeartPulse",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      title: "Second Opinion Review",
      slug: "second-opinion-review",
      shortDescription: "Independent review of a diagnosis or recommended procedure.",
      pricingType: "fixed",
      price: "$450 / review",
      deliverables: ["Record and imaging review", "45-minute video call", "Written opinion"],
      icon: "FileText",
      isFeatured: true,
      orderIndex: 1,
    },
    {
      title: "Speaking & Medical Education",
      slug: "speaking-medical-education",
      shortDescription: "Talks for clinicians, health systems, and patient communities.",
      pricingType: "quote",
      price: "On request",
      deliverables: ["Keynotes", "Grand rounds", "Community health talks"],
      icon: "Mic",
      isFeatured: false,
      orderIndex: 2,
    },
  ],
  projects: [
    {
      title: "HeartWatch Remote Monitoring Program",
      slug: "heartwatch-remote-monitoring",
      summary: "Hospital-wide remote monitoring for heart failure patients using connected scales and nurse-led triage.",
      description: "<p>Designed the clinical protocol, alert thresholds, and nurse escalation pathway; partnered with IT to integrate readings into the electronic health record.</p>",
      role: "Clinical Lead",
      status: "in_progress",
      timeline: "2021 – Present",
      techStack: ["Remote Monitoring", "EHR Integration", "Nurse-led Triage"],
      highlights: ["620 patients enrolled", "22% fewer 30-day readmissions"],
      isFeatured: true,
      orderIndex: 0,
    },
    {
      title: "Cardio-Oncology Clinic",
      slug: "cardio-oncology-clinic",
      summary: "A joint clinic protecting the hearts of patients receiving cancer therapy.",
      role: "Co-founder",
      status: "completed",
      timeline: "2019",
      techStack: ["Echocardiography", "Strain Imaging", "Multidisciplinary Care"],
      highlights: ["400+ patients seen in year one", "Shared protocol adopted by 3 regional hospitals"],
      isFeatured: true,
      orderIndex: 1,
    },
  ],
  events: [
    {
      title: "Grand Rounds: Remote Monitoring in Heart Failure",
      slug: "grand-rounds-remote-monitoring",
      eventType: "Speaking",
      date: "Sep 24, 2026",
      location: "Boston, MA",
      description: "Outcomes and lessons from three years of the HeartWatch program.",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      title: "Community Talk: Know Your Heart Numbers",
      slug: "community-know-your-heart-numbers",
      eventType: "Workshop",
      date: "Nov 9, 2026",
      location: "Boston Public Library",
      description: "A free talk for the public on blood pressure, cholesterol, and when to see a doctor.",
      isFeatured: true,
      orderIndex: 1,
    },
  ],
};
