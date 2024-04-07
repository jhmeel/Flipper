import React, { ChangeEvent, useEffect, useState } from "react";
import MetaData from "../../misc/MetaData";
import styled from "styled-components";
import logo from "../../assets/flipper-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearErrors, loginUser } from "../../actions/user";
import HLoader from "../../components/loaders/HLoader";

interface FormData {
  email?: string;
  password?: string;
}
const Login = () => {
  const { loading, isAuthenticated, error } = useSelector(
    (state: any) => state.user
  );
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //To ensure state is at init when page is first loaded
  useEffect(() => {
    dispatch<any>(clearErrors());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch<any>(clearErrors());
    }
    if (isAuthenticated === true) {
      toast.success("Logged in successfully!");
      navigate("/profile");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch<any>(loginUser(formData.email, formData.password));
  };

  return (
    <>
      <MetaData title="Login" />
      {loading && <HLoader />}
      <FormMain onSubmit={handleSubmit}>
        <LoginHeader>
          <div className="img-cont">
            <img src={logo} />
          </div>
          <h3>Login</h3>
        </LoginHeader>

        <InputContainer>
          <InputIcon
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#2e2e2e"
            viewBox="0 0 16 16"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </InputIcon>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            required
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
        </InputContainer>

        <InputContainer>
          <InputIcon
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#2e2e2e"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </InputIcon>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            required
            autoFocus
            value={formData.password}
            onChange={handleChange}
          />
        </InputContainer>

        <Button type="submit">Submit</Button>
        <LoginFooter>
          <span>
            {" "}
            Dont have an account? <Link to="/signup">Register</Link>
          </span>
          |<Link to="/forgot-password">Forgot your password?</Link>
        </LoginFooter>
      </FormMain>
    </>
  );
};

export default Login;

const FormMain = styled.form`
  max-width: 600px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  padding: 30px 30px 30px 30px;
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
`;

const LoginHeader = styled.p`
  font-size: 1.5em;
  color: #2e2e2e;
  font-weight: 600;
  margin: 5px 0 10px 0;
  z-index: 2;
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
    height: auto;
    width: 100%;
    z-index: 10;
    cursor: progress;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const InputIcon = styled.svg`
  position: absolute;
  left: 3px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  background-color: transparent;
  border: none;
  border: 1px solid #ededed;
  margin: 10px 0;
  color: black;
  font-size: 0.8em;
  font-weight: 500;
  box-sizing: border-box;
  padding: 10px;
  padding-left: 30px;

  &:focus {
    border-bottom: 2px solid #3498db;
    transition: 0.3s ease-in-out;
    outline: none;
  }
  &::placeholder {
    color: rgb(80, 80, 80);
    font-size: 1em;
    font-weight: 500;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  color: #fff;
  margin-top: 10px;
  transition: 0.3s ease-out;
  width: 100%;
  z-index: 2;

  &:hover {
    transform: scale(1.01);
  }
`;

const LoginFooter = styled.div`
  z-index: 2;
  width: 100%;
  font-size: 11px;
  font-weight: 600;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  a {
    color: crimson;
  }
`;
