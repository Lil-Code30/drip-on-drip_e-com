import { useUser } from "../contexts/UserInfosContext";

export default function Home() {
  const { userInfos } = useUser();

  console.log(userInfos);
  return (
    <>
      <h1>This is Home Page</h1>
    </>
  );
}
