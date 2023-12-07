import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
import { useMutation } from "@tanstack/react-query";

export const UserSigninQuery = () => {
  const setUserInfos = useAuthStore((state) => state.setUserInfos);
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (userInformations) => {
      const { password, email } = userInformations;
      const { data } = await axios.post('http://localhost:8080/api/auth/signin', { password, email });
      return data;
    },
    onSuccess(data) {
      toast.success(data.message);
      setUserInfos(data.body)
      setTimeout(() => {
        navigate('/')
      }, 1000)
    },
    onError(err) {
      toast.dismiss();
      toast.error(err.response.data.message || err.message);
    },
  });
  return { mutate, isLoading }
}