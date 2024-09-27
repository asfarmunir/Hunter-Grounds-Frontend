import AddProperty from "@/components/shared/AddProperty";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserDetails } from "@/database/actions/user.action";

const page = async () => {
  const session = await getServerSession(authOptions);
  const userDetails = await getUserDetails(session.user.email);
  return <AddProperty userDetails={userDetails} />;
};

export default page;
