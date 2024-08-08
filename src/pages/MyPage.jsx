import { useGetUser } from "../hooks/useAuth";

function MyPage() {
  const { data: user, isLoading, isError, error } = useGetUser();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.username}!</h1>
      ) : (
        <p>Please log in to see your username.</p>
      )}
    </div>
  );
}

export default MyPage;
