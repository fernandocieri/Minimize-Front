import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Redirection() {
  const { shortUrl } = useParams();
  const navigate = useNavigate();
  const minimizeApiUrl = process.env.REACT_APP_MINIMIZE_API_URL;

  async function getOriginalUrl() {
    try {
      const response = await axios.get(`${minimizeApiUrl}${shortUrl}`);
      if (response.data) {
        window.location.href = response.data;
      } else {
        navigate('/404');
      }
    } catch (error) {
      navigate('/404');
    }
  }

  useEffect(() => {
    getOriginalUrl()
  }, [])

}
