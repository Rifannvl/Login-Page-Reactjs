import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    // alert(`Username : ${username}\nPassword : ${password}`);

    //validate username and password
    if (!username || !password) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Username dan Password harus diisi!",
      });
      return;
    }

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 30, // optional, defaults to 60
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);

        if (data.token) {
          // show allert
          Swal.fire({
            icon: "success",
            title: "Login Berhasilh",
            text: "Login Berhasilh",
            confirmButtonText: "OK",
          }).then(() => {
            // redirect to home page
            navigate("/Users");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Gagal",
            text: data.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form
      onSubmit={handleLogin}
      className="border py-4 px-6 rounded-md space-y-2"
    >
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
          onInput={(e) => setUsername(e.target.value)}
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
          onInput={(e) => setPassword(e.target.value)}
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
