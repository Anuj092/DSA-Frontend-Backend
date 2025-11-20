# User Directory Table

A React application that fetches and displays user data from the reqres.in API with search, sort, filter, and pagination features.

# Deployed Link: https://user-directory-ten-kohl.vercel.app/

## Features

✅ **Fetch & Display**: Retrieves user data from reqres.in API and displays in a clean table format  
✅ **Search**: Search users by first name, last name, or email  
✅ **Sort**: Click column headers to sort by name or email (ascending/descending)  
✅ **Pagination**: Navigate through multiple pages of users  
✅ **Filter**: Filter users by email domain  
✅ **Loading Spinner**: Visual feedback while data is being fetched  
✅ **Mobile Responsive**: Fully responsive design that works on all devices  

## Tech Stack

- React 18 with TypeScript
- Vite (build tool)
- CSS3 (no external UI framework needed)
- reqres.in API

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd user-directory
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Usage

- **Search**: Type in the search box to filter users by name or email
- **Sort**: Click on "Name" or "Email" column headers to sort (click again to reverse order)
- **Filter**: Use the domain filter to find users with specific email domains (e.g., "reqres")
- **Pagination**: Use Previous/Next buttons to navigate through pages

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## API Reference

This app uses the [reqres.in](https://reqres.in/) free API:
- Endpoint: `https://reqres.in/api/users?page={page}`
- No API key required

## Project Structure

```
user-directory/
├── src/
│   ├── App.tsx          # Main component with all logic
│   ├── App.css          # Styling
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── package.json         # Dependencies
└── README.md           # This file
```

## Notes

- The API returns 6 users per page with a total of 2 pages
- All filters and sorting work on the current page's data
- The app is fully typed with TypeScript for better development experience
- Responsive design works seamlessly on mobile, tablet, and desktop

## License

MIT
