import { useEffect, useState } from "react";

import desktopBackground from "../../assets/desktop-background.jpg";

import { iconUrls } from "./iconUrls";

// TODO: bring react-query to handle image loading
export function useInterfaceImageLoader() {
  const [isInterfaceImagesLoaded, setIsInterfaceImagesLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (icon) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = icon;
        loadImg.onerror = (err) => reject(err);
        loadImg.onload = () => {
          resolve(icon);
        };
      });
    };

    const iconsArray = Object.values(iconUrls);

    Promise.all([
      ...iconsArray.map((icon) => loadImage(icon.src)),
      loadImage(desktopBackground),
    ])
      .then(() => {
        console.log("Icons loaded");
        setIsInterfaceImagesLoaded(true);
      })
      .catch((err) => console.error("Failed to load icons", err));
  }, []);

  return isInterfaceImagesLoaded;
}