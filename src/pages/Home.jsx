import { useUser } from "../contexts/UserInfosContext";
import VerifyEmailNotif from "../components/auth/VerifyEmailNotif";

export default function Home() {
  const { userInfos } = useUser();

  const emailNotifEl = userInfos.user ? (
    userInfos.user.isVerified ? (
      ""
    ) : (
      <VerifyEmailNotif />
    )
  ) : (
    ""
  );
  return (
    <>
      {emailNotifEl}
      <h1>This is Home Page</h1>
    </>
  );
}
