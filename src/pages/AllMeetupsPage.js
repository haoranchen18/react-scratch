// this componenet be responsible for loading and displaying all the
// meetups that we have
import { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // fetch 会 return 一个 promise
    fetch(
      "https://react-getting-started-ea358-default-rtdb.firebaseio.com/meetups.json"
    )
      .then((response) => {
        // .json() 又会return 一个 promise
        return response.json();
      })
      .then((data) => {
        // data 自己是一个大object包过小的objects，而我们要的内容是data里面的object
        const meetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      {/* <ul>
        {DUMMY_DATA.map((meetup) => {
          // li 元素需要加一个unique key
          return <li key={meetup.id}>{meetup.title}</li>;
        })}
      </ul> */}
      <MeetupList meetups={loadedMeetups}></MeetupList>
    </section>
  );
}

export default AllMeetupsPage;
