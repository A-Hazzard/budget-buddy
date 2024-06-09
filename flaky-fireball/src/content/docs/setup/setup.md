---
title: Setup
description: A guide in my new Starlight docs site.
---

## Prerequisite
- Node.js (>=14.x)

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/budget-buddy.git
   cd budget-buddy
   ```
2. **Install Dependencies:**
- Use your preferred package manager to install the project dependencies.
   ```bash
   pnpm install
   ```
3. **Environment Configuration:**
- Create a .env file in the root directory and add the necessary Firebase configuration:
    ```bash
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

    ```
4. **Run the Development Server:**
- Start the Next.js development server.
    ```bash
    pnpm dev
    ```
5. **Build for Production:**
- To create a production build, use:
    ```bash
    pnpm build
    ```
6. **Deploy:**
- The application can be deployed using Firebase Hosting. Ensure you have the Firebase CLI installed and configured.
    ```bash
    firebase deploy
    ```