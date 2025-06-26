import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import HomeClient from "../../components/HomeLayout";
import NotAllowed from "../../components/NotAllowed";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <NotAllowed />;
  }

  return <HomeClient />;
}