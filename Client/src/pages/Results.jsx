"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../api/api";
import { Spinner } from "../components/Spinner";
import { useToast } from "../components/Toast";

export const Results = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);
      // ✅ Call backend API
      const response = await api.get("/candidates/results");

      // ✅ Your backend returns { message, results: [...] }
      const data = response.data.results || [];

      // ✅ Sort candidates by votes descending
      const sorted = [...data].sort(
        (a, b) => (b.votesReceived || 0) - (a.votesReceived || 0)
      );

      setCandidates(sorted);
    } catch (error) {
      console.error("❌ Failed to fetch results:", error);
      showToast("Failed to load election results", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const chartData = candidates.map((candidate) => ({
    name: candidate.name,
    votes: candidate.votesReceived || 0,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Election Results
        </h1>

        {candidates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No results available yet</p>
          </div>
        ) : (
          <>
            {/* Chart Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Vote Distribution
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="votes" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Leaderboard
              </h2>
              <div className="space-y-4">
                {candidates.map((candidate, index) => (
                  <div
                    key={candidate._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold">
                          {candidate.name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {candidate.party} — {candidate.constituency}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {candidate.votesReceived || 0}
                      </p>
                      <p className="text-gray-600 text-sm">votes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
