import ButtonUI from "@/components/CustomUI/ButtonUI";
import CountDown from "@/components/CustomUI/CountDown";
import Header from "@/components/CustomUI/Header";
import TechImage from "@/components/CustomUI/TechImage";
import TextUI from "@/components/CustomUI/TextUI";

export default function Home() {
  return (
    <div className="w-full absolute top-0">
      <Header />

      <h1 className="font-poppins text-[2em]">Font Poppins : Epitome 2k24</h1>
      <h1 className="font-nulshock text-[2em]">
        Font NullShock : Epitome 2k24
      </h1>
      <h1 className="font-vulgar text-[2em]">Font Vulgar : Epitome 2k24</h1>
      <h1 className="font-valorant text-[2em]">Font Valorant : Epitome 2k24</h1>
      <h1 className="font-beyonders text-[2em]">
        Font Beyonders : Epitome 2k24
      </h1>
      <h1 className="font-spaceAge text-[2em]">
        Font Space Age : Epitome AIMIT
      </h1>

      <ButtonUI value="Sign Up" />
      <CountDown />
      <br />
      <TextUI variant="gradient" gradient="bg-blueGradient" className="font-beyonders text-[2em]" text="Epitome AIMIT" />
      <TextUI variant="hacker" className="font-beyonders text-[2em]" text="AIMIT HACKER" />
      <br />
      <TechImage />
    </div>
  );
}
