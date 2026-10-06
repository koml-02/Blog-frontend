# Luminae

> A cinematic, distraction-free blogging platform for discovering, writing, and managing blog posts.

Luminae is a modern blog frontend built with **React, TypeScript, TanStack Start, and Vite**. It provides a polished reading and writing experience with authentication, blog management, Markdown editing, search, filtering, and a personal dashboard.

## ✨ Features

- 🎬 Cinematic landing page
- 📝 Create and edit blog posts using Markdown
- 👀 Live Markdown preview
- 📚 Browse and read blog posts
- 🔎 Search blogs by title/content
- 🏷️ Category filtering
- 📄 Pagination
- ⭐ Featured posts
- 🔐 User registration and login
- 👤 User profile
- 📊 Personal dashboard
- 💾 Local draft persistence
- 🗑️ Edit and delete your own posts
- 📱 Responsive design
- ✨ Motion effects and glassmorphism-inspired UI
- 🔗 Blog sharing functionality

## 🛠️ Tech Stack

### Frontend

- React 19
- TypeScript
- TanStack Router
- TanStack Start
- TanStack Query
- Vite
- Tailwind CSS

### Libraries

- Axios
- Framer Motion
- Lucide React
- React Markdown
- Remark GFM
- React Hook Form
- Zod
- Radix UI
- date-fns
- Sonner
- clsx
- tailwind-merge

### Development Tools

- ESLint
- Prettier
- Bun / npm

## 📂 Project Structure

```text
Blog-frontend/
├── public/
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── BlogCard.tsx
│   │   ├── BlogEditor.tsx
│   │   ├── CinematicHero.tsx
│   │   ├── Footer.tsx
│   │   ├── GlassInput.tsx
│   │   ├── MarkdownPreview.tsx
│   │   ├── Navbar.tsx
│   │   ├── PageShell.tsx
│   │   └── ui/
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.tsx
│   │   ├── blog-utils.ts
│   │   └── utils.ts
│   │
│   ├── routes/
│   │   ├── __root.tsx
│   │   ├── blogs.$id.tsx
│   │   ├── blogs.index.tsx
│   │   ├── create.tsx
│   │   ├── dashboard.tsx
│   │   ├── edit.$id.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── profile.tsx
│   │   └── register.tsx
│   │
│   ├── router.tsx
│   ├── server.ts
│   ├── start.ts
│   └── styles.css
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── components.json
└── README.md

🚀 Getting Started
Prerequisites

Make sure you have one of the following installed:

Node.js
npm
Bun
1. Clone the repository
git clone https://github.com/koml-02/Blog-frontend.git
cd Blog-frontend
2. Install dependencies

Using npm:

npm install

Or using Bun:

bun install
3. Configure environment variables

Create a .env file in the project root if your backend API is hosted separately:

VITE_API_URL=http://localhost:5000

If the frontend and backend use the same origin, this variable may not be required.

4. Start the development server

Using npm:

npm run dev

Or using Bun:

bun run dev

Open the local URL shown in your terminal.

📜 Available Scripts
Command	Description
npm run dev	Start the development server
npm run build	Build the application for production
npm run build:dev	Create a development build
npm run preview	Preview the production build
npm run lint	Run ESLint
npm run format	Format the project

For Bun, replace npm run with bun run.

🔗 Application Routes
Route	Purpose
/	Landing page
/blogs	Browse blog posts
/blogs/:id	Read a blog post
/create	Create a blog post
/edit/:id	Edit a blog post
/dashboard	User dashboard
/login	User login
/register	Create an account
/profile	User profile
🔌 Backend API

The frontend communicates with a backend API for authentication and blog operations.

The API base URL can be configured using:

VITE_API_URL=http://localhost:5000

Typical operations include:

GET    /api/blogs
GET    /api/blogs/:id
POST   /api/blogs
PUT    /api/blogs/:id
DELETE /api/blogs/:id

POST   /api/users/register
POST   /api/users/login

The backend API must be running and accessible for features that require server-side data.

🖼️ Screenshots

Add screenshots of the application here.

Recommended screenshots:

Landing page
Blog listing
Blog detail page
Create blog editor
Dashboard
Login/Register pages

Example:

![Landing Page](./docs/screenshots/landing-page.png)
🌐 Deployment

Create a production build with:

npm run build

The application should be deployed using a platform that supports the project's TanStack Start/Vite setup.

If the backend is hosted separately, configure:

VITE_API_URL=https://your-backend-url.com
🔮 Future Improvements
Advanced blog search
Improved filtering
Image upload and management
Rich text editing
Better validation and error handling
Automated testing
CI/CD pipeline
SEO improvements
User profile customization
Social sharing improvements
👨‍💻 Author

Komalpreet Kaur

GitHub: @koml-02

📄 License

No license has currently been specified for this repository.

If you intend to make the project open source, consider adding an appropriate license such as the MIT License.


### One important thing

Your Copilot output says:

> "This project appears to be a front-end blog application branded as Luminae"

That's fine **if `Luminae` is actually visible in your application**. If that's just something Copilot inferred, verify it before keeping it.

Also, don't add a fake screenshot section with nonexistent images. **Take actual screenshots of your deployed/local application and upload them**. A GitHub portfolio with real screenshots looks substantially more credible than an AI-generated README full of claims.

And your repository is called **`Blog-frontend`**, so I'd keep the GitHub repository name as-is unless you specifically want to rename it. `Luminae` can be the application's brand/title.
