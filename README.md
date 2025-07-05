AI Travel Planner App 🧳
A mobile-first travel planning application that leverages AI to generate personalized itineraries and recommendations. Built with React Native, Expo, and Firebase, it offers seamless cross-platform support (iOS & Android).

✨ Features
Trip Planning: Input your destination, travel dates, and preferences to create custom itineraries.

AI-Powered Suggestions: Get recommendations for destinations, activities, and accommodations.

Interactive Map View: Explore trip routes and landmarks visually.

Itinerary Management: View, update, and organize planned trips.

User Auth: Sign up and sign in via Firebase.

Cross‑Platform: Runs on both iOS and Android via Expo.

🛠 Technologies Used
React Native & Expo – UI components and mobile workflow

TypeScript – Strong typing and maintainability

Firebase – Authentication + Firestore backend

OpenAI / Gemini / GPT – AI engine for content generation

Google Maps / Places API – Location and mapping services

🚀 Getting Started
Prerequisites
Node.js & npm installed

Expo CLI (npm install -g expo-cli)

Firebase project (authentication & Firestore enabled)

API keys (OpenAI or Gemini, Google Maps / Places)

Setup
bash
Copy
Edit
# Clone the repo
git clone https://github.com/alanrave/ai-travel-planner-app.git
cd ai-travel-planner-app

# Install dependencies
npm install
# or
yarn install

# Create a .env file with these variables:
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=...
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
OPENAI_API_KEY=... # or GEMINI_API_KEY
Running the App
bash
Copy
Edit
expo start
Then open the Expo Go app on your device or use an emulator.

🗂 Project Structure
bash
Copy
Edit
.
├── assets/            # Static images and icons
├── components/        # Reusable UI components
├── screens/           # Major app screens
├── context/           # React Context providers
├── constants/         # Shared constant values
├── services/          # Firebase, AI, and API services
├── App.tsx            # Entry point
└── app.json           # Expo configuration
🔐 Authentication
Powered by Firebase Authentication (email/password, Google, etc.)

Users must be signed in to create and manage travel plans

📈 Data Management
Firestore handles user profiles and saved itineraries

Real-time syncing and offline support

💡 AI Recommendations
Generates suggestions based on user preferences and history

Supports destination, activity, and accommodation suggestions using LLMs (OpenAI/Gemini)

🛠 Contributing
Contributions are welcome! 🎉

Fork the repo

Create a feature branch (git checkout -b feature/YourFeature)

Commit your changes (git commit -m 'Add your feature')

Push to your fork (git push origin feature/YourFeature)

Open a Pull Request

Ensure you follow existing code conventions and include relevant tests or documentation.
