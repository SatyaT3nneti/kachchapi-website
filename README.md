# Kachchapi Learning Platform

A modern, responsive learning platform website built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design optimized for all devices
- 📱 Mobile-first approach with retina display support
- ⚡ Fast performance with React 18 and modern tooling
- 🎯 SEO optimized with semantic HTML
- ♿ Accessibility features built-in
- 🌐 Cross-browser compatibility

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Heroicons
- **Animations**: Framer Motion
- **Build Tool**: Create React App with TypeScript template

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SatyaT3nneti/kachchapi-website.git
cd kachchapi-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation and header
│   ├── Hero.tsx        # Hero section
│   ├── Features.tsx    # Course categories
│   ├── Benefits.tsx    # Platform benefits
│   ├── Statistics.tsx  # Achievement stats
│   ├── Courses.tsx     # Featured courses
│   ├── WhyChooseUs.tsx # Why choose us section
│   ├── Partners.tsx    # Partner institutions
│   ├── Instructors.tsx # Instructor profiles
│   ├── Workshops.tsx   # Workshop events
│   ├── Testimonials.tsx # Student testimonials
│   ├── Blog.tsx        # Blog articles
│   └── Footer.tsx      # Footer and newsletter
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## Design System

### Colors
- **Primary**: Blue shades for main actions and branding
- **Secondary**: Pink/coral for accents and CTAs
- **Dark**: Gray shades for text and backgrounds

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Components
- Responsive grid layouts
- Card-based design
- Hover effects and transitions
- Modern button styles
- Optimized images for retina displays

## Customization

### Adding New Components
1. Create a new component in `src/components/`
2. Follow the existing naming convention
3. Use TypeScript interfaces for props
4. Implement responsive design with Tailwind CSS

### Modifying Styles
- Update `tailwind.config.js` for custom colors and spacing
- Modify component-specific styles in the component files
- Use Tailwind utility classes for consistent styling

## Performance Optimization

- Lazy loading for images
- Optimized bundle size
- Efficient re-renders with React
- CSS-in-JS with Tailwind for minimal CSS

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, contact the development team.
