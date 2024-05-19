import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { clamp } from "lodash";

import { assets } from "../../../../../assets";

type cords = {
  x: number;
  y: number;
};

export function FlappyBox() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const birdRef = useRef<HTMLDivElement>(null);

  // 0 to 1
  const [birdY, setBirdY] = useState(0.5);
  const [birdPose, setBirdPose] = useState(1);
  const [bgIndex, setBgIndex] = useState(0);

  const drawBg = useCallback(
    (
      context: CanvasRenderingContext2D,
      dTime: number,
      bg: HTMLImageElement,
      bgLocation: {
        x: number;
        y: number;
      }
    ): cords => {
      const movementX = bgLocation.x - (50 * dTime) / 1000;
      if (movementX <= -bg.width) {
        return { x: 0, y: 0 };
      }

      // Bg loop
      context.drawImage(bg, movementX, -bg.width / 4, bg.width, bg.height);
      context.drawImage(
        bg,
        bg.width + movementX,
        -bg.width / 4,
        bg.width,
        bg.height
      );
      return {
        x: movementX,
        y: 0,
      };
    },
    []
  );

  // Background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let startTime = Date.now();
    let animationId;

    const bg1 = new Image();
    const bg2 = new Image();
    bg1.src = assets.flappy.bg1;
    bg2.src = assets.flappy.bg2;

    let bgLocation = {
      x: 0,
      y: 0,
    };

    const renderer = () => {
      const time = Date.now();
      const deltaTime = time - startTime;
      startTime = time;

      bgLocation = drawBg(
        ctx,
        deltaTime,
        bgIndex === 0 ? bg1 : bg2,
        bgLocation
      );
      animationId = requestAnimationFrame(renderer);
    };

    renderer();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef, drawBg, bgIndex]);

  // Bird movement and pose
  useEffect(() => {
    const birdYInterval = setInterval(() => {
      setBirdY((prev) => {
        if (isDisabled || isGameOver) {
          return 0.5;
        }
        const newY = prev - 0.25;
        return clamp(newY, 0, 1);
      });
    }, 1000);

    const birdPoseInterval = setInterval(() => {
      setBirdPose((prev) => (prev + 1) % 4);
    }, 250);

    return () => {
      clearInterval(birdYInterval);
      clearInterval(birdPoseInterval);
    };
  }, [isDisabled]);

  // Click event listener
  useEffect(() => {
    const card = cardRef.current;
    const mouseClickListner = () => {
      setBirdY((prev) => clamp(prev + 0.25, 0, 1));
    };
    card?.addEventListener("click", mouseClickListner);
    return () => {
      card?.removeEventListener("click", mouseClickListner);
    };
  }, [cardRef]);

  return (
    <div
      className="w-full h-full relative"
      ref={cardRef}
      onMouseOver={() => {
        setIsDisabled(false);
      }}
      onMouseOut={() => {
        setIsDisabled(true);
      }}
    >
      {/* <div className="absolute left-2 top-2 z-40 group">
        <div
          className={clsx(
            "flex text-nowrap absolute transition-all duration-300 text-sm text-center bg-white border-gray-300 border rounded-full p-1.5 text-gray-500 z-5"
          )}
        >
          <Info className="text-black" size={20} />
          <span className="group-hover:max-w-64 max-w-0 overflow-hidden transition-all duration-300">
            <a
              href="https://megacrash.itch.io/flappy-bird-assets"
              className="px-4"
              onMouseEnter={() => {
                cursorState.setMouseState(MouseState.LINK);
              }}
              onMouseLeave={() => {
                cursorState.resetMouseState();
              }}
            >
              Assets from
              <span className="text-red-600">&nbsp;itch.io</span>
            </a>
          </span>
        </div>
      </div> */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: isGameOver ? 1 : 0,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="game-over z-20 inset-0 rounded-lg absolute bg-white/40 backdrop-blur-md flex flex-col gap-2 items-center justify-center"
      >
        <h2 className="text-black jetbrains-mono">Game Over</h2>
        <button
          onClick={() => {
            setIsGameOver(false);
            setIsDisabled(false);
          }}
          className="bg-white p-1 px-4 rounded-full text-black hover:bg-black hover:text-white transition-all duration-300"
        >
          Restart
        </button>
      </motion.div>
      <img
        src={assets.flappy.bg1}
        onClick={(e) => {
          setBgIndex(0);
          e.stopPropagation();
        }}
        className={clsx(
          "absolute right-2 top-2  z-40 w-10 h-10 rounded-md border-2 border-white",
          {
            hidden: bgIndex !== 1,
          }
        )}
      />
      <img
        src={assets.flappy.bg2}
        onClick={(e) => {
          setBgIndex(1);
          e.stopPropagation();
        }}
        className={clsx(
          "absolute right-2 top-2  z-40 w-10 h-10 rounded-md border-2 border-white",
          {
            hidden: bgIndex !== 0,
          }
        )}
      />
      <div className="absolute flex w-full h-full overflow-hidden">
        <canvas ref={canvasRef} />
        <motion.div
          className="absolute z-10 inset-x-0 flex items-center justify-center"
          initial={{
            y: 0.5,
          }}
          // canvas height is 200px and bird height is around 50px
          animate={{
            y: (1 - birdY) * 175,
          }}
          transition={{
            duration: 1,
            damping: 1,
          }}
        >
          <motion.div
            ref={birdRef}
            className="w-6 h-6 z-20 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${assets.flappy.flappy})`,
              backgroundPosition: `${(100 / 3) * birdPose}% 0`,
            }}
          />
        </motion.div>
      </div>
      <PipeSpawner
        cardWidth={cardRef.current?.clientWidth}
        cardHeight={cardRef.current?.clientHeight}
        birdRef={birdRef}
        checkCollision={(isColliding: boolean) => {
          if (isColliding) {
            setIsGameOver(true);
            setIsDisabled(true);
          }
        }}
        disabled={isDisabled}
        gameover={isGameOver}
      />
    </div>
  );
}

