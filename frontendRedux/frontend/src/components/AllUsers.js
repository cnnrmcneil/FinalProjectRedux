import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateOtherUserID } from "../redux/actionCreator/userActions";
import "../App.css";

function AllUsers(props) {
  const [allUsers, setAllUsers] = React.useState([]);
  useEffect(() => {
    console.log("Use Effect Ran");
    axios
      .get("https://cnnrmcnl-youtube.herokuapp.com/users/all-users")
      .then((results) => {
        console.log(results);
        setAllUsers(results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, []);

  return (
    <div>
      {allUsers?.map((user) => {
        return (
          <Link
            to={{
              pathname: `/user/${user._id}`,
              state: {
                user: user._id,
              },
            }}
          >
            <a
              href={user._id}
              onClick={() => {
                props.updateOtherUserID(user._id);
              }}
            >
              {user.username}
            </a>
          </Link>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = {
  updateOtherUserID: (e) => updateOtherUserID(e),
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
