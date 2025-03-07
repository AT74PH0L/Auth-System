"use client";
import axiosInstant from "@/utils/axios";
import { AxiosError } from "axios"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState<string>("Loading...");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstant.get("/auth/role");
        setData(response.data); // Success
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          if (error.response && error.response.status === 401) {
            setError(
              "Unauthorized: You do not have permission to view this page."
            );
            setTimeout(() => router.push("/auth/login"), 3000); // 3 seconds delay
          } else {
            setError("Failed to fetch data: " + error.message);
          }
        } else {
          setError("An unknown error occurred");
        }
        setData(""); // Clear data in case of error
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        {error ? (
          <div className="text-center text-red-500 font-semibold">
            <p>{error}</p>
          </div>
        ) : (
          <div className="text-center text-green-500 font-semibold">
            <p>{data}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}
