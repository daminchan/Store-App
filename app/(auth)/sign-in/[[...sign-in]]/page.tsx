import { Flex } from "@/components/layout";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-h-screen"
    >
      <SignIn />
    </Flex>
  );
}
