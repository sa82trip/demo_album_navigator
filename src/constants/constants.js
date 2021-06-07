export const regex = new RegExp("^/$");
export const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const mockUser = {
  userId: "mock@test.com",
  password: "123456",
};

export const PROPERTIES = {
  USERID: "userId",
  PASSWORD: "password",
};
export const POST = {
  EDITING: "editing",
  POSTING: "posting",
};

export const QUESTIONS = {
  LOGOUT: "Do you really want to logout?",
};
