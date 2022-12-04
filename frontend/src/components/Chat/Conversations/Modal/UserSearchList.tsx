import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { SearchedUser } from "../../../../utils/types";
interface UserSearchListProps {
  users: Array<SearchedUser>;
  addParticipant: (user: SearchedUser) => void;
}

const UserSearchList: React.FC<UserSearchListProps> = ({
  users,
  addParticipant,
}) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify="center">
          <Text>No users found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user) => (
            <Stack
              direction="row"
              align="center"
              spacing={4}
              py={2}
              borderRadius={4}
              _hover={{ bg: "gray.300" }}
              key={user.id}
            >
              <Avatar src="https://source.unsplash.com/random" />
              <Flex width="100%" justify="space-between" align="center">
                <Text>{user.username}</Text>
                <Button bg="gray.400" onClick={() => addParticipant(user)}>
                  Start conversation
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default UserSearchList;
