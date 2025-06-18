# 🎬 MovieFlix – React Native Movie Explorer App

MovieFlix is a beautifully designed mobile application built using React Native and Expo, inspired by the user experience of Netflix. It fetches and displays popular, trending, and upcoming movies in a visually engaging card-based layout. Users can tap on a movie to view detailed information including title, synopsis, release date, and IMDb rating.

---

## 📱 Screenshots

| Home Screen | Movie Details |
|-------------|----------------|
| ![Home](./assets/screenshots/home.png) | ![Details](./assets/screenshots/details.png) |

---

## 🚀 Features

- 🎥 **Browse Movies** – Scrollable cards with movie posters and titles
- 🔍 **Search Functionality** – Search for movies using custom search bar
- 📖 **Movie Details View** – Tap a movie card to reveal full details including IMDb rating
- 💅 **Modern UI** – Styled using Tailwind CSS via NativeWind with support for dark theme
- 📡 **API Integration** – Fetches live data from The Movie Database (TMDb) or custom movie API

---

## 🛠️ Built With

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- [TMDb API](https://developer.themoviedb.org/) *(or your movie API)*
- [TypeScript](https://www.typescriptlang.org/) (if applicable)

---

## 📂 Folder Structure

```bash
mobile_movie_app/
├── app/                  # Screens for each route (expo-router)
├── components/           # Reusable UI components (e.g., SearchBar, MovieCard)
├── constants/            # Images, icons, colors
├── services/             # API and hooks (useFetch)
├── assets/               # Fonts, images
├── tailwind.config.js    # Tailwind/NativeWind config
├── App.tsx               # Entry point
└── ...

🔧 Getting Started
git clone https://github.com/skandalk15/MovieFlix.git
cd MovieFlix

2. Install dependencies
npm install

3.  Start the development server
npx expo start

🌐 API Setup

Update your .env or config file with your API key:

TMDB_API_KEY=your_api_key_here

📦 Coming Soon

🔐 User authentication (Login/Register)
💾 Local favorites storage
🌓 Dark/light theme toggle
🧠 Recommendation engine


🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

🙋‍♂️ Author

Soham Kandalkar
📧 LinkedIn • ✉️ skandalk@usc.edu



