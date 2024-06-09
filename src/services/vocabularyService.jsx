import { addDoc, collection, getDocs, getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { fileStore as db } from "@/configs/firebase";

const collectionName = "vocabularies";

export const getVocabularies = async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => doc.data());
}

export const addVocabulary = async (word, mean) => {
    const docData = doc(db, collectionName, word);
    const docSnap = await getDoc(docData);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return false
    } else {
        await setDoc(doc(db, collectionName, word), {
            word: word,
            mean: mean,
        });
        return true;
    }
}

