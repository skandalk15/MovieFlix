# 🎬 MovieFlix – React Native Movie Explorer App

MovieFlix is a beautifully designed mobile application built using React Native and Expo, inspired by the Netflix experience. It fetches and displays popular, trending, and upcoming movies in an interactive card-based layout. Users can tap a movie to view detailed information including its title, synopsis, release date, and IMDb rating.

---

## 📱 Screenshots

| Home Screen | Movie Details |
|-------------|----------------|
| ![Home](./assets/screenshots/home.png) | ![Details](./assets/screenshots/details.png) |

---

## 🚀 Features

- 🎥 **Browse Movies** – Scrollable cards with posters and movie titles
- 🔍 **Search Functionality** – Instantly search for movies using a custom search bar
- 📖 **Movie Details View** – See full movie information including IMDb rating
- 💅 **Modern UI** – Styled with Tailwind CSS using NativeWind, optimized for dark mode
- 📡 **API Integration** – Fetches live movie data using The Movie Database (TMDb) API

---

## 🛠️ Built With

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [TMDb API](https://developer.themoviedb.org/)
- [TypeScript](https://www.typescriptlang.org/) *(optional if used)*

---

## 📂 Folder Structure

```bash
mobile_movie_app/
├── app/                  # Screens & routes (Expo Router)
├── components/           # Reusable UI components (e.g., SearchBar, MovieCard)
├── constants/            # Icons, images, and color definitions
├── services/             # API functions and custom hooks
├── assets/               # Static assets like fonts and screenshots
├── tailwind.config.js    # Tailwind/NativeWind configuration
├── App.tsx               # App entry point
└── ...
