# Tech Stack Preferences

**Your preferred technologies, libraries, and development tools.**

This file guides your AI's technology choices to match your preferences and existing stack.

---

## Languages

### Primary
- **TypeScript/JavaScript:** Web-based AI systems and SaaS development
- **Python:** AI/ML automation, data processing, backend services

### Secondary
- **Shell Scripting:** Infrastructure automation and server management
- **Dockerfiles:** Container deployment and system packaging

### Avoid
- **Enterprise languages** - Heavy frameworks that slow down development
- **Complex build systems** - Anything that complicates deployment

---

## Runtimes & Package Managers

| Category | Preference | Notes |
|----------|------------|-------|
| JavaScript Runtime | **Bun** | Fast, modern, all-in-one tool |
| Python Package Manager | **pip** | Simple, reliable for automation scripts |
| Container Runtime | **Docker** | Consistent across all environments |

---

## Frameworks

### Frontend
- **Preferred:** React/Next.js for SaaS dashboards
- **Avoid:** Heavy frameworks that complicate deployment

### Backend
- **Preferred:** FastAPI (Python), Express (Node.js)
- **Avoid:** Enterprise frameworks with steep learning curves

### Full-Stack
- **Preferred:** Next.js for rapid SaaS development
- **Self-hosted solutions** over cloud-only services

---

## Databases

| Type | Preference | Use Case |
|------|------------|----------|
| Relational | **PostgreSQL** | Primary data storage |
| Document | **MongoDB** | Flexible schemas for rapid prototyping |
| Key-Value | **Redis** | Caching and session management |
| Vector | **Local/embedded** | AI embeddings when needed |

---

## Cloud & Infrastructure

### Primary Environment
- **Self-hosted**: Ubuntu VPS + local Ubuntu servers
- **Platform**: Pangolin for cloud deployment
- **Container**: Docker for everything

### Hosting Preferences
| Type | Preference | Notes |
|------|------------|-------|
| Static Sites | Self-hosted on own infrastructure | Full control |
| APIs | Ubuntu VPS with Docker | Scalable, controllable |
| Media Servers | arr stack on Docker | Proven media management |

### Infrastructure as Code
- **Docker Compose** - Simple, declarative infrastructure
- **Shell Scripts** - For automation and deployment

---

## Development Tools

### Editor/IDE
- **AI-first editors** - Tools that integrate AI assistance
- **Web-based** - For rapid development and collaboration

### Terminal
- **System-native** - Whatever works best on Ubuntu
- **Scriptable** - Heavy use of aliases and automation

### Version Control
- **Git CLI** - Direct, scriptable workflow
- **Feature branches** - For parallel development

---

## Libraries & Utilities

### Always Use
| Category | Library | Why |
|----------|---------|-----|
| HTTP Client | fetch/Axios | Reliable API communication |
| Validation | Zod | TypeScript-first validation |
| Date/Time | date-fns | Modern date handling |
| Testing | Built-in + manual | Quick verification |
| Automation | Custom scripts | Tailored to specific needs |

### Avoid
| Library | Use Instead | Reason |
|---------|-------------|--------|
| Heavy frameworks | Lightweight libs | Faster deployment |
| Complex ORMs | Raw SQL | More control |
| Build tools | Minimal setup | Reduce complexity |

---

## AI & ML

### LLM Integration
- **PAI-OpenCode** - Primary AI development platform
- **API-first** - Direct integration with AI services
- **Local processing** - When possible, keep data private

### AI Tools
- **Automated workflows** - Build once, run forever
- **Decision systems** - AI-assisted business logic
- **Content generation** - Automated marketing and copy

---

## Configuration

### Default Project Setup
```bash
# Initialize new project structure
mkdir project && cd project
npm init -y  # or bun init
docker init   # Container setup
git init
```

### Standard File Structure
```
project/
├── docker-compose.yml    # Infrastructure definition
├── src/                 # Application code
├── scripts/             # Automation scripts
├── tests/               # Quick verification
└── README.md            # Documentation
```

### Deployment Philosophy
1. **Container first** - Everything in Docker
2. **Infrastructure as code** - Automated setup
3. **Self-hosted when possible** - Maintain control
4. **Simple over complex** - Reduce moving parts

---

## Specializations

### SaaS Development
- Rapid prototyping with modern frameworks
- User authentication and billing systems
- Automated deployment and scaling

### Media Management
- arr stack for content automation
- Docker-based media servers
- Automated content pipelines

### AI Automation
- API integrations with AI services
- Custom automation scripts
- Decision support systems

---

*This file guides technology choices. Update as your preferences evolve.*