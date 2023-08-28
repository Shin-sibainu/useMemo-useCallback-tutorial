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
    <>
      <p>親コンポーネントで文字を入力します。</p>
      <input
        type="text"
        onChange={changeText}
        className="border-2 border-slate-200 rounded-md"
      />
      <Child_1 /> {/* 子もレンダリングされてしまう。 */}
      <Child_2 handleClick={handleClick} />　
      {/* 関数の中身が同じでも、新しい関数として認識されてしまうから、usecallbackでメモ化してあげる。 */}
      <p>親コンポーネント側での重い処理</p>
      <p>
        Counter: {count}, {doubledCount}
      </p>
      <button onClick={() => setCount(count + 1)}>Increment count2</button>
    </>
  );
}
