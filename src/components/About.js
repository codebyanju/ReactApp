import User from "./User";
import UserClass from "./UserClass";

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <User name="Anju (Functional)" location="Hyderabad (Functional)" />
      <UserClass name="Anju (Class)" location="Hyderabad (Class)" />
    </div>
  );
};

export default About;
