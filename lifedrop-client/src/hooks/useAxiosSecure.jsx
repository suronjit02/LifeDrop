import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";

const axiosSeccure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const reqInterceptor = axiosSeccure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;

      return config;
    });

    const resInterceptor = axiosSeccure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSeccure.interceptors.request.eject(reqInterceptor);
      axiosSeccure.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  return axiosSeccure;
};

export default useAxiosSecure;
