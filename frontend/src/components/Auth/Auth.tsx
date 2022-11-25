import { Button, Center, Stack, Text, Image, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({
  session,
  reloadSession,
}) => {
  const [username, setUsername] = useState("");
  const onSubmit = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Center height="100vh">
        <Stack spacing={8} align="center">
          {session ? (
            <>
              <Text fontSize="3xl">Create Username</Text>
              <Input
                placeholder="Enter a new username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button width="100%" onClick={onSubmit}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Text fontSize="3xl">MessengerQL</Text>
              <Button
                onClick={() => signIn("google")}
                leftIcon={
                  <Image height="20px" src="/images/googlelogo.png" alt="/" />
                }
              >
                Continue With Google
              </Button>
            </>
          )}
        </Stack>
      </Center>
    </div>
  );
};

export default Auth;
