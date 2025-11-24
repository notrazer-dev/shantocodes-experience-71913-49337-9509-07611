# Shanto Joseph - Portfolio

## About This Project

This is my personal portfolio website showcasing my work as a Full-Stack Developer and AI/ML Engineer.

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend and database
- **EmailJS** - Contact form integration

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build for Production

```sh
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── lib/            # Utilities and configurations
│   └── data/           # Static data files
├── public/             # Static assets
├── supabase/           # Database SQL scripts
└── dist/               # Production build output
```

## Features

- 🎨 Modern, responsive design
- 🌙 Dark/Light theme support
- 📱 Mobile-friendly interface
- 🔍 SEO optimized
- 📊 Google Analytics integration
- 🗄️ Dynamic content from Supabase
- 📧 Contact form with EmailJS
- 🔐 Admin dashboard for content management

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAIL_FORM=true

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## License

© 2024 Shanto Joseph. All rights reserved.

## Contact

For any inquiries, please reach out through the contact form on the website.
