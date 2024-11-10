import React, { useEffect, useRef } from "react";
import Container from "@/containers/Container/Container";
import style from "./LandingPage.module.css";
import Typewriter from "@/components/CustomUI/TypeWriter";
import CountDown from "../../components/CustomUI/CountDown";
import ToggleUI from "../../components/CustomUI/ToggleUI";
import Glitch from "./Glitch";
import Image from "next/image";
import { useGlitch, GlitchHandle } from "react-powerglitch"
import PageButtons from "./PageButtons/PageButtons";
const audioFilePath = "/Music/click.wav";

const LandingPage = () => {
  const soundRef = useRef<HTMLAudioElement>(new Audio(audioFilePath))

  const glitch: GlitchHandle = useGlitch({
    playMode: "always",
    createContainers: true,
    hideOverflow: false,
    timing: {
      duration: 2000,
      easing: "ease-in-out"
    },
    glitchTimeSpan: {
      start: 0.4,
      end: 0.7
    },
    shake: {
      velocity: 20,
      amplitudeX: 0.02,
      amplitudeY: 0.02
    },
    slice: {
      count: 6,
      velocity: 15,
      minHeight: 0.02,
      maxHeight: 0.15,
      hueRotate: true
    },
    pulse: false
  });

  const playSound = () => {
    if (soundRef.current) {
      soundRef.current
        .play()
        .catch((error) => console.error("Error playing sound:", error));
    }
  };

  useEffect(() => {
    soundRef.current.preload = "auto";
    const elements = document.querySelectorAll(
      `.${style.broch}, .${style.arrow}, .${style.button}`
    );

    const handleEvent = () => {
      playSound();
    };

    elements.forEach((element) => {
      element.addEventListener("mouseenter", handleEvent); // For hover
      element.addEventListener("click", handleEvent); // For click
    });
    return () => {
      elements.forEach((element) => {
        element.removeEventListener("mouseenter", handleEvent);
        element.removeEventListener("click", handleEvent);
      });
    };
  }, []);

  return (
    <Container
      parentClassName="landing-page-container"
      className={`pb-4 h-dvh ${style.Parent}`}
    >
      <audio ref={soundRef} src={audioFilePath} />

      <div className={`pt-8 ${style.Main}`}>
        <div className={style.Left}>
          <div className={style.Level}>
            <span className={style.Span}>
              <Glitch text="45" />
            </span>{" "}
            <p className={style.Para}>Level</p>
            <Image
              className={style.starImg}
              src="/Icons/star.png"
              alt="Picture of the author"
              width={25}
              height={25}
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
                alt="Profile"
                width={505}
                height={525}
                ref={glitch.ref}
              />
            </div>
            {/* Player Info */}
            <div
              className={style.listContainer}
              data-augmented-ui
              ref={glitch.ref}
            >
              <ul
                data-augmented-ui="bl-clip tr-clip br-clip-x border"
                className={style.list}
              >
                Name:
                <li className={style.listItem}>
                  <a>Anonymous</a>
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
          <a href="/EpitomeBrochure.pdf" download={true}>
            <span
              className={style.broch}
              data-augmented-ui="bl-clip tr-clip border"
            >
              Brochure
            </span>
          </a>
        </div>

        <div className={style.Middle}>
          <Image
            className={style.Img}
            src="/Icons/Epitome.png"
            width={825}
            height={825}
            alt="Epitome Logo"
            ref={glitch.ref}
          />
          <PageButtons />
        </div>
        <div className={style.Right}>
          <div className={style.watch}>
            <CountDown />
          </div>

          <div className={style.landing} data-augmented-ui ref={glitch.ref}>
            <div className={style.Story}>
              <h1 className={style.title}>Ecstasy</h1>
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
              alt="Trailer"
              width={50}
              height={0}
              className={style.arrow_item1}
            />
          </div>
          <div
            className={style.arrow}
            data-augmented-ui="all-triangle-left border"
          >
            <Image
              src="/Icons/instagram.png"
              alt="instagram"
              width={30}
              height={60}
              className={style.arrow_item2}
            />
          </div>
          <ToggleUI />
        </div>
      </div>
    </Container>
  );
};

export default LandingPage;
