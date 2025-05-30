// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";

// 이 페이지는 이제부터 SSR 렌더링 방식으로 진행됨 getServerSideProps 는 약속된 함수
// 서버 측에서만 진행

export const getServerSideProps = () => {
  //컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수
  const data = "Hello";

  console.log("서버사이드 프롭스에요"); // 이 메세지는 브라우저에서 출력X (서버 측 터미널에서 출력)

  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);

  // 서버 측이 아니라 브라우저에서만 실행되기 위해서는 mount 시점에 한번만 실행되는 useEffect
  useEffect(() => {
    console.log(window);
  }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
