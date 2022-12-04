import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Modal as ConversationModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Stack,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import UserOperations from "../../../../graphql/operations/user";
import ConversationOperations from "../../../../graphql/operations/conversation";
import {
  SearchUsersData,
  SearchUsersInput,
  SearchedUser,
  CreateConversationData,
  CreateConversationInput,
} from "../../../../utils/types";
import Participants from "./Participants";
import UserSearchList from "./UserSearchList";
import { Session } from "next-auth";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, session }) => {
  const {
    user: { id: userId },
  } = session;

  const [username, setUsername] = useState("");

  const [participat, setParticipat] = useState<Array<SearchedUser>>([]);

  const [searchUsers, { data, error, loading }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);

  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, CreateConversationInput>(
      ConversationOperations.Mutations.createConversation
    );

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchUsers({ variables: { username } });
  };

  const addParticipant = (user: SearchedUser) => {
    setParticipat((prev) => [...prev, user]);
    setUsername("");
  };

  const removeParticipant = (id: string) => {
    setParticipat((prev) => prev.filter((user) => user.id !== id));
  };

  const onCreateConversation = async () => {
    const participantIds = [
      userId,
      ...participat.map((participat) => participat.id),
    ];
    try {
      const { data } = await createConversation({
        variables: { participantIds },
      });
      console.log(data);
    } catch (error: any) {
      console.log("onCreateConversation error : ", error);
      toast.error(error?.message);
    }
  };

  return (
    <>
      <ConversationModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader>Create a conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  type="submit"
                  disabled={!username}
                  isLoading={loading}
                  bg="gray.400"
                >
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UserSearchList
                users={data?.searchUsers}
                addParticipant={addParticipant}
              />
            )}

            {participat?.length > 0 && (
              <>
                <Participants
                  removeParticipant={removeParticipant}
                  participants={participat}
                />
                <Button
                  bg="gray.400"
                  width="100%"
                  mt={6}
                  onClick={onCreateConversation}
                  isLoading={createConversationLoading}
                >
                  Create conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </ConversationModal>
    </>
  );
};

export default Modal;
