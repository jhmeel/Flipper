/* eslint-disable @typescript-eslint/no-explicit-any */
import  { ChangeEvent, useEffect, useState } from "react";
import MetaData from "../../misc/MetaData";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { IconEyeFill, IconEyeSlashFill } from "../../assets/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearErrors, registerUser } from "../../actions/user";
import HLoader from "../../components/loaders/HLoader";
import emailjs from "@emailjs/browser";
import { errorParser } from "../../utils/formatter";
import logo from "../../assets/flipper-logo.png";
import { RootState } from "../../store";
interface FormData {
  username?: string;
  phone?: string;
  email?: string;
  password?: string;
  referralCode?: string;
}
const Signup = () => {
  const { loading, isAuthenticated, token, user, error } = useSelector(
    (state: RootState) => state.user
  );
 
  const [formData, setFormData] = useState<FormData>({
    username: "",
    phone: "",
    email: "",
    password: "",
    referralCode: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //To ensure state is at init when page is first loaded
  useEffect(() => {
    dispatch<any>(clearErrors());
  }, []);

  useEffect(() => {
    emailjs.init({
      publicKey: "tTnt3JKDvvNxscd-i",
    });
  }, []);

  const sendEmail = async () => {
    try {
      const serviceID = "service_6fw6u9h";
      const templateID = "template_3tfyeli";

      const params = {
        to_email: user.email,
        to_name: user.username,
        from_name: "Flipper",
        message: `
        Thank you for signing up. We are excited to have you on board!
        To complete your registration process, activate a package that fit your investment plan and setup your profile.
        `,
        site_name: "Flipper",
      };

      await emailjs.send(serviceID, templateID, params);
    } catch (error) {
      console.error(errorParser(error));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch<any>(clearErrors());
    }
    const validateAndSendMail = async () => {
      if (isAuthenticated === true && token !== undefined) {
        toast.success(
          "Signed up successfully! -Proceed to activate a package that fit your investment plan and setup your profile."
        );
        sendEmail();
        navigate("/");
      }
    };

    validateAndSendMail();
  }, [ dispatch, error, isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch<any>(registerUser(formData));
  };

  return (
    <>
      <MetaData title="Signup" />
      {loading && <HLoader />}
      <SignupRenderer>
        <div className="form-header">
          <div className="img-cont">
            <img src={logo} />
          </div>
          <h3 style={{ fontWeight: 600, fontSize: "1.5em" }}>Create Account</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-cont">
            <input
              type="text"
              required
              placeholder="Username"
              name="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-cont">
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
          </div>{" "}
          <div className="input-cont">
            <input
              type="tel"
              placeholder="Phone"
              required
              autoFocus
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>{" "}
          <div className="input-cont">
            <input
              type={!isPasswordVisible ? "password" : "text"}
              placeholder="Enter a strong Password"
              required
              autoFocus
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span>
              {isPasswordVisible ? (
                <IconEyeSlashFill
                  className="p-visibility"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IconEyeFill
                  className="p-visibility"
                  onClick={togglePasswordVisibility}
                />
              )}
            </span>
          </div>
          <div className="input-cont">
            <input
              placeholder="Referral code(Optional)"
              className="referreal-code-inp"
              type="text"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
            />
          </div>
          <p className="terms">
            Already have an account?&nbsp;<Link to="/login">Login</Link>
          </p>
          <button>Signup</button>
          <p className="terms">
            By clicking "Signup", you agree to our
            <Link to="/privacy-policy"> Privacy Policy</Link> and our
            <Link to="/terms-of-service"> Terms of service.</Link>
          </p>
        </form>
      </SignupRenderer>
    </>
  );
};

export default Signup;

const SignupRenderer = styled.div`
  max-width: 600px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  padding: 30px 10px 30px 10px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  &::before {
    position: absolute;
    content: "";
    width: 300px;
    height: 300px;
    background-color: #86aec8;
    transform: rotate(45deg);
    left: -180px;
    bottom: 30px;
    z-index: 1;
    border-radius: 30px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.082);
  }
  form {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
  .form-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .img-cont {
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    background: linear-gradient(
      180deg,
      rgba(248, 248, 248, 0) 50%,
      #f8f8f888 100%
    );
    border: 1px solid #f7f7f8;
    filter: drop-shadow(0px 0.5px 0.5px #efefef)
      drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .img-cont img {
    position: absolute;
    width: 100%;
    height: auto;
  }

  form {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }

  .required {
    color: crimson;
  }
  .input-cont {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .input-cont input {
    width: 100%;
    height: 40px;
    background-color: transparent;
    border: none;
    border: 1px solid #ededed;
    margin: 10px 0;
    color: black;
    font-size: 0.8em;
    font-weight: 500;
    padding-left: 30px;
  }
  .input-cont input:focus {
    border-bottom: 2px solid #3498db;
    transition: 0.3s ease-in-out;
    outline: none;
  }
  .input-cont input::placeholder {
    color: rgb(80, 80, 80);
    font-size: 1em;
    font-weight: 500;
  }
  @media (max-width: 767px) {
    .input-cont label {
      padding-left: 15px;
    }
    .input-cont input {
      width: 96%;
    }
  }

  .input-cont input::-webkit-inner-spin-button,
  .input-cont input::-webkit-outer-spin-button {
    display: none;
  }
  button {
    padding: 10px 20px;
    background-color: #3498db;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    color: #fff;
    margin-top: 10px;
    transition: 0.3s ease-out;
    width: 100%;
  }
  button:hover {
    transform: scale(1.01);
  }
  .terms {
    font-size: 11px;
    padding: 5px 20px;
    font-weight: 600;
  }
  .terms a {
    color: crimson;
  }
  .p-visibility {
    position: absolute;
    cursor: pointer;
    right: 5%;
    top: 35%;
  }
`;
