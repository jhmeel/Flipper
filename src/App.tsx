import { useEffect, lazy, Suspense } from "react";
import { IconCloudOffline16 } from "./assets/icons";
import toast, { useToasterStore } from "react-hot-toast";
import { Routes, Route, useLocation} from "react-router-dom";
import NavBar from "./components/Nav";
import CSpinner from "./components/loaders/CSpinner";
import ScrollReveal from "scrollreveal";

const HomePage = lazy(() => import("./pages/Home"));
const TermsPage = lazy(() => import("./pages/meta/Terms"));
const PrivacyPolicyPage = lazy(() => import("./pages/meta/PrivacyPolicy"));
const AboutUsPage = lazy(() => import("./pages/meta/AboutUs"));
const TaskExecutionPage = lazy(() => import("./pages/Task"));
const BlogPage = lazy(() => import("./pages/blog/Blog"));
const NotfoundPage = lazy(() => import("./pages/Notfound"));
const ProfilePage = lazy(() => import("./pages/profile/Profile"));
const SignupPage = lazy(() => import("./pages/auth/Signup"));
const LoginPage = lazy(() => import("./pages/auth/Login"));
const OTP_VerificationPage = lazy(
  () => import("./pages/auth/OTP_Verification")
);

const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPassword"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPassword"));

function App() {
  const { pathname } = useLocation();
  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  useEffect(() => {
    if (!navigator.onLine) {
      toast("You are currently offline!", {
        style: {
          backgroundColor: "gray",
          color: "#fff",
        },
        icon: <IconCloudOffline16 />,
      });
    }
  }, [pathname]);

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });

    sr.reveal(
      ["#banner", ".revenue-source", ".msg-modal", ".testimonial-cont"],
      { opacity: 0, interval: 300 }
    );
  }, []);

  return (
    <>
      <Suspense fallback={<CSpinner />}>
        {![
          "/login",
          "/#/login",
          "/signup",
          "/#/signup",
          "/#/reset-password",
          "/reset-password",
          "/#/forgot-password",
          "/forgot-password",
          "/#/verify-otp",
          "/verify-otp",
          "/privacy-policy",
          "/terms-of-service"
        ].includes(pathname) && (
          <>
            <NavBar />
          </>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/task" element={<TaskExecutionPage />} />
          <Route path="/verify-otp" element={<OTP_VerificationPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/terms-of-service" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
