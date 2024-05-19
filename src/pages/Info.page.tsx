import { motion } from "framer-motion";
import useLocalStorage from "use-local-storage";

import { InterfaceFrame } from "../components";

export default function InfoPage() {
  const [renderImage] = useLocalStorage("renderImage", "");

  return (
    <motion.div
      className="cover w-full h-full bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${renderImage})` }}
    >
      <InterfaceFrame />
    </motion.div>
  );
}
