import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function User() {
  const navigate = useNavigate();
  function getTokenLocalStorage() {
    return localStorage.getItem("token");
  }

  useEffect(() => {
    //  check apakah ada token
    if (!getTokenLocalStorage()) {
      navigate("/");
    }

    // jika ada token, lanjut
    fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (!res.ok) {
        navigate("/");
      }
    });
  }, []);
  function onLogout() {
    // alert apakah anda yakin ingin logout
    Swal.fire({
      icon: "warning",
      title: "apakah anda yakin?",
      text: "Apakah anda yakin ingin logout?",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      }

      if (result.isDismissed) {
        navigate("/users");
      }

      if (result.isDenied) {
        navigate("/users");
      }
    });

    // navigate("/");
  }

  return (
    <div>
      <h1>User</h1>
      <button
        onClick={onLogout}
        className="btn btn-danger bg-red-500 text-white rounded py-2 px-4"
      >
        Logout
      </button>
    </div>
  );
}
