# Overview

Aruna Talent • Recall is a modern web application that provides AI-powered conversation analysis for content creators. The platform allows users to ask natural language questions about fan conversations using @username mentions and receive intelligent insights about their interactions. Built with a full-stack TypeScript architecture, the application features a clean ChatGPT-style React frontend with shadcn/ui components and automatic fan lookup functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client is built with **React 18** and **TypeScript**, utilizing a component-based architecture with the following key decisions:

- **Routing**: Uses Wouter for lightweight client-side routing instead of React Router to minimize bundle size
- **State Management**: Leverages TanStack Query (React Query) for server state management, eliminating the need for Redux or Context API for API data
- **UI Framework**: Implements shadcn/ui components built on top of Radix UI primitives for accessibility and customization
- **Styling**: Uses Tailwind CSS with CSS variables for theming, supporting both light and dark modes
- **Build Tool**: Vite for fast development and optimized production builds

The component structure follows a modular approach with reusable UI components, page-level components, and custom hooks for shared logic.

## Backend Architecture
The server is built with **Express.js** and **TypeScript** using an ESM module system:

- **API Design**: RESTful API endpoints with clear separation of concerns
- **Data Layer**: Abstract storage interface pattern allowing for multiple implementations (currently in-memory with plan for PostgreSQL)
- **Middleware**: Custom logging middleware for API request tracking and error handling
- **Development**: Hot-reload enabled with tsx for TypeScript execution

## Database Design
Uses **Drizzle ORM** with **PostgreSQL** for type-safe database operations:

- **Schema Definition**: Centralized schema definitions in TypeScript with automatic type generation
- **Migration Strategy**: Drizzle Kit for database migrations and schema changes
- **Connection**: Neon Database serverless PostgreSQL for scalable cloud hosting
- **Validation**: Zod integration for runtime type validation of database inputs

Key entities include users, fans, conversations, and AI questions with proper foreign key relationships.

## Shared Type System
Implements a **monorepo-style shared schema** approach:

- **Schema Location**: `shared/schema.ts` contains all database schemas and TypeScript types
- **Type Safety**: End-to-end type safety from database to frontend using Drizzle and Zod
- **Code Generation**: Automatic TypeScript type generation from database schemas
- **Validation**: Shared validation schemas between frontend and backend

## Development Environment
The project uses modern development tooling:

- **Package Manager**: npm with lockfile for reproducible builds
- **TypeScript**: Strict mode enabled with path mapping for clean imports
- **Linting/Formatting**: Configuration ready for ESLint and Prettier (not currently configured)
- **Build Process**: Separate build processes for client (Vite) and server (esbuild)

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database hosting with connection pooling
- **Drizzle ORM**: Type-safe database toolkit with automatic migrations

## UI and Styling
- **Radix UI**: Headless UI primitives for accessibility-compliant components
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide Icons**: Modern icon library for consistent iconography
- **Google Fonts**: Inter font family for typography

## State Management and Data Fetching
- **TanStack Query**: Server state management with caching, background updates, and optimistic updates
- **React Hook Form**: Form management with validation
- **Zod**: Runtime type validation and schema validation

## Development Tools
- **Vite**: Fast build tool with hot module replacement
- **esbuild**: Fast JavaScript bundler for server builds
- **tsx**: TypeScript execution engine for development

## Hosting and Deployment
- **Replit**: Development and hosting platform with integrated development environment
- **Vercel-style deployment**: Production build optimized for static hosting with API routes

The architecture prioritizes type safety, developer experience, and performance while maintaining flexibility for future scaling and feature additions.