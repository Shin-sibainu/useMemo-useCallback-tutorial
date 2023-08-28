"use client";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import React from "react";

//https://qiita.com/WebEngrChild/items/aa19500c51efa33dabc6

// eslint-disable-next-line react/display-name
const Child_1 = React.memo(() => {
  // console.log("子が再レンダリング");

  return (
    <>
      <p>子コンポーネントが表示されています</p>
    </>
  );
});

// eslint-disable-next-line react/display-name
const Child_2 = React.memo((props: { handleClick: () => void }) => {
  return (
    <>
      <p>Child_2コンポーネント</p>
      {/* <button onClick={props.handleClick}>Child_2コンポーネント</button> */}
    </>
  );
});

export default function Parent() {
  // console.log("親が再レンダリング!"); 
  const [text, setText] = useState("");

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  //ここもpropsの値であるhandleClickが変化するとレンダリングされる。
  // const handleClick = () => {
  //   console.log("click"); //useCallback
  // };

  //関数をメモ化
  const handleClick = useCallback(() => {
    console.log("click");
  }, []);

  const [count, setCount] = useState(0);
  const double = (count: number) => {
    let i = 0;
    while (i < 20000000) i++;
    return count * 2;
  };

  const doubledCount = useMemo(() => double(count), [count]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-md shadow-lg">
        <p className="text-lg mb-4">親コンポーネントで文字を入力します。</p>
        <input
          type="text"
          onChange={changeText}
          className="border-2 border-slate-200 rounded-md mb-4 w-64 p-2"
        />
        <div className="mb-4">
          <Child_1 />
        </div>
        <div className="mb-4">
          <Child_2 handleClick={handleClick} />
        </div>
        <p className="text-lg mb-4">親コンポーネント側での重い処理</p>
        <p className="text-lg mb-4">
          Counter: {count}, {doubledCount}
        </p>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Increment count2
        </button>
      </div>
    </div>
  );
  
}
