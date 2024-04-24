import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Rotuer";

import "animate.css";
import { Toaster } from "react-hot-toast";

// English language
import button from "./i18n/english/button.json";
import dialogMessagess from "./i18n/english/dialogMessages.json";
import english from "./i18n/english/english.json";
import form from "./i18n/english/form.json";
import validationMessages from "./i18n/english/validationMessages.json";

// Spanish language
import spanish from "./i18n//spanish/spanish.json";
import mensajesDialogo from "./i18n/spanish/MensajesDialogo.json";
import boton from "./i18n/spanish/boton.json";
import formulario from "./i18n/spanish/formulario.json";
import mensajesValidacion from "./i18n/spanish/mensajesValidacion.json";

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          ...english,
          ...validationMessages,
          ...form,
          ...button,
          ...dialogMessagess,
        },
      },
      es: {
        translation: {
          ...spanish,
          ...mensajesValidacion,
          ...formulario,
          ...boton,
          ...mensajesDialogo,
        },
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Toaster />
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
