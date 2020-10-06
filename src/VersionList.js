import React, { useState } from "react";

export default function VersionList({
  name,
  source,
  description,
  lock,
  versionEdit,
  editVersionName,
  updateVersion,
  saveVersionDetails,
  deleteVersion
}) {
  let [inputValue, setinputValue] = useState(name);
  let [isEditing, setisEditing] = useState(false);
  const listDetails = { name, source, description };

  // handle onBlur
  const handleOnBlur = (e, oldName) => {
    if (inputValue && inputValue !== "") {
      setisEditing(false);
      console.log("Enter sssss");
      saveVersionDetails({
        versionName: inputValue,
        versionOldName: oldName
      });
      setinputValue(oldName);
    } else {
      console.log("Enter a valid version name");
    }
  };

  //enter key press
  const handleKeyPress = (event, name) => {
    if (event.key === "Enter") {
      handleOnBlur(event, name);
    }
  };

  // Editing event
  const handleDoubleClick = (e, name) => {
    if (!isEditing) {
      editVersionName(e, name);
    }
    setisEditing(true);
  };

  return (
    <li className="version-list-block">
      <div className="version-list-left">
        <div className="version-status">
          <label className="switch">
            <input type="checkbox" className="checkbox" />
            <div className="slider" aria-hidden="true">
              <div className="thumb" />
            </div>
          </label>
        </div>
        <div className="version-description">
          <div className="description">
            {versionEdit === name && isEditing && !lock ? (
              <input
                type="text"
                value={inputValue}
                onChange={e => {
                  setinputValue(e.target.value);
                }}
                onBlur={e => handleOnBlur(e, name)}
                onKeyPress={e => handleKeyPress(e, name)}
                autoFocus
                onFocus={e => e.currentTarget.select()}
              />
            ) : (
              <div
                className="version-name"
                onDoubleClick={e => handleDoubleClick(e, name)}
              >
                {name}
              </div>
            )}
            <div className="version-info">
              <span>Jun 2 2020, 12:23</span>
              <span className="author">Admin</span>
            </div>
          </div>
        </div>
      </div>
      <div className="version-list-right">
        <div href="#" class="active-state">
          Active
        </div> 

        <div style={lock ? { opacity: 0 } : {}}> 
          <a
            onClick={() => {
              !lock && deleteVersion(name);
            }}
          >
            D
          </a>{" "}
          ||
          <a
            onClick={() => {
              !lock && updateVersion(listDetails);
            }}
          >
            U
          </a>
        </div>
      </div>
    </li>
  );
}
