import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import "./MatchMaxCard.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUserNumber, setSignOutState } from "../features/user/userSlice";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { auth } from "../firebase";

function MatchMaxCards() {
  const [profile, setProfile] = useState([
    {
      name: "Five",
      url: "5.png",
    },
    {
      name: "Four",
      url: "4.png",
    },
    {
      name: "Three",
      url: "3.png",
    },
    {
      name: "Two",
      url: "2.png",
    },
    {
      name: "One",
      url: "one-icon-3.png",
    },
  ]);
  const [lastDirection, setLastDirection] = useState();
  const [removed, setRemoved] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const userNumber = useSelector(selectUserNumber);
  console.log(userNumber);

  const swiped = (direction, nameToDelete) => {
    console.log("removing:" + nameToDelete);
    setLastDirection(direction);
    setRemoved(nameToDelete);
  };
  const handleSignOut = () => {
    if (userNumber) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          history.push("/");
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <div className="card--match">
      <div className="header">
        <h1 className="heading">Matchmax</h1>
        <Button onClick={handleSignOut}>Logout</Button>
      </div>

      <div className="matchmaxcard__container">
        {profile.map((person) => {
          return (
            <TinderCard
              className="swipe"
              key={person.name}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swiped(dir, person.name)}
            >
              <div
                style={{
                  backgroundImage: `url(${person.url})`,
                  backgroundRepeat: "no-repeat",
                }}
                className="card"
              >
                <h3>{person.name}</h3>
              </div>
            </TinderCard>
          );
        })}
      </div>
      <div className="result">
        {lastDirection ? (
          <h2 key={lastDirection} className="infotext">
            You Swiped {lastDirection} to {removed}
          </h2>
        ) : (
          <h2>Swipe to Start</h2>
        )}
      </div>
    </div>
  );
}

export default MatchMaxCards;
