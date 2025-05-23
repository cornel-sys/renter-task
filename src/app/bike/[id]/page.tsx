"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Bike {
  ID: number;
  Status: string;
  Brand: string;
  User: string | null;
}

export default function BikeId() {
  const { id } = useParams();
  const [bikeData, setBikeData] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycbxQS93Pu6bbSdRVjp28lbK-D2U_18Mb0zyGUh_2Owrc2BrhZLhi-7-4BO7S3Waf_WWd9g/exec"
        );
        const data: Bike[] = await res.json();
        const bike = data.find((b) => String(b.ID) === id);
        setBikeData(bike ?? null);
      } catch (error) {
        console.error("Error fetching bike data:", error);
        setBikeData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    if (!bikeData) return;
    setSubmitting(true);

    const payload = {
      ID: bikeData.ID,
      Action: bikeData.Status === "Active" ? "SetInactive" : "SetActive",
      User: bikeData.Status === "Inactive" ? userName : null,
    };

    try {
      await fetch("/api/updateBike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const updatedBike = {
        ...bikeData,
        Status: bikeData.Status === "Active" ? "Inactive" : "Active",
        User: payload.User,
      };
      setBikeData(updatedBike);
      setUserName("");

      setSubmitting(false);
    } catch (error) {
      alert("Failed to update bike status");
      console.error("Error updating bike status:", error);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse flex flex-col items-center mt-32 gap-10">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (!bikeData) {
    return (
      <div className="flex flex-col items-center mt-32 gap-10">
        <h1 className="text-2xl font-semibold">Bike not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-32 gap-6">
      <h1 className="text-2xl font-semibold">Bike ID: {bikeData.ID}</h1>
      <p>Status: {bikeData.Status}</p>
      <p>Brand: {bikeData.Brand}</p>
      <p>User: {bikeData.User || "N/A"}</p>

      {bikeData.Status === "Active" ? (
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          {submitting ? "Submitting..." : "Set Inactive"}
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <input
            type="text"
            placeholder="Enter User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            onClick={handleSubmit}
            disabled={!userName || submitting}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {submitting ? "Submitting..." : "Set Active"}
          </button>
        </div>
      )}
    </div>
  );
}
