"use client";
import React from "react";
import { Transition, Variants } from "framer-motion";
import { motion } from "framer-motion";

const WorkItem = ({
  title,
  date,
  company,
}: {
  title: string;
  date: string;
  company: React.ReactNode;
}) => (
  <>
    <tr>
      <td className="font-bold">{title}</td>
      <td className="font-semibold mt-3 text-neutral-300 text-base sm:text-[1.2vw]">
        {date}
      </td>
    </tr>
    <p className="text-neutral-400 italic text-lg sm:text-xl mt-1 mb-3">
      {company}
    </p>
  </>
);

const MotionIcon = ({ d }: { d: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="size-[20vw] sm:size-[2.5vw]"
  >
    <motion.path variants={svgVariants} d={d} />
  </svg>
);

const workItems = [
  {
    title: "MACHINE LEARNING ENGINEER",
    date: "MAY 2024 - PRESENT",
    company: <>BOUNDARY REMOTE SENSING SYSTEMS</>,
  },
  {
    title: "SOFTWARE DEVELOPER",
    date: "NOV 2023 - PRESENT",
    company: (
      <>
        ICSSC (
        <a
          href="https://github.com/icssc/ZotMeal"
          target="_blank"
          className="font-bold text-sky-400 hover:underline"
        >
          ZOTMEAL
        </a>
        )
      </>
    ),
  },
  {
    title: "SOFTWARE ENGINEER INTERN",
    date: "JULY 2023 - JULY 2024",
    company: <>THADDEUS RESOURCE CENTER</>,
  },
  {
    title: "COMPUTER SCIENCE",
    date: "SEP 2020 - JUNE 2024",
    company: <>UNIVERSITY OF CALIFORNIA, IRVINE</>,
  },
];

const transition: Transition = {
  y: {
    type: "spring",
    stiffness: 100,
    damping: 30,
    mass: 0.5,
    restDelta: 0.001,
  },
  // staggerChildren: 0.5,
};

const wordVariants: Variants = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const letterVariants: Variants = {
  initial: { opacity: 0, marginTop: 400 },
  animate: {
    opacity: 1,
    marginTop: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
      opacity: { duration: 0.5 },
    },
  },
};

const AnimatedLetters = ({ title }: { title: string }) => (
  <motion.div
    variants={wordVariants}
    initial="initial"
    whileInView="animate"
    className="flex"
    viewport={{ once: true }}
  >
    {title.split("").map((letter, index) => (
      <motion.div key={index} variants={letterVariants}>
        {letter}
      </motion.div>
    ))}
  </motion.div>
);

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      // delayChildren: 0.2, // this will set a delay before the children start animating
      // when: "afterChildren", // this will set the delay before the children start animating
      staggerChildren: 0.4, // this will set the time inbetween children animation
    },
  },
};

const svgVariants: Variants = {
  hidden: {
    pathLength: 0,
    fill: "rgba(0,0,0,0)",
    strokeWidth: "0.55",
    stroke: "rgba(0,0,0,0)",
  },
  visible: {
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
    strokeWidth: 0,
    stroke: "rgba(255, 255, 255, 1)",
    transition: {
      pathLength: { type: "spring", duration: 2, bounce: 0 },
      fill: { delay: 1 + 2, duration: 0.5 },
      opacity: { delay: 1, duration: 0.01 },
      strokeWidth: {
        delay: 1 + 2,
        duration: 0.5,
      },
    },
  },
};

