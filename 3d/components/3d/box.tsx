import React from "react";
import { useBox } from "@react-three/cannon";

interface Props {
  dims?: [number, number, number];
  position?: [number, number, number];
  offset?: [number, number, number];
  visible?: boolean;
  children: React.ReactNode;
}

export const Box = ({
  position = [0, 0, 0],
  offset = [0, 0, 0],
  dims = [1, 1, 1],
  visible = true,
  children,
}: Props) => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    args: dims,
    position: position,
  }));
  return (
    //@ts-ignore
    <group ref={ref} api={api}>
      <mesh scale={dims} visible={visible}>
        <boxBufferGeometry />
        <meshPhysicalMaterial wireframe />
      </mesh>
      <group position={offset}>{children}</group>
    </group>
  );
};
