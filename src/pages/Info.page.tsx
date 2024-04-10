import useLocalStorage from "use-local-storage";
import { motion } from "framer-motion";
import { Interface } from "../components/pc-interface/interface";

export function InfoPage() {
  const [renderImage] = useLocalStorage("renderImage", "");

  return (
    <motion.div
      className="cover w-full h-full bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${renderImage})` }}
    >
      <Interface />
    </motion.div>
  );
}
