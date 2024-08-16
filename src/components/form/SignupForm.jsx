import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../../hooks/useAuth";
import LoginForms from "./LoginForms";
import { TEInput } from "./SignupForm.styled";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({ mode: "onChange" });
  const [userData, setUserData] = useState({
    email: "",
    nickname: "",
    username: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  const { mutate: registerUser, isLoading, isError, error } = useRegister();

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (userData) => {
    try {
      await registerUser(userData);
    } catch (err) {
      console.error("Registration failed:", err.message);
    }
  };

  return (
    <LoginForms>
      <div>
        <form onSubmit={handleSubmit(handleRegisterSubmit)}>
          <div>
            <span className="text-3xl inline-block pb-8">회원가입</span>
            <TEInput
              type="email"
              name="email"
              placeholder="이메일"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              error={errors.email?.message}
              onChange={handleRegisterChange}
              size="lg"
              className="mb-6 px-7 pb-2.5 pt-3 text-sm border-neutral-100	border border-solid"
              style={{
                border: "1px solid rgb(245,245,245)",
              }}
            />
            {errors.email && <span>{errors.email.message}</span>}
            <TEInput
              type="text"
              name="username"
              placeholder="이름"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              error={errors.username?.message}
              onChange={handleRegisterChange}
              size="lg"
              className="mb-6 px-7 pb-2.5 pt-3 text-sm"
              style={{
                border: "1px solid rgb(245,245,245)",
              }}
            />
            {errors.username && <span>{errors.username.message}</span>}
            <TEInput
              type="text"
              name="nickname"
              placeholder="닉네임"
              {...register("nickname", {
                required: "Nickname is required",
                minLength: {
                  value: 3,
                  message: "Nickname must be at least 3 characters",
                },
              })}
              onChange={handleRegisterChange}
              error={errors.nickname?.message}
              size="lg"
              className="mb-6 px-7 pb-2.5 pt-3 text-sm"
              style={{
                border: "1px solid rgb(245,245,245)",
              }}
            />
            {errors.nickname && <span>{errors.nickname.message}</span>}
            <TEInput
              type="tel"
              name="phonenumber"
              placeholder="전화번호"
              {...register("phonenumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Invalid phone number",
                },
              })}
              onChange={handleRegisterChange}
              error={errors.phonenumber?.message}
              size="lg"
              className="mb-6 px-7 pb-2.5 pt-3 text-sm"
              style={{
                border: "1px solid rgb(245,245,245)",
              }}
            />
            {errors.phonenumber && <span>{errors.phonenumber.message}</span>}
            <TEInput
              type="password"
              name="password"
              placeholder="비밀번호"
              {...register("비밀번호", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              onChange={handleRegisterChange}
              size="lg"
              className="mb-6 px-7 pb-2.5 pt-3 text-sm"
              style={{
                border: "1px solid rgb(245,245,245)",
              }}
            />
            {errors.password && <span>{errors.password.message}</span>}
            <TEInput
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              error={errors.confirmPassword?.message}
              onChange={handleRegisterChange}
              size="lg"
              className="mb-6 px-7 pb-2.5 pt-3 text-sm"
              style={{
                border: "1px solid rgb(245,245,245)",
              }}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
            {/* <!-- Submit button --> */}
            <button
              type="submit"
              className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              style={{ backgroundColor: "#8a0ec4" }}
            >
              회원가입
            </button>
            {/* <!-- Divider --> */}
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                OR
              </p>
            </div>

            {/* <!-- Social login buttons --> */}
            <a
              className="mb-3 flex h-11 w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
              style={{ backgroundColor: "#FFFFFF" }}
              href="#!"
              role="button"
              onClick={() => handleSocialLogin(googleLogin)({})}
            >
              <img src="/public/web_light_rd_ctn.svg" alt="google login" />
            </a>
            <a
              className="relative box-border mb-3 h-11 flex w-full items-center justify-center rounded bg-info text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(84,180,211,0.3)] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)]"
              style={{ backgroundColor: "#FEE500" }}
              href="#!"
              role="button"
              onClick={() => handleSocialLogin(kakaoLogin)({})}
            >
              <img
                src="kakao_login_medium_narrow.png"
                className="h-full"
                alt="kakao"
              />
            </a>
            <a
              className="relative box-border mb-3 h-11 flex w-full items-center justify-center rounded bg-info text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(84,180,211,0.3)] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2)]"
              style={{ backgroundColor: "#00C73C" }}
              href="#!"
              role="button"
              onClick={() => handleSocialLogin(naverLogin)({})}
            >
              <img src="btnG_naver.png" className="h-full" alt="naver" />
            </a>
          </div>
        </form>
      </div>
    </LoginForms>
  );
};

export default SignUpForm;
