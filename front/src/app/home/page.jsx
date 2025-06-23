import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import HomeClient from "../../components/HomeLayout";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="text-red-700">VOCÊ NÃO ESTÁ LOGADO</div>
    );
  }

  return <HomeClient />;
}