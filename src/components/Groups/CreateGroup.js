import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider";
import { db } from "../../firebase-config";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { Button, Grid, TextField } from "@mui/material";

function CreateGroup() {
  const { handleSubmit, control, reset, setFocus } = useForm();
  const { currentUsername } = useAuth();

  async function handleCreateGroup(data) {
    addGroupToFirestore(data.groupName);

    setFocus("groupName");
    reset();
  }

  async function addGroupToFirestore(newGroupName) {
    await addGroupToUsersGroups(newGroupName);
    addGroupToGroups(newGroupName);
  }

  async function addGroupToUsersGroups(newGroupName) {
    const docRef = doc(db, `users/${currentUsername}`);
    // const docSnap = await getDoc(docRef);

    // const data = docSnap.data();
    // const groups = data ? data.groups : [];
    // const newGroups = [...groups, newGroupName];

    await setDoc(docRef, { groups: arrayUnion(newGroupName) }, { merge: true });
  }

  async function addGroupToGroups(newGroupName) {
    const docRef = doc(db, `groups/${newGroupName}`);
    await setDoc(
      docRef,
      {
        owner: currentUsername,
        members: arrayUnion(currentUsername),
      },
      { merge: true }
    );
  }

  return (
    <form
      onSubmit={handleSubmit((data) => handleCreateGroup(data))}
      style={{ width: "100%" }}
    >
      <Grid container direction="row" spacing={1}>
        <Grid item xs={8}>
          <Controller
            render={({ field: { ref, ...field } }) => {
              return (
                <TextField
                  {...field}
                  inputRef={ref}
                  label={"Group name"}
                  placeholder={"Enter group name..."}
                  sx={{ width: "100%" }}
                  size="small"
                  required
                  InputLabelProps={{ required: false }}
                />
              );
            }}
            rules={{ required: true }}
            name="groupName"
            control={control}
            defaultValue=""
          />
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "primary.main",
              textTransform: "unset",
              width: "50%",
            }}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default CreateGroup;
