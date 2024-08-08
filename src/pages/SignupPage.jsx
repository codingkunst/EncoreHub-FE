import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useAuth";
import LoginForms from "../components/form/LoginForms";
import { StyledInputWrap, TEInput } from "./SignupPage.styled";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({ mode: "onChange" });

  const { mutate: registerUser, isLoading, isError, error } = useRegister();

  const handleRegisterSubmit = async (data, event) => {
    event.preventDefault();
    try {
      await registerUser(data);
      console.log(data);
    } catch (err) {
      console.error("Registration failed:", err.message);
    }
  };

  return (
    <LoginForms>
      <div>
        <form
          onSubmit={handleSubmit((data, event) =>
            handleRegisterSubmit(data, event)
          )}
        >
          <div>
            <span className="text-3xl inline-block pb-8">회원가입</span>
            <StyledInputWrap>
              <TEInput
                type="email"
                name="email"
                placeholder="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "올바른 이메일 형식을 입력해주세요.",
                  },
                })}
                error={errors.email?.message}
                size="lg"
                className="mb-6 px-7 pb-2.5 pt-3 text-sm border-neutral-100	border border-solid"
                style={{
                  border: "1px solid rgb(245,245,245)",
                }}
              />
              {errors.email && (
                <p
                  className="absolute right-4 top-0 text-sm text-red-400"
                  style={{ lineHeight: "44px" }}
                >
                  {errors.email.message}
                </p>
              )}
            </StyledInputWrap>
            <StyledInputWrap>
              <TEInput
                type="text"
                name="username"
                placeholder="이름"
                {...register("username", {
                  required: "Username is required",
                  // minLength: {
                  //   value: 3,
                  //   message: "Username must be at least 3 characters",
                  // },
                })}
                error={errors.name?.message}
                size="lg"
                className="mb-6 px-7 pb-2.5 pt-3 text-sm"
                style={{
                  border: "1px solid rgb(245,245,245)",
                }}
              />
              {errors.name && (
                <p
                  className="absolute right-4 top-0 text-sm text-red-400"
                  style={{ lineHeight: "44px" }}
                >
                  {errors.name.message}
                </p>
              )}
            </StyledInputWrap>
            <StyledInputWrap>
              <TEInput
                type="text"
                name="nickname"
                placeholder="닉네임"
                {...register("nickname", {
                  required: "Nickname is required",
                  minLength: {
                    value: 3,
                    message: "3글자 이상의 닉네임을 입력해주세요.",
                  },
                })}
                error={errors.nickname?.message}
                size="lg"
                className="mb-6 px-7 pb-2.5 pt-3 text-sm"
                style={{
                  border: "1px solid rgb(245,245,245)",
                }}
              />
              {errors.nickname && (
                <p
                  className="absolute right-4 top-0 text-sm text-red-400"
                  style={{ lineHeight: "44px" }}
                >
                  {errors.nickname.message}
                </p>
              )}
            </StyledInputWrap>
            <StyledInputWrap>
              <TEInput
                type="tel"
                name="phoneNumber"
                placeholder="전화번호"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "올바른 전화번호 형식을 입력해주세요.",
                  },
                })}
                error={errors.phoneNumber?.message}
                size="lg"
                className="mb-6 px-7 pb-2.5 pt-3 text-sm"
                style={{
                  border: "1px solid rgb(245,245,245)",
                }}
              />
              {errors.phoneNumber && (
                <p
                  className="absolute right-4 top-0 text-sm text-red-400"
                  style={{ lineHeight: "44px" }}
                >
                  {errors.phoneNumber.message}
                </p>
              )}
            </StyledInputWrap>
            <StyledInputWrap>
              <TEInput
                type="password"
                name="password"
                placeholder="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "6자리 이상의 비밀번호를 입력해주세요.",
                  },
                })}
                size="lg"
                className="mb-6 px-7 pb-2.5 pt-3 text-sm"
                style={{
                  border: "1px solid rgb(245,245,245)",
                }}
              />
              {errors.password && (
                <p
                  className="absolute right-4 top-0 text-sm text-red-400"
                  style={{ lineHeight: "44px" }}
                >
                  {errors.password.message}
                </p>
              )}
            </StyledInputWrap>
            <StyledInputWrap>
              <TEInput
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("password") ||
                    "입력하신 비밀번호가 일치하지 않습니다.",
                })}
                error={errors.confirmPassword?.message}
                // onChange={handleRegisterChange}
                size="lg"
                className="mb-6 px-7 pb-2.5 pt-3 text-sm"
                style={{
                  border: "1px solid rgb(245,245,245)",
                }}
              />
              {errors.confirmPassword && (
                <p
                  className="absolute right-4 top-0 text-sm text-red-400"
                  style={{ lineHeight: "44px" }}
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </StyledInputWrap>
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

export default SignUpPage;
