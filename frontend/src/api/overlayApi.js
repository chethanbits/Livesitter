import axios from "axios";

const API_URL = "/api/overlays";
const STREAM_URL = "/api/stream";

// Overlay CRUD operations

export const createOverlay = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getOverlays = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getOverlay = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/${name}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateOverlay = async (name, data) => {
  try {
    const response = await axios.put(`${API_URL}/${name}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteOverlay = async (name) => {
  try {
    const response = await axios.delete(`${API_URL}/${name}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Stream operations

export const startStream = async (rtspUrl) => {
  try {
    const response = await axios.post(`${STREAM_URL}/start`, {
      rtsp_url: rtspUrl,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const stopStream = async () => {
  try {
    const response = await axios.post(`${STREAM_URL}/stop`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const healthCheck = async () => {
  try {
    const response = await axios.get("/api/health");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};





