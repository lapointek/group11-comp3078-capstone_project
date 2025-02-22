import React from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault;
  };

  return (
    <div>
      <div
        className="flex flex-col items-center h-screen 
      justify-center bg-gradient-to-b from-sky-600 from-50% to-50% space-y-6"
      >
        <h2 className="font-sevillana text-3xl text-white">
          Employee Managment
        </h2>
        <div className="border shadow p-6 w-80 bg-white">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4"></div>
            <button className="w-full bg-sky-600 text-white py-2">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
