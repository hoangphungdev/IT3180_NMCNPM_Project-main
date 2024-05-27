// UIContext.js
import React, { useEffect } from 'react';

const UIContext = React.createContext();

// Thong tin chung cho toan bo ung dung
const UIProvider = ({ children }) => {
  const [userId, setUserId] = React.useState(null);
  const [categoryData, setCategoryData] = React.useState(null);
  const [citizen, setCitizen] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [sideBar, setSideBar] = React.useState(null);
  // quan ly man hinh hien tai trong app
  const [currentScreen, setCurrentScreen] = React.useState('');
  // user la object chua thong tin, useEffect theo userId trong sign in
  const [user, setUser] = React.useState(null);
  // modal hien tai
  const [currentModal, setCurrentModal] = React.useState('');
  // screen cuoi cung cua home admin stack
  const [topStackAdminHome, setTopStackAdminHome] = React.useState('HomeAdmin');
  // screen cuoi cung cua account info stack
  const [topStackAccountInfo, setTopStackAccountInfo] = React.useState('InfoAccount');
  // screen cuoi cung cua home user
  const [topStackUserHome, setTopStackUserHome] = React.useState('HomeUser');
  // householdId của hộ gia đình được chọn để tương tác
  const [householdId, setHouseholdId] = React.useState(null);

  const [idPerson, setIdPerson] = React.useState(null);

  useEffect(() => {
    console.log('currentScreen: ', currentScreen);
  }, [currentScreen]);

  const uiContextValue = React.useMemo(() => {
    return {
      user, setUser,
      citizen, setCitizen,
      categoryData, setCategoryData,
      userId, setUserId,
      isAdmin, setIsAdmin,
      sideBar, setSideBar,
      currentScreen, setCurrentScreen,
      currentModal, setCurrentModal,
      topStackAdminHome, setTopStackAdminHome,
      topStackAccountInfo, setTopStackAccountInfo,
      topStackUserHome, setTopStackUserHome,
      householdId, setHouseholdId,
      idPerson, setIdPerson,
    };
  }, [
    user,
    citizen,
    userId,
    sideBar,
    currentScreen,
    currentModal,
    topStackAdminHome,
    topStackAccountInfo,
    topStackUserHome,
    categoryData,
    isAdmin,
    householdId,
    idPerson,
  ]);

  return <UIContext.Provider value={uiContextValue}>{children}</UIContext.Provider>;
};

export { UIProvider, UIContext };