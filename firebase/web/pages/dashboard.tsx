import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Box,
  Center,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { db } from "../config/firebase";

type Props = {};

interface Note {
  id: string;
  text: string;
  author?: string;
}

type Inputs = {
  text: string;
};

const schema = yup
  .object({
    text: yup.string().required(),
  })
  .required();

const Dashboard = (props: Props) => {
  // https://github.com/RonHouben/nextjs-todo-app/blob/c55af99329f5206d31eec8f87405873e111895c6/lib/firebaseClient.ts
  // https://travis.media/how-to-use-firebase-with-react/#20211130-addDoc
  const { data: session } = useSession();

  const [notes, setNotes] = useState<Note[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addNote = async (text: string) => {
    await addDoc(collection(db, "notes"), {
      text,
      author: session?.id,
    });
    await getNotes();
  };

  const getNotes = async () => {
    const notesSnapshot = await getDocs(
      collection(db, "notes") as CollectionReference<Note>
    );
    const notes = notesSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    setNotes(notes);
  };

  const deleteNote = (id: string) => async () => {
    const noteRef = doc(db, "notes", id);
    deleteDoc(noteRef);
    await getNotes();
  };

  useEffect(() => {
    getNotes();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    setIsLoading(true);
    addNote(values.text);
    reset();
    setIsLoading(false);
  };

  return (
    <Box>
      <p>Dashboard</p>

      {notes?.map((note) => (
        <Center key={note.id} onClick={deleteNote(note.id)} cursor="pointer">
          <Text>
            {note.text} {note.author}
          </Text>
        </Center>
      ))}
      {isLoading && <Spinner />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.text}>
          {/* <FormLabel htmlFor="text">First text</FormLabel> */}
          <Input
            marginTop={2}
            id="text"
            placeholder="text"
            {...register("text")}
          />
          <FormErrorMessage>
            {errors.text && errors.text.message}
          </FormErrorMessage>
        </FormControl>
        <Center>
          <Button
            type="submit"
            mt={4}
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="outline"
            disabled={isSubmitting || isLoading}
          >
            Add Note
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // https://next-auth.js.org/tutorials/securing-pages-and-api-routes
  const session = await getSession(context);

  console.log("server session", session);
  if (!session) {
    return { props: {}, redirect: { destination: "/auth" } };
  }
  //   const { user } = session;

  return {
    props: {},
  };
};

export default Dashboard;
