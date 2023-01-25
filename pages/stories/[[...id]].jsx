import Protected from "../../components/layouts/Protected";
import { StoryPage } from "../../features/stories/StoryPage";

function Page() {
  return <StoryPage />;
}

Page.Layout = Protected;

export default Page;
