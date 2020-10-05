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
    setcalutatedVersionList(newVersionList);
  };

  // Save updated version data
  const saveVersionDetails = ({ versionName, versionOldName }) => {
    console.log(versionName, " - ", versionOldName);
    processVersionListAfterUpdation(versionName, versionOldName);
    setversionEdit(null);
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
    <div className="version-inventory">
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
  );
}
