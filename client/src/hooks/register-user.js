import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const UserRegisterMutation = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (userInformations) => {
      const { data } = await axios.post('http://localhost:8080/api/register', { ...userInformations });
      return data;
    },
    onSuccess(data) {
      console.log('ICI LA', data)
      toast.success(data.msg);
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    },
    onError(err) {
      toast.dismiss();
      console.log(err)
      toast.error(err.response.data.error.message || err.response.data.error);
    },
  })
  return { mutate, isLoading }
}