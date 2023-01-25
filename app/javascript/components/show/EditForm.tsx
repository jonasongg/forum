import React, { useState } from 'react';
import styled from 'styled-components';
import CustomTextArea from '../CustomTextArea';

type EditFormProps = {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
};

const NewEditForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;
const EditForm: React.FC<EditFormProps> = (props) => {
  const [editError, setEditError] = useState(false);

  return (
    <NewEditForm>
      <CustomTextArea
        isTextArea={true}
        placeholder="Edit..."
        useInputState={[props.input, props.setInput]}
        useErrorState={[editError, setEditError]}
        autoFocus={true}
      />
    </NewEditForm>
  );
};

export default EditForm;
