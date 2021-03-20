import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const EditPopover = ({ USER, setUpdateUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({
    id: USER._id,
    role: USER.role,
    status: USER.status,
    username: USER.username,
    email: USER.email,
  });
  const [checkBox, setCheckBox] = useState({ role: false, status: false });

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setCheckBox({ ...checkBox, [e.target.name]: e.target.checked });
  };

  const onClickHandler = () => {
    setUpdateUser(user);
    setAnchorEl(null);
  };
  const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="default"
        onClick={handleClick}
      >
        edit
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          <div className="edit-popover-model">
            <div className="popover-field">
              <h6>Email</h6>
              <input className="popover-input" value={user.email} disabled />
            </div>
            <div className="popover-field">
              <h6>Name</h6>
              <input
                className="popover-input"
                placeholder={user.username}
                name="username"
                onChange={onChangeHandler}
              />
            </div>
            <div className="popover-field">
              <div>
                <h6>Role</h6>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  name="role"
                  value={user.role === "User" ? "Admin" : "User"}
                  onChange={onChangeHandler}
                  checked={checkBox.role}
                />
                <label className="form-check-label">{user.role}</label>
              </div>
            </div>
            <div className="popover-field">
              <div>
                <h6>Status</h6>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  name="status"
                  onChange={onChangeHandler}
                  checked={checkBox.statue}
                  value={user.status === "Active" ? "Pending" : "Active"}
                />
                <label className="form-check-label">{user.status}</label>
              </div>
            </div>
            <div className="popover-field">
              <button onClick={onClickHandler}>Update</button>
            </div>
          </div>
        </Typography>
      </Popover>
    </div>
  );
};

export default EditPopover;
