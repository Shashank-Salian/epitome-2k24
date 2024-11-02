"use client";

import { useEffect, useRef } from "react";
import { textGeo } from "../Models/TextGeo";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: string;
}

/**
 * Creates a 3D Text in the threejs scene.
 * Returns a div element which will be the anchor for the text.
 *
 */
const Text = ({ children, ...props }: Props) => {
  console.log(children);
  const anchor = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (anchor.current) {
      textGeo(children, anchor.current);
    }
  }, [children]);

  return (
    <div {...props} ref={anchor} className="invisible">
      {children}
    </div>
  );
};

export default Text;
