import { Karla } from "next/font/google";

const karla = Karla({ subsets: ["latin"] });

const fonts = {
  heading: karla.style.fontFamily,
  body: karla.style.fontFamily,
};

export default fonts;