export const Portfolio = () => {
  const [activeCard, setActiveCard] = React.useState(0);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [animationEnd, setAnimationEnd] = React.useState(false);
  const bgImageUrl = "/AU-FG-Texture6-8K.jpg";

  React.useEffect(() => {
    const img = new Image();
    img.src = bgImageUrl;
    img.onload = () => setImageLoaded(true);
  }, [bgImageUrl]);

  const sectionTitles = ["ABOUT", "WORK"];

  function handleScroll(e: React.WheelEvent) {
    if (e.deltaY === 100 && activeCard < sectionTitles.length - 1)
      setActiveCard((prevCard) =>
        Math.min(prevCard + 1, sectionTitles.length - 1)
      );
    else if (e.deltaY === -100)
      setActiveCard((prevCard) => (prevCard > 0 ? prevCard - 1 : 0));
  }

  const Loading = () => (
    <motion.div
      variants={wordVariants}
      initial="initial"
      whileInView="animate"
      className="h-screen w-screen flex items-center justify-center"
    >
      <motion.div className="overflow-hidden border select-none flex items-center justify-center p-8 m-4 sm:m-0">
        {"dlustre".split("").map((letter, index) => (
          <motion.div
            key={index}
            variants={letterVariants}
            className={`dark:text-neutral-100 text-neutral-900 font-bold text-5xl sm:text-[2vw] overflow-hidden p-4 sm:p-8`}
            onAnimationComplete={() =>
              setTimeout(() => setAnimationEnd(true), 1000)
            }
          >
            {letter}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );

  // return (
  //   <motion.div className="font-extrabold text-[7vw]">
  //     <AnimatedLetters title="DENNIS LUSTRE" />
  //   </motion.div>
  // )

  if (!imageLoaded || !animationEnd) return <Loading />;

  return (
    <motion.div
      onWheel={handleScroll}
      className="overscroll-none overflow-hidden"
    >
      <motion.div
        className={`hidden sm:flex absolute left-0 h-screen flex-col items-center justify-center z-10 transition-all duration-300`}
      >
        <motion.div
          className="flex flex-col items-center justify-center space-y-10 backdrop-blur-sm backdrop-brightness-50 mx-10 py-16 rounded-lg"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 1,
              ease: [0.17, 0.67, 0.83, 0.67],
              delay: 0.5,
            },
          }}
        >
          {sectionTitles.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveCard(index)}
              className={`${
                activeCard === index ? "opacity-100" : "opacity-25"
              } text-[1.5vw] bg-neutral-100 rounded-full size-6 mx-6 text-neutral-100 transition-all duration-300 ease-in-out`}
            />
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        className={`bg-[url(/AU-FG-Texture6-8K.jpg)] bg-contain h-screen w-screen overflow-hidden overscroll-none`}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
            delay: 0.5,
          },
        }}
      >
        <button
          onClick={() =>
            setActiveCard((prevCard) => (prevCard > 0 ? prevCard - 1 : 0))
          }
          className={`${
            activeCard === 0 ? "opacity-0" : "opacity-100"
          } fixed sm:hidden transition-all top-8 left-1/2 -translate-x-1/2 z-10`}
        >
          <img
            width={40}
            className="transform rotate-180"
            src="/double-down.png"
            alt="double down"
          />
        </button>
        <button
          onClick={() => {
            if (activeCard < sectionTitles.length - 1) {
              setActiveCard((prevCard) => prevCard + 1);
            }
          }}
          className={`${
            activeCard === sectionTitles.length - 1
              ? "opacity-0"
              : "opacity-100"
          } sm:hidden fixed transition-all bottom-8 left-1/2 -translate-x-1/2 z-10`}
        >
          <img width={40} src="/double-down.png" alt="double down" />
        </button>
        <motion.div
          className={`flex flex-col items-center justify-center w-screen h-screen text-neutral-100`}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: activeCard === 0 ? 1 : 0.3,
            y: activeCard === 0 ? 0 : "-100vh",
            transition,
          }}
        >
          <motion.p className="font-extrabold text-5xl mb-10 text-center sm:text-8xl text-neutral-200">
            DENNIS LUSTRE
          </motion.p>
          <motion.p className="text-center font-extrabold mt-16 sm:mt-0 text-2xl sm:text-[1vw] sm:w-1/2 text-neutral-300 bg-black/30 p-4 px-4 mx-8 rounded-lg backdrop-blur-sm">{`HI, I'M DENNIS, AND I LOVE DOING ML AND FULL-STACK WEB DEV.`}</motion.p>
          <div className="text-xl mt-10 sm:text-[1.5vw] text-center sm:text-left space-y-5 flex flex-col text-neutral-300 bg-black/30 p-4 px-8 rounded-lg backdrop-blur-sm">
            <a
              href="mailto:dennis.lustre@gmail.com"
              className="text-lg font-bold hover:text-sky-400 hover:underline"
            >
              DENNIS.LUSTRE@GMAIL.COM
            </a>
            <a
              href="https://github.com/dlustre"
              className="text-lg font-bold hover:text-sky-400 hover:underline"
            >
              GITHUB.COM/DLUSTRE
            </a>
            <a
              href="https://linkedin.com/in/dlustre"
              className="text-lg font-bold hover:text-sky-400 hover:underline"
            >
              LINKEDIN.COM/IN/DLUSTRE
            </a>
          </div>
        </motion.div>
        <motion.div
          className={`flex flex-col items-center justify-center w-screen h-screen text-neutral-100`}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: activeCard === 1 ? 1 : 0.3,
            y: activeCard === 1 ? "-100vh" : activeCard < 1 ? 0 : "-200vh",
            transition,
          }}
        >
          <div className="bg-black/30 py-6 px-8 rounded-lg w-5/6 sm:w-1/2 mb-8 backdrop-blur-sm">
            <p className="font-extrabold text-4xl text-center sm:text-left text-neutral-100 leading-none">{`WHAT I'M UP TO`}</p>
            <p className="font-bold text-lg text-center sm:text-left text-neutral-300 mb-10 leading-none">
              my{" "}
              <a
                href="/LaTeX/resume.pdf"
                target="_blank"
                className="italic font-extrabold text-[rgb(5,5,5)] transition-all px-1 leading-loose bg-blue-500 hover:bg-neutral-100"
              >
                resume
              </a>
              {` goes into more detail`}
            </p>
            <motion.table className="w-full text-lg sm:text-[1.5vw] mb-10">
              {workItems.map((item, index) => (
                <WorkItem key={index} {...item} />
              ))}
            </motion.table>
          </div>
          <div className="w-1/2 hidden md:block">
            <div className="bg-black/30 py-6 px-8 rounded-lg backdrop-blur-sm w-3/5 flex flex-col items-center justify-center">
              <p className="w-full font-extrabold text-lg sm:text-2xl mb-8 text-neutral-100">
                WHAT I LOVE USING
              </p>
              <motion.div
                className="w-full flex flex-wrap sm:grid sm:grid-flow-col sm:auto-cols-max space-x-8 sm:gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                }}
              >
                <MotionIcon d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
                <MotionIcon d="M1.194 7.543v8.913c0 1.103.588 2.122 1.544 2.674l7.718 4.456a3.09 3.09 0 0 0 3.088 0l7.718-4.456a3.09 3.09 0 0 0 1.544-2.674V7.543a3.08 3.08 0 0 0-1.544-2.673L13.544.414a3.09 3.09 0 0 0-3.088 0L2.738 4.87a3.09 3.09 0 0 0-1.544 2.673m5.403 2.914v3.087a.77.77 0 0 0 .772.772a.773.773 0 0 0 .772-.772a.773.773 0 0 1 1.317-.546a.78.78 0 0 1 .226.546a2.314 2.314 0 1 1-4.631 0v-3.087c0-.615.244-1.203.679-1.637a2.31 2.31 0 0 1 3.274 0c.434.434.678 1.023.678 1.637a.77.77 0 0 1-.226.545a.767.767 0 0 1-1.091 0a.77.77 0 0 1-.226-.545a.77.77 0 0 0-.772-.772a.77.77 0 0 0-.772.772m12.35 3.087a.77.77 0 0 1-.772.772h-.772v.772a.773.773 0 0 1-1.544 0v-.772h-1.544v.772a.773.773 0 0 1-1.317.546a.78.78 0 0 1-.226-.546v-.772H12a.771.771 0 1 1 0-1.544h.772v-1.543H12a.77.77 0 1 1 0-1.544h.772v-.772a.773.773 0 0 1 1.317-.546a.78.78 0 0 1 .226.546v.772h1.544v-.772a.773.773 0 0 1 1.544 0v.772h.772a.772.772 0 0 1 0 1.544h-.772v1.543h.772a.776.776 0 0 1 .772.772m-3.088-2.315h-1.544v1.543h1.544z" />
                <MotionIcon d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .07.035.058.07l-.093.28c-.012.047-.058.07-.105.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.36c-.736.187-1.239.327-1.963.514c-.176.046-.187.058-.34-.117c-.174-.199-.303-.327-.548-.444c-.737-.362-1.45-.257-2.115.175c-.795.514-1.204 1.274-1.192 2.22c.011.935.654 1.706 1.577 1.835c.795.105 1.46-.175 1.987-.77c.105-.13.198-.27.315-.434H10.47c-.245 0-.304-.152-.222-.35c.152-.362.432-.97.596-1.274a.32.32 0 0 1 .292-.187h4.253c-.023.316-.023.631-.07.947a5 5 0 0 1-.958 2.29c-.841 1.11-1.94 1.8-3.33 1.986c-1.145.152-2.209-.07-3.143-.77c-.865-.655-1.356-1.52-1.484-2.595c-.152-1.274.222-2.419.993-3.424c.83-1.086 1.928-1.776 3.272-2.02c1.098-.2 2.15-.07 3.096.571c.62.41 1.063.97 1.356 1.648c.07.105.023.164-.117.2m3.868 6.461c-1.064-.024-2.034-.328-2.852-1.029a3.67 3.67 0 0 1-1.262-2.255c-.21-1.32.152-2.489.947-3.529c.853-1.122 1.881-1.706 3.272-1.95c1.192-.21 2.314-.095 3.33.595c.923.63 1.496 1.484 1.648 2.605c.198 1.578-.257 2.863-1.344 3.962c-.771.783-1.718 1.273-2.805 1.495c-.315.06-.63.07-.934.106m2.78-4.72c-.011-.153-.011-.27-.034-.387c-.21-1.157-1.274-1.81-2.384-1.554c-1.087.245-1.788.935-2.045 2.033c-.21.912.234 1.835 1.075 2.21c.643.28 1.285.244 1.905-.07c.923-.48 1.425-1.228 1.484-2.233z" />
                <MotionIcon d="M23.8346 11.7033l-1.0073-.6236a13.7268 13.7268 0 00-.0283-.2936l.8656-.8069a.3483.3483 0 00-.1154-.578l-1.1066-.414a8.4958 8.4958 0 00-.087-.2856l.6904-.9587a.3462.3462 0 00-.2257-.5446l-1.1663-.1894a9.3574 9.3574 0 00-.1407-.2622l.49-1.0761a.3437.3437 0 00-.0274-.3361.3486.3486 0 00-.3006-.154l-1.1845.0416a6.7444 6.7444 0 00-.1873-.2268l.2723-1.153a.3472.3472 0 00-.417-.4172l-1.1532.2724a14.0183 14.0183 0 00-.2278-.1873l.0415-1.1845a.3442.3442 0 00-.49-.328l-1.076.491c-.0872-.0476-.1742-.0952-.2623-.1407l-.1903-1.1673A.3483.3483 0 0016.256.955l-.9597.6905a8.4867 8.4867 0 00-.2855-.086l-.414-1.1066a.3483.3483 0 00-.5781-.1154l-.8069.8666a9.2936 9.2936 0 00-.2936-.0284L12.2946.1683a.3462.3462 0 00-.5892 0l-.6236 1.0073a13.7383 13.7383 0 00-.2936.0284L9.9803.3374a.3462.3462 0 00-.578.1154l-.4141 1.1065c-.0962.0274-.1903.0567-.2855.086L7.744.955a.3483.3483 0 00-.5447.2258L7.009 2.348a9.3574 9.3574 0 00-.2622.1407l-1.0762-.491a.3462.3462 0 00-.49.328l.0416 1.1845a7.9826 7.9826 0 00-.2278.1873L3.8413 3.425a.3472.3472 0 00-.4171.4171l.2713 1.1531c-.0628.075-.1255.1509-.1863.2268l-1.1845-.0415a.3462.3462 0 00-.328.49l.491 1.0761a9.167 9.167 0 00-.1407.2622l-1.1662.1894a.3483.3483 0 00-.2258.5446l.6904.9587a13.303 13.303 0 00-.087.2855l-1.1065.414a.3483.3483 0 00-.1155.5781l.8656.807a9.2936 9.2936 0 00-.0283.2935l-1.0073.6236a.3442.3442 0 000 .5892l1.0073.6236c.008.0982.0182.1964.0283.2936l-.8656.8079a.3462.3462 0 00.1155.578l1.1065.4141c.0273.0962.0567.1914.087.2855l-.6904.9587a.3452.3452 0 00.2268.5447l1.1662.1893c.0456.088.0922.1751.1408.2622l-.491 1.0762a.3462.3462 0 00.328.49l1.1834-.0415c.0618.0769.1235.1528.1873.2277l-.2713 1.1541a.3462.3462 0 00.4171.4161l1.153-.2713c.075.0638.151.1255.2279.1863l-.0415 1.1845a.3442.3442 0 00.49.327l1.0761-.49c.087.0486.1741.0951.2622.1407l.1903 1.1662a.3483.3483 0 00.5447.2268l.9587-.6904a9.299 9.299 0 00.2855.087l.414 1.1066a.3452.3452 0 00.5781.1154l.8079-.8656c.0972.0111.1954.0203.2936.0294l.6236 1.0073a.3472.3472 0 00.5892 0l.6236-1.0073c.0982-.0091.1964-.0183.2936-.0294l.8069.8656a.3483.3483 0 00.578-.1154l.4141-1.1066a8.4626 8.4626 0 00.2855-.087l.9587.6904a.3452.3452 0 00.5447-.2268l.1903-1.1662c.088-.0456.1751-.0931.2622-.1407l1.0762.49a.3472.3472 0 00.49-.327l-.0415-1.1845a6.7267 6.7267 0 00.2267-.1863l1.1531.2713a.3472.3472 0 00.4171-.416l-.2713-1.1542c.0628-.0749.1255-.1508.1863-.2278l1.1845.0415a.3442.3442 0 00.328-.49l-.49-1.076c.0475-.0872.0951-.1742.1407-.2623l1.1662-.1893a.3483.3483 0 00.2258-.5447l-.6904-.9587.087-.2855 1.1066-.414a.3462.3462 0 00.1154-.5781l-.8656-.8079c.0101-.0972.0202-.1954.0283-.2936l1.0073-.6236a.3442.3442 0 000-.5892zm-6.7413 8.3551a.7138.7138 0 01.2986-1.396.714.714 0 11-.2997 1.396zm-.3422-2.3142a.649.649 0 00-.7715.5l-.3573 1.6685c-1.1035.501-2.3285.7795-3.6193.7795a8.7368 8.7368 0 01-3.6951-.814l-.3574-1.6684a.648.648 0 00-.7714-.499l-1.473.3158a8.7216 8.7216 0 01-.7613-.898h7.1676c.081 0 .1356-.0141.1356-.088v-2.536c0-.074-.0536-.0881-.1356-.0881h-2.0966v-1.6077h2.2677c.2065 0 1.1065.0587 1.394 1.2088.0901.3533.2875 1.5044.4232 1.8729.1346.413.6833 1.2381 1.2685 1.2381h3.5716a.7492.7492 0 00.1296-.0131 8.7874 8.7874 0 01-.8119.9526zM6.8369 20.024a.714.714 0 11-.2997-1.396.714.714 0 01.2997 1.396zM4.1177 8.9972a.7137.7137 0 11-1.304.5791.7137.7137 0 011.304-.579zm-.8352 1.9813l1.5347-.6824a.65.65 0 00.33-.8585l-.3158-.7147h1.2432v5.6025H3.5669a8.7753 8.7753 0 01-.2834-3.348zm6.7343-.5437V8.7836h2.9601c.153 0 1.0792.1772 1.0792.8697 0 .575-.7107.7815-1.2948.7815zm10.7574 1.4862c0 .2187-.008.4363-.0243.651h-.9c-.09 0-.1265.0586-.1265.1477v.413c0 .973-.5487 1.1846-1.0296 1.2382-.4576.0517-.9648-.1913-1.0275-.4717-.2704-1.5186-.7198-1.8436-1.4305-2.4034.8817-.5599 1.799-1.386 1.799-2.4915 0-1.1936-.819-1.9458-1.3769-2.3153-.7825-.5163-1.6491-.6195-1.883-.6195H5.4682a8.7651 8.7651 0 014.907-2.7699l1.0974 1.151a.648.648 0 00.9182.0213l1.227-1.1743a8.7753 8.7753 0 016.0044 4.2762l-.8403 1.8982a.652.652 0 00.33.8585l1.6178.7188c.0283.2875.0425.577.0425.8717zm-9.3006-9.5993a.7128.7128 0 11.984 1.0316.7137.7137 0 01-.984-1.0316zm8.3389 6.71a.7107.7107 0 01.9395-.3625.7137.7137 0 11-.9405.3635z" />
                <MotionIcon d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
              </motion.div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className={`flex flex-col items-center justify-center gap-4 w-screen h-screen text-neutral-100`}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: activeCard === 2 ? 1 : 0.3,
            y: activeCard === 2 ? "-200vh" : "-100vh",
            transition,
          }}
        >
          <div className="text-xl mt-10 sm:text-[1.5vw] text-center sm:text-left space-y-5 flex flex-col text-neutral-300 bg-black/50 p-4 px-8 rounded-lg backdrop-blur-sm">
            <a
              href="mailto:dennis.lustre@gmail.com"
              className="text-lg font-bold hover:text-sky-400 hover:underline"
            >
              DENNIS.LUSTRE@GMAIL.COM
            </a>
            <a
              href="https://github.com/dlustre"
              className="text-lg font-bold hover:text-sky-400 hover:underline"
            >
              GITHUB.COM/DLUSTRE
            </a>
            <a
              href="https://linkedin.com/in/dlustre"
              className="text-lg font-bold hover:text-sky-400 hover:underline"
            >
              LINKEDIN.COM/IN/DLUSTRE
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
