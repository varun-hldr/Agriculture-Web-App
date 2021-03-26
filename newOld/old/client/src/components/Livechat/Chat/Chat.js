import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";

import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

const ENDPOINT = "https://liv-chat.herokuapp.com/";
// const ENDPOINT = "localhost:5000/";

let socket = io(ENDPOINT);

class Chat extends Component {
  state = {
    name: this.props.auth.user.username,
    room: "Agribazzar",
    messages: [],
    users: "",
    message: "",
    error: null,
  };
  componentDidMount() {
    this.setState({
      name: this.props.auth.user.username,
    });
    this.socketHandler(this.state);
  }

  socketHandler = ({ name, room }) => {
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        this.setState({
          error,
        });
      }
    });
    socket.on("message", (message) => {
      const messages = this.state.messages;
      messages.push(message);
      this.setState({
        messages,
      });
    });

    socket.on("roomData", ({ users }) => {
      this.setState({
        users,
      });
    });
  };

  sendMessagetoSocket = (event) => {
    const { message } = this.state;
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        this.setState({
          message: "",
        });
      });
    }
  };
  setMessageHandler = (message) => {
    if (message !== "") {
      this.setState({
        message,
      });
    }
  };

  render() {
    if (!this.props.auth.isAuth) {
      return <Redirect to="/login" />;
    }
    const { room, name, messages, message, users } = this.state;
    return (
      <div className="outerContainer">
        <div className="innercontainer">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={this.setMessageHandler}
            sendMessage={this.sendMessagetoSocket}
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Chat);
