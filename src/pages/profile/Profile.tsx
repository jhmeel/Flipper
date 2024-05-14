/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import MetaData from "../../misc/MetaData";
import styled, { keyframes } from "styled-components";
import IconBxCreditCard, {
  IconArrowTrendUp,
  IconCalendarEventFill,
  IconClock,
  IconContentCopy,
  IconImageEditOutline,
  IconLinkAdd,
  IconLogout,
  IconSetting,
  IconSettings2,
  PasswordIcon,
} from "../../assets/icons";
import emptyAvatar from "../../assets/images/empty_avatar.png";
import Chart from "../../components/Chart";
import Footer from "../../components/Footer";
import AccountDetailsForm from "../../components/AccountDetailsModal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import WithdrawalModal from "../../components/WithdrawalModal";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  loadProfile,
  logoutUser,
  updateProfile,
} from "../../actions/user";
import HLoader from "../../components/loaders/HLoader";
import PDotSpinner from "../../components/loaders/PDotSpinner";
import { UPDATE_PROFILE_RESET } from "../../constants";
import { useSnackbar } from "notistack";
import { getPercentage } from "../../utils/formatter";
import Config from "../../config/Config";
import { RootState } from "../../store";
import useGetToken from "../../utils/getToken";

const Profile = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    user,
    error: profileErr,
    txHistory,
    wallet,
    weeklyCumulation,
    loading,
  } = useSelector((state: RootState) => state.user);

  const accessToken = useGetToken();
  const {
    isUpdated,
    error: profileUpdateErr,
    loading: profileUpdateLoading,
  } = useSelector((state: RootState) => state.profile);

  const [accountDetailsEditMode, setAccountDetailsEditMode] =
    useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | ArrayBuffer>(undefined);
  const [passwordResetActive, setPasswordResetActive] =
    useState<boolean>(false);
  const [withdrawalDisabled, setWithdrawalDisabled] = useState<boolean>(false);
  const [withdrawalModalActive, setWithdrawalModalActive] =
    useState<boolean>(false);
  const [isPTabOpen, setIsPTabOpened] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().getDay();
    if (Object.values(Config.WITHDRAWAL_WINDOW).includes(today)) {
      setWithdrawalDisabled(false);
      return;
    }
    setWithdrawalDisabled(true);
  }, []);

  const toggleAccountDetailsEditMode = () => {
    setAccountDetailsEditMode(!accountDetailsEditMode);
  };

  useEffect(() => {
    if (profileErr) {
      enqueueSnackbar(profileErr, { variant: "error" });
      dispatch<any>(clearErrors());
    }
    const getProfile = async () => {
      dispatch<any>(loadProfile(await accessToken));
    };
    getProfile();
  }, [dispatch, enqueueSnackbar]);

  const toggleWithdrawalModal = () => {
    if (withdrawalDisabled) return;
    setWithdrawalModalActive(!withdrawalModalActive);
  };
  const togglePasswordResetModal = () => {
    setPasswordResetActive(!passwordResetActive);
    togglePTab();
  };

  useEffect(() => {
    if (profileUpdateErr) {
      enqueueSnackbar(profileUpdateErr, { variant: "error" });
      dispatch<any>(clearErrors());
      setAvatar("");
    }
    if (isUpdated) {
      dispatch<any>({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, enqueueSnackbar, isUpdated, profileUpdateErr]);

  const togglePTab = () => {
    setIsPTabOpened(!isPTabOpen);
  };

  const ptabRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: MouseEvent) => {
    if (ptabRef.current && !ptabRef.current.contains(e.target as Node)) {
      setIsPTabOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch<any>(logoutUser());
    navigate("/login");
  };
  const handleFriendInvite = () => {
    if (navigator.share) {
      navigator.share({
        title: "Friend Invite",
        text: "Please click on the link to signup on flipper",
        url: user?.referralCode,
      });
    }
  };

  const copyCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user?.referralCode);
      toast.success("Referral code copied!");
      togglePTab();
    }
    return;
  };

  const onUpdateProfile = async (avatar: string) => {
    dispatch<any>(updateProfile(await accessToken, avatar));
  };

  const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        onUpdateProfile(reader.result as string);
      }
    };

    e.target.files && reader.readAsDataURL(e.target.files[0]);
  };

  console.log(wallet)

  return (
    <>
      <MetaData title="Profile" />
      <ProfileRenderer>
        {loading && <HLoader />}
        <div className="profile-header" ref={ptabRef}>
          <span className="icon-setting" title="setting" onClick={togglePTab}>
            <IconSetting />
            {isPTabOpen && (
              <div className="u-nav-tab">
                <ul id="u-ul">
                  <li
                    title="Reset password"
                    onClick={() => {
                      navigate("/reset-password");
                      togglePasswordResetModal;
                    }}
                  >
                    <PasswordIcon className="u-ul-icon" />
                    Reset password
                  </li>

                  <li
                    title="Invite friends"
                    onClick={() => handleFriendInvite()}
                  >
                    <IconLinkAdd className="u-ul-icon" />
                    Invite friends
                  </li>

                  <li onClick={handleLogout}>
                    <IconLogout fill="#000" className="u-ul-icon" />
                    Logout
                  </li>

                  <li className="ref-url" title="Referral code">
                    {user?.referralCode}
                    <span title="Copy" onClick={copyCode}>
                      <IconContentCopy className="ref-copy-icon" fill="#fff" />
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </span>
        </div>
        <div className="avatar-cont">
          <span className="avatar">
            <span className="avt-loader">
              {profileUpdateLoading && <PDotSpinner />}
            </span>
            <img src={user?.avatar || avatar || emptyAvatar} alt="avatar" />

            <span className="avatar-edit-icon" title="edit">
              <label htmlFor="avatar">
                <IconImageEditOutline height={20} width={20} fill="#2ec1cc" />
              </label>
              <input
                id="avatar"
                type="file"
                style={{ display: "none", cursor: "pointer" }}
                accept="image/*"
                onChange={handleAvatar}
              />
            </span>
          </span>

          <span className="username">@{user?.username}</span>
          <div className="meta-info">
            <div className="col-info">
              <h4>RANK</h4>
              <span>0</span>
            </div>

            <div className="col-info">
              <h4>REFERRALS</h4>
              <span>{user?.referrals?.length || 0}</span>
            </div>

            <div className="col-info">
              <h4>PACKAGE</h4>
              <span>{wallet?.pId || "N/A"}</span>
            </div>
          </div>

          <div className="withdrawal">
            <button
              onClick={toggleWithdrawalModal}
              disabled={withdrawalDisabled}
              className={withdrawalDisabled ? "disabled" : "active"}
            >
              Withdraw
            </button>
          </div>
        </div>
        <div className="b-account-details">
          <span
            className="edit-account-details"
            title="Edit"
            onClick={toggleAccountDetailsEditMode}
          >
            <IconSettings2 fill="gray" />
          </span>
          <div className="acct-info">
            {user?.bankinfo?.accountNumber ? (
              <>
                <span className="bank-name">
                  {user?.bankinfo?.accountNumber}
                </span>
                <span className="account-num">{user?.bankinfo?.bankName}</span>
                <span className="account-name">
                  {user?.bankinfo?.accountName}
                </span>
              </>
            ) : (
              <span
                className="add-acct-txt"
                onClick={toggleAccountDetailsEditMode}
              >
                {" "}
                <IconBxCreditCard height={18} width={18} />
                <p>Add bank account details</p>
              </span>
            )}
          </div>
        </div>
        <div className="earnings">
          <Chart weeklyCumulation={weeklyCumulation} />
        </div>

        <div className="transactions-cont">
  <p className="tx-date">
    <IconCalendarEventFill />
    {new Date().toDateString()}
  </p>
  {txHistory?.length > 0
    ? txHistory.map((tx, i) => (
        <div className="tx-item" key={i}>
          <span className="tx-icon">
            <IconArrowTrendUp fill="#fff" />
          </span>
          <span className="tx-amount">₦{tx?.amount}</span>
          <span className="in-percent">
            +{getPercentage(wallet?.pId, tx?.amount)}
          </span>
          <div className="tx-time">
            <IconClock fill="gray" />{" "}
            <span>
              {new Date(tx?.createdAt).toTimeString().split("G")[0]}
            </span>
          </div>
        </div>
      ))
    : Array(5)
        .fill(null)
        .map((_, i) => (
          <div className="tx-item-loader" key={i}>
            <span className="tx-icon"></span>
            <span className="tx-amount"></span>
            <span className="in-percent"></span>
          </div>
        ))}
</div>


        {accountDetailsEditMode && (
          <AccountDetailsForm
            bankDetails={user?.bankinfo}
            onRemove={toggleAccountDetailsEditMode}
          />
        )}

        {withdrawalModalActive && (
          <WithdrawalModal onRemove={toggleWithdrawalModal} />
        )}
      </ProfileRenderer>
      <Footer />
    </>
  );
};

export default Profile;
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
const ProfileRenderer = styled.div`
  max-width: 600px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  .profile-header {
    padding: 20px 5px;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .icon-setting {
    cursor: pointer;
  }
  .avatar-cont {
    width: 100%;
    height: 180px;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    animation: ${gradientAnimation} 5s infinite;
    background: linear-gradient(45deg, #3498db, #9b59b6, #2ecc71);
    background-size: 200% 200%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .avatar {
    height: 120px;
    width: 120px;
    border-radius: 20px;
    border: 4px solid #9b59b6;
    position: absolute;
    top: -30px;
    background-color: #fff;
  }
  .avatar img {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
  }
  .avt-loader {
    position: absolute;
    z-index: 2;
    bottom: 40%;
    left: 40%;
  }
  .avatar-edit-icon {
    position: absolute;
    right: -3px;
    bottom: 0;
    cursor: pointer;
  }
  .username {
    position: absolute;
    top: 53%;
    color: #fff;
  }
  .meta-info {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 12px;
    margin-top: 100px;
  }
  .col-info {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .col-info h4 {
    font-size: 14px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }
  .col-info span {
    font-size: 12px;
    color: lightgray;
  }
  .earnings {
    width: 100%;
    padding: 5px;
    margin: 0 auto;
  }

  .b-account-details {
    width: 95%;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    border: 1px solid #ededed;
    padding: 5px 10px;
    position: relative;
    margin-top: 5px;
  }
  .edit-account-details {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
  }
  .acct-info {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .b-account-details span {
    font-size: 12px;
    font-weight: 600;
  }

  .transactions-cont {
    margin-top: 70px;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: fit-content;
    padding: 10px 20px;
    position: relative;
  }
  .tx-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    margin-bottom: 8px;
    transition: all 0.3s ease-out;
    cursor: pointer;
  }
  .tx-item:hover {
    transform: scale(1.01);
  }
  .tx-item span {
    font-size: 12px;
    font-weight: 700;
  }
  .tx-date {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: gray;
  }

  .tx-icon {
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: rgb(85, 85, 236);
  }
  .tx-time {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .in-percent {
    color: #2ecc71;
  }

  .u-nav-tab {
    border: 1px solid #ededed;
    background-color: #fff;
    border-radius: 5px;
    position: fixed;
    top: 50px;
    right: 30%;
    max-width: 200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  #u-ul {
    width: 100%;
    list-style: none;
  }
  #u-ul li {
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
    color: rgb(0, 0, 0);
    border-bottom: 1px solid #ededed;
    padding: 10px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  #u-ul li:hover {
    background-color: rgb(148, 148, 206);
    color: #fff;
    transition: all 0.3s ease-out;
  }
  #u-ul li span:hover {
    color: #fff;
    transition: all 0.3s ease-out;
  }

  #u-ul li:last-child {
    border-bottom: none;
  }
  #u-ul li:first-child:hover {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  #u-ul li:last-child:hover {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .u-ul-icon {
    height: 18px;
    width: 18px;
    margin-right: 13px;
  }
  .ref-url {
    background-color: #623ba1;
    color: #fff;
    cursor: copy;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-family: "Inter", sans-serif;
  }

  .ref-copy-icon {
    height: 20px;
    width: 20px;
    cursor: pointer;
  }

  .withdrawal {
    position: absolute;
    right: 5px;
    bottom: 0;
    width: fit-content;
    padding: 5px;
    display: flex;
    justify-content: flex-end;
  }
  .active {
    border: none;
    padding: 5px 10px;
    font-size: 12px;
    background: crimson;
    color: #fff;
    cursor: pointer;
    font-family: monospace;
    transition: 0.3s ease-out;
  }
  .active:hover {
    transform: scale(1.01);
  }
  .disabled {
    border: none;
    padding: 5px 10px;
    font-size: 12px;
    background: gray;
    color: #d1d1d1;
    cursor: not-allowed;
    font-family: monospace;
  }
  .add-acct-txt {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: #1d2023;
    cursor: pointer;
    font-size: 10px;
  }
  .add-acct-txt p {
    font-size: 11px;
  }

  .tx-item-loader {
    background-color: rgba(243, 243, 243, 1);
    animation: spread 1s infinite;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    margin-bottom: 8px;
  }
  .tx-item-loader span {
    padding: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }

  @keyframes spread {
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: 767px) {
    .edit-account-details {
      font-size: 10px;
    }
    .u-nav-tab {
      top: 50px;
      right: 5px;
    }
    .active,
    .disabled {
      font-size: 9px;
    }
  }
`;
