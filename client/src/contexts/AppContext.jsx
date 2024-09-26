// import React, { useState } from "react";
// import Toast from "../components/Toast";
// import { useQuery } from "react-query";
// import * as apiClient from "../api-client";
// import { loadStripe } from "@stripe/stripe-js";

// import { createContext, useContext } from "react";

// const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

// const applicationContext = React.createContext();

// const stripePromise = loadStripe(STRIPE_PUB_KEY);

// const AppContext = ({ children }) => {
//   const [toast, setToast] = useState(undefined);

//   const { isError } = useQuery("validate-token", apiClient.validateToken, {
//     retry: false,
//   });

//   // useEffect(() => {
//   //   if (isError) {
//   //     setToast({ message: "Token Invalid", type: "error" });
//   //   }
//   //   // setToast("");
//   // }, [isError]);

//   return (
//     <AppContext
//       value={{
//         showToast: (toastMessage) => {
//           setToast(toastMessage);
//         },
//         isLoggedIn: !isError,
//         stripePromise,
//       }}
//     >
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(undefined)}
//         />
//       )}
//       {children}
//     </AppContext>
//   );
// };

// export { applicationContext };

// export default AppContext;

import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

const AppContext = createContext(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState(undefined);

  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        stripePromise,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// export default function useAppContext() {
//   const context = useContext(AppContext);
//   return context;
// }
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
