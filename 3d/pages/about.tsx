import { NextPage } from "next";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import { Layout } from "../components/common";
import { Box } from "../components/3d";

interface IProps {}

const About: NextPage<IProps> = () => {
  return (
    <div className="h-screen w-screen">
      <Canvas style={{ background: "white" }} camera={{ position: [3, 6, 3] }}>
        <ambientLight intensity={0.7} />
        <Stats />
        <OrbitControls attach="orbitControls" />
        {/* <Suspense fallback={null}>
        <Box position={[-5, 0, 0]} />
        </Suspense> */}
        <axesHelper args={[5]} />
      </Canvas>
    </div>
  );
};

export default About;
