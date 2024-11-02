import dynamic from "next/dynamic";

type Props = {
  children: React.ReactNode;
};

const NoSsr = (props: Props) => <>{props.children}</>;

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
