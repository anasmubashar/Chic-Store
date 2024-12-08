import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";

import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { Hero } from "@/components/Customer/Home/Hero";
import { BestSellers } from "@/components/Customer/Home/BestSellers";
import { Collection } from "@/components/Customer/Home/Collection";
import { ModiWeek } from "@/components/Customer/Home/ModiWeek";
import { Sustainability } from "@/components/Customer/Home/Sustainability";
import { SocialFeed } from "@/components/Customer/Home/SocialFeed";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/auth");
      }
      const { data } = await axios.post("http://localhost:4000");
      const { status, user } = data;
      setUsername(user.username);
      return status
        ? toast(`Hello ${user.username}`, {
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
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <h2 onClick={Logout}>logout</h2>
        <Hero />
        <BestSellers />
        <Collection />
        <ModiWeek />
        <Sustainability />
        <SocialFeed />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
