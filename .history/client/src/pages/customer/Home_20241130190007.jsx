import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { BestSellers } from "@/components/best-sellers";
import { CollectionGrid } from "@/components/collection-grid";
import { Mediweek } from "@/components/mediweek";
import { InstagramSection } from "@/components/instagram-section";
import { SiteFooter } from "@/components/site-footer";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/auth");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : navigate("/auth");
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/auth");
  };
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <BestSellers />
        <CollectionGrid />
        <Mediweek />
        <InstagramSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Home;
