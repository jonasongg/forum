import React from 'react';
import { createContext, useState } from 'react';

type tPopupContext = {
    popupPrompted: number;
    setPopupPrompted: React.Dispatch<React.SetStateAction<number>>;
    isCommentDelete: boolean;
    setIsCommentDelete: React.Dispatch<React.SetStateAction<boolean>>;
    afterDeleteFunction: () => void;
    promptDelete: (afterDeleteValue: () => void) => void;
};

const PopupContext = createContext<tPopupContext>({} as tPopupContext);

const PopupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const popup = () => {
    const [popupPrompted, setPopupPrompted] = useState(0);
    const [isCommentDelete, setIsCommentDelete] = useState(true);

    const setAfterDeleteDefault = () =>
      console.log('Default value of afterDelete');
    const [afterDeleteFunction, setAfterDeleteFunction] = useState<
            () => void
              >(() => setAfterDeleteDefault);

    const promptDelete = (afterDeleteValue: () => void) => {
      setPopupPrompted(2);
      setAfterDeleteFunction(() => afterDeleteValue);
    };

    return {
      popupPrompted,
      setPopupPrompted,
      isCommentDelete,
      setIsCommentDelete,
      afterDeleteFunction,
      promptDelete,
    };
  };
  return (
    <PopupContext.Provider value={popup()}>
      {children}
    </PopupContext.Provider>
  );
};

export { PopupContext, PopupProvider };
