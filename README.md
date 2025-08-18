🧳 AI Travel Planner App

An advanced AI-powered travel planning application that generates personalized itineraries, activity suggestions, and accommodation options.

Built with React Native, Expo, Firebase, and OpenAI/Gemini, the app ensures a seamless cross-platform experience for iOS and Android users.

📸 Demo & Screenshots
<p align="center"> <img src="https://github.com/user-attachments/assets/20954cd8-d90a-4e8e-b329-3e083a732a3b" width="220"> <img src="https://github.com/user-attachments/assets/77eddbf5-3aac-4d65-a504-af29bf2dc1a3" width="220"> <img src="https://github.com/user-attachments/assets/9f357fc5-a9c0-41fa-bf9d-2be4431deab4" width="220"> <img src="https://github.com/user-attachments/assets/cda5f2df-fb9e-4335-9cdd-9ef7d6336e73" width="220"> <img src="https://github.com/user-attachments/assets/c4f76dd5-9925-46af-9456-4b0a39744fb1" width="220"> <img src="https://github.com/user-attachments/assets/5c7f50bd-e4ee-485d-9e15-1f0fbeeb2246" width="220"> <img src="https://github.com/user-attachments/assets/b6b94b3a-095c-4aa0-bdab-1b62b6fc47aa" width="220"> <img src="https://github.com/user-attachments/assets/5caa583b-312f-4f59-837d-3b24490457f7" width="220"> <img src="https://github.com/user-attachments/assets/0321edc1-d7da-4d06-96db-bbb638678135" width="220"> <img src="https://github.com/user-attachments/assets/3c321195-8892-4944-996f-f770907aa400" width="220"> <img src="https://github.com/user-attachments/assets/e48e30cd-83c7-413c-b177-5272906c502b" width="220"> <img src="https://github.com/user-attachments/assets/f41b77c8-5525-4f5d-b448-e50f31fc2b2f" width="220"> <img src="https://github.com/user-attachments/assets/4dab1e8b-7c98-4f27-9447-9c83244e6e45" width="220"> </p>
✨ Key Features

✅ Smart Trip Planner – Enter destination, dates, budget → get curated itineraries.
✅ AI-Driven Recommendations – Context-aware suggestions (events, seasonality, interests).
✅ Interactive Maps – Visualize places & optimize routes (Google Maps API).
✅ Itinerary Management – Save, edit, reorder with drag & drop.
✅ User Authentication – Firebase Auth (Email/Google).
✅ Offline Support – Local caching + sync when online.

🛠️ Tech Stack
Layer	Technology
UI Framework	React Native + Expo
Language	TypeScript
Navigation	React Navigation
Backend	Firebase Auth & Firestore
AI Engine	OpenAI / Gemini API
Maps	Google Maps SDK + Places API
Analytics	Firebase Analytics
⚡ Installation & Setup
🔧 Prerequisites

Node.js >=16.x

npm or Yarn

Expo CLI

Firebase Project (Auth + Firestore)

OpenAI or Gemini API key

Google Maps API key

📥 Clone & Install
# Clone repo
git clone https://github.com/alanrave/ai-travel-planner-app.git
cd ai-travel-planner-app

# Install dependencies
npm install   # or yarn install

⚙️ Configure Environment

Create a .env file in project root:

EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
OPENAI_API_KEY=...   # or GEMINI_API_KEY

▶️ Run Locally
expo start


Scan QR code with Expo Go app on your phone, or

Run on Android Emulator / iOS Simulator

🧩 Project Structure
src/
├── assets/         # Images, icons, fonts
├── components/     # UI components
│   └── itinerary/
├── context/        # Global state
├── hooks/          # Custom hooks
├── navigation/     # Navigation setup
├── screens/        # Screens by feature
├── services/       # API + Firebase integrations
├── types/          # TypeScript types
├── utils/          # Helpers
└── App.tsx         # App entrypoint

🧠 AI-Powered Itinerary Generation

Front-end calls aiService.generateItinerary()

Hits OpenAI/Gemini API → returns structured JSON

JSON validated with zod schema → stored in Firestore

Rendered into an interactive map-based UI

✅ Testing & CI/CD

Unit tests: Jest + React Native Testing Library

Validation: zod schema ensures AI output correctness

CI/CD: GitHub Actions → Lint + Test + Type Check

Deployment: Expo EAS builds for iOS & Android

🚀 Roadmap

🌍 Multi-destination trips

🏨 Hotel/flight booking integration

👥 Social sharing & collaboration

⭐ Ratings & reviews for itineraries

🗺️ Support for Mapbox

🎨 Dark mode & accessibility features

🤝 Contributing

Fork this repository

Create a feature branch: git checkout -b feature/YourFeature

Add tests + documentation

Submit PR 🚀
