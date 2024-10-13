import React, { useContext, useState } from "react";
import api from "../../../axios/api";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const Navigate = useNavigate();
  const { setRole } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/login", {
        name: username,
        password,
      }, { withCredentials: true });
      console.log(response.data);
      setRole("admin");
      Navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
      setErr(error.response.data.message || "An error occurred");
    } else {
      setErr("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center">
        <form className="w-full mx-3 border-teal-400 md:w-1/3 px-5 py-5 bg-zinc-800 rounded-sm text-white shadow-lg flex flex-col justify-center items-center">
          <h1>Admin Login</h1>
          <p>{err }</p>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="w-full rounded-sm p-2 my-2 bg-zinc-700 text-white"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="w-full p-2 rounded-sm my-2 bg-zinc-700 text-white"
          />
          <button
            onClick={handleSubmit}
            className="w-full p-2 my-2 bg-teal-500 hover:bg-teal-600 text-white"
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
