import { useHistory } from "react-router-dom";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
function NewMeetup() {
  // 这也是个hook，来控制页面访问的history，从而达到返回上一个页面，或跳转到其他页面的功能
  const history = useHistory();
  
  function addMeetupHandler(meetupData) {
    fetch(
      "https://react-getting-started-ea358-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        }
      }
    ).then(() => {
      // submit 这个 form 之后，页面会跳转到 All Meetups 这个主页
      history.replace('/');
    });
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetup;
