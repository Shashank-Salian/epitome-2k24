import Container from "@/containers/Container/Container";
import Event from "./Event/Event";
import Text from "@/threeWorks/components/Text";

const Events = () => {
  return (
    <Container>
      <div>
        <h1 className="font-spaceAge text-6xl font-bold mt-12 text-center">
          <span>Events</span>
        </h1>

        <Event />
      </div>
    </Container>
  );
};

export default Events;
