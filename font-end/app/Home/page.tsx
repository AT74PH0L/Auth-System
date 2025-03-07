"use client";
import { useEffect, useState } from "react";
import axiosInstant from "@/utils/axios";

export default function ProfilePage() {
  const [data, setData] = useState<{ email?: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstant.get("/user/profile"); // ✅ ใช้ axiosInstant
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {data.email || "Loading..."}</p>
    </div>
  );
}
