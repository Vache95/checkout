export const emailPattern: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const namePattern: RegExp = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
export const phonePattern: RegExp = /^[0-9]{7,12}$/;
