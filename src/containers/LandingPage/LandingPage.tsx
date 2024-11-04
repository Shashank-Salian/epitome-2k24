import React from "react";
import Container from "@/containers/Container/Container";
import style from "./LandingPage.module.css";
import { useState, useEffect } from "react";
import Typewriter from "./TypeWriter";
import { STLExporter } from "three/examples/jsm/Addons.js";
import CountDown from "../../components/CustomUI/CountDown";
import Glitch from "./Glitch";
import Image from "next/image";

const LandingPage = () => {
  return (
    <Container parentClassName="landing-page-container">
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
            ></div>
            {/* Player Info */}
            <div className={style.listContainer}>
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
                  <a>Twitter</a>
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
        <div className={style.Right}>
          <CountDown />
          <div className={style.landing} data-augmented-ui>
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
            <Image src="/Icons/play.png" width={55} height={0} alt="Trailer" />
          </div>
          <div
            className={style.arrow}
            data-augmented-ui="all-triangle-left border"
          >
            <Image
              src="/Icons/instagram.png"
              width={90}
              height={50}
              alt="instagram"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LandingPage;
