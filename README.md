AI Travel Planner App 🧳
An advanced, mobile-first travel planning application that harnesses the power of AI to craft personalized itineraries, activity suggestions, and accommodation options. Developed with modern technologies—including React Native, Expo, Firebase, and OpenAI/Gemini—this app ensures a seamless cross-platform experience for iOS and Android users.

Table of Contents
Live Demo & Screenshots

Key Features

Tech Stack & Architecture

Installation & Setup

Project Structure

Authentication & Data Management

AI-Powered Itinerary Generation

Testing & Validation

Deployments & CI/CD

Roadmap & Future Enhancements

(Replace with actual screenshots or embed YouTube/GIF demo link once available.)

Key Features
Smart Trip Planner
Enter your destination, dates, budget, and preferences to receive a curated itinerary covering attractions, meals, travel routes, and recommended accommodations.

AI-Driven Recommendations
Powered by LLMs (OpenAI/Gemini) to provide contextual suggestions tailored to seasonality, local events, travel constraints, and interests.

Interactive Map Integration
Visualize points of interest on Google Maps, track routes, and optimize plans based on distance and travel time.

Itinerary Management
Save, edit, and delete trips with drag-and-drop reorder functionality for flexible planning.

User Authentication & Sync
Firebase Authentication enables email/password, Google login; Firestore ensures real-time storage and cross-device access.

Offline & Sync Support
Caches itinerary data locally, with eventual sync once connectivity is restored.

Tech Stack & Architecture
Layer	Technology
UI Framework	React Native + Expo
Language	TypeScript
State Management	React Context + Hooks
Navigation	React Navigation
Backend	Firebase Auth & Firestore
AI Engine	OpenAI / Gemini LLM API
Maps & Location	Google Maps SDK & Places API
Analytics	Firebase Analytics

High-Level Flow:
User input → Front-end sends request → AI engine generates itinerary → Response is refined and stored → Displayed with interactive map and details.

Installation & Setup
Prerequisites
Node.js >= 16.x, npm or Yarn

Expo CLI (npm install -g expo-cli)

Firebase project (Auth + Firestore)

OpenAI or Gemini API Key

Google Maps / Places API Key

Configure Environment Variables
Create .env in the repo root:

env
Copy
Edit
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
OPENAI_API_KEY=... # Or GEMINI_API_KEY
Run Locally
bash
Copy
Edit
git clone https://github.com/alanrave/ai-travel-planner-app.git
cd ai-travel-planner-app
npm install    # or yarn
expo start
# Use Expo Go or iOS/Android emulator
Project Structure
graphql
Copy
Edit
src/
├── assets/                # Images, icons, fonts
├── components/            # Shared UI components
│   └── itinerary/
├── context/               # Global state and providers
├── hooks/                 # Custom React hooks
├── navigation/            # React Navigation setup
├── screens/               # App screens by feature
├── services/              # API integrations and helpers
│   ├── aiService.ts
│   ├── firebaseService.ts
│   └── mapsService.ts
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── App.tsx                # App entrypoint
Authentication & Data Management
Signup/Login via email/password and Google through Firebase Auth service

Firestore Structure:

bash
Copy
Edit
users/
└── {userId}/
    ├── profile
    └── itineraries/
         └── {itineraryId} { destination, dates, items[], meta }
Real-time updates and Firestore offline persistence included—test by toggling device’s connectivity.

AI-Powered Itinerary Generation
User inputs travel data and preferences.

Front-end calls aiService.generateItinerary() → hits OpenAI/Gemini LLM.

The model returns structured itinerary in defined JSON schema:

json
Copy
Edit
{
  "title": "Paris in 3 Days",
  "days": [ { "day": 1, "activities": [...] }, ... ],
  "tips": [ ... ]
}
Validate the structure client-side, store in Firestore, and render.

Testing & Validation
Unit tests: Jest + React Native Testing Library

AI output validation: zod schema ensures response correctness

Manual testing: test itinerary flows with emulator and Expo Go

For CI: Configure GitHub Actions to run npm test, linting, and basic TypeScript type-check

Deployments & CI/CD
Front-end: Built with Expo’s EAS (Expo Application Services)

Distribution: Standalone iOS/Android builds via EAS

Backend: Firebase Firestore and Auth hosted natively

LLM API usage tracked via Firebase Analytics billing monitors

Roadmap & Future Enhancements
 Multi-destination trip support

 In-app flight/hotel booking integration

 Social features: share plans with friends

 Reviews & user ratings per itinerary

 Support for additional map providers (e.g. Mapbox)

 Accessibility improvements (VoiceOver, larger fonts)

 Dark mode & theming

Contributing
All contributions welcome! To contribute:

Fork this repository

Create a branch: git checkout -b feature/YourFeature

Add tests and relevant documentation

Please follow the existing code style, run npm test and confirm everything is passing.

SCREENSHOTS OF THE APPLICATION ARE HERE :

<img src="https://github.com/user-attachments/assets/20954cd8-d90a-4e8e-b329-3e083a732a3b" width="250"> 
<img src="https://github.com/user-attachments/assets/77eddbf5-3aac-4d65-a504-af29bf2dc1a3" width="250">
<img src="https://github.com/user-attachments/assets/9f357fc5-a9c0-41fa-bf9d-2be4431deab4" width="250"> 
<img src="https://github.com/user-attachments/assets/cda5f2df-fb9e-4335-9cdd-9ef7d6336e73" width="250">
<img src="https://github.com/user-attachments/assets/c4f76dd5-9925-46af-9456-4b0a39744fb1" width="250"> 
<img src="https://github.com/user-attachments/assets/5c7f50bd-e4ee-485d-9e15-1f0fbeeb2246" width="250">
<img src="https://github.com/user-attachments/assets/b6b94b3a-095c-4aa0-bdab-1b62b6fc47aa" width="250"> 
<img src="https://github.com/user-attachments/assets/5caa583b-312f-4f59-837d-3b24490457f7" width="250">
<img src="https://github.com/user-attachments/assets/0321edc1-d7da-4d06-96db-bbb638678135" width="250"> 
<img src="https://github.com/user-attachments/assets/3c321195-8892-4944-996f-f770907aa400" width="250">
<img src="https://github.com/user-attachments/assets/e48e30cd-83c7-413c-b177-5272906c502b" width="250"> 
<img src="https://github.com/user-attachments/assets/f41b77c8-5525-4f5d-b448-e50f31fc2b2f" width="250">
<img src="https://github.com/user-attachments/assets/4dab1e8b-7c98-4f27-9447-9c83244e6e45" width="250">

