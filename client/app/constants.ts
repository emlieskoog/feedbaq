export const API_BASE_URL = "http://localhost:8080/api";
export const MAX_LOGIN_ATTEMPTS = 3;
export const APP_NAME = "FeedbaQ App";
export const BASE_PATH = "/";

export const appRoutes = {

  LOGIN_PAGE: `${BASE_PATH}`,
  ACCOUNT_PAGE: `${BASE_PATH}account`,
  NEW_FORM: `${BASE_PATH}account/new-form`,
  CUSTOMER_FORM: `${BASE_PATH}customer-form`,
};

export const formQuestions = [
  {
    id: "0",
    question: "Info",
    description: "",
    inputType: "info",
  },
  {
    id: "1",
    question: "Uppstart",
    description: "Förståelse, startsträcka, rätt förutsättningar för att klara uppdraget, dator och miljöer...",
    inputType: "text",
  },
  {
    id: "2",
    question: "Resultat",
    description: "Kompetens, levererar, kvalitet, tid...",
    inputType: "text",
  },
  {
    id: "3",
    question: "Ansvar",
    description:
      "Samarbete, hjälper & frågar, står för åtaganden, flaggar...",
    inputType: "text",
  },
  {
    id: "4",
    question: "Enkelhet",
    description: "Göra det svåra enkelt, enkel kommunikation...",
    inputType: "text",
  },
  {
    id: "5",
    question: "Glädje",
    description: "Tillför energi, kul att jobba med...",
    inputType: "text",
  },
  {
    id: "6",
    question: "Innovation",
    description: "Kreativ, kommer med förslag och idéer, kliver fram...",
    inputType: "text",
  },
  {
    id: "7",
    question: "Nöjdhet (konsult)",
    description: "Hur nöjd är kunden med konsulten på en skala 1-10?",
    inputType: "rating",
  },
  {
    id: "8",
    question: "Nöjdhet (HiQ)",
    description: "Hur nöjd är kunden med HiQ på en skala 1-10?",
    inputType: "rating",
  },
  {
    id: "9",
    question: "Förbättringar",
    description: "Vad kan förbättras?",
    inputType: "text",
  },
  {
    id: "10",
    question: "Värdeomdömen (positivt)",
    description: "Positiv feedback och beröm från kunder eller användare...",
    inputType: "text",
  },
  {
    id: "11",
    question: "Värdeomdömen (negativt)",
    description: "Negativ feedback och kritik från kunder eller användare...",
    inputType: "text",
  },
  {
    id: "12",
    question: "Övrigt",
    description:
      "Allmänt utrymme för ytterligare kommentarer eller ämnen som inte täcks av andra frågor...",
    inputType: "text",
  },
  {
    id: "13",
    question: "Nästa uppföljning",
    description:
      "Planerad tidpunkt eller åtgärder för den nästa uppföljningen...",
    inputType: "text",
  },
];
