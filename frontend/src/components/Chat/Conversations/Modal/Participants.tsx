import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import { SearchedUser } from "../../../../utils/types";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ParticipantsProps {
  participants: Array<SearchedUser>;
  removeParticipant: (id: string) => void;
}

const Participants: React.FC<ParticipantsProps> = ({
  removeParticipant,
  participants,
}) => {
  console.log("participants", participants);
  return (
    <>
      <Flex mt={8} gap="10px" flexWrap="wrap">
        {participants.map((participant) => (
          <Stack direction="row" key={participant.id} align="center">
            <Text>{participant.username}</Text>
            <IoIosCloseCircleOutline
              size={20}
              cursor="pointer"
              onClick={() => removeParticipant(participant.id)}
            />
          </Stack>
        ))}
      </Flex>
    </>
  );
};

export default Participants;
