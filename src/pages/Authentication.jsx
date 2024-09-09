import { Helmet } from "react-helmet";
import { AuthenView, SignupView } from "../section/authen/view";

function Authentication() {
  return (
    <>
      <Helmet>
        <title> GO! Study | Login </title>
      </Helmet>
      <AuthenView />
      <SignupView />
    </>
  );
}

export default Authentication;
