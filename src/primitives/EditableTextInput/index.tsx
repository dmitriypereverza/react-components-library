import React from "react";
import styled from "styled-components/macro";
import ClickOutside from "primitives/ClickOutside/ClickOutside";
import { useToggle } from "libs/hooks";

const EditableTextInputWrapper = styled.div``;

interface EditableTextInputInterface {
  initialValue: any;
  editView: (
    value?: any,
    setValue?: (data: any) => void,
    closeEditMode?: () => void,
  ) => React.ReactNode;
  showView: (value) => React.ReactNode;
}
export default React.memo(
  ({ editView, showView, initialValue }: EditableTextInputInterface) => {
    const [editMode, toggleEditMode] = useToggle(false);
    const [value, setValue] = useToggle(initialValue);

    return (
      <>
        {editMode ? (
          <ClickOutside
            handleClickOut={() => editMode && toggleEditMode(false)}
          >
            <EditableTextInputWrapper>
              {editView(value, setValue, () => toggleEditMode(false))}
            </EditableTextInputWrapper>
          </ClickOutside>
        ) : (
          <EditableTextInputWrapper onClick={() => toggleEditMode(true)}>
            {showView(value)}
          </EditableTextInputWrapper>
        )}
      </>
    );
  },
);
