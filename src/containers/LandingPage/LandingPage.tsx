import React from "react";
import Container from "@/containers/Container/Container";
import style from "./LandingPage.module.css";
import { useState, useEffect, useRef } from "react";
import Typewriter from "@/components/CustomUI/TypeWriter";
import { STLExporter } from "three/examples/jsm/Addons.js";
import CountDown from "../../components/CustomUI/CountDown";
import Glitch from "./Glitch";
import Image from "next/image";
import star from "/Icons/star.png";
import ButtonUI from "@/components/CustomUI/ButtonUI";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpLeft } from "lucide-react";
// @ts-ignore
import { PowerGlitch } from "powerglitch";

const LandingPage = () => {
  const glitchRef = useRef(null);
  const glitchRefs = useRef<HTMLDivElement[]>([]);

  const addGlitchRef = (el: HTMLDivElement | null) => {
    if (el && !glitchRefs.current.includes(el)) {
      glitchRefs.current.push(el);
    }
  };

  useEffect(() => {
    glitchRefs.current.forEach((glitchRef) => {
      if (glitchRef) {
        PowerGlitch.glitch(glitchRef, {
          playMode: "always",
          createContainer: true,
          timing: {
            duration: 2000,
            iterations: "Infinity",
            easing: "ease-in-out",
          },
          glitchTimeSpan: { start: 0.4, end: 0.7 },
          shake: { velocity: 20, amplitudeX: 0.02, amplitudeY: 0.02 },
          slice: {
            count: 6,
            velocity: 15,
            minHeight: 0.02,
            maxHeight: 0.15,
            hueRotate: true,
          },
          color: {
            r: 0.1,
            g: 0.3,
            b: 0.1,
            glitchTimeSpan: { start: 0.2, end: 0.5 },
          },
        });
      }
    });
  }, []);
  return (
    <Container
      parentClassName="landing-page-container"
      className={style.Parent}
    >
      <div className={style.Main}>
        <div className={style.Left}>
          <div className={style.Level}>
            <span className={style.Span}>
              <Glitch text="45" />
            </span>{" "}
            <p className={style.Para}>Level</p>
            <Image
              className={style.Img}
              src="/Icons/star.png"
              width={25}
              height={25}
              alt="Picture of the author"
            />
            <span className={style.Span}>1892</span>
            <p className={style.Para}>Coins</p>
          </div>
          <div
            data-tilt
            data-tilt-glare="true"
            data-tilt-max-glare="0.33"
            data-tilt-max="45"
          >
            <div
              data-augmented-ui="all-hexangle-up border"
              className={style.reticle}
            >
              <Image
                src="/Icons/martian.jpg"
                width={505}
                height={525}
                alt="Profile"
                ref={addGlitchRef}
              />
            </div>
            {/* Player Info */}
            <div
              className={style.listContainer}
              data-augmented-ui
              ref={addGlitchRef}
            >
              <ul
                data-augmented-ui="bl-clip tr-clip br-clip-x border"
                className={style.list}
              >
                Name:
                <li className={style.listItem}>
                  <a>Anonymus</a>
                </li>
                Galaxy:
                <li className={style.listItem}>
                  <a className={style.writer}>
                    <Typewriter
                      texts={[
                        "Andromeda",
                        "Milky Way",
                        "Whirlpool",
                        "Sombrero",
                        "Triangulum",
                        "Magellanic",
                        "Pinwheel",
                        "Centaurus A",
                        "Black Eye",
                        "Cartwheel",
                      ]}
                      speed={50}
                      deleteSpeed={30}
                    />
                  </a>
                </li>
                Void Scout ID
                <li className={style.listItem}>
                  <a>2342DFC</a>
                </li>
                Status
                <li className={style.listItem}>
                  <a>Surviving</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Brochure */}
          <span
            className={style.broch}
            data-augmented-ui="bl-clip tr-clip border"
          >
            <span>Brochure </span>
          </span>
        </div>
        <div className={style.Middle}>
          <Image
            className={style.Img}
            src="/Icons/Epitome.png"
            width={825}
            height={825}
            alt="Epitome Logo"
            ref={addGlitchRef}
          />
          <Button
            className={style.button}
            data-augmented-ui="bl-clip tr-clip border"
          >
            <span>Registration</span>
          </Button>

          <Button
            className={style.button}
            data-augmented-ui="bl-clip tr-clip border"
          >
            <span>Events</span>
          </Button>
          <Button
            className={style.button}
            data-augmented-ui="bl-clip tr-clip border"
          >
            <span>About</span>
          </Button>
        </div>
        <div className={style.Right}>
          <div className={style.watch}>
            <CountDown />
          </div>

          <div className={style.landing} data-augmented-ui ref={addGlitchRef}>
            <div className={style.Story}>
              <h1 className={style.title}>Ecstacy</h1>
              <p>
                Captain Zara piloted the starship Nova <Glitch text="through" />{" "}
                the glowing rings of the Andromeda Rift. Suddenly, a beacon
                shimmered, <Glitch text="broadcasting" /> a warning: “Echoes of
                the Void Awaken.” Shadows stirred among the stars, spectral and
                ancient. Zara hit the thrusters, escaping as dark tendrils
                reached out. She knew then—space held <Glitch text="Secrets" />,
                and they had just scratched the surface.
              </p>
            </div>
          </div>
          <div
            className={style.arrow}
            data-augmented-ui="all-triangle-right border"
          >
            <Image
              src="/Icons/play.png"
              width={50}
              height={0}
              alt="Trailer"
              className={style.arrow_item1}
            />
          </div>
          <div
            className={style.arrow}
            data-augmented-ui="all-triangle-left border"
          >
            <Image
              src="/Icons/instagram.png"
              width={30}
              height={60}
              alt="instagram"
              className={style.arrow_item2}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LandingPage;
