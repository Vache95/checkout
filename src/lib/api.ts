// // import { isEmpty } from "lodash";
// // import { createBrowserHistory } from "history";

// const checkStatus = async (response:any) => {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   } else if (response.status === 401) {
//     // createBrowserHistory().push("/login");
//     window.location = "/login";
//     localStorage.removeItem("csi-token");
//   }

//   let error = "";

//   try {
//     error = await response.text();
//     error = JSON.parse(error);
//     error.status = response.status;
//   } catch (e) {
//     console.log(e);
//   }

//   throw error;
// };

// const parseJSON = (response) => response.json();

// export const api = async (url, data, notification, options) => {
//   const requestOptions = {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${localStorage.getItem("csi-token")}`,
//       "Content-Type": "application/json",
//       "cache-control": "no-cache",
//     },
//     method: "GET",
//     ...options,
//   };

//   if (["PATCH", "POST", "PUT"].includes(requestOptions.method)) {
//     requestOptions.body = JSON.stringify(data);
//   }
//   if (["DELETE"].includes(requestOptions.method) && !isEmpty(data)) {
//     requestOptions.body = JSON.stringify(data);
//   }
//   /* if (["DELETE"].includes(requestOptions.method) && ) {
//     requestOptions.body = JSON.stringify(data);
//   } */

//   const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, requestOptions).then(checkStatus).then(parseJSON);

//   if (notification !== undefined && notification !== null && notification.showFlag !== undefined && notification?.success) {
//     notification.showFlag({
//       icon: <SuccessIcon label="Info icon" primaryColor={G400} />,
//       title: notification.success,
//       isAutoDismiss: true,
//     });
//   }

//   return response;
// };

// const { data } = await api(`/workspacescurrent?org_id=${user.org_id}`, {
//     method: "GET"
//   });

// try {
//     const workSpaces = { showFlag, success: "Successfully switched!" };
//     const {
//       data: {
//         user: { user, ...resetUserData }
//       }
//     } = await api(`/workspaces`, { current_org_id: _userState.org_id, current_usr_id: _userState.usr_id, switch_org_id: org_id, switch_usr_id: usr_id }, workSpaces, {
//       method: "POST"
//     });
//     if (resetUserData?.token) {
//       localStorage.setItem("csi-token", resetUserData.token);
//     }
//     setOrganization({ ...organization, userOrganizations: resetUserData.user_organizations });
//     const accesiblePaths = ["/my-profile", "/subscription", "/upgrade-subscription", "/calendar"];
//     forEach(resetUserData.menu, m => forEach(m.children, item => accesiblePaths.push(pathForScrCode[item.scr_code])));
//     const updatedUserState = { ..._userState, ...resetUserData, ...user, accesiblePaths };
//     updatedUserState.selectedSubscription = resetUserData?.selected_subscription ? resetUserData?.selected_subscription[0] : null;
//     setUser(updatedUserState);
//   } catch (e) {
//     showFlag({
//       icon: <ErrorIcon primaryColor={R400} />,
//       title: "Alert!",
//       description: e?.message,
//       key: "error",
//       isAutoDismiss: true
//     });
//   }
