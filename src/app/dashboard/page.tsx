"use client";
import React from "react";
import { logout } from "../login/actions";

export default function Dashboard() {
  return (
    <div>
      <button
        className="bg-gradient-to-r from-yellow-100 to-orange-400 text-black font-bold p-3 rounded-md"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
}
