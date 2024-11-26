import { FlexContainer } from "@/components/FlexBox/FlexContainer";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <FlexContainer
      direction="column"
      align="center"
      justify="center"
      className="min-h-screen"
    >
      <SignUp />
    </FlexContainer>
  );
}
