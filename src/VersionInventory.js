import React, { useEffect, useState } from "react";
import VersionList from "./VersionList";

import "./style.css";

const initialData = [
  {
    name: "master",
    source: "master",
    description: "",
    lock: true
  },
  {
    name: "Version_1",
    source: "master",
    description: "",
    lock: false
  },
  {
    name: "Version_2",
    source: "master",
    description: "",
    lock: false
  },
  {
    name: "Version_3",
    source: "master",
    description: "",
    lock: false
  },
  {
    name: "Version_4",
    source: "master",
    description: "",
    lock: false
  }
];

export default function VersionInventory() {
  const LIMIT = 3; // show more limit
  let [versionList, setversionList] = useState(null); // List of versions
  let [showMore, setshowMore] = useState(false); // true to show show more button
  let [versionEdit, setversionEdit] = useState(null); // edit version name, shorcut method
  let [isEditing, setisEditing] = useState(false); // true to open add/edit form

  // Process the versions based on limit and show only LIMIT count in the dom
  const precessVersionList = versions => {
    const versionCount = versions.length;
    let newList = versions.map((version, index) => {
      let limit = index + 1;
      let visible = true;
      if (limit > LIMIT && versionCount > LIMIT) {
        visible = false;
      } else {
        visible = true;
      }
      const updatedList = {
        ...version,
        visible
      };
      return updatedList;
    });
    setversionList(newList);
    newList.length <= LIMIT && setshowMore(false);
  };

  // Show all versions if more than LIMIT
  const showMoreData = versions => {
    let newList = versions.map((version, index) => {
      const updatedList = {
        ...version,
        visible: true
      };
      return updatedList;
    });
    setversionList(newList);
    setshowMore(false);
  };

  const editVersionName = (e, name) => {
    setversionEdit(name);
  };

  //Process version list after updation
  const processVersionListAfterUpdation = (versionName, versionOldName) => {
    const cloneVersionist = versionList.map(list => {
      if (list.name === versionOldName) {
        const updatedList = {
          ...list,
          name: versionName
        };
        return updatedList;
      }
      return list;
    });
    setversionList(cloneVersionist);
  };

  // Save updated version data
  const saveVersionDetails = ({ versionName, versionOldName }) => {
    console.log(versionName, " - ", versionOldName);
    processVersionListAfterUpdation(versionName, versionOldName);
    setversionEdit(null);
  };

  let [addType, setaddType] = useState(null);
  let initialVersionDetailsState = {
    name: "",
    source: "",
    description: "",
    visible: true
  };
  let [versionDetails, setversionDetails] = useState(
    initialVersionDetailsState
  );

  // reset versionDetails
  const resetVersionDetails = close => {
    setversionDetails(() => ({
      ...initialVersionDetailsState,
      source: versionList && versionList.length > 0 ? versionList[0].source : ""
    }));
    setaddType(true);
    close && setisEditing(false);
  };

  // handle add / update type (true for add , false for update)
  const handleAddType = type => {
    setversionDetails(prevState => ({
      ...prevState,
      source: versionList && versionList.length > 0 ? versionList[0].source : ""
    }));
    setaddType(type);
    setisEditing(true);
  };

  // Add version to list
  const addVersion = () => {
    const { name, source } = versionDetails;
    let newList = [...versionList, ...versionDetails];
    if (name && name !== "" && source && source !== "") {
      setshowMore(false);
      showMoreData(newList);
      resetVersionDetails();
    } else {
      console.log("Please enter valid details");
    }
  };

  // Update version to list
  const updateVersion = ({ name, source, description }) => {
    setaddType(false);
    setisEditing(true);
    setversionDetails(prevState => ({
      ...prevState,
      name,
      source,
      description,
      oldName: name
    }));
  };

  // Save updated data
  const saveUpdatedData = () => {
    const { name, source, description, oldName } = versionDetails;
    const cloneVersionist = versionList.map(list => {
      if (list.name === oldName) {
        const updatedList = {
          ...list,
          name,
          source,
          description
        };
        return updatedList;
      }
      return list;
    });
    setversionList(cloneVersionist);
    resetVersionDetails(true);
  };

  // Delete version
  const deleteVersion = name => {
    resetVersionDetails();
    const newList = versionList.filter(list => list.name !== name);
    if (showMore) {
      precessVersionList(newList);
    } else {
      showMoreData(newList);
    }
  };

  // Version add/update handleer
  const handleVersionAddOrUpdate = () => {
    if (addType) {
      addVersion();
    } else {
      saveUpdatedData();
    }
  };

  // handle change event
  const handleVersionFieldsChange = e => {
    var newObj = {
      [e.target.name]: e.target.value
    };
    setversionDetails(prevState => ({
      ...prevState,
      ...newObj
    }));
  };

  // on component mount
  useEffect(() => {
    console.log("Version inventory initial");
    setversionList(initialData);
    initialData.length > LIMIT && setshowMore(true);
    precessVersionList(initialData);
    return () => {
      // Clean up
    };
  }, []);

  return (
    <React.Fragment>
      <div className="vpb-version-list-container">
        <div className="version-add">
          <span className="version-add-selector">
            <a className="icon-add">+</a>
            <a
              className="version-add-label"
              onClick={() => handleAddType(true)}
            >
              Add Version
            </a>
          </span>
        </div>

        {isEditing && (
          <div className="vpb-version-addition">
            <div>
              <label>Version name</label>
              <input
                type="text"
                name="name" 
                value={versionDetails.name}
                onChange={handleVersionFieldsChange}
              />
            </div>  
            <div>
              <label>Source name</label>
              {addType ? (
                <select
                  name="source"
                  value={versionDetails.source}
                  onChange={handleVersionFieldsChange}
                >
                  {versionList &&
                    versionList.map(list => (
                      <option value={list.name}>{list.name}</option>
                    ))}
                </select>
              ) : (
                <label>: {versionDetails.source}</label>
              )}
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={versionDetails.description}
                onChange={handleVersionFieldsChange}
              />
            </div>
            <button onClick={handleVersionAddOrUpdate}>
              {addType ? "Add" : "Update"}
            </button>
            <button onClick={() => resetVersionDetails(true)}>Cancel</button>
          </div>
        )}

        <div className="version-container">
          <ul class="version-list-wrapper">
            {versionList &&
              versionList.map(list => {
                return (
                  list.visible && (
                    <VersionList
                      key={list.name}
                      {...list}
                      editVersionName={editVersionName}
                      deleteVersion={deleteVersion}
                      updateVersion={updateVersion}
                      saveVersionDetails={saveVersionDetails}
                      versionEdit={versionEdit}
                    />
                  )
                );
              })}
          </ul>
          {showMore && (
            <div
              class="show-all-version"
              onClick={() => showMoreData(versionList)}
            >
              <span>View All</span>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
