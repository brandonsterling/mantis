import { useRouter } from "next/router";
import Protected from "../../components/layouts/Protected";
import { StoryPage } from "../../features/stories/StoryPage";

function Page() {
  const router = useRouter();
  const { id } = router.query;

  return <StoryPage />;
}

Page.Layout = Protected;

export default Page;
