---
title: Report
description: A guide in my new Starlight docs site.
---
## Project Overview

**Project Name:** Budget Buddy

**Objective:**
The primary objective of Budget Buddy is to provide users with a comprehensive tool to manage their personal finances efficiently. The application allows users to track their income and expenses, ensuring they have a clear overview of their financial health.

**Key Features:**

1. **User Authentication:** Secure login and signup functionality.
2. **Dashboard:** A personalized dashboard displaying financial summaries and charts.
3. **Expense and Income Tracking:** Easy addition and categorization of income and expenses.
4. **Responsive Design:** Optimized for both desktop and mobile devices.

**Scope:**
Budget Buddy is designed to cater to individual users looking to manage their finances. The application is built using modern web technologies to ensure scalability and maintainability.

**Outcomes:**
The project successfully delivers a functional and user-friendly interface for financial management. Users can securely log in, view their financial status, and track their expenses and income with ease.

## Technical Implementation

**Technologies Used:**

- **Frontend:** React (Next.js), Tailwind CSS
- **Backend:** Firebase for authentication and database
- **Package Manager:** pnpm for efficient caching and performance
- **Version Control:** Git (GitHub)

## Technical Challenges and Decision-Making

**Technical Challenges:**

- **Authentication Integration:** Ensuring secure and seamless integration with Firebase authentication required careful configuration and testing.
- **State Management:** Managing the state of the application, especially with real-time updates from Firebase, was achieved using React's context API and hooks.
- **Responsive Design:** Ensuring the application is responsive involved extensive use of Tailwind CSS and thorough testing on various devices.

**Decision-Making:**

- **pnpm for Package Management:** Chosen for its superior caching capabilities and faster installation times compared to npm and yarn.
- **Firebase:** Selected for its real-time database, authentication, and hosting capabilities, which streamlined the development process.

## Important Code Components

1. **Authentication Context:**
- Manages user authentication state across the application.

   ```typescript
   import { createContext, useContext, useEffect, useState } from 'react';
   import { auth } from '../firebase';
   import { onAuthStateChanged } from 'firebase/auth';

   const AuthContext = createContext();

   export function AuthProvider({ children }) {
     const [user, setUser] = useState(null);

     useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (user) => {
         setUser(user);
       });
       return () => unsubscribe();
     }, []);

     return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
   }

   export const useAuth = () => useContext(AuthContext);
   ```

2. **Dashboard Component:**

- Displays a summary of user finances.

  ```typescript
    import { useEffect, useState } from 'react';
    import { db } from '../firebase';
    import { collection, query, where, getDocs } from 'firebase/firestore';

    function Dashboard() {
      const [data, setData] = useState([]);
      const { user } = useAuth();

      useEffect(() => {
        if (user) {
          const q = query(collection(db, 'finances'), where('uid', '==', user.uid));
          getDocs(q).then((querySnapshot) => {
            const items = querySnapshot.docs.map((doc) => doc.data());
            setData(items);
          });
        }
      }, [user]);

      return <div>{/* Dashboard content */}</div>;
    }

    export default Dashboard;
  ```

