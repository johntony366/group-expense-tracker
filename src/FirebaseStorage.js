import {
  doc,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase-config";

export class FirebaseStorage {
  static async getTransactions(dispatch) {
    const colRef = await collection(db, "users/temp/transactions");
    const querySnapshot = await getDocs(colRef);

    const transactions = querySnapshot.docs.map((doc) => {
      return doc.data();
    });

    dispatch({ type: "got_transactions", transactions: transactions });
  }

  static async addTransaction(dispatch, itemName, amount) {
    const transactionRef = doc(collection(db, "users/temp/transactions"));

    await setDoc(transactionRef, {
      itemName: itemName,
      amount: amount,
      id: transactionRef.id,
      timestamp: serverTimestamp(),
    });
  }

  static async deleteTransaction(dispatch, id) {
    const colRef = await collection(db, "users/temp/transactions");
    const querySnapshot = await getDocs(colRef);

    querySnapshot.forEach(async (doc) => {
      if (doc.id === id) {
        deleteDoc(doc.ref);
      }
    });
  }
}
