import React, { useState } from "react";
import "./InputStyle.css";

interface EditInputProps {
  name: string;
  value: string;
  changeValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEdit: () => void;
}

const EditInput: React.FC<EditInputProps> = ({
  name,
  value,
  changeValue,
  handleChange,
  handleEdit,
}) => {
  const [editInfo, setEditInfo] = useState<boolean>(false);

  const handleClick = () => {
    if (editInfo) {
      handleEdit();
      setEditInfo(false);
    } else {
      setEditInfo(true);
    }
  };

  return (
    <>
      <div className="edit_input">
        {editInfo ? (
          <input
            onChange={(event) => handleChange(event)}
            name={changeValue}
            type="text"
            autoComplete="off"
            placeholder={`Enter new ${name}`}
            id="input"
          />
        ) : (
          <>
            <span>{name}</span>
            <h3>{value}</h3>
          </>
        )}
      </div>
      <div>
        <>
          <button
            onClick={handleClick}
            className={value || !editInfo ? "active_button" : "disabled_button"}
          >
            {editInfo ? "Submit" : "Edit"}
          </button>
          {editInfo ? (
            <button
              onClick={() => setEditInfo(false)}
              className="disabled_button"
            >
              Cancel
            </button>
          ) : (
            <></>
          )}
        </>
      </div>
    </>
  );
};

export default EditInput;
