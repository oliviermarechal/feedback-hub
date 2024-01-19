import { c as create_ssr_component, b as subscribe } from "../../../chunks/ssr.js";
import { a as authUser } from "../../../chunks/user.store.js";
import { g as goto, a as apiClient } from "../../../chunks/api.js";
import { userLogged, disconnectUser } from "insight-hunt";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authUser, $$unsubscribe_authUser;
  $$unsubscribe_authUser = subscribe(authUser, (value) => $authUser = value);
  if (!$authUser) {
    if (typeof localStorage !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        goto("/auth/login");
      } else {
        apiClient.get("/me").then((result) => {
          if (result.status === 200) {
            authUser.set(result.data);
            userLogged({
              id: result.data.id,
              email: result.data.email
            });
          } else {
            localStorage.removeItem("token");
            disconnectUser();
            goto("/auth/login");
          }
        });
      }
    }
  }
  $$unsubscribe_authUser();
  return `${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
