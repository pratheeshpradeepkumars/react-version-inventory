import React, { useEffect, useState } from "react";
import VersionList from "./VersionList";

const initialData = [
  {
    name: "master",
    source: "master",
    description: ""
  },
  {
    name: "Version_1",
    source: "master",
    description: ""
  },
  {
    name: "Version_2",
    source: "master",
    description: ""
  },
  {
    name: "Version_3",
    source: "master",
    description: ""
  }
];

export default function VersionInventory() {
  let [versionList, setversionList] = useState(null);
  let [calutatedVersionList, setcalutatedVersionList] = useState(null);
  let [showMore, setshowMore] = useState(false);
  let [versionEdit, setversionEdit] = useState(null);
  let [isEditing, setisEditing] = useState(false);

  const calcutateVersionList = versions => {
    let list = [...versions];
    if (versions.length > 3) {
      setcalutatedVersionList(list.splice(0, 3));
      setshowMore(true);
    } else {
      setcalutatedVersionList(list);
      setshowMore(false);
    }
  };

  // Show all versions if more than 3
  const showMoreData = () => {
    const cloneVersionist = [...versionList]; // all versions
    const remainingVersionList = cloneVersionist.splice(
      3,
      cloneVersionist.length
    ); // remainig versions after initial 3
    const newVersionList = [...calutatedVersionList, ...remainingVersionList];
    setcalutatedVersionList(newVersionList);
    setshowMore(false);
  };

  const editVersionName = (e, name) => {
    setversionEdit(name);
  };

  //Process version list after updation
  const processVersionListAfterUpdation = (versionName, versionOldName) => {
    var newVersionList = calutatedVersionList.map(list => {
      if (list.name === versionOldName) {
        const updatedList = {
          ...list,
          name: versionName
        };
        return updatedList;
      }
      return list;
    });
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
    setcalutatedVersionList(newVersionList);
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
    description: ""
  };
  let [versionDetails, setversionDetails] = useState(
    initialVersionDetailsState
  );

  // reset versionDetails
  const resetVersionDetails = close => {
    setversionDetails(initialVersionDetailsState);
    close && setisEditing(false);
  };

  // handle add / update type (true for add , false for update)
  const handleAddType = type => {
    setaddType(type);
    setisEditing(true);
  };

  // Add version to list
  const addVersion = () => {
    const { name, source } = versionDetails;
    let newList = [...versionList, ...versionDetails];
    if (name && name !== "" && source && source !== "") {
      setshowMore(false);
      setversionList(newList);
      setcalutatedVersionList(newList);
      resetVersionDetails();
    } else {
      console.log("Please enter valid details");
    }
  };

  // Update version to list
  const updateVersion = () => {};

  // Version add/update handleer
  const handleVersionAddOrUpdate = () => {
    console.log(addType);
    if (addType) {
      addVersion();
    } else {
      updateVersion();
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
    calcutateVersionList(initialData);
    return () => {
      // Clean up
    };
  }, []);

  return (
    <React.Fragment>
      <a onClick={() => handleAddType(true)}>Add version</a>
      <hr />
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
            <input
              type="text" 
              name="source"
              value={versionDetails.source}
              onChange={handleVersionFieldsChange}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={versionDetails.description}
              onChange={handleVersionFieldsChange}
            />
          </div>
          <button onClick={handleVersionAddOrUpdate}>Add</button>
          <button onClick={() => resetVersionDetails(true)}>Cancel</button>
        </div>
      )}
      <hr />
      <div className="vpb-version-inventory">
        <h1>Version</h1>
        <ul>
          {calutatedVersionList &&
            calutatedVersionList.map(list => (
              <VersionList
                key={list.name}
                {...list}
                editVersionName={editVersionName}
                saveVersionDetails={saveVersionDetails}
                versionEdit={versionEdit}
              />
            ))}
        </ul>
        {showMore && <a onClick={showMoreData}>Show more</a>}
      </div>
    </React.Fragment>
  );
}
