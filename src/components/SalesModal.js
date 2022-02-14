import React, { useState, useEffect } from "react";
import Modal from "./UI/Modal";
import { useDispatch } from "react-redux";
import { randomNumber } from "./utility/randomNumber";
import { userActions } from "../store/userSlice";
import { toast } from "react-toastify";

const SalesModal = ({ onToggle, user }) => {
  const dispatch = useDispatch();

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    if (user) {
      setFName(user.fName);
      setLName(user.lName);
      setDob(user.dob);
      setGender(user.gender);
      setExperience(user.experience);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      id: randomNumber(10000),
      fName,
      lName,
      dob,
      gender,
      experience: parseInt(experience),
      role: "sales",
    };

    if(!dob ||fName.trim().length==0|| lName.trim().length==0||gender.trim().length ==0 || !experience )
    {
      console.log('hii')
      return toast.warning("Fields can't be empty");
    }

    if (user) {
      data = { ...data, id: user.id };
      console.log(data);
      dispatch(userActions.updateUser(data));
      onToggle();
      toast.info("User Updated Successfully!");
    } else {
      dispatch(userActions.addUser(data));
      onToggle();
      toast.success("User Added Successfully!");
    }
  };

  return (
    <Modal>
      <div className="close" onClick={onToggle}>
        &times;
      </div>

      <h1>Add New User</h1>

      <div className="form-container">
        <form className="modal-form" onSubmit={submitHandler}>
          <div className="input-wrapper">
            <label htmlFor="fName">first Name</label>
            <input
              type="text"
              placeholder="First Name"
              id="fName"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="lNmae">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              id="lName"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="dob">DOB</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="gender">Gender(M/F)</label>
            <input
              type="text"
              id="gender"
              placeholder="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="exp">Experience</label>
            <input
              type="number"
              id="exp"
              placeholder="experience"
              min="0"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          {user ? (
            <button className="btn" style={{ margin: "2rem auto 0 auto" }}>
              Update User
            </button>
          ) : (
            <button className="btn" style={{ margin: "2rem auto 0 auto" }}>
              Add User to Team
            </button>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default SalesModal;
