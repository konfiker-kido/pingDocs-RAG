// // components/AuthRedirect.tsx
// "use client";

// import { useEffect } from "react";
// import { useAuth, RedirectToSignIn } from "@clerk/nextjs";

// export default function AuthRedirect() {
//   const { isSignedIn, isLoaded } = useAuth();

//   useEffect(() => {
//     if (isLoaded && !isSignedIn) {
//         RedirectToSignIn();
//     }
//   }, [isLoaded, isSignedIn]);

//   return null;
// }
