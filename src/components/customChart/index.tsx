import { Center, RingProgress } from "@mantine/core";
import React from "react";

interface PropsType {
  value: number;
  color: string;
  header: string;
}
function CustomChart({ value, color, header }: PropsType) {
  return (
    <div>
      <h1 className="font-[600] text-[20px] my-5">{header}</h1>
      <RingProgress
        size={200}
        roundCaps
        thickness={8}
        sections={[{ value: value, color: color }]}
        label={
          <Center>
            <h2 className="font-bold text-[25px]">{value}%</h2>
          </Center>
        }
      />
    </div>
  );
}

export default CustomChart;
