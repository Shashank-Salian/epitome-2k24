import Container from "@/containers/Container/Container";
import Event from "./Event/Event";
import Header from "@/components/CustomUI/Header";

const Events = () => {
  return (
    <>
      <Container parentClassName="w-screen h-screen relative">
        <Header />
        <div className="py-8">
          <h1 className="font-spaceAge text-3xl md:text-6xl font-bold text-center drop-shadow-2xl">
            Events
          </h1>
          <Event />
        </div>
      </Container>
    </>
  );
};

export default Events;
