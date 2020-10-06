import React, { useState } from "react";

export default function VersionList({
  name,
  source,
  description,
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

  // handle input focus
  const handleFocus = e => {
    console.log("hello");
  };

  return (
    <li onDoubleClick={e => handleDoubleClick(e, name)}>
      {versionEdit === name && isEditing ? (
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
        <div>
          {name} | <a onClick={() => deleteVersion(name)}>Delete</a> |{" "}
          <a onClick={() => updateVersion(listDetails)}>Update</a>
        </div>
      )}
    </li>

<li class="version-list-block" onDoubleClick={e => handleDoubleClick(e, name)}>
        <div class="version-list-left">
          <div class="version-status">
            <label class="switch">
              <input type="checkbox" class="checkbox" />
              <div class="slider" aria-hidden="true">
                <div class="thumb"></div>
              </div>
            </label>
          </div>
          <div class="version-description">
            <div class="description">
               {versionEdit === name && isEditing ? (
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
              <div class="version-name">{name}</div>)
              <div class="version-info"><span>Jun 2 2020, 12:23</span><span class="author">Admin</span></div>
            </div>
          </div>
        </div>
        <div class="version-list-right">
           <a onClick={() => deleteVersion(name)}>Delete</a>
           <a onClick={() => updateVersion(listDetails)}>Update</a>
        </div>
      </li>

  );
}
