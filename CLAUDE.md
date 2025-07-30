# Biblereader

## Project Overview
A modern Bible reading application with an intuitive interface for studying scripture.

## Technology Stack
- **Framework**: Next.js
- **Language**: TypeScript
- **Runtime**: React 18.0.0
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Form Management**: React Hook Form + Zod validation
- **Deployment**: GitHub Pages

## Key Features
- Modern responsive web application
- TypeScript for type safety
- Accessible UI components with Radix UI
- Advanced form handling and validation
- Interactive data visualization
- Dark/light theme switching

## Core Dependencies
- **UI Framework**: Radix UI component suite
- **Styling**: class-variance-authority, clsx, tailwind-merge
- **Forms**: react-hook-form with Zod validation
- **Recharts**: Data visualization and charts
- **Date Fns**: Date manipulation utilities
- **Lucide React**: Icon library
- **Next Themes**: Theme management
- **Sonner**: Toast notifications
- **Cmdk**: Command palette
- **Vaul**: Mobile-optimized modals

## Development Commands
```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Export static files
npm run export

# Deploy to GitHub Pages
npm run deploy

```

## Project Structure
```
biblereader/
├── app/                     # Next.js App Router
├── components/              # React components
├── lib/                     # Utility functions
├── hooks/                   # Custom React hooks
├── public/                  # Static assets
├── styles/                  # Stylesheets
├── next.config.mjs          # Configuration
├── tailwind.config.ts       # Configuration
├── tsconfig.json            # Configuration
└── package.json             # Dependencies
```

## Deployment
- **Platform**: GitHub Pages
- **URL**: https://igor-kan.github.io/biblereader
- **Build**: Static site generation
- **CI/CD**: Automated deployment via gh-pages

## Development Notes
- Uses Next.js App Router for modern React development
- Implements comprehensive form validation with Zod
- Includes accessibility features through Radix UI
- Supports dark/light theme switching

## Next.js Features
- **App Router**: Modern routing system
- **Server Components**: Optimized rendering
- **Static Site Generation**: Pre-rendered pages
- **Image Optimization**: Automatic image processing
- **API Routes**: Serverless API endpoints

## Testing & Quality
- TypeScript for type safety

## Future Enhancements
- Performance optimizations
- Advanced analytics integration
- Enhanced user experience features
- API integrations
- Mobile app development



## 🧭 Claude Code Navigation

### Quick Commands
**Development Scripts:**
- `dev`: next dev
- `build`: next build
- `start`: next start
- `lint`: next lint
- `deploy`: gh-pages -d out

**Key Files:**
- `package.json` - Dependencies and scripts configuration
- `README.md` - Project documentation and setup guide
- `CLAUDE.md` - Comprehensive development guide for Claude
- `next.config.mjs` - Next.js framework configuration
- `tailwind.config.ts` - Tailwind CSS styling configuration
- `tsconfig.json` - TypeScript compiler configuration
- `components.json` - shadcn/ui components configuration

**Key Directories:**
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `lib/` - Utility functions and shared logic
- `hooks/` - Custom React hooks
- `public/` - Static assets (images, icons, etc.)
- `styles/` - CSS and styling files

**Claude Code Files:**
- `.claude/project-context.md` - Project overview and structure
- `.claude/coding-standards.md` - Development guidelines and patterns
- `.claude/commands/` - Custom Claude commands for common tasks
- `.claude/context/` - Domain-specific development context


### Quick Reference

**Common Tasks:**
- Start development: `npm run dev` or `bun dev`
- Build project: `npm run build` or `bun build`
- Lint code: `npm run lint` or `bun lint`
- Deploy: `npm run deploy` or `bun deploy`

**File Patterns:**
- Components: `components/**/*.tsx`
- Pages: `app/**/*.tsx` or `pages/**/*.tsx`
- Utilities: `lib/**/*.ts`
- Styles: `**/*.css` or use Tailwind classes
- Tests: `**/*.test.ts` or `**/*.spec.ts`

**Development Tips:**
- Use TypeScript for type safety
- Follow existing component patterns
- Utilize shadcn/ui components
- Implement responsive design with Tailwind
- Test changes before committing

