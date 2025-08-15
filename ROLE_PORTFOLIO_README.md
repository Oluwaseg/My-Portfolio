# Role-Based Portfolio System

This portfolio now supports three different views based on URL query parameters, allowing you to showcase different aspects of your skills to different audiences.

## How It Works

### URL Structure
- **Default (Full Stack)**: `/` - Shows the complete portfolio
- **Frontend Focus**: `/?role=frontend` - Emphasizes frontend skills and projects
- **Backend Focus**: `/?role=backend` - Emphasizes backend skills and projects

### Features

#### 1. Dynamic Content
- **Hero Section**: Title, subtitle, and auto-typing roles change based on the selected role
- **About Section**: Description text adapts to highlight relevant expertise
- **Projects Section**: Automatically filters projects based on the selected role

#### 2. Navigation
- **Desktop**: Role switcher in the top navigation bar
- **Mobile**: Role switcher in the mobile menu
- **Visual Indicators**: Active role is highlighted with primary colors

#### 3. Smart Filtering
- **Full Stack**: Shows all projects
- **Frontend**: Shows only frontend and fullstack projects
- **Backend**: Shows only backend and fullstack projects

## Usage Examples

### For Frontend Recruiters
Share: `https://yourportfolio.com/?role=frontend`
- Emphasizes React, Next.js, UI/UX skills
- Shows frontend-focused projects
- Content highlights frontend expertise

### For Backend Recruiters
Share: `https://yourportfolio.com/?role=backend`
- Emphasizes Node.js, APIs, database skills
- Shows backend-focused projects
- Content highlights backend expertise

### For General/Full Stack Recruiters
Share: `https://yourportfolio.com/`
- Shows complete skill set
- Displays all projects
- Balanced frontend/backend representation

## Technical Implementation

### Files Modified
- `src/config/roleContent.ts` - Role-specific content configuration
- `src/hooks/useRoleContent.ts` - Hook for detecting and managing role state
- `src/components/hero-section.tsx` - Dynamic hero content
- `src/components/about-section.tsx` - Dynamic about content
- `src/components/projects-section.tsx` - Role-based project filtering
- `src/components/common/Navbar.tsx` - Role navigation

### Adding New Roles
To add a new role (e.g., "DevOps"):

1. Add to `roleContent` in `src/config/roleContent.ts`
2. Update the `useRoleContent` hook
3. Add navigation links in the Navbar
4. Add role-specific project categories

### Project Categories
Projects are categorized as:
- `frontend` - Frontend-focused projects
- `backend` - Backend-focused projects  
- `fullstack` - Full-stack projects (shown in all views)

## Benefits

1. **Targeted Messaging**: Tailor your portfolio to specific job requirements
2. **Better Conversion**: Recruiters see relevant skills immediately
3. **Single Codebase**: Maintain one portfolio, serve multiple audiences
4. **SEO Friendly**: Each role has unique content and URLs
5. **Easy Sharing**: Simple URL parameters for different audiences

## Future Enhancements

- Role-specific color schemes
- Custom project descriptions per role
- Role-based experience highlights
- Analytics tracking per role view
- A/B testing different content variations 