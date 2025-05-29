# ☀️ Student Wake-Up Coach – Motivational Alarm Call Agent

A smart, motivational wake-up solution built with **Next.js**, powered by **Supabase** for backend/auth, and integrated with **Vapi.ai** to deliver personalized AI voice calls. Designed to help students start their day with intention, confidence, and clarity.

## 🎯 What It Does

Student Wake-Up Coach is an AI-powered **wake-up call agent** that calls students every morning to deliver:

- ✅ A **motivational quote or line** to energize their mindset.
- 📚 A personalized **daily school plan**, such as:
  > “You have a history test in 3 hours. Let’s crush it.”
- ✨ Optional **affirmations or reminders** based on user preferences.

It’s not just an alarm—it’s a daily coach that speaks directly to each student.

---

## 💡 Why It Works

- 🔁 Builds a **life rhythm** by establishing a morning habit
- 🧠 Provides **mental readiness** before the day begins
- 🔥 Encourages **focus, motivation, and goal setting**
- 📣 Easy **word-of-mouth growth**—students love sharing it

This isn’t another productivity app. It’s a ritual.

---

## 🧱 Tech Stack

| Technology                               | Purpose                                   |
| ---------------------------------------- | ----------------------------------------- |
| [Next.js](https://nextjs.org/)           | Frontend and App Router framework         |
| [Supabase](https://supabase.io/)         | Authentication & database (PostgreSQL)    |
| [Tailwind CSS](https://tailwindcss.com/) | Fast, responsive styling                  |
| [Vapi.ai](https://vapi.ai/)              | Voice AI agent for real-time phone calls  |
| [React](https://reactjs.org/)            | UI components & client-side interactivity |

---

## 🔐 Core Features

- Supabase Auth: sign-up, login, and session handling
- User preferences: wake-up time, voice style, call content
- Voice AI: deliver calls via Vapi.ai with motivational speech
- Call scripts generated using dynamic inputs and school plans
- Real-time database sync for call scheduling

---

## 🛠 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/wake-up-coach.git
cd wake-up-coach
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your environment variables

Create a `.env.local` file and fill it with your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

```bash
/
├─ app/               # App Router pages & layouts
├─ components/        # Reusable UI components
├─ lib/               # Supabase & Vapi clients
├─ scripts/           # Voice call generation logic
├─ styles/            # Global styles (Tailwind)
├─ .env.local         # Environment variables
└─ ...
```

## 📦 Deployment

Ready to deploy on:

- [Vercel](https://vercel.com/) – Recommended for Next.js
- [Netlify](https://netlify.com/)
- [Render](https://render.com/)

Set environment variables in your host’s dashboard.

---

## 🚧 Roadmap

- [x] Supabase Auth & database
- [x] Vapi.ai voice call integration
- [ ] User dashboard with call history
- [ ] AI-generated motivational content
- [ ] Streaks & habit tracking
- [ ] Parental dashboard
- [ ] Multi-language support

---

## 🙌 Contributing

We welcome contributions! If you have an idea, fix, or feature to suggest:

1. Fork this repo
2. Create a branch
3. Submit a pull request

Please open an issue first to discuss major changes.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Support

If you love this idea, ⭐️ the repo and share with a student who needs a wake-up call!

Got questions? Reach out or open an issue — we're here to help.

```

```
