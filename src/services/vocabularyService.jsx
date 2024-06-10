import { collection, getDocs, doc, getDoc, setDoc, query, orderBy, updateDoc } from "firebase/firestore";
import { fileStore as db } from "@/configs/firebase";

const collectionName = "vocabularies";

export const getVocabularies = async () => {
    const q = query(collection(db, collectionName), orderBy("created_at", 'desc'));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
}

export const addVocabulary = async (word, mean, phonetic, pronunciation) => {
    const docData = doc(db, collectionName, word);
    const docSnap = await getDoc(docData);

    if (docSnap.exists()) {
        await updateDoc(doc(db, collectionName, word), {
            word,
            mean,
            phonetic,
            pronunciation,
          });
        return true
    } else {
        await setDoc(doc(db, collectionName, word), {
            word,
            mean,
            phonetic,
            pronunciation,
            created_at: new Date()
        });
        return true;
    }
}

