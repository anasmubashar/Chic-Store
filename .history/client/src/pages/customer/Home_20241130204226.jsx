import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";

import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { BestSellers } from "@/components/home/BestSellers";
import { Collection } from "@/components/home/Collection";
import { ModiWeek } from "@/components/home/ModiWeek";
import { Sustainability } from "@/components/home/Sustainability";
import { SocialFeed } from "@/components/home/SocialFeed";

const Home = () => {
  // const navigate = useNavigate();
  // const [cookies, removeCookie] = useCookies([]);
  // const [username, setUsername] = useState("");
  // useEffect(() => {
  //   const verifyCookie = async () => {
  //     if (!cookies.token) {
  //       navigate("/auth");
  //     }
  //     const { data } = await axios.post(
  //       "http://localhost:4000",
  //       {},
  //       { withCredentials: true }
  //     );
  //     const { status, user } = data;
  //     setUsername(user);
  //     return status
  //       ? toast(`Hello ${user}`, {
  //           position: "top-right",
  //         })
  //       : navigate("/auth");
  //   };
  //   verifyCookie();
  // }, [cookies, navigate, removeCookie]);
  // const Logout = () => {
  //   removeCookie("token");
  //   navigate("/auth");
  // };
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
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
