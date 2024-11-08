import Container from "@/containers/Container/Container";
import Event from "./Event/Event";

const Events = () => {
  return (
    <>
      <Container parentClassName="pt-12 relative">
        <div>
          <h1 className="font-spaceAge text-6xl font-bold text-center drop-shadow-2xl">
            Events
          </h1>

          <Event />
        </div>
      </Container>
      <Container>hello</Container>
    </>
  );
};

export default Events;
