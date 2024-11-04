import Container from "@/containers/Container/Container";
import Event from "./Event/Event";
import { useEffect, useRef } from "react";

import { EventsRayCaster } from "@/threeWorks/Models/EventsModel";

const Events = () => {
  const eventsEleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iObserver = new IntersectionObserver((entities) => {
      entities.forEach((entity) => {
        console.log("Entity : ", entity.isIntersecting);
        if (entity.isIntersecting) {
          EventsRayCaster.moveEvent(true, true);
        } else {
          EventsRayCaster.removeEvents();
        }
      });
    });
    if (eventsEleRef.current) iObserver.observe(eventsEleRef.current);
  }, []);

  return (
    <Container>
      <div ref={eventsEleRef}>
        <h1 className="font-spaceAge text-6xl font-bold mt-12 text-center drop-shadow-2xl">
          Events
        </h1>

        <Event />
      </div>
    </Container>
  );
};

export default Events;
