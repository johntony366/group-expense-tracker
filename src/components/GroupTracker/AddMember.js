import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { db } from "../../firebase-config";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import { Alert, Box, Button, Grid, TextField } from "@mui/material";

function AddMember({ selectedGroup }) {
  const { handleSubmit, control, reset, setFocus } = useForm();
  const [error, setError] = useState("");

  async function handleAddMember(data) {
    const memberUsername = data.memberEmail.split("@")[0];

    const member = await getDoc(doc(db, `/users/${memberUsername}`));
    if (!member.exists()) {
      setError("User does not exist!");
    } else {
      setError("");
      addGroupToMembersGroups(memberUsername);
      addMemberToGroup(memberUsername);

      setFocus("memberEmail");
      reset();
    }
  }

  async function addGroupToMembersGroups(memberUsername) {
    const docRef = doc(db, `users/${memberUsername}`);
    await setDoc(
      docRef,
      { groups: arrayUnion(selectedGroup) },
      { merge: true }
    );
  }

  async function addMemberToGroup(memberUsername) {
    const docRef = doc(db, `groups/${selectedGroup}`);
    await setDoc(
      docRef,
      {
        members: arrayUnion(memberUsername),
      },
      { merge: true }
    );
  }

  return (
    <form
      onSubmit={handleSubmit((data) => handleAddMember(data))}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "24px",
        marginBottom: "24px",
      }}
    >
      <Box width="clamp(250px, 50%, 400px)">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {error && (
              <Alert severity="error" sx={{ marginBottom: "24px" }}>
                {error}
              </Alert>
            )}
          </Grid>
          <Grid item xs={8}>
            <Controller
              render={({ field: { ref, ...field } }) => {
                return (
                  <TextField
                    {...field}
                    inputRef={ref}
                    label={"Add member"}
                    placeholder={"Enter member email..."}
                    sx={{ width: "100%" }}
                    type="email"
                    size="small"
                    required
                    InputLabelProps={{ required: false }}
                  />
                );
              }}
              rules={{ required: true }}
              name="memberEmail"
              control={control}
              defaultValue=""
            />
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "primary.main",
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export { AddMember };
