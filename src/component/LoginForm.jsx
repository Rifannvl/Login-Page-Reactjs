import React from "react";

export default function LoginForm() {
  return (
    <form action="" className="border py-4 px-6 rounded-md space-y-2">
      <h1 className="text-2xl font-bold pb-4">Login</h1>

      <div>
        <label htmlFor="username" className="flex flex-col gap-3">
          Username :{" "}
        </label>
        <input
          className="border px-2 py-1 rounded-md w-full"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
        />
      </div>
      <div>
        <label htmlFor="password" className="flex flex-col gap-3">
          Password :{" "}
        </label>
        <input
          className="border px-2 py-1 rounded-md w-full"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </div>

      <div className="flex justify-center py-4">
        <button className="bg-blue-500 text-white px-2 py-2 rounded-md text-center w-full">
          Login
        </button>
      </div>
    </form>
  );
}