function PipeSpawner({
  cardWidth = 250,
  cardHeight = 200,
  birdRef,
  checkCollision,
  disabled,
  gameover,
}: {
  cardWidth?: number;
  cardHeight?: number;
  birdRef: React.RefObject<HTMLDivElement>;
  checkCollision?: (isColliding: boolean) => void;
  disabled?: boolean;
  gameover?: boolean;
}) {
  const [pipes, setPipes] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const spawnPipe = () => {
      setPipes((prev) => {
        if (prev.length > 3) {
          prev.shift();
        }
        return [
          ...prev,
          <TwoPipes
            key={Math.random()}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            birdRef={birdRef}
            checkCollision={checkCollision}
          />,
        ];
      });
    };

    const interval = setInterval(() => {
      if (gameover) {
        setPipes([]);
        return;
      }
      if (disabled) {
        return;
      }
      spawnPipe();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [cardWidth, birdRef, cardHeight, disabled, gameover]);

  return <div className="absolute h-full w-full z-10">{pipes}</div>;
}

function isColliding(
  birdX: number,
  birdY: number,
  birdWidth: number,
  birdHeight: number,
  pipeX: number,
  pipeY: number,
  pipeWidth: number,
  pipeHeight: number
) {
  return (
    birdX < pipeX + pipeWidth &&
    birdX + birdWidth > pipeX &&
    birdY < pipeY + pipeHeight &&
    birdY + birdHeight > pipeY
  );
}

function TwoPipes({
  cardWidth,
  cardHeight,
  birdRef,
  checkCollision,
  isDisabled,
}: {
  cardWidth: number;
  cardHeight: number;
  birdRef: React.RefObject<HTMLDivElement>;
  checkCollision?: (isColliding: boolean) => void;
  isDisabled?: boolean;
}) {
  const pipeRef = useRef<HTMLImageElement>(null);
  const pipesY = useMemo(() => {
    return Math.random() * (cardHeight / 3);
  }, [cardHeight]);

  const containerRef = useRef<HTMLDivElement>(null);

  const variants = {
    initial: {
      x: "100px",
    },
    animate: {
      x: `${(-cardWidth || 0) - 100}px`,
    },
    disabled: {
      opacity: 0,
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!birdRef.current || !pipeRef.current) return;

      const birdX = birdRef.current.getBoundingClientRect().x;
      const birdY = birdRef.current.getBoundingClientRect().y;
      const birdWidth = birdRef.current.getBoundingClientRect().width;
      const birdHeight = birdRef.current.getBoundingClientRect().height;

      const pipeX = pipeRef.current.getBoundingClientRect().x;
      const pipeY = pipeRef.current.getBoundingClientRect().y;
      const pipeWidth = pipeRef.current.getBoundingClientRect().width;
      const pipeHeight = pipeRef.current.getBoundingClientRect().height;

      checkCollision?.(
        isColliding(
          birdX || 0,
          birdY || 0,
          birdWidth || 0,
          birdHeight || 0,
          pipeX || 0,
          pipeY || 0,
          pipeWidth || 0,
          pipeHeight || 0
        )
      );
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [containerRef, cardWidth, birdRef, checkCollision]);

  return (
    <>
      <motion.div
        className="absolute w-full h-[120%] flex flex-col items-end"
        variants={variants}
        initial="initial"
        animate={["animate", ...(isDisabled ? ["disabled"] : [])]}
        transition={{
          duration: 8,
          ease: "linear",
        }}
        style={{
          top: `${pipesY}%`,
        }}
      >
        <img src={assets.flappy.pipe} className="h-18" alt="" ref={pipeRef} />
      </motion.div>
      <div className="absolute w-full" ref={containerRef} />
    </>
  );
}
