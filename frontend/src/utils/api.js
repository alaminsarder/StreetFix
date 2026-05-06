import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", 
  withCredentials: true,
});

/* ---------------- Problems ---------------- */
export async function createProblem(payload) {
  const res = await api.post("/api/problems", payload);
  return res.data;
}

export async function getProblems() {
  const res = await api.get("/api/problems");
  return res.data;
}

export async function getProblemById(id) {
  const res = await api.get(`/api/problems/${id}`);
  return res.data;
}

// স্ট্যাটাস, কমেন্ট বা অন্য যেকোনো কিছু আপডেট করার ফাংশন
export async function updateProblemDetails(problemId, payload) {
  const token = localStorage.getItem("token"); 
  const res = await api.patch(`/api/problems/${problemId}`, payload, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data;
}

export async function updateProblemStatus(problemId, status) {
  return await updateProblemDetails(problemId, { status });
}

// ✅ নতুন: ডিলিট করার ফাংশনটি এখানে যোগ করা হয়েছে
export async function deleteProblem(problemId) {
  const token = localStorage.getItem("token");
  const res = await api.delete(`/api/problems/${problemId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data;
}

/* ---------------- Admin ---------------- */
export async function adminLogin(email, password) {
  const res = await api.post("/api/admin/login", { email, password });
  return res.data;
}

export default api;