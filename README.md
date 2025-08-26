# Revit Plugins Website

A modern marketplace website for selling API plugins that optimize Architecture, Engineering, and Construction (AEC) workflows. Built with React, TypeScript, and Tailwind CSS.

## Overview

This website provides a professional platform for selling specialized API plugins across different engineering disciplines:
- **Architecture**: Space planning, documentation, rendering, and BIM management tools
- **Civil Engineering**: Site analysis, road design, drainage, and structural tools
- **MEP**: HVAC, electrical, plumbing, and coordination tools
- **Custom Development**: Request form for tailored plugin solutions

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Package Manager**: npm

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Trion34/revit-plugins-website.git
cd revit-plugins-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173/` (or another port if 5173 is in use).

### 4. Build for Production

```bash
npm run build
```

The production build will be created in the `dist/` directory.

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
revit-plugins-website/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation component
│   │   └── Footer.tsx       # Footer component
│   ├── pages/
│   │   ├── Home.tsx         # Homepage with hero section
│   │   ├── Architecture.tsx # Architecture plugins catalog
│   │   ├── CivilEngineering.tsx # Civil Engineering plugins
│   │   ├── MEP.tsx          # MEP plugins catalog
│   │   └── CustomRequest.tsx # Custom plugin request form
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx            # Application entry point
│   └── index.css           # Tailwind CSS imports
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization Guide

### Adding New Plugins

To add new plugins to the catalogs, edit the plugin arrays in the respective page components:
- Architecture: `src/pages/Architecture.tsx`
- Civil Engineering: `src/pages/CivilEngineering.tsx`
- MEP: `src/pages/MEP.tsx`

### Modifying Colors

The color scheme can be customized in `tailwind.config.js`:
```javascript
colors: {
  primary: '#0066CC',    // Main brand color
  secondary: '#FF6B35',  // Accent color
  accent: '#00A878',     // Additional accent
}
```

### Adding Payment Integration

The shopping cart buttons are ready for payment integration. You can add:
- Stripe integration
- PayPal
- Other payment processors

### Database Integration

For production, you'll want to:
1. Set up a backend API (Node.js, Python, etc.)
2. Database for product management (PostgreSQL, MongoDB)
3. User authentication system
4. Order management system

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## For Developers (Nastya)

### Key Areas for Plugin Integration

1. **Product Data Structure** (`src/pages/[Discipline].tsx`):
   - Each plugin has: id, name, description, price, rating, downloads, category, features
   - Consider moving to a centralized data store or API

2. **API Integration Points**:
   - Product fetching: Replace static arrays with API calls
   - Form submission: `src/pages/CustomRequest.tsx` handleSubmit function
   - Shopping cart: Add state management (Redux/Zustand)

3. **Authentication**:
   - Add protected routes for purchased plugins
   - User dashboard for downloads
   - License key management

4. **Plugin Delivery System**:
   - Download links after purchase
   - API key generation
   - Documentation portal integration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary. All rights reserved.

## Contact

For questions about the website or plugin development:
- Email: support@apipluginspro.com
- GitHub: https://github.com/Trion34/revit-plugins-website

## Notes for Nastya

Hey Nastya! Here are some specific notes for you:

1. **Plugin Data**: Currently hardcoded in each page component. You'll want to create an API endpoint to serve this dynamically.

2. **Revit API Integration**: The actual plugin functionality will need to be implemented separately. This website is just the marketplace frontend.

3. **Testing**: Consider adding tests for the form validation and cart functionality.

4. **SEO**: Add meta tags and Open Graph data for better search engine visibility.

5. **Analytics**: Consider adding Google Analytics or similar to track user behavior and popular plugins.

Feel free to reach out if you need any clarification on the codebase structure!

---

Built with ❤️ for the AEC industry
