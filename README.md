<br />
<p align="center">
  <img src="(https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/658ad777-3d26-4113-a9bc-a403371784f0.png)" width="120" />
  <h2 align="center">Recipe Picker</h2>
  <p align="center">
    Discover delicious recipes tailored to your kitchen ingredients!
    <br />
    <a href="https://recipe-picker-xi.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/purvii12/recipe-picker/issues">Report Bug</a>
    ·
    <a href="https://github.com/purvii12/recipe-picker/issues">Request Feature</a>
  </p>
</p>

---

## 🧾 Table of Contents

- [About The Project](-about-the-project)
- [Features](#-features)
- [Demo](-demo)
- [Installation](-installation)
- [Usage](-usage)
- [Tech Stack](-tech-stack)
- [Roadmap](-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](-contact)

---
![Screenshot](./Recipe-picker-photo.png)  
*Screenshot showing the main UI of the project.*
---

##  About The Project

Recipe Picker is a React-based single-page application that lets users search vegetarian recipes by ingredients. It integrates:

- Spoonacular API for recipe data  
- Firebase Authentication for secure Google sign-in  
- Firestore for user favorites saving  

The app features a clean UI, recipe modals with nutrition info, and favorites persistence.

---

## ✨ Features

-  Search recipes by ingredients  
-  Surprise me with a random vegetarian recipe  
-  Mark recipes as favorites and save them securely  
-  Google Authentication with Firebase  
-  Responsive design for all devices  
-  Fast and dynamic UI animations  

---


---

## 🛠 Installation

Follow these steps to run the app locally:
1. Clone the repo
git clone https://github.com/purvii12/recipe-picker.git
cd recipe-picker

2. Install dependencies
npm install
or
yarn

3. Create .env file with your Spoonacular API key and Firebase config:
    VITE_REACT_APP_SPOONACULAR_API_KEY=your_api_key_here

4. Add Firebase config variables as documented

5. Start development server
npm run dev
or
yarn dev


---

##  Usage

- Open the app in your browser  
- Log in with Google account  
- Add ingredients you have and click **Find Recipes**  
- Mark favorites and explore recipe details  

---

##  Tech Stack

| Technology      | Purpose                |
| --------------- | ---------------------- |
| ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=for-the-badge)                      | Frontend framework      |
| ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black&style=for-the-badge)        | Auth & Firestore backend |
| ![Spoonacular](https://img.shields.io/badge/Spoonacular-FF6F61?style=for-the-badge)                    | Recipe data source      |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)  | Styling & responsiveness |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white&style=for-the-badge)  | UI animations      |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge)                                  | Build tooling           |

---

##  Roadmap

- [x] Basic search by ingredients  
- [x] Random recipe surprise  
- [x] Google Sign-In Authentication  
- [x] Firestore favorites persistence   
- [ ] User recipe submissions  

---

## 🤝 Contributing

Contributions are always welcome! Please open an issue or submit a PR.

- Fork the repo  
- Create your feature branch (`git checkout -b feature/fix`)  
- Commit your changes (`git commit -m 'Add something'`)  
- Push branch (`git push origin feature/fix`)  
- Open a Pull Request  

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/your-username/recipe-picker/blob/main/LICENSE) file for details.

---

##  Contact

Created by https://github.com/purvii12 - feel free to reach out!

---

##  Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for all recipe data  
- [Firebase](https://firebase.google.com/) for easy auth & database  





