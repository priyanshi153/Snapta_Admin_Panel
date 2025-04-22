import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useApiPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = async (url, bodyData, contentType = "application/json") => {
    const token = Cookies.get("token"); 
    try {
      setLoading(true);
      setError(null);

      const headers = {
        "Content-Type": contentType,
        ...(token && { Authorization: `Bearer ${token}` }), 
      };

      const apiUrl = process.env.REACT_APP_API_URL; // Get the base URL from .env

      const response = await axios.post(
        `${apiUrl}${url}`, 
        bodyData,
        { headers }
      );
      
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, postData };
};

export default useApiPost;
