import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { db } from "./index";
import { users, portfolioSettings, articles, experiences, achievements, services, projects, events, contacts } from "./schema";
import bcrypt from "bcryptjs";
import { estimateReadTime } from "../lib/rich-text";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Starting database seeding...");

  // Clean existing demo user if exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.handle, "sarah"),
  });

  if (existingUser) {
    console.log("Removing existing demo user 'sarah'...");
    await db.delete(users).where(eq(users.id, existingUser.id));
  }

  // 1. Create Demo User
  const hashedPassword = await bcrypt.hash("password123", 10);
  const [user] = await db
    .insert(users)
    .values({
      email: "sarah@example.com",
      passwordHash: hashedPassword,
      handle: "sarah",
      name: "Sarah Jenkins",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      headline: "Principal Distributed Systems Architect & Tech Speaker",
      bio: "Crafting resilient cloud-native architectures, high-throughput microservices, and developer infrastructure. Dedicated open-source maintainer and international tech speaker.",
      location: "San Francisco, CA",
      socialLinks: {
        github: "https://github.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        website: "https://sarahjenkins.dev",
      },
    })
    .returning();

  console.log(`✓ Created demo user: ${user.name} (@${user.handle})`);

  // 2. Portfolio Settings
  await db.insert(portfolioSettings).values({
    userId: user.id,
    templateId: "bento_grid", // default demo layout
    colorPalette: "emerald",
    primaryColor: "#047857",
    accentColor: "#10b981",
    fontFamily: "sans",
    seoTitle: "Sarah Jenkins — Distributed Systems Architect",
    seoDescription: "Portfolio, writings, and architectural services by Sarah Jenkins.",
    seoKeywords: "cloud, distributed systems, architecture, kubernetes, nextjs",
  });
  console.log("✓ Created portfolio settings");

  // 3. Articles
  const articleRows = [
    {
      userId: user.id,
      title: "Scaling Event-Driven Systems to 10M Concurrent Transactions",
      slug: "scaling-event-driven-systems",
      excerpt: "Lessons learned building asynchronous event brokers using Apache Kafka, Redis Streams, and PostgreSQL transactional outbox patterns.",
      content: `# Scaling Event-Driven Systems to 10M Concurrent Transactions

Modern cloud architectures demand near real-time throughput with strict consistency guarantees. In this article, we dive into practical design patterns for building resilient message backbones.

## The Dual-Write Problem
When updating a relational database and publishing to a message broker, failures can lead to split-brain states. The **Transactional Outbox Pattern** ensures consistency:

1. Write both state and outbound events in a single database transaction.
2. A separate daemon polls or tails the WAL (Write-Ahead Log) to dispatch events.
3. Message brokers guarantee at-least-once delivery with deduplication on the consumer end.

## Benchmark Results
By transitioning from synchronous HTTP RPCs to event streams, p99 latency dropped by **64%**, while system resilience during node failover increased to 99.999% uptime.`,
      coverImageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
      tags: ["Distributed Systems", "Kafka", "PostgreSQL", "Cloud"],
      isFeatured: true,
      isPublished: true,
    },
    {
      userId: user.id,
      title: "Zero-Downtime PostgreSQL Schema Migrations at Scale",
      slug: "zero-downtime-postgres-migrations",
      excerpt: "How to safely add columns, alter constraints, and backfill billions of rows without table locks or service interruptions.",
      content: `# Zero-Downtime PostgreSQL Schema Migrations at Scale

Database migrations shouldn't require midnight maintenance windows or risk site outages. Here is how we engineer safe schema updates.

### 1. Expanding and Contracting
Never make destructive changes in a single release. Follow the two-phase approach:
- Phase 1: Add new column, dual-write to old and new columns.
- Phase 2: Backfill existing data asynchronously in batches.
- Phase 3: Switch readers to new column.
- Phase 4: Deprecate and drop old column.

### 2. Guarding Against Exclusive Locks
Avoid \`ALTER TABLE ... ADD COLUMN ... DEFAULT\` without PostgreSQL 11+ optimizations, and never create indexes without the \`CONCURRENTLY\` keyword.`,
      coverImageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
      tags: ["Database", "PostgreSQL", "DevOps"],
      isFeatured: true,
      isPublished: true,
    },
    {
      userId: user.id,
      title: "Building Deterministic Distributed Workers with Rust",
      slug: "deterministic-workers-rust",
      excerpt: "Leveraging Rust's ownership model and type system to write ultra-low-memory background job processors.",
      content: `# Building Deterministic Distributed Workers with Rust

When processing telemetry data at 100,000 packets per second, garbage collection pauses become noticeable bottlenecks. We explored replacing Go workers with Rust to eliminate jitter.`,
      coverImageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
      tags: ["Rust", "Performance", "Concurrency"],
      isFeatured: false,
      isPublished: true,
    },
  ];
  await db
    .insert(articles)
    .values(articleRows.map((a) => ({ ...a, readTime: estimateReadTime(a.content) })));
  console.log("✓ Created articles");

  // 4. Experiences
  await db.insert(experiences).values([
    {
      userId: user.id,
      company: "Apex Cloud Infrastructure",
      role: "Staff Infrastructure Architect",
      location: "San Francisco, CA (Remote)",
      employmentType: "Full-time",
      startDate: "2023-01",
      endDate: "Present",
      isCurrent: true,
      description: "Spearheaded the core platform engineering team serving over 4,000 internal engineers. Re-architected multi-region cluster topologies, reduced cloud infrastructure overhead by $2.4M annually, and established platform resiliency standards.",
      skills: ["Kubernetes", "Go", "Terraform", "PostgreSQL", "eBPF"],
      companyUrl: "https://apexcloud.example.com",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      userId: user.id,
      company: "Vanguard Systems",
      role: "Senior Backend Engineer",
      location: "New York, NY",
      employmentType: "Full-time",
      startDate: "2020-04",
      endDate: "2022-12",
      isCurrent: false,
      description: "Engineered low-latency settlement engines processing $18B in annual volume. Designed event-sourced ledger architecture with strict ACID guarantees and sub-20ms settlement response times.",
      skills: ["TypeScript", "Node.js", "Kafka", "Redis", "Docker"],
      companyUrl: "https://vanguard.example.com",
      isFeatured: true,
      orderIndex: 1,
    },
    {
      userId: user.id,
      company: "Nexus Labs",
      role: "Full-Stack Software Engineer",
      location: "Seattle, WA",
      employmentType: "Full-time",
      startDate: "2018-06",
      endDate: "2020-03",
      isCurrent: false,
      description: "Developed developer productivity tools and analytics dashboards using Next.js and GraphQL, accelerating deployment velocity across 30+ product squads.",
      skills: ["React", "Next.js", "GraphQL", "PostgreSQL"],
      companyUrl: "https://nexuslabs.example.com",
      isFeatured: false,
      orderIndex: 2,
    },
  ]);
  console.log("✓ Created experiences");

  // 5. Achievements
  await db.insert(achievements).values([
    {
      userId: user.id,
      title: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      issueDate: "2024",
      credentialUrl: "https://aws.amazon.com/verification",
      badgeUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200&auto=format&fit=crop&q=80",
      description: "Demonstrated advanced technical expertise in designing distributed applications and systems on AWS cloud platforms.",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      userId: user.id,
      title: "Cloud Native Computing Foundation (CNCF) Contributor Award",
      issuer: "Linux Foundation / CNCF",
      issueDate: "2023",
      credentialUrl: "https://cncf.io",
      badgeUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=200&auto=format&fit=crop&q=80",
      description: "Recognized for core contributions to container runtime performance optimizations and observability tooling.",
      isFeatured: true,
      orderIndex: 1,
    },
    {
      userId: user.id,
      title: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      issueDate: "2022",
      credentialUrl: "https://cncf.io",
      description: "Proven competence in Kubernetes cluster architecture, networking, security, and troubleshooting.",
      isFeatured: false,
      orderIndex: 2,
    },
  ]);
  console.log("✓ Created achievements");

  // 6. Services
  await db.insert(services).values([
    {
      userId: user.id,
      title: "Cloud Architecture & Scalability Audit",
      slug: "cloud-architecture-audit",
      shortDescription: "Comprehensive 2-week architectural assessment of your cloud systems, bottleneck analysis, and cost optimization roadmap.",
      fullDescription: `Are you encountering unpredictable outages, sluggish microservice RPCs, or runaway cloud invoices? 

Our Cloud Architecture Audit delivers an objective, deep-dive examination of your entire platform:
- Distributed tracing and bottleneck discovery
- Database query tuning & connection pooling healthcheck
- High availability & disaster recovery validation
- Actionable prioritized blueprint for immediate wins and long-term stability`,
      pricingType: "fixed",
      price: "$3,500 / audit",
      deliverables: [
        "Complete System Topology Diagram",
        "P99 Latency & Bottleneck Analysis Report",
        "Database Indexing & Query Tuning Recommendations",
        "Executive Summary & 2-Hour Strategy Debrief",
      ],
      icon: "ShieldCheck",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      userId: user.id,
      title: "High-Throughput Microservice Engineering",
      slug: "microservice-engineering",
      shortDescription: "Design and implementation of critical backend services requiring sub-10ms response times and fault tolerance.",
      fullDescription: `When off-the-shelf solutions can't keep up with your data velocity, custom distributed engines engineered for concurrency and resilience are essential. We specialize in building bulletproof backends in Go, Rust, and Node.js.`,
      pricingType: "fixed",
      price: "$6,000 / project",
      deliverables: [
        "Production-ready tested microservice codebase",
        "Docker & Helm deployment charts",
        "Automated CI/CD and stress test harness",
        "OpenAPI and gRPC documentation",
      ],
      icon: "Cpu",
      isFeatured: true,
      orderIndex: 1,
    },
    {
      userId: user.id,
      title: "Technical Advisory & Engineering Mentorship",
      slug: "technical-advisory",
      shortDescription: "Bi-weekly advisory sessions for engineering leaders, CTOs, and staff engineers tackling scale.",
      fullDescription: `Strategic 1-on-1 technical advisory designed to help fast-growing teams avoid costly architectural missteps and refine engineering leadership culture.`,
      pricingType: "hourly",
      price: "$250 / hour",
      deliverables: [
        "Bi-weekly 60-minute strategy calls",
        "Async architecture document reviews via Slack/GitHub",
        "Hiring guidance and technical interview design",
      ],
      icon: "Users",
      isFeatured: false,
      orderIndex: 2,
    },
  ]);
  console.log("✓ Created services");

  // 6b. Projects
  await db.insert(projects).values([
    {
      userId: user.id,
      title: "Streamline: Realtime Event Pipeline",
      slug: "streamline-event-pipeline",
      summary: "Open-source streaming engine that ingests, enriches, and fans out millions of events per second with exactly-once delivery.",
      description: `<p>Streamline started as an internal tool to replace a brittle chain of cron jobs and queues. It grew into a standalone open-source project used by several fintech and logistics teams.</p><h2>Architecture</h2><ul><li>Partitioned log built on Kafka with a Go consumer runtime</li><li>Pluggable enrichment stages compiled to WebAssembly</li><li>Idempotent sinks for Postgres, ClickHouse, and S3</li></ul><p>The hardest problem was keeping exactly-once guarantees while allowing hot-reloading of pipeline stages.</p>`,
      role: "Creator & Maintainer",
      status: "in_progress",
      timeline: "2023 – Present",
      repoUrl: "https://github.com/example/streamline",
      liveUrl: "https://streamline.example.com",
      techStack: ["Go", "Kafka", "WebAssembly", "ClickHouse"],
      highlights: [
        "2M events/sec sustained on a 6-node cluster",
        "p99 end-to-end latency under 15ms",
        "1.4k GitHub stars and 40+ contributors",
      ],
      isFeatured: true,
      orderIndex: 0,
    },
    {
      userId: user.id,
      title: "Atlas Cloud Cost Explorer",
      slug: "atlas-cost-explorer",
      summary: "Internal dashboard that attributes cloud spend to teams and services, surfacing waste and right-sizing opportunities.",
      description: `<p>Built for a 300-engineer organisation whose AWS bill was growing faster than revenue. Atlas joins billing exports with Kubernetes metadata to show cost per service, per team, per request.</p>`,
      role: "Lead Engineer",
      status: "completed",
      timeline: "2022",
      techStack: ["TypeScript", "Next.js", "PostgreSQL", "AWS"],
      highlights: [
        "Identified $1.1M in annual savings in the first quarter",
        "Adopted by 24 engineering teams",
      ],
      isFeatured: true,
      orderIndex: 1,
    },
    {
      userId: user.id,
      title: "Helmsman Deploy CLI",
      slug: "helmsman-deploy-cli",
      summary: "A tiny Rust CLI that turns a single YAML file into safe, progressive Kubernetes rollouts with automatic rollback.",
      role: "Solo Developer",
      status: "archived",
      timeline: "2021",
      repoUrl: "https://github.com/example/helmsman",
      techStack: ["Rust", "Kubernetes", "Helm"],
      highlights: ["Canary + blue/green strategies out of the box"],
      isFeatured: false,
      orderIndex: 2,
    },
  ]);
  console.log("✓ Created projects");

  // 7. Events
  await db.insert(events).values([
    {
      userId: user.id,
      title: "Keynote: Architectural Patterns for Extreme Fault Tolerance",
      slug: "keynote-extreme-fault-tolerance",
      eventType: "Speaking",
      date: "Dec 12, 2026",
      location: "San Francisco, CA (Moscone Center)",
      eventUrl: "https://qcon.example.com",
      description: "Opening keynote at QCon SF 2026 covering how modern distributed systems survive cascading network partitions and cloud provider outages.",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      userId: user.id,
      title: "Hands-on Workshop: Building Event Streams with Kafka & Postgres",
      slug: "workshop-kafka-postgres",
      eventType: "Workshop",
      date: "Nov 28, 2026",
      location: "Virtual (Live Stream)",
      eventUrl: "https://cloudworkshop.example.com",
      description: "4-hour interactive workshop implementing the transactional outbox pattern, Debezium CDC, and zero-loss consumer groups.",
      isFeatured: true,
      orderIndex: 1,
    },
    {
      userId: user.id,
      title: "Panel: The Future of Cloud Run and Serverless Databases",
      slug: "panel-future-serverless",
      eventType: "Panel",
      date: "Sep 15, 2026",
      location: "Seattle, WA",
      eventUrl: "https://serverlesssummit.example.com",
      description: "Panel discussion with engineering leads from Google Cloud, AWS, and Neon on cold start mitigations and connection poolers.",
      isFeatured: false,
      orderIndex: 2,
    },
  ]);
  console.log("✓ Created events");

  // 8. Contact Inquiries
  await db.insert(contacts).values([
    {
      userId: user.id,
      senderName: "Marcus Vance",
      senderEmail: "marcus@fintechstartup.io",
      subject: "Inquiry about Cloud Scalability Audit",
      message: "Hi Sarah, we're preparing for a series B launch and experiencing latency spikes in our payment routing service. Would love to engage you for an audit.",
      isRead: false,
    },
  ]);
  console.log("✓ Created demo contact message");

  console.log("🎉 Seeding completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
