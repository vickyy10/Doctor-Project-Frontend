import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const DoctorProfileEdit = () => {
  const { JWToken, user } = useContext(AuthContext);

  const inputref = useRef();
  const { id } = useParams();
  const [Data, setData] = useState("");
  const baseurl = "http://127.0.0.1:8000/";
  const nav = useNavigate();

  console.log("kk");
  useEffect(() => {
    if (user.is_doctor) {
      fetchData();
    } else if (user.is_admin) {
      nav("/adminpanel");
    } else {
      nav("/home");
    }
  }, []);

  const fetchData = async () => {
    console.log(JWToken, "token");
    try {
      const response = await axios.get(`http://127.0.0.1:8000/DoctorHome/`, {
        headers: {
          Authorization: `Bearer ${JWToken.access}`,
        },
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const submithandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let name = formData.get("name");
    let email = formData.get("email");
    let department = formData.get("department");
    let hospital = formData.get("hospital");
    let image = formData.get("image");

    editDoctor(name, email, department, hospital, image);
  };

  const editDoctor = async (name, email, department, hospital, image) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("department", department);
    formData.append("hospital", hospital);
    if (image.name) {
      formData.append("image", image);
    }
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/DoctorHome/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${JWToken.access}`,
          },
        }
      );
      setData(response.data);
      console.log(response.data);
      nav("/home");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <div>
        <img
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            zIndex: "-1",
            backdropFilter: "1px",
            filter: "brightness(0.5)",
          }}
          src="https://image.freepik.com/free-photo/doctor-with-stethoscope-hand-hospital-background-medical-medicine-concept_34200-278.jpg"
          alt=""
        />
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
              style={{ padding: "10px" }}
              className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white  bg-black"
            >
              edit doctor profile
            </h2>
          </div>
          <div
            style={{ padding: "30px", backdropFilter: "blur(20px)" }}
            className=" sm:mx-auto sm:w-full sm:max-w-sm "
          >
            <form
              ref={inputref}
              onSubmit={submithandler}
              method="POST"
              className="space-y-6"
            >
              <img
                style={{ width: "200px" }}
                src={`${baseurl + Data?.image}`}
                alt=""
              />
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={Data.name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={Data.email}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  department
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="department"
                  name="department"
                  type="text"
                  defaultValue={Data.department}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  hospital
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="hospital"
                  name="hospital"
                  type="text"
                  defaultValue={Data.hospital}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="flex items-center justify-between"></div>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="file"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div></div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ================================ */}

      <div className="w-screen h-full bg-green-400 p-12">
        <div className=" bg-red-100 ">
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="text-3xl flex justify-center tracking-wider text-white bg-blue-900  font-semibold">
                  EDIT PROFILE
                </div>

                <div className="col-span-full">
                  <div className=" flex justify-center">
                    <img
                      src={`${baseurl + Data?.image}`}
                      alt=""
                      aria-hidden="true"
                      className="  h-96 w-96 object-cover m-2 rounded-full"
                    />
                  </div>
                  <div className="flex justify-center">
                    <input
                      id="image"
                      name="image"
                      type="file"
                      autoComplete="email"
                      className=" rounded-md ml-28 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          defaultValue={Data.name}
                          autoComplete="name"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Department
                    </label>
                    <div className="mt-2">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      hospital
                    </label>
                    <div className="mt-2">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        id="street-address"
                        name="street-address"
                        type="text"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        id="region"
                        name="region"
                        type="text"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        id="postal-code"
                        name="postal-code"
                        type="text"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DoctorProfileEdit;
