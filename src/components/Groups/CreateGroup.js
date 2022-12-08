import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "context/AuthProvider";
import { db } from "firebase-config";
import { setDoc, collection, serverTimestamp, doc } from "firebase/firestore";

function CreateGroup() {
  const { handleSubmit, control, reset, setFocus } = useForm();
  const { currentUser } = useAuth();

  async function addGroupToFirestore(data) {
    const groupRef = doc(
      collection(db, `users/${currentUser.uid}/transactions`)
    );
  }

  return <div>CreateGroup</div>;
}

export default CreateGroup;
