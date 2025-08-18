import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

function IsAuth({
  isAuthenticated,
  signIn,
  signOut,
}: {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}) {
  return (
    <>
      {isAuthenticated ? (
        <button className="auth-button" onClick={signOut}>
          Log Out
        </button>
      ) : (
        <button className="auth-button" onClick={signIn}>
          Log In
        </button>
      )}
    </>
  );
}

export const meta = () => [
  { title: "Resumeind | Auth" },
  { name: "description", content: "Log into your account" },
]; // REMIX alternative of useState
const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log In to continue Your Job Journey</h2>
          </div>
          {isLoading ? (
            <button className="auth-button animate-pulse">
              <p>Signing you in...</p>
            </button>
          ) : (
            <IsAuth
              isAuthenticated={auth.isAuthenticated}
              signIn={auth.signIn}
              signOut={auth.signOut}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default Auth;
