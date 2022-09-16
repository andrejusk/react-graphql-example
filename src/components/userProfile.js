import Relay from "react-relay";
import graphql from "babel-plugin-relay/macro";

const UserProfile = Relay.createFragmentContainer(
  (props) => {
    const { name, avatarUrl } = props.user;
    return (
      <div className="User-profile">
        <p>Welcome, {name}</p>
        <img src={{ uri: avatarUrl }} alt={`${name}'s profile`} />
      </div>
    );
  },
  {
    user: graphql`
      query userProfileQuery {
        viewer {
          name
          avatarUrl
        }
      }
    `,
  }
);

export default UserProfile;
