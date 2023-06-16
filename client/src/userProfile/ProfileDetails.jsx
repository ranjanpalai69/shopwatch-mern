import React from "react";
import "./userSideBar.css";


const ProfileDetails = () => {
  const handleEditSubmit = (event) => {
    event.preventDefault();

    console.log("form");
  };

  // const LoggedUser = getLoggedUserData();

  return (
    <div>
      {/* profile avtar  */}

      {/* profile details  */}

      <form
        action=""
        className="user_profile_form_details"
        onSubmit={handleEditSubmit}
      >
        <label htmlFor="">Name</label>
        <input type="text" name="name" />

        <label htmlFor="">Email</label>
        <input type="email" name="email" />

        <label htmlFor="">Mobile</label>
        <input type="number" name="mobile" />

        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default ProfileDetails;
