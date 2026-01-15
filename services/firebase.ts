
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfi03tXRQLkdlTAZXIgS2GjaY38aWEXUE",
  authDomain: "wankyacademy-certificates.firebaseapp.com",
  projectId: "wankyacademy-certificates",
  storageBucket: "wankyacademy-certificates.firebasestorage.app",
  messagingSenderId: "899386752304",
  appId: "1:899386752304:web:347cf1753fb0b3b7c19cf5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface CertificateData {
  certId: string;
  student: string;
  course: string;
  level: string;
  issueDate: string;
  hash: string;
  createdAt: string;
}

export const saveCertificateToFirebase = async (data: CertificateData) => {
  try {
    await setDoc(doc(db, "certificates", data.certId), data);
    console.log("Certificate saved to Firestore:", data.certId);
  } catch (error) {
    console.error("Error saving certificate:", error);
    throw error;
  }
};

export const getCertificateFromFirebase = async (certId: string): Promise<CertificateData | null> => {
  try {
    const docRef = doc(db, "certificates", certId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as CertificateData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return null;
  }
};
