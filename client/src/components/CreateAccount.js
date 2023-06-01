import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faEye, faEyeSlash, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as yup from "yup";
import "../styling/CreateAccount.css";

function CreateAccount() {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      username: yup.string().required("Username is required"),
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required("Password confirmation is required"),
    }),
    onSubmit: (values) => {
      fetch("http://localhost:5555/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("User created:", data);
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  return (
    <div className="create-account-form">
      <div className="text">CREATE ACCOUNT</div>
      
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <div className="fas">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <input
            onChange={formik.handleChange}
            type="text"
            placeholder="Name"
            value={formik.values.name}
            name="name" // Add name attribute
          ></input>
          {formik.touched.name && formik.errors.name ? (<div>{formik.errors.name}</div>) : null}
        </div>

        <div className="field">
          <div className="fas">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <input
            onChange={formik.handleChange}
            type="text"
            placeholder="Username"
            value={formik.values.username}
            name="username" // Add name attribute
          ></input>
          {formik.touched.username && formik.errors.username ? (<div>{formik.errors.username}</div>) : null}
        </div>

        <div className="field">
          <div className="fas">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <input
            onChange={formik.handleChange}
            type="email"
            placeholder="Email"
            value={formik.values.email}
            name="email" // Add name attribute
          ></input>
          {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null}
        </div>

        <div className="field">
          <div className="fas">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <input
            onChange={formik.handleChange}
            type="password"
            placeholder="Password"
            value={formik.values.password}
            name="password" // Add name attribute
          ></input>
          {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}
        </div>

        <div className="field">
          <div className="fas">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <input
            onChange={formik.handleChange}
            type="password"
            value={formik.values.confirmPassword}
            placeholder="Confirm Password"
            name="confirmPassword" // Add name attribute
          ></input>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<div>{formik.errors.confirmPassword}</div>) : null}
        </div>

        <button type="submit">SIGN UP</button>

        <div className="link">
          Have an account? <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;














// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link, useNavigate } from "react-router-dom";
// import { faEye, faEyeSlash, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
// import "../styling/CreateAccount.css";




// function CreateAccount() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [username, setUserName] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       // Handle password mismatch error
//       return;
//     }

//     const userData = {
//       name: name,
//       username: username,
//       email: email,
//       password: password,

//     };
    

//     fetch("http://localhost:5555/users", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle successful user creation
//         console.log("User created:", data);
//         // Redirect to login or other relevant page
//         // setIsLoggedIn(true);
      
//         navigate("/login");
//       })
//       .catch((error) => {
//         // Handle error in user creation
//         console.error("Error:", error);
//       });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="create-account-form">
//       <div className="text">CREATE ACCOUNT</div>
//       <form onSubmit={handleSubmit}>

//         <div className="field">
//           <div className="fas">
//             <FontAwesomeIcon icon={faEnvelope} />
//           </div>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="field">
//           <div className="fas">
//             <FontAwesomeIcon icon={faEnvelope} />
//           </div>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUserName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="field">
//           <div className="fas">
//             <FontAwesomeIcon icon={faEnvelope} />
//           </div>
//           <input
//             type="text"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="field">
//           <div className="fas">
//             <FontAwesomeIcon icon={faLock} />
//           </div>
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <div className="field">
//           <div className="fas">
//             <FontAwesomeIcon icon={faLock} />
//           </div>
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button>SIGN UP</button>

//         <div className="link">
//           Have an account? <Link to="/login">Log in</Link>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CreateAccount;
