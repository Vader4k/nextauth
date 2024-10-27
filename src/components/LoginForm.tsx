"use client";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { login } from "@/app/login/actions";

const LoginForm: React.FC = () => {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <form
      action={loginAction}
      className="flex max-w-[300px] flex-col gap-3 mt-20 mx-auto"
    >
      <div className="flex flex-col gap-2">
        <input
          className="p-3 bg-gray-500/20 text-gray-500 rounded-lg"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
        />
      </div>
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}

      <div className="flex flex-col gap-2">
        <input
          className="p-3 bg-gray-500/20 text-gray-500 rounded-lg"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
      </div>
      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}
      <SubmitButton />
    </form>
  );
};

export default LoginForm;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-gradient-to-r from-yellow-100 to-orange-400 text-black font-bold p-3 rounded-md"
      type="submit"
      disabled={pending}
    >
      {pending ? "Loading..." : "Login"}
    </button>
  );
}
