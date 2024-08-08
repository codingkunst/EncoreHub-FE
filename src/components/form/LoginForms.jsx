const LoginForms = ({ children }) => {
  return (
    <section className="flex justify-center">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-start justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 ">
            <p className="text-4xl py-3">계정에 로그인하고</p>
            <p className="text-4xl py-3">더 많은 서비스를 이용해보세요!</p>
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-10/12"
              alt="image"
            />
          </div>
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default LoginForms;
