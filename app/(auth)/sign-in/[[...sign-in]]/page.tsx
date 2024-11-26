import { FlexContainer } from "@/components/FlexBox/FlexContainer";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <FlexContainer
      direction="column"
      align="center"
      justify="center"
      className="min-h-screen"
    >
      <SignIn />
    </FlexContainer>
  );
}
