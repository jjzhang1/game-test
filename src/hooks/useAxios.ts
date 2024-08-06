import { useState, useCallback } from "react";
import axios from "axios";
import { getStorage } from "@/utils";

const useAxios = (initialConfig) => {
  const [config, setConfig] = useState(initialConfig);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  axios.defaults.headers.common["Content-Type"] =
    "application/x-www-form-urlencoded";

  axios.defaults.timeout = 20000;

  const fetchData = useCallback(
    async (params = null) => {
      setLoading(true);
      setError(null);
      console.log(params);
      try {
        config.data = {
          ...config.data,
          ...params,
        };
        config.headers = {
          ...config.headers,
          // Authorization: token,
        };
        const response = await axios(config);
        setData(response.data);
        setError(null);
      } catch (err) {
        setData(null);
        setError(err.response);
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  return { data, error, loading, fetchData, setConfig };
};

export default useAxios;
